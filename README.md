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

Base URL planejada: `https://enem-api.prepvestibular.ia.br` (domínio/deploy ainda pendentes). Desenvolvimento local: `http://localhost:8787`.

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
    "total": 1,
    "hasNext": false
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
- [Bun](https://bun.sh/) (o repositório fixa dependências em `bun.lock`)
- Conta Cloudflare (opcional para rodar localmente)

### Instalação
```bash
# 1. Instalar dependências
bun install --frozen-lockfile

# 2. Criar tabelas no D1 local
bun run db:migrate:local

# 3. Popular com dados iniciais de exemplo
bun run db:seed:local

# 4. Iniciar servidor local
bun run dev
```

A API estará rodando em `http://localhost:8787`.

> O conjunto incluído é uma amostra de metadados, não uma coleção completa de questões. O endpoint não retorna enunciados, alternativas, imagens ou gabaritos no dataset atual. O deploy público ainda não está habilitado. Consulte [DATA-LICENSE.md](DATA-LICENSE.md) e o [manifesto do dataset](data/manifest.json) para escopo e proveniência.

### Testes
```bash
bun run test
bun run typecheck
```

---

## 📜 Licença
- Código: [MIT License](LICENSE)
- Dados e Conteúdo: [DATA-LICENSE.md](DATA-LICENSE.md)
