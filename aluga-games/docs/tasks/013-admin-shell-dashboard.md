# Task 013 - Shell do admin e dashboard

Prioridade: P0  
Dependências: Tasks 001, 002 e 003  
Área: Admin, Clerk, autorização, dashboard

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

- `/docs/ui/02-portal-admin.md`
- `/docs/architecture/07-autenticacao-e-autorizacao.md`
- `/docs/architecture/08-seguranca.md`

## Objetivo

Implementar a estrutura base do portal administrativo protegido por Clerk e autorizado somente para o dono configurado.

## Escopo

Criar ou ajustar:

- route group admin `(admin)`;
- `/admin/login`, se necessário conforme integração Clerk;
- `/admin` dashboard;
- layout administrativo com sidebar/header;
- navegação para produtos, categorias, tags, LP, fotografia, depoimentos, FAQ, logos e configurações;
- proteção de rota via Clerk;
- autorização por `requireAdmin()`/allowlist;
- dashboard com estatísticas básicas.

## Fora do escopo

- Não implementar CRUDs completos nesta task.
- Não implementar upload.
- Não implementar editor da LP.
- Não criar multiusuário ou permissões avançadas.

## Estatísticas do dashboard

Exibir quando possível:

- total de produtos;
- produtos ativos;
- produtos indisponíveis;
- produtos em destaque;
- total de fotos;
- total de álbuns;
- total de categorias;
- total de depoimentos;
- total de FAQs.

## Requisitos de segurança

- Usuário não autenticado não acessa `/admin`.
- Usuário autenticado no Clerk, mas fora da allowlist, não acessa o admin.
- Toda query administrativa deve validar autorização no servidor.
- Não confiar apenas no middleware ou em esconder botões no frontend.

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

- `/admin` exige login.
- Usuário fora da allowlist é bloqueado.
- Dashboard renderiza estatísticas sem expor dados sensíveis.
- Sidebar/menu admin existe.
- Páginas ainda não implementadas podem ter placeholders seguros.

## Testes mínimos

- Acessar `/admin` sem login.
- Acessar com usuário autorizado.
- Acessar com usuário não autorizado, se possível.
- Verificar dashboard.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/013-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
