import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import { healthRoute } from './routes/health';
import { metaRoute } from './routes/meta';
import { examsRoute } from './routes/exams';
import { questionsRoute } from './routes/questions';
import { notFound, internalError } from './lib/errors';
import { openapiSpec } from './openapi';

const app = new Hono<{ Bindings: Env }>();

// CORS público somente para leitura
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'HEAD', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400
}));

// Rota para o schema OpenAPI JSON
app.get('/openapi.json', (c) => {
  return c.json(openapiSpec);
});

// Interface de documentação interativa com Scalar
app.get('/docs', (c) => {
  const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <title>ENEM API — Documentação Interativa</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="https://fav.farm/📚" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #0f172a;
      }
    </style>
  </head>
  <body>
    <script
      id="api-reference"
      data-url="/openapi.json"
      data-configuration='{"theme":"purple","hideDownloadButton":false,"showSidebar":true}'
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>`;

  return c.html(html);
});

// Redireciona a raiz para a documentação interativa
app.get('/', (c) => {
  return c.redirect('/docs');
});

// Cache-Control para respostas públicas estáveis
app.use('/v1/*', async (c, next) => {
  await next();
  if (c.req.method === 'GET' && c.res.status === 200) {
    c.res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400');
  }
});

// Rotas da API
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
