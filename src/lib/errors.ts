import type { Context } from 'hono';

export interface ErrorBody {
  error: {
    code: string;
    message: string;
  };
}

export function badRequest(c: Context, message: string) {
  return c.json<ErrorBody>(
    {
      error: {
        code: 'VALIDATION_ERROR',
        message
      }
    },
    400
  );
}

export function notFound(c: Context, message: string = 'Recurso não encontrado.') {
  return c.json<ErrorBody>(
    {
      error: {
        code: 'NOT_FOUND',
        message
      }
    },
    404
  );
}

export function internalError(c: Context, message: string = 'Erro interno do servidor.') {
  return c.json<ErrorBody>(
    {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message
      }
    },
    500
  );
}
