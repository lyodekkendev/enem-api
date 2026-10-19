# Política de Segurança

## Reportando Vulnerabilidades
Se você identificar qualquer problema de segurança, vazamento de credenciais ou vulnerabilidade nesta API, por favor não abra uma issue pública. Entre em contato diretamente com os mantenedores através de issue de segurança confidencial no GitHub ou pelo canal indicado no README.

## Diretrizes do Serviço
- Esta API é estritamente **somente de leitura** (`GET`, `HEAD`, `OPTIONS`).
- Não há autenticação de usuários, contas de alunos, dados pessoais (PII) ou endpoints de escrita.
- O banco de dados D1 (`enem-api-public`) é isolado e contém apenas o catálogo público de provas e questões.
