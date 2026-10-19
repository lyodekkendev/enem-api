export interface Env {
  DB: D1Database;
  ENVIRONMENT?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
}

export interface ApiEnvelope<T> {
  data: T;
  pagination?: PaginationMeta;
  meta: {
    apiVersion: string;
    datasetVersion: string;
  };
}

export interface ExamRecord {
  id: string;
  year: number;
  day: number;
  area: string;
  booklet_color: string;
  source_url: string;
  created_at?: string;
}

export interface QuestionRecord {
  id: string;
  exam_id: string;
  year: number;
  question_number: number;
  day: number;
  area: string;
  booklet: string;
  source_url: string;
  source_retrieved_at: string;
  content_status: string;
  license_ref: string;
  content?: string | null;
  options_json?: string | null;
  correct_answer?: string | null;
  created_at?: string;
}
