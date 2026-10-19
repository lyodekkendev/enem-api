import { Hono } from 'hono';
import type { Env, QuestionRecord } from '../types';
import { badRequest, notFound } from '../lib/errors';

export const questionsRoute = new Hono<{ Bindings: Env }>();

const DATASET_VERSION = '2026.10.1';

questionsRoute.get('/', async (c) => {
  const yearQuery = c.req.query('year');
  const areaQuery = c.req.query('area');
  const dayQuery = c.req.query('day');
  const bookletQuery = c.req.query('booklet');
  const numberQuery = c.req.query('number');

  const page = Math.max(1, parseInt(c.req.query('page') || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '20', 10) || 20));
  const offset = (page - 1) * limit;

  const whereClauses: string[] = [];
  const params: any[] = [];
  const countParams: any[] = [];

  if (yearQuery) {
    const year = parseInt(yearQuery, 10);
    if (isNaN(year) || year < 1998 || year > 2100) {
      return badRequest(c, 'O parâmetro year deve ser um ano entre 1998 e 2100.');
    }
    whereClauses.push('year = ?');
    params.push(year);
    countParams.push(year);
  }

  if (dayQuery) {
    const day = parseInt(dayQuery, 10);
    if (day !== 1 && day !== 2) {
      return badRequest(c, 'O parâmetro day deve ser 1 ou 2.');
    }
    whereClauses.push('day = ?');
    params.push(day);
    countParams.push(day);
  }

  if (areaQuery) {
    whereClauses.push('area = ?');
    params.push(areaQuery.toLowerCase());
    countParams.push(areaQuery.toLowerCase());
  }

  if (bookletQuery) {
    whereClauses.push('booklet = ?');
    params.push(bookletQuery.toLowerCase());
    countParams.push(bookletQuery.toLowerCase());
  }

  if (numberQuery) {
    const num = parseInt(numberQuery, 10);
    if (isNaN(num) || num < 1 || num > 200) {
      return badRequest(c, 'O parâmetro number deve ser entre 1 e 200.');
    }
    whereClauses.push('question_number = ?');
    params.push(num);
    countParams.push(num);
  }

  const whereSql = whereClauses.length > 0 ? ` WHERE ${whereClauses.join(' AND ')}` : '';

  const selectSql = `
    SELECT id, exam_id, year, question_number, day, area, booklet, source_url, source_retrieved_at, content_status, license_ref
    FROM questions
    ${whereSql}
    ORDER BY year DESC, day ASC, question_number ASC
    LIMIT ? OFFSET ?
  `;

  const countSql = `SELECT COUNT(*) as total FROM questions${whereSql}`;

  params.push(limit, offset);

  const [rowsResult, countResult] = await Promise.all([
    c.env.DB.prepare(selectSql).bind(...params).all<QuestionRecord>(),
    c.env.DB.prepare(countSql).bind(...countParams).first<{ total: number }>()
  ]);

  const items = rowsResult.results || [];
  const total = countResult?.total || 0;
  const hasNext = offset + items.length < total;

  return c.json({
    data: items.map(q => ({
      id: q.id,
      examId: q.exam_id,
      year: q.year,
      questionNumber: q.question_number,
      day: q.day,
      area: q.area,
      booklet: q.booklet,
      sourceUrl: q.source_url,
      sourceRetrievedAt: q.source_retrieved_at,
      contentStatus: q.content_status,
      licenseRef: q.license_ref
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

questionsRoute.get('/:id', async (c) => {
  const id = c.req.param('id');
  if (!id || id.trim().length === 0) {
    return badRequest(c, 'Identificador de questão inválido.');
  }

  const q = await c.env.DB.prepare(`
    SELECT id, exam_id, year, question_number, day, area, booklet, source_url, source_retrieved_at, content_status, license_ref, content, options_json, correct_answer
    FROM questions
    WHERE id = ?
  `).bind(id.trim()).first<QuestionRecord>();

  if (!q) {
    return notFound(c, `Questão com identificador '${id}' não encontrada.`);
  }

  return c.json({
    data: {
      id: q.id,
      examId: q.exam_id,
      year: q.year,
      questionNumber: q.question_number,
      day: q.day,
      area: q.area,
      booklet: q.booklet,
      sourceUrl: q.source_url,
      sourceRetrievedAt: q.source_retrieved_at,
      contentStatus: q.content_status,
      licenseRef: q.license_ref,
      ...(q.content ? { content: q.content } : {}),
      ...(q.options_json ? { options: JSON.parse(q.options_json) } : {}),
      ...(q.correct_answer ? { correctAnswer: q.correct_answer } : {})
    },
    meta: {
      apiVersion: 'v1',
      datasetVersion: DATASET_VERSION
    }
  });
});
