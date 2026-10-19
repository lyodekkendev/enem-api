-- Schema D1 para a ENEM API pública (isolada)

CREATE TABLE IF NOT EXISTS exams (
    id TEXT PRIMARY KEY,
    year INTEGER NOT NULL,
    day INTEGER NOT NULL,
    area TEXT NOT NULL,
    booklet_color TEXT NOT NULL,
    source_url TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX IF NOT EXISTS idx_exams_year ON exams(year);

CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    exam_id TEXT NOT NULL,
    year INTEGER NOT NULL,
    question_number INTEGER NOT NULL,
    day INTEGER NOT NULL,
    area TEXT NOT NULL,
    booklet TEXT NOT NULL,
    source_url TEXT NOT NULL,
    source_retrieved_at TEXT NOT NULL,
    content_status TEXT NOT NULL DEFAULT 'metadata_only',
    license_ref TEXT NOT NULL DEFAULT 'DATA-LICENSE.md#metadados',
    content TEXT,
    options_json TEXT,
    correct_answer TEXT,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);

CREATE INDEX IF NOT EXISTS idx_questions_search ON questions(year, area, day, question_number);
CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id);
