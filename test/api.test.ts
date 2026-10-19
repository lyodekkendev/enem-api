import { describe, it, expect, vi } from 'vitest';
import app from '../src/index';

// Mock simples para testar endpoints sem D1 nativo
const mockDb = {
  prepare: vi.fn(() => ({
    bind: vi.fn(() => ({
      all: vi.fn(async () => ({
        results: [
          {
            id: 'enem-2024-d1-az-q01',
            exam_id: 'enem-2024-d1-azul',
            year: 2024,
            question_number: 1,
            day: 1,
            area: 'linguagens-codigos',
            booklet: 'azul',
            source_url: 'https://inep.gov.br',
            source_retrieved_at: '2026-10-19',
            content_status: 'metadata_only',
            license_ref: 'DATA-LICENSE.md#metadados'
          }
        ]
      })),
      first: vi.fn(async () => ({ total: 1 }))
    }))
  }))
};

describe('ENEM API Smoke Tests', () => {
  it('GET /health retorna status ok', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
  });

  it('GET /v1/meta retorna metadados e disclaimer', async () => {
    const res = await app.request('/v1/meta');
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.apiVersion).toBe('v1');
    expect(body.disclaimer).toContain('independente');
  });

  it('GET /openapi.json retorna especificação OpenAPI 3.1 válida', async () => {
    const res = await app.request('/openapi.json');
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.openapi).toBe('3.1.0');
    expect(body.info.title).toBe('ENEM API');
  });

  it('GET /docs retorna página HTML da documentação Scalar', async () => {
    const res = await app.request('/docs');
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    const html = await res.text();
    expect(html).toContain('@scalar/api-reference');
    expect(html).toContain('/openapi.json');
  });

  it('GET / redireciona para /docs', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('/docs');
  });

  it('GET /v1/questions com filtro inválido retorna 400', async () => {
    const res = await app.request('/v1/questions?year=invalid', {}, { DB: mockDb as any });
    expect(res.status).toBe(400);
    const body = await res.json() as any;
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });

  it('GET /v1/questions com sucesso retorna envelope padronizado', async () => {
    const res = await app.request('/v1/questions?year=2024', {}, { DB: mockDb as any });
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.data).toBeDefined();
    expect(body.pagination).toBeDefined();
    expect(body.meta.apiVersion).toBe('v1');
  });

  it('GET /rota-inexistente retorna 404', async () => {
    const res = await app.request('/rota-inexistente');
    expect(res.status).toBe(404);
  });
});
