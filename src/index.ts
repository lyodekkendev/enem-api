import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import { healthRoute } from './routes/health';
import { metaRoute } from './routes/meta';
import { examsRoute } from './routes/exams';
import { questionsRoute } from './routes/questions';
import { notFound, internalError } from './lib/errors';

const app = new Hono<{ Bindings: Env }>();

// CORS público somente para leitura
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'HEAD', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400
}));

// Cache-Control para respostas públicas estáveis
app.use('/v1/*', async (c, next) => {
  await next();
  if (c.req.method === 'GET' && c.res.status === 200) {
    c.res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400');
  }
});

// Rotas principais
app.route('/health', healthRoute);
app.route('/v1/meta', metaRoute);
app.route('/v1/exams', examsRoute);
app.route('/v1/questions', questionsRoute);

// 404 handler
app.notFound((c) => {
  return notFound(c, `Rota não encontrada: ${c.req.path}`);
});

// Error handler
app.onError((err, c) => {
  console.error('Unhandled API Error:', err);
  return internalError(c);
});

export default app;
