import { Hono } from 'hono';
import type { Env, ExamRecord } from '../types';
import { badRequest, notFound } from '../lib/errors';

export const examsRoute = new Hono<{ Bindings: Env }>();

const DATASET_VERSION = '2026.10.1';

examsRoute.get('/', async (c) => {
  const yearQuery = c.req.query('year');
  const page = Math.max(1, parseInt(c.req.query('page') || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '20', 10) || 20));
  const offset = (page - 1) * limit;

  let query = 'SELECT id, year, day, area, booklet_color, source_url FROM exams';
  let countQuery = 'SELECT COUNT(*) as total FROM exams';
  const params: any[] = [];
  const countParams: any[] = [];

  if (yearQuery) {
    const year = parseInt(yearQuery, 10);
    if (isNaN(year) || year < 1998 || year > 2100) {
      return badRequest(c, 'O parâmetro year deve ser um ano entre 1998 e 2100.');
    }
    query += ' WHERE year = ?';
    countQuery += ' WHERE year = ?';
    params.push(year);
    countParams.push(year);
  }

  query += ' ORDER BY year DESC, day ASC, booklet_color ASC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const [rowsResult, countResult] = await Promise.all([
    c.env.DB.prepare(query).bind(...params).all<ExamRecord>(),
    c.env.DB.prepare(countQuery).bind(...countParams).first<{ total: number }>()
  ]);

  const items = rowsResult.results || [];
  const total = countResult?.total || 0;
  const hasNext = offset + items.length < total;

  return c.json({
    data: items.map(e => ({
      id: e.id,
      year: e.year,
      day: e.day,
      area: e.area,
      bookletColor: e.booklet_color,
      sourceUrl: e.source_url
    })),
    pagination: {
      page,
      limit,
      total,
      hasNext
    },
    meta: {
      apiVersion: 'v1',
      datasetVersion: DATASET_VERSION
    }
  });
});

examsRoute.get('/:year', async (c) => {
  const year = parseInt(c.req.param('year'), 10);
  if (isNaN(year) || year < 1998 || year > 2100) {
    return badRequest(c, 'O ano fornecido na URL deve ser válido (entre 1998 e 2100).');
  }

  const result = await c.env.DB.prepare(
    'SELECT id, year, day, area, booklet_color, source_url FROM exams WHERE year = ? ORDER BY day ASC'
  ).bind(year).all<ExamRecord>();

  const items = result.results || [];
  if (items.length === 0) {
    return notFound(c, `Nenhuma edição encontrada para o ano ${year}.`);
  }

  return c.json({
    data: {
      year,
      examCount: items.length,
      booklets: items.map(e => ({
        id: e.id,
        day: e.day,
        area: e.area,
        bookletColor: e.booklet_color,
        sourceUrl: e.source_url
      }))
    },
    meta: {
      apiVersion: 'v1',
      datasetVersion: DATASET_VERSION
    }
  });
});
