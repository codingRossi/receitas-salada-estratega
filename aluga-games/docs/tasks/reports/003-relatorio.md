# Relatorio - Task 003: Seed e Dados Iniciais

## Resumo executivo

A task 003 foi implementada sem P0. O projeto agora possui um seed inicial executavel com Bun para Drizzle/PostgreSQL, com dados minimos de configuracoes globais, categorias, tags, blocos controlados da landing page e FAQs padrao somente fora de producao.

O seed foi implementado de forma idempotente e segura para producao: ele nao sobrescreve conteudo existente, nao cria produtos reais, nao cria placeholders de depoimentos/logos, nao cria usuarios locais e nao cria qualquer dado de e-commerce.

Relatorio canonico por slug tambem criado em `/docs/tasks/reports/003-seed-e-dados-iniciais.md`.

## O que foi implementado

- Arquivo de dados iniciais separado em `src/server/db/seed-data.ts`.
- Executor de seed em `src/server/db/seed.ts`.
- Script `db:seed` usando Bun.
- Variavel opcional `WHATSAPP_PHONE_NUMBER` documentada em `.env.example`.
- Validacao server-side opcional de `WHATSAPP_PHONE_NUMBER`.
- Seed com comportamento diferente entre desenvolvimento/teste e producao.

## Arquivos criados

- `src/server/db/seed-data.ts`
- `src/server/db/seed.ts`
- `docs/tasks/reports/003-relatorio.md`
- `docs/tasks/reports/003-seed-e-dados-iniciais.md`

## Arquivos alterados

- `package.json`
- `.env.example`
- `src/server/env.ts`

## Dependencias instaladas

Nenhuma dependencia nova foi instalada. O projeto ja possuia `drizzle-orm`, `postgres`, `drizzle-kit` e `@next/env`.

## Package manager usado

Bun.

## Estrutura do seed

- `src/server/db/seed-data.ts`: dados iniciais tipados contra o schema Drizzle.
- `src/server/db/seed.ts`: script executavel por `bun run db:seed`.

O seed nao importa `src/server/db/index.ts`, porque esse arquivo usa `server-only` e e adequado ao runtime Next.js, nao a scripts CLI. O seed cria uma conexao propria e temporaria com `postgres` apenas durante a execucao.

## Dados iniciais criados

- Configuracoes globais em `site_settings`.
- Categorias iniciais.
- Tags iniciais.
- Blocos padrao da landing page.
- FAQs padrao em desenvolvimento/teste.

## Configuracoes globais criadas

Chaves preparadas em `site_settings`:

- `whatsapp`
- `social_links`
- `contact_info`
- `footer`
- `seo_defaults`
- `site_identity`

O telefone do WhatsApp vem de `WHATSAPP_PHONE_NUMBER` quando configurado. Se ausente, o valor salvo e `null`.

## Categorias criadas

- `games`
- `realidade-virtual`
- `inflaveis`
- `maquinas`
- `decoracao`
- `eventos-corporativos`
- `festas-e-aniversarios`

## Tags criadas

- `infantil`
- `adulto`
- `corporativo`
- `escola`
- `condominio`
- `evento-premium`
- `mais-procurado`

## Blocos da landing page criados

- `hero`
- `client_logos`
- `why_choose_us`
- `featured_products`
- `solutions`
- `how_it_works`
- `testimonials`
- `faq`
- `final_cta`

## FAQs/depoimentos/logos criados, se aplicavel

FAQs genericas foram implementadas para desenvolvimento/teste. Em producao, o seed nao insere FAQs padrao para evitar publicar conteudo de exemplo sem decisao explicita.

Depoimentos e logos nao foram criados. A task permite placeholders apenas se necessario, e nao havia necessidade segura de cadastrar nomes, empresas ou logos sem fonte validada.

## Produtos de exemplo criados, se aplicavel

Nenhum produto de exemplo foi criado. A decisao evita confusao com produto real e mantem a task fora de paginas publicas/catalogo/admin.

## Idempotencia

- `site_settings`: usa `onConflictDoNothing` por `key`.
- `categories`: usa `onConflictDoNothing` por `slug`.
- `tags`: usa `onConflictDoNothing` por `slug`.
- `landing_page_blocks`: usa `onConflictDoNothing` por `key`.
- `faqs`: consulta perguntas existentes e insere apenas perguntas ausentes.

O seed nao apaga registros e nao executa update destrutivo.

## Diferenca entre desenvolvimento e producao

Em desenvolvimento/teste, o seed pode inserir FAQs genericas para ajudar o site a nascer com conteudo minimo.

Em producao, o seed:

- nao sobrescreve conteudo real;
- nao insere FAQs padrao;
- nao insere produtos de exemplo;
- nao insere depoimentos ou logos sem fonte validada.

## Seguranca

- Secrets reais salvos: nao
- Dados pessoais sensiveis salvos: nao
- Usuario admin local criado: nao
- Tabelas proibidas criadas: nao
- Conteudo real sem fonte validada cadastrado: nao
- DATABASE_URL exposto ao client: nao

## Comandos executados

- `bun run lint`: passou
- `bun run typecheck`: passou
- `bun run db:check`: passou
- `bun --eval "..."` para checar `DATABASE_URL` sem imprimir credenciais: `DATABASE_URL` ausente
- `bun run build` no sandbox: falhou por erro ambiental do Turbopack (`Operation not permitted` ao criar processo/vincular porta)
- `bun run build` fora do sandbox: passou
- `bun --eval "await import('./src/server/db/seed.ts'); ..."`: passou
- `bun run db:seed`: nao executado, porque nao ha `DATABASE_URL` local segura configurada

## Teste de idempotencia

O teste real de idempotencia em banco nao foi executado porque nao ha `DATABASE_URL` local segura configurada no ambiente.

A idempotencia foi validada por implementacao e typecheck:

- tabelas com chaves unicas usam `onConflictDoNothing`;
- FAQs sem chave unica sao comparadas por pergunta antes do insert;
- nenhum delete ou update destrutivo foi implementado.

Quando houver banco local seguro, o teste recomendado e:

1. `bun run db:migrate`
2. `bun run db:seed`
3. `bun run db:seed`
4. confirmar que os totais de settings, categorias, tags, blocos e FAQs nao duplicam.

## Problemas encontrados

### P0

Nenhum.

### P1

Nenhum.

### P2

- Seed nao executado em banco real por ausencia de `DATABASE_URL` local segura.
  - Impacto: a idempotencia foi validada por codigo/typecheck, mas ainda precisa de confirmacao pratica quando houver Postgres local.
  - Recomendacao: antes de depender dos dados iniciais em uma feature publica/admin, rodar migration e seed duas vezes em banco local limpo.

## Riscos restantes

- `WHATSAPP_PHONE_NUMBER` e opcional. Se ausente, o admin ou task futura precisara configurar o numero antes de CTAs reais de WhatsApp serem publicados.
- O seed nao cria media, logos, depoimentos ou produtos. As proximas tasks devem lidar com estados vazios/fallbacks.

## Pode seguir para a task 004?

Sim. Nao ha P0 aberto. A task 004 pode seguir, com a ressalva P2 de executar o seed em banco local seguro quando `DATABASE_URL` estiver disponivel.

## Criterios de aceite

- O seed roda ou esta implementado de forma executavel em ambiente seguro: sim, implementado e validado por import/typecheck; execucao real bloqueada por ausencia de banco local seguro.
- O seed e idempotente: sim, por `onConflictDoNothing` e checagem de FAQs existentes.
- Configuracoes essenciais existem: sim.
- Categorias e tags iniciais existem: sim.
- Blocos minimos da LP existem: sim.
- Nenhum segredo real foi salvo: sim.
- Nenhum dado sensivel foi salvo: sim.
- Nenhuma tabela proibida foi criada: sim.
- Lint/typecheck/build foram executados: sim.
- Relatorio final foi criado: sim.
- Nao ha P0 aberto: sim.
