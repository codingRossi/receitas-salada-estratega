# Task 024 - Testes automatizados e manuais

Prioridade: P1  
Dependências: Features principais implementadas  
Área: Qualidade, testes, regressão

## Documentos obrigatórios para leitura antes de executar

Leia, no mínimo:

- `/docs/README.md`
- `/docs/adr/README.md`
- `/docs/product/00-visao-do-produto.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`
- `/docs/architecture/00-stack-e-decisoes.md`
- `/docs/architecture/01-arquitetura-de-pastas.md`
- `/docs/architecture/03-banco-de-dados.md`
- `/docs/architecture/05-contratos-de-actions-e-apis.md`
- `/docs/architecture/07-autenticacao-e-autorizacao.md`
- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `/docs/quality/01-definition-of-done.md`
- `/docs/quality/02-checklist-review-ai.md`

Leia também qualquer documento específico citado nesta task.


Documentos específicos:

- `/docs/quality/00-estrategia-de-testes.md`
- `/docs/quality/01-definition-of-done.md`
- `/docs/quality/02-checklist-review-ai.md`

## Objetivo

Criar e organizar testes suficientes para reduzir risco de regressão, especialmente em autenticação, autorização, upload, catálogo, WhatsApp e admin.

## Escopo

Implementar ou ajustar testes para:

- helpers de WhatsApp;
- lista de produtos no localStorage;
- schemas de validação;
- queries públicas do catálogo;
- Server Actions administrativas;
- proteção de admin;
- upload seguro;
- filtros de produtos;
- página de produto;
- conteúdo ativo/inativo;
- tracking de WhatsApp, se existir.

Criar checklist manual para:

- fluxo público completo;
- fluxo admin completo;
- upload;
- edição da LP;
- fotografia;
- SEO básico;
- responsividade.

## Fora do escopo

- Não criar testes frágeis que dependem de texto exato demais sem necessidade.
- Não remover validações para passar testes.
- Não ignorar testes falhando sem justificativa.

## Requisitos técnicos

- Usar ferramentas já presentes no projeto.
- Se não houver ferramenta de teste, propor a mínima necessária sem inflar o projeto.
- Testes devem ser claros e úteis.
- Dados de teste não devem conter secrets reais.

## Regras inegociáveis para IA

- Não implemente funcionalidades fora do escopo desta task.
- Não remova validações, autenticação ou autorização para “fazer funcionar”.
- Não exponha secrets, tokens, variáveis sensíveis ou stack traces.
- Não crie checkout, pagamento online, pedido fechado no site, área de cliente ou favorito.
- Toda mutação administrativa deve validar autenticação e autorização no servidor.
- Toda entrada do usuário deve ser validada no servidor com schema claro.
- Qualquer alteração de arquitetura precisa ser registrada ou justificada no relatório da task.
- Se encontrar risco P0 de segurança, pare a implementação funcional e registre o bloqueio.


## Critérios de aceite

- Existem testes para funções críticas.
- Existe checklist manual documentado.
- Testes rodam por script documentado.
- Falhas conhecidas são registradas.
- Segurança crítica é coberta por teste ou checklist manual.

## Testes mínimos obrigatórios

- `requireAdmin()` bloqueia usuário não autorizado.
- Server Action administrativa sem autorização falha.
- Upload inválido é bloqueado.
- Produto inativo não aparece no público.
- Mensagem de WhatsApp de produto é gerada corretamente.
- Lista de produtos gera mensagem com quantidades.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/024-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
