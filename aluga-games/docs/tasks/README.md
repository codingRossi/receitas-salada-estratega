# Tasks de Desenvolvimento - AlugaGames

Este diretório contém o backlog técnico recomendado para desenvolver o novo site institucional da AlugaGames com portal administrativo, catálogo de produtos, fotografia, landing page editável e conversão por WhatsApp.

## Como usar

Execute uma task por vez. Antes de qualquer implementação, a IA deve ler os documentos de produto, arquitetura, segurança, UI e qualidade definidos em `/docs/README.md`.

A IA deve seguir este ciclo:

1. Ler os docs obrigatórios.
2. Ler a task atual.
3. Fazer um plano técnico curto.
4. Implementar somente o escopo da task.
5. Rodar lint, typecheck, build e testes disponíveis.
6. Criar relatório em `/docs/tasks/reports`.
7. Revisar a implementação com `/docs/quality/02-checklist-review-ai.md`.

## Ordem recomendada

### Fundação

- `000-setup-e-auditoria-do-repo.md`
- `001-base-tecnica-segura.md`
- `002-modelagem-drizzle-e-migrations.md`
- `003-seed-e-dados-iniciais.md`

### Site público

- `004-shell-site-publico-e-layout.md`
- `005-componentes-ui-base.md`
- `006-landing-page-publica.md`
- `007-queries-publicas-catalogo.md`
- `008-pagina-produtos-filtros.md`
- `009-pagina-produto-individual.md`
- `010-lista-produtos-whatsapp.md`
- `011-paginas-institucionais-estaticas.md`
- `012-fotografia-publica.md`

### Portal admin

- `013-admin-shell-dashboard.md`
- `014-admin-categorias-tags.md`
- `015-admin-produtos.md`
- `016-upload-e-midias-admin.md`
- `017-admin-landing-page-cms.md`
- `018-admin-fotografia.md`
- `019-admin-depoimentos-faq-logos.md`
- `020-admin-configuracoes-site-whatsapp.md`
- `021-tracking-whatsapp-dashboard.md`

### Lançamento, qualidade e segurança

- `022-seo-sitemap-robots-redirects.md`
- `023-performance-acessibilidade-responsivo.md`
- `024-testes-automatizados-e-manuais.md`
- `025-revisao-seguranca-red-team.md`
- `026-deploy-railway-producao.md`
- `027-observabilidade-backups-incidentes.md`
- `028-conteudo-inicial-e-migracao.md`
- `029-homologacao-final-e-handover.md`

## Regra principal

O sistema deve priorizar: segurança, gestão pelo dono, conversão para WhatsApp, visual premium e código limpo. Nenhuma task pode enfraquecer autenticação, autorização, validação server-side ou segurança de upload.
