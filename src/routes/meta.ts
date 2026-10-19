import { Hono } from 'hono';
import type { Env } from '../types';

export const metaRoute = new Hono<{ Bindings: Env }>();

metaRoute.get('/', (c) => {
  return c.json({
    apiVersion: 'v1',
    datasetVersion: '2026.10.1',
    source: 'Inep / Ministério da Educação',
    disclaimer: 'Iniciativa comunitária independente, não oficial e sem vínculo com Inep/MEC.',
    license: {
      code: 'MIT',
      data: 'DATA-LICENSE.md'
    },
    repository: 'https://github.com/lyodekkendev/enem-api'
  });
});
