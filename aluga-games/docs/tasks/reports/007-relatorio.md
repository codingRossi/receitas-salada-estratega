# Relatório da Task 007 - Queries públicas do catálogo

## Resumo

Foram criadas e ajustadas as queries reutilizáveis do catálogo público sem implementar UI das páginas `/produtos` e `/produtos/[slug]`.

A camada pública agora permite produtos `active` e `unavailable`, bloqueia `inactive` e soft-deleted, retorna status explícito para indisponíveis e evita campos administrativos em DTOs públicos.

## Arquivos criados

- `src/domain/features/retrieve-public-product-by-slug.ts`
- `src/domain/features/list-featured-public-products.ts`
- `src/domain/features/list-related-public-products.ts`
- `src/domain/features/list-public-catalog-filters.ts`
- `src/domain/features/retrieve-public-catalog-page-data.ts`
- `src/domain/features/public-catalog-helpers.ts`
- `src/infra/repositories/public-product-query-helpers.ts`
- `__tests__/bun-test.d.ts`
- `__tests__/controllers/landing-page-controller.test.ts`
- `__tests__/domain/features/landing-page-features.test.ts`
- `__tests__/domain/features/list-featured-public-products.test.ts`
- `__tests__/domain/features/list-public-catalog-filters.test.ts`
- `__tests__/domain/features/list-public-products.test.ts`
- `__tests__/domain/features/list-related-public-products.test.ts`
- `__tests__/domain/features/public-catalog-test-helpers.ts`
- `__tests__/domain/features/retrieve-public-catalog-page-data.test.ts`
- `__tests__/domain/features/retrieve-public-product-by-slug.test.ts`
- `__tests__/domain/features/simple-domain-features.test.ts`
- `__tests__/infra/repositories/drizzle-basic-repositories.integration.test.ts`
- `__tests__/infra/repositories/drizzle-landing-page-repository.integration.test.ts`
- `__tests__/infra/repositories/drizzle-product-repository.integration.test.ts`
- `__tests__/infra/repositories/repository-integration-helpers.ts`

## Arquivos alterados

- `AGENTS.md`
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/quality/01-definition-of-done.md`
- `docs/quality/02-checklist-review-ai.md`
- `src/domain/contracts/product-repositories.ts`
- `src/domain/contracts/category-repositories.ts`
- `src/domain/contracts/tag-repositories.ts`
- `src/domain/features/helpers.ts`
- `src/domain/features/list-public-products.ts`
- `src/domain/features/list-active-categories.ts`
- `src/domain/features/list-active-tags.ts`
- `src/infra/repositories/drizzle-product-repository.ts`
- `src/infra/repositories/drizzle-category-repository.ts`
- `src/infra/repositories/drizzle-tag-repository.ts`
- `src/main/factories/features.ts`
- `src/main/factories/repositories.ts`
- `docker-compose.yml`

## Decisões técnicas

- Mantido um arquivo de repository por entidade/domínio, por exemplo `drizzle-product-repository.ts`.
- Cada método de repository executa uma única ação de banco; composição entre queries ficou nas features.
- Factories usam `setup*Feature` e ficam em `src/main/factories`.
- Helpers de catálogo foram separados em `public-catalog-helpers.ts` para manter `helpers.ts` focado em landing/WhatsApp.
- `listFeaturedPublicProducts` reaproveita `listPublicProducts` com `featured: true`.
- `listRelatedPublicProducts` reaproveita `listPublicProducts` para herdar a barreira pública contra `inactive` e soft-deleted.
- Testes de repository são integração real e exigem opt-in com `RUN_REPOSITORY_INTEGRATION_TESTS=1` para evitar escrita acidental em banco errado.
- `docker-compose.yml` passou a aceitar `POSTGRES_PORT`, mantendo 5432 como padrão e permitindo 5433 quando a porta local estiver ocupada.
- Nenhuma rota Next ou UI das tasks 008/009 foi implementada.

## Testes realizados

Criadas suítes separadas por camada em `__tests__`.

Features de catálogo:

- listagem não retorna produto `inactive`;
- produto `unavailable` aparece com status explícito;
- slug inexistente ou inativo retorna `null`;
- filtros públicos não retornam categorias/tags inativas;
- relacionados excluem produto atual e produtos inativos.
- destacados reutilizam listagem pública com `featured: true`;
- dados da página pública combinam produtos e filtros.

Demais features:

- WhatsApp URL;
- mensagens estáticas de WhatsApp;
- fallback da landing page;
- leitura pública da landing page com e sem `DATABASE_URL`;
- media asset;
- site setting;
- audit log;
- wrappers `stable`.

Controller:

- controller da landing page retorna dados estáveis quando a feature sucede;
- controller retorna fallback quando a feature estável falha.

Repositories com integração real:

- categorias ativas;
- tags ativas;
- media asset sem `storageKey` e sem soft-deleted;
- site setting por chave;
- gravação de audit log;
- produto público, slug, relações, mídia, vídeo e specs ativos;
- rows públicas da landing page.

## Comandos executados

- `npx --yes prettier --write ...`: concluído.
- `docker compose up -d`: executado; Postgres precisou subir em porta alternativa porque 5432 estava ocupada no host.
- `POSTGRES_PORT=5433 docker compose up -d --force-recreate postgres`: Postgres subiu saudável em `localhost:5433`.
- `DATABASE_URL=postgresql://alugagames:alugagames_dev_password@localhost:5433/alugagames bun run db:migrate`: migrations aplicadas.
- `DATABASE_URL=postgresql://alugagames:alugagames_dev_password@localhost:5433/alugagames RUN_REPOSITORY_INTEGRATION_TESTS=1 bun test __tests__/infra/repositories`: 7 testes passaram.
- `DATABASE_URL=postgresql://alugagames:alugagames_dev_password@localhost:5433/alugagames RUN_REPOSITORY_INTEGRATION_TESTS=1 bun test __tests__`: 35 testes passaram.
- `bun run lint`: concluiu com 0 erros e 3 warnings antigos de `<img>` na landing page.
- `bun run typecheck`: passou.
- `bun run build`: passou.

Durante o build, a landing page registrou fallback estável ao tentar carregar rows públicas no ambiente local. O comando terminou com sucesso e preservou o comportamento existente de fallback.

## Riscos encontrados

- Nenhum risco P0 de segurança encontrado.
- O lint ainda alerta sobre uso de `<img>` em componentes da landing page já existentes:
  - `src/components/site/landing-page/client-logos-section.tsx`
  - `src/components/site/landing-page/event-gallery-section.tsx`
  - `src/components/site/landing-page/featured-products-section.tsx`

## Pendências

- Corrigir warnings de `<img>` para `next/image` em task própria de UI/performance, fora do escopo da Task 007.
- Implementar UI de `/produtos` e `/produtos/[slug]` nas tasks 008/009.
- Se 5432 estiver livre no ambiente de outro dev, `docker compose up -d` continua funcionando com a porta padrão. Neste ambiente, use `POSTGRES_PORT=5433`.

## Evidência dos critérios de aceite

- Queries públicas reutilizáveis existem em `src/domain/features`.
- Produtos `inactive` e soft-deleted são bloqueados por filtros Drizzle e pela barreira final dos helpers públicos.
- Produtos `unavailable` podem aparecer com `status: "unavailable"`.
- Produto por slug retorna `null` quando não é público.
- Categorias/tags públicas usam apenas rows ativas e não deletadas.
- DTOs públicos não incluem `storageKey`, timestamps, logs, secrets ou campos administrativos.
- Testes ficam em `__tests__`, separados do código de produção.
- Features, controller e repositories têm testes próprios.
- Repositories foram validados com integração real contra Postgres Docker.
