# Task 007 - Queries públicas do catálogo

Prioridade: P0  
Dependências: Tasks 002 e 003  
Área: Catálogo, banco, segurança de leitura

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

- `/docs/architecture/02-modelo-de-dominio.md`
- `/docs/architecture/03-banco-de-dados.md`
- `/docs/architecture/05-contratos-de-actions-e-apis.md`

## Objetivo

Criar as funções de leitura pública do catálogo, garantindo que somente conteúdo ativo e seguro seja exibido no site.

## Escopo

Implementar queries para:

- listar produtos públicos;
- buscar produto por slug;
- listar categorias ativas;
- listar tags ativas;
- listar produtos em destaque;
- listar produtos relacionados;
- listar filtros disponíveis;
- listar dados públicos necessários para LP e página de produtos.

## Fora do escopo

- Não criar mutações administrativas.
- Não criar filtros visuais da página ainda, se a task 008 não tiver sido executada.
- Não implementar upload.
- Não expor dados administrativos.

## Requisitos funcionais

- Produtos inativos não aparecem no site público.
- Produtos indisponíveis podem aparecer se a regra de negócio permitir, mas devem ter status visual claro.
- Categorias/tags inativas não aparecem como filtro público.
- Produtos devem ser ordenados alfabeticamente quando não houver regra específica.
- Produto por slug deve retornar 404 quando não existir ou estiver inativo.

## Requisitos técnicos

- Centralizar queries públicas em feature apropriada.
- Evitar lógica de filtro duplicada nas páginas.
- Tipar os retornos.
- Não retornar campos internos como storage keys sensíveis, logs, ids de auditoria ou dados administrativos desnecessários.

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

- Queries públicas existem e são reutilizáveis.
- Produtos inativos não vazam no público.
- Slugs funcionam corretamente.
- Dados retornados são suficientes para páginas públicas.
- Não há exposição indevida de campos internos.

## Testes mínimos

- Testar listagem com produtos ativos/inativos.
- Testar produto por slug existente, inexistente e inativo.
- Testar filtros disponíveis.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/007-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
