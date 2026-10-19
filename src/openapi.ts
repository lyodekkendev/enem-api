export const openapiSpec = {
  "openapi": "3.1.0",
  "info": {
    "title": "ENEM API",
    "description": "API REST pública e independente para descoberta, consulta de provas e catálogo de questões do Exame Nacional do Ensino Médio (ENEM). Projeto comunitário não oficial.",
    "version": "1.0.0",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "servers": [
    {
      "url": "https://enem-api.prepvestibular.ia.br",
      "description": "Servidor de Produção (domínio comunitário)"
    },
    {
      "url": "http://localhost:8787",
      "description": "Servidor Local (Wrangler)"
    }
  ],
  "paths": {
    "/health": {
      "get": {
        "summary": "Verificação de integridade da API",
        "operationId": "getHealth",
        "responses": {
          "200": {
            "description": "Serviço ativo e operacional",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "ok"
                    },
                    "timestamp": {
                      "type": "string",
                      "example": "2026-10-19T14:00:00.000Z"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/meta": {
      "get": {
        "summary": "Metadados da API e versão do dataset",
        "operationId": "getMeta",
        "responses": {
          "200": {
            "description": "Informações de versão, provedor e licença"
          }
        }
      }
    },
    "/v1/exams": {
      "get": {
        "summary": "Listagem paginada de provas e edições do ENEM",
        "operationId": "getExams",
        "parameters": [
          {
            "name": "year",
            "in": "query",
            "description": "Filtrar por ano (1998 a 2100)",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 2024
            }
          },
          {
            "name": "page",
            "in": "query",
            "description": "Página (inicia em 1)",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 1
            }
          },
          {
            "name": "limit",
            "in": "query",
            "description": "Itens por página (1 a 100)",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de provas retornada com sucesso"
          },
          "400": {
            "description": "Parâmetro de busca inválido"
          }
        }
      }
    },
    "/v1/exams/{year}": {
      "get": {
        "summary": "Detalhes de uma edição específica do ENEM",
        "operationId": "getExamByYear",
        "parameters": [
          {
            "name": "year",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "example": 2024
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Detalhes da edição e cadernos disponíveis"
          },
          "404": {
            "description": "Edição não encontrada"
          }
        }
      }
    },
    "/v1/questions": {
      "get": {
        "summary": "Busca paginada de questões catalogadas",
        "operationId": "getQuestions",
        "parameters": [
          {
            "name": "year",
            "in": "query",
            "schema": {
              "type": "integer",
              "example": 2024
            }
          },
          {
            "name": "area",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "ciencias-humanas",
                "ciencias-natureza",
                "linguagens-codigos",
                "matematica"
              ]
            }
          },
          {
            "name": "day",
            "in": "query",
            "schema": {
              "type": "integer",
              "enum": [
                1,
                2
              ]
            }
          },
          {
            "name": "booklet",
            "in": "query",
            "schema": {
              "type": "string",
              "example": "azul"
            }
          },
          {
            "name": "number",
            "in": "query",
            "schema": {
              "type": "integer",
              "example": 95
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 1
            }
          },
          {
            "name": "limit",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Lista paginada de questões"
          },
          "400": {
            "description": "Filtros inválidos"
          }
        }
      }
    },
    "/v1/questions/{id}": {
      "get": {
        "summary": "Consulta de questão por identificador estável",
        "operationId": "getQuestionById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "example": "enem-2024-d1-az-q01"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Questão encontrada"
          },
          "404": {
            "description": "Questão não encontrada"
          }
        }
      }
    }
  }
};
