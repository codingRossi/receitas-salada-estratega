# Relatório - Refactor Domain Features, Factories e Fallback Content

## Resumo executivo

Refatoração arquitetural pequena concluída. O fallback público da landing page saiu de `domain/features` e passou para `domain/contents`, os wrappers de domínio foram criados em `domain/shared`, features passaram a usar arquivos nomeados por ação, factories passaram a usar `setup*Feature()`, e o composition root foi centralizado em `src/main/factories`.

A landing page pública foi separada em três features explícitas:

- `retrieve-public-landing-page-rows.ts` busca rows publicáveis.
- `retrieve-public-landing-page-content.ts` monta o DTO público.
- `retrieve-fallback-landing-page.ts` devolve fallback seguro quando banco ou conteúdo falham.

Não houve mudança visual na landing page, nova rota, Server Action, Route Handler, migration ou schema.

## O que foi implementado

- Fallback da landing page movido para `/src/domain/contents`.
- Wrappers `toStable`, `unwrap`, `withLog`, `withAuth` e `withAuditory` criados.
- Feature pública da landing page ajustada para `setupRetrievePublicLandingPageContentFeature()`.
- Busca de rows da landing page isolada em `setupRetrievePublicLandingPageRowsFeature()`.
- Fallback da landing page isolado em `setupRetrieveFallbackLandingPageFeature()`.
- Controller da landing page ajustado para consumir `stable` + `unwrap`.
- Features de WhatsApp separadas entre montagem de URL e mensagens estáticas.
- Features em arquivos únicos criadas para operações públicas/admin relevantes: listagem pública de produtos, categorias ativas, tags ativas, site setting, media asset e audit log.
- Mapeamento, filtragem, normalização e fallback final da landing page movidos para `helpers.ts`.
- Input/output de feature mantidos no próprio arquivo da feature.
- Contracts de repositories movidos para `/src/domain/contracts` e implementados por `/src/infra/repositories`.
- `entities` ficou restrito a entidades/DTOs de domínio compartilhados, sem input de feature ou repository.
- Imports internos de `src/domain/features` normalizados para caminhos relativos diretos, sem alias `@/` e sem barrel de `contracts`, `contents` ou `entities`.
- Documentação arquitetural atualizada para `/domain/contents`, `/domain/contracts`, `/domain/features` e `/domain/shared`.
- `src/main/factories/repositories.ts`, `features.ts` e `controller.ts` criados para instanciar dependências concretas em um único lugar.

## Arquivos criados

- `src/domain/contents/landing-page-fallback-content.ts`
- `src/domain/contents/index.ts`
- `src/domain/shared/to-stable.ts`
- `src/domain/shared/unwrap.ts`
- `src/domain/shared/with-log.ts`
- `src/domain/shared/with-auth.ts`
- `src/domain/shared/with-auditory.ts`
- `src/domain/shared/index.ts`
- `src/domain/features/helpers.ts`
- `src/domain/features/build-whatsapp-url.ts`
- `src/domain/features/retrieve-static-whatsapp-message.ts`
- `src/domain/features/list-public-products.ts`
- `src/domain/features/list-active-categories.ts`
- `src/domain/features/list-active-tags.ts`
- `src/domain/features/retrieve-site-setting.ts`
- `src/domain/features/retrieve-media-asset.ts`
- `src/domain/features/record-admin-audit-log.ts`
- `src/domain/features/retrieve-public-landing-page-content.ts`
- `src/domain/features/retrieve-public-landing-page-rows.ts`
- `src/domain/features/retrieve-fallback-landing-page.ts`
- `src/domain/contracts/product-repositories.ts`
- `src/domain/contracts/category-repositories.ts`
- `src/domain/contracts/tag-repositories.ts`
- `src/domain/contracts/site-setting-repositories.ts`
- `src/domain/contracts/media-repositories.ts`
- `src/domain/contracts/admin-audit-log-repositories.ts`
- `src/main/factories/repositories.ts`
- `src/main/factories/features.ts`
- `src/main/factories/controller.ts`
- `src/infra/repositories/drizzle-product-repository.ts`
- `src/infra/repositories/drizzle-category-repository.ts`
- `src/infra/repositories/drizzle-tag-repository.ts`
- `src/infra/repositories/drizzle-site-setting-repository.ts`
- `src/infra/repositories/drizzle-media-repository.ts`
- `src/infra/repositories/drizzle-admin-audit-log-repository.ts`
- `docs/tasks/reports/refactor-domain-features-fallback-content.md`

## Arquivos alterados

- `src/controllers/landing-page-controller.ts`
- `src/domain/contracts/index.ts`
- `src/domain/entities/index.ts`
- `src/infra/repositories/index.ts`
- `src/app/(site)/page.tsx`
- `AGENTS.md`
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/02-modelo-de-dominio.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/architecture/08-seguranca.md`
- `docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `docs/quality/01-definition-of-done.md`
- `docs/quality/02-checklist-review-ai.md`
- `docs/tasks/reports/004-relatorio.md`
- `docs/tasks/reports/006-relatorio.md`
- `docs/tasks/reports/auditoria-documentacao.md`

## Arquivos removidos, se houver

- Subpastas antigas dentro de `src/domain/features`.
- Arquivos de feature nomeados apenas pela entidade.
- Factories antigas com prefixo `create*Feature`.
- Instâncias globais de repositories exportadas pelo barrel de infra.
- `src/domain/features/helper.ts`
- `src/domain/entities/product.ts`
- `src/domain/entities/taxonomy.ts`
- `src/domain/entities/site-setting.ts`
- `src/domain/entities/media.ts`
- `src/domain/entities/admin-audit-log.ts`

O fallback foi movido para `domain/contents`. As pastas por feature foram removidas do workspace porque o padrão correto deste projeto é uma feature por arquivo.

## Nova estrutura de domain

```txt
src/domain
  contents
  contracts
  entities
  features
  shared
```

`contents` guarda fallback estável. `contracts` guarda assinaturas de repositories. `shared` guarda wrappers transversais. `features` usa arquivos diretos nomeados por ação, como `retrieve-public-landing-page-content.ts`, `retrieve-public-landing-page-rows.ts`, `build-whatsapp-url.ts` e `helpers.ts`.

Não há subpastas dentro de `src/domain/features`.

## Fallback da landing page

O fallback agora fica em:

```txt
src/domain/contents/landing-page-fallback-content.ts
```

Ele continua usando os tipos de `domain/entities` e não acessa banco, UI ou repository. O conteúdo foi mantido sem inventar clientes, depoimentos ou produtos reais, sem preço e sem termos de e-commerce.

## Features criadas

- `retrieve-public-landing-page-content`: feature pública real, com rows injetadas, fallback e DTO final.
- `retrieve-public-landing-page-rows`: leitura publicável da landing page via repository injetado.
- `retrieve-fallback-landing-page`: fallback estático seguro da landing page.
- `build-whatsapp-url`: feature pública para montar URL de WhatsApp.
- `retrieve-static-whatsapp-message`: mensagens estáticas usadas por CTAs.
- `list-public-products`: listagem pública via repository injetado.
- `list-active-categories`: categorias ativas via repository injetado.
- `list-active-tags`: tags ativas via repository injetado.
- `retrieve-site-setting`: configuração por chave via repository injetado.
- `retrieve-media-asset`: mídia por id via repository injetado.
- `record-admin-audit-log`: gravação de audit log via repository injetado.

## Repositories usados

A landing page continua usando o contrato `LandingPageRepositories`, implementado por `DrizzleLandingPageRepository` e instanciado em `src/main/factories/repositories.ts`.

Métodos pequenos usados pela landing page:

- `findActiveLandingPageBlocks`
- `findActiveBlockItemsByBlockIds`
- `findFeaturedProducts`
- `findActiveClientLogos`
- `findActiveTestimonials`
- `findActiveFaqs`
- `findGalleryPreview`
- `findSiteSettingByKey`

Também foram criados contracts e implementações de infra para domínios read-side/admin-audit:

- `ProductRepositories.listPublicProducts`
- `CategoryRepositories.listActiveCategories`
- `TagRepositories.listActiveTags`
- `SiteSettingRepositories.retrieveSiteSetting`
- `MediaRepositories.retrieveMediaAsset`
- `AdminAuditLogRepositories.recordAdminAuditLog`

Nenhuma feature passou a importar `db` ou schema diretamente.

## Wrappers criados

- `toStable`: converte função async throwable em `{ success, data }`.
- `unwrap`: retorna dado estável ou fallback.
- `withLog`: registra nome, duração e sucesso/erro sem logar payload.
- `withAuth`: usa `requireAdmin()` e injeta `userId` com base em `clerkUserId`.
- `withAuditory`: wrapper genérico que grava auditoria por função/repository injetado.

## Uso de withAuth

`withAuth` foi criado, mas não foi usado nesta task.

Motivo: a alteração feita é pública/read-side e não cria mutação administrativa. A landing page pública, produtos públicos, categorias públicas e tags públicas não usam `withAuth`.

## Inversão de dependência

A feature de rows da landing page recebe repositories por parâmetro e não conhece Drizzle. A feature de conteúdo recebe as features de rows e fallback por dependência. O controller recebe a feature estável já montada em `src/main/factories/controller.ts`. As demais features também recebem seus repositories por dependência, deixando banco/storage/integrações fora da camada de domínio.

Os contracts de repository ficam em `/src/domain/contracts`; as implementações concretas ficam em `/src/infra/repositories`.

## Compatibilidade com código existente

- A UI da landing page continua recebendo o mesmo `LandingPageData`.
- A page pública importa o controller pronto de `@/main/factories/controller`.
- Features prontas ficam em `@/main/factories/features`.
- Helpers de WhatsApp continuam em `src/domain/features/helpers.ts`.
- Input/output das features ficam nos arquivos `src/domain/features/*.ts`.
- Contracts de repositories não ficam dentro das features.
- Imports internos das features apontam para arquivos concretos, como `../contracts/product-repositories` e `../shared/to-stable`.
- A feature de conteúdo da landing page não mantém detalhes de rows nem fallback estático misturados; rows ficam em `retrieve-public-landing-page-rows.ts`, fallback final em `retrieve-fallback-landing-page.ts` e transformações em `helpers.ts`.
- Nenhum componente visual foi alterado.

## Documentação para próximos agentes

- `AGENTS.md` define nomes específicos, uma feature por arquivo, `setup*Feature`, `src/main/factories`, comentários úteis, JSDoc e validação por `lint/typecheck/build`.
- `01-arquitetura-de-pastas.md` e `05-contratos-de-actions-e-apis.md` são os docs normativos para criar novas features.
- `02-modelo-de-dominio.md` deixou de sugerir pastas de feature por entidade e passou a mostrar arquivos por ação.
- `01-definition-of-done.md` e `02-checklist-review-ai.md` agora bloqueiam task que volte para feature por entidade, factory `create*Feature` ou controller instanciando dependências.
- A auditoria documental marca o antigo conflito de nomenclatura de features como resolvido.

## Segurança

- Secrets expostos: não
- Banco importado em Client Component: não
- Feature pública acessa banco diretamente: não
- Repository foi mantido para acesso a dados: sim
- withAuth usado em feature pública: não
- autorização por email criada: não
- checkout/pagamento/login de cliente criado: não
- termos de e-commerce adicionados na UI: não
- dangerouslySetInnerHTML usado: não

## Comandos executados

- `bun run lint`: passou com 3 warnings existentes de `@next/next/no-img-element`
- `bun run typecheck`: passou
- `bun run build`: passou
- `bun run db:check`: passou
- `bun run dev -- --port 3001`: passou
- `curl -sL -o /tmp/alugagames-home-corrected-features.html -w "%{http_code} %{size_download}\n" http://localhost:3001/`: passou com `200 119817`
- `rg` para caminhos antigos de feature por entidade: sem resultados em instruções ativas.

## Problemas encontrados

### P0

Nenhum.

### P1

Nenhum.

### P2

1. `docs/tasks/reports/007-relatorio.md` não existe.
2. `bun run lint` mantém 3 warnings já existentes de `<img>` nos componentes da landing page.
3. `withAuditory` foi criado de forma genérica com audit writer injetado, mas ainda não foi usado porque não há mutation admin nesta task.

## Riscos restantes

- As features de produtos, categorias, tags, site settings, media e audit log têm contracts e repositories, mas nem todas estão conectadas a controllers/pages porque isso não fazia parte desta task.
- `withLog` registra execução da feature da landing page no servidor. O log não inclui payload nem secrets, mas pode gerar ruído em ambiente com tráfego alto se não houver logger customizado.
- A home usa fallback estável quando a consulta de dados falha; observabilidade de falhas persistentes ainda deve ser tratada em etapa própria.

## Pode seguir para a próxima task?

Sim. Não há P0 ou P1 aberto, os comandos obrigatórios passaram e a landing page continuou respondendo com HTTP 200 sem mudança visual intencional.
