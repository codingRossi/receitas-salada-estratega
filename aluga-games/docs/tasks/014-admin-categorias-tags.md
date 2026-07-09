# Task 014 - Admin de categorias e tags

Prioridade: P0  
Dependências: Task 013  
Área: Admin, catálogo, Server Actions

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

- `/docs/product/03-regras-de-negocio.md`
- `/docs/architecture/05-contratos-de-actions-e-apis.md`
- `/docs/ui/02-portal-admin.md`

## Objetivo

Implementar o gerenciamento administrativo de categorias e tags usadas na organização e filtragem dos produtos.

## Escopo

Criar telas e actions para:

- listar categorias;
- criar categoria;
- editar categoria;
- ativar/desativar categoria;
- excluir categoria somente quando seguro ou bloquear exclusão se houver relação crítica;
- listar tags;
- criar tag;
- editar tag;
- ativar/desativar tag;
- excluir tag somente quando seguro;
- gerar ou validar slug;
- exibir erros de validação.

## Fora do escopo

- Não implementar CRUD de produtos nesta task.
- Não criar páginas públicas por categoria.
- Não criar filtros públicos nesta task, se já não existirem.
- Não criar permissões por usuário.

## Requisitos funcionais

- Categorias e tags são editáveis pelo dono.
- Produto pode ter múltiplas categorias e tags em task posterior.
- Categorias/tags inativas não aparecem no site público.
- Slugs devem ser únicos.

## Requisitos de segurança

- Todas as actions devem chamar `requireAdmin()`.
- Validar input com Zod ou schema equivalente no servidor.
- Registrar auditoria administrativa para criar, editar, desativar e excluir.
- Não confiar em validação client-side.

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

- Admin consegue criar, editar e desativar categorias.
- Admin consegue criar, editar e desativar tags.
- Slugs duplicados são bloqueados.
- Usuário não autorizado não consegue executar actions.
- Logs administrativos são criados quando previsto.

## Testes mínimos

- Criar categoria/tag válida.
- Tentar criar duplicada.
- Editar.
- Desativar.
- Testar action sem autorização, se possível.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/014-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
