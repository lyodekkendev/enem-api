# ENEM API

> **Aviso Importante:** Esta API é uma iniciativa comunitária independente e **não oficial**. Não é afiliada, mantida nem endossada pelo Inep ou pelo Ministério da Educação (MEC).

API REST pública, versionada e somente de leitura, construída sobre [Cloudflare Workers](https://workers.cloudflare.com/) e [Cloudflare D1](https://developers.cloudflare.com/d1/), com [Hono](https://hono.dev/).

---

## 🎯 Objetivos
- Prover um catálogo estruturado e estável de edições, cadernos e questões do ENEM.
- Oferecer uma interface de consulta pública de alta velocidade via edge network (Cloudflare).
- Garantir proveniência clara e rastreabilidade para cada item catalogado.

## 📦 Arquitetura
- **Runtime:** Cloudflare Workers (TypeScript)
- **Framework HTTP:** Hono v4
- **Banco de Dados:** Cloudflare D1 (`enem-api-public`), somente leitura via consultas parametrizadas
- **Especificação:** OpenAPI 3.1 (`openapi.yaml`)
- **Licença de Software:** MIT
- **Licença de Dados:** Consulte [DATA-LICENSE.md](DATA-LICENSE.md)

---

## 🚀 Endpoints Principais (v1)

Base URL: `https://enem-api.prepvestibular.ia.br` (ou `http://localhost:8787` em desenvolvimento)

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/health` | Integridade do Worker (sem consultar banco) |
| `GET` | `/v1/meta` | Versão da API, versão do dataset e fontes oficiais |
| `GET` | `/v1/exams` | Lista paginada de edições/cadernos disponíveis |
| `GET` | `/v1/exams/{year}` | Detalhes de um ano específico do exame |
| `GET` | `/v1/questions` | Busca de questões por ano, área, dia, caderno ou número |
| `GET` | `/v1/questions/{id}` | Detalhes de uma questão por identificador público estável |

### Exemplo de Resposta (`GET /v1/questions?year=2024&area=matematica`)
```json
{
  "data": [
    {
      "id": "enem-2024-d2-am-q136",
      "exam": "enem",
      "year": 2024,
      "day": 2,
      "questionNumber": 136,
      "area": "matematica",
      "booklet": "amarelo",
      "sourceUrl": "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",
      "sourceRetrievedAt": "2026-10-19",
      "contentStatus": "metadata_only",
      "licenseRef": "DATA-LICENSE.md#metadados"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "hasNext": true
  },
  "meta": {
    "apiVersion": "v1",
    "datasetVersion": "2026.10.1"
  }
}
```

---

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) v20+ ou [Bun](https://bun.sh/)
- Conta Cloudflare (opcional para rodar localmente)

### Instalação
```bash
# 1. Instalar dependências
npm install

# 2. Criar tabelas no D1 local
npm run db:migrate:local

# 3. Popular com dados iniciais de exemplo
npm run db:seed:local

# 4. Iniciar servidor local
npm run dev
```

A API estará rodando em `http://localhost:8787`.

### Testes
```bash
npm run test
npm run typecheck
```

---

## 📜 Licença
- Código: [MIT License](LICENSE)
- Dados e Conteúdo: [DATA-LICENSE.md](DATA-LICENSE.md)
