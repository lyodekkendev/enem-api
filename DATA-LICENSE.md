# Licença e Proveniência de Dados — ENEM API

**Data de atualização:** 19 de outubro de 2026  
**Status dos dados:** Amostra de metadados e links oficiais; reprodução de conteúdo integral: A VALIDAR

## 1. Distinção entre Código e Dados
- **Código do software (Worker, rotas, scripts):** Licenciado sob [MIT License](LICENSE).
- **Dados, Provas e Questões:** O software não reivindica direitos de propriedade sobre os exames oficiais do Exame Nacional do Ensino Médio (ENEM).

## 2. Fonte Oficial
Os dados catalogados por esta API são derivados de publicações oficiais e dados abertos disponibilizados pelo:
- **Órgão emissor:** Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep) / Ministério da Educação (MEC).
- **Portal de Provas e Gabaritos:** [https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos)
- **Portal de Microdados:** [https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem](https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem)

## 3. Matriz de Autorização e Campos Publicados

| Classe de Conteúdo | Estado de Publicação | Base Legal / Observações |
|---|---|---|
| Metadados de Provas (ano, dia, caderno) | **Público** | Dados abertos e informativos de utilidade pública. |
| Numeração e disciplina | **Público** | Catalogação e indexação de referência. |
| Links para Cadernos Oficiais | **Público** | URLs públicas diretas para os arquivos oficiais do Inep. |
| Enunciados e alternativas integrais | **A VALIDAR** | Condições de republicação de provas e materiais de terceiros ainda não foram confirmadas. Não redistribuídos no MVP. |
| Imagens e figuras de apoio | **A VALIDAR** | Direitos de imagem e fontes externas; preserva-se o link original quando disponível. |
| Gabaritos oficiais | **A VALIDAR** | A publicação oficial para consulta não é tratada aqui como autorização suficiente para republicação em uma API. Validar as condições aplicáveis ao gabarito e registrar fonte, licença/base e atribuição antes de incluí-lo. |

## 4. Notificação e Remoção
No MVP atual, a API retorna metadados e links para as fontes oficiais; não publica enunciados, alternativas, imagens ou gabaritos. Caso você seja detentor de direitos de algum elemento referenciado e deseje solicitar revisão, abra uma issue no repositório. Toda mudança de escopo de conteúdo exige atualizar esta matriz antes de importar dados.
