-- Seed de teste para ENEM API (metadados públicos de edições e questões)

INSERT INTO exams (id, year, day, area, booklet_color, source_url) VALUES
('enem-2024-d1-azul', 2024, 1, 'linguagens-humanas', 'azul', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos'),
('enem-2024-d2-amarelo', 2024, 2, 'matematica-natureza', 'amarelo', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos'),
('enem-2023-d1-azul', 2023, 1, 'linguagens-humanas', 'azul', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos'),
('enem-2023-d2-cinza', 2023, 2, 'matematica-natureza', 'cinza', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos');

INSERT INTO questions (id, exam_id, year, question_number, day, area, booklet, source_url, source_retrieved_at, content_status, license_ref) VALUES
('enem-2024-d1-az-q01', 'enem-2024-d1-azul', 2024, 1, 1, 'linguagens-codigos', 'azul', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', '2026-10-19', 'metadata_only', 'DATA-LICENSE.md#metadados'),
('enem-2024-d1-az-q02', 'enem-2024-d1-azul', 2024, 2, 1, 'linguagens-codigos', 'azul', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', '2026-10-19', 'metadata_only', 'DATA-LICENSE.md#metadados'),
('enem-2024-d1-az-q46', 'enem-2024-d1-azul', 2024, 46, 1, 'ciencias-humanas', 'azul', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', '2026-10-19', 'metadata_only', 'DATA-LICENSE.md#metadados'),
('enem-2024-d2-am-q91', 'enem-2024-d2-amarelo', 2024, 91, 2, 'ciencias-natureza', 'amarelo', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', '2026-10-19', 'metadata_only', 'DATA-LICENSE.md#metadados'),
('enem-2024-d2-am-q136', 'enem-2024-d2-amarelo', 2024, 136, 2, 'matematica', 'amarelo', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', '2026-10-19', 'metadata_only', 'DATA-LICENSE.md#metadados'),
('enem-2023-d1-az-q01', 'enem-2023-d1-azul', 2023, 1, 1, 'linguagens-codigos', 'azul', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', '2026-10-19', 'metadata_only', 'DATA-LICENSE.md#metadados'),
('enem-2023-d2-cz-q136', 'enem-2023-d2-cinza', 2023, 136, 2, 'matematica', 'cinza', 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos', '2026-10-19', 'metadata_only', 'DATA-LICENSE.md#metadados');
