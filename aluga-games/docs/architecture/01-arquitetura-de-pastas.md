# 01 - Arquitetura de Pastas

## 1. Objetivo do documento

Este documento define a organização de pastas e responsabilidades do projeto Next.js da **AlugaGames**.

O objetivo é manter o sistema simples, rápido de desenvolver com IA/Codex e limpo o suficiente para crescer sem virar uma bagunça.

Este documento deve ser lido antes de qualquer task de implementação que envolva criação de rotas, componentes, banco de dados, autenticação, upload, painel administrativo ou regras de negócio.

Documentos relacionados:

- `/docs/product/00-visao-do-produto.md`
- `/docs/product/01-auditoria-site-atual.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`
- `/docs/architecture/00-stack-e-decisoes.md`

---

## 2. Premissas técnicas

O projeto já existe e usa:

- Next.js com App Router.
- Estrutura com `/src`.
- Site público e portal administrativo no mesmo projeto.
- Drizzle ORM.
- Clerk para autenticação do admin.
- Banco PostgreSQL.
- Upload de imagens em object storage, preferencialmente Railway Buckets se estiver disponível no projeto.

A arquitetura deve ser **simples**, não excessivamente DDD, mas ainda separando:

- Rotas.
- Componentes.
- Regras de negócio.
- Validações.
- Features de leitura.
- Mutations/actions.
- Banco de dados.
- Serviços externos.

---

## 3. Princípio central da arquitetura

A regra principal é:

> `src/app` organiza rotas e páginas. A lógica do produto fica fora de `src/app`.

Arquivos de página, como `page.tsx`, não devem conter regra de negócio complexa, SQL direto, validações extensas ou lógica de WhatsApp espalhada.

O fluxo padrão entre frontend e banco é:

```txt
frontend
  -> controller / action / route handler
    -> feature
      -> repositories pequenos
        -> db
```

Para casos extremamente simples e isolados, é aceitável:

```txt
frontend
  -> feature simples
    -> repository pequeno
      -> db
```

Essa exceção deve ser usada apenas quando não houver fluxo complexo, múltiplas etapas, decisão de resposta HTTP/frontend ou tratamento final de erro relevante.

As páginas devem:

1. Buscar dados por meio de controllers, Server Actions ou Route Handlers.
2. Renderizar componentes.
3. Encaminhar ações para Server Actions ou Route Handlers quando houver input do frontend.

O domínio deve:

1. Concentrar regras específicas de cada parte do produto.
2. Expor features, entidades, contratos, schemas, tipos, constantes e utilitários próprios.
3. Depender de contratos, não de implementações concretas de banco.
4. Evitar dependência circular entre módulos.

A infraestrutura deve:

1. Implementar contratos do domínio.
2. Concentrar acesso direto ao banco em repositórios.
3. Manter Drizzle fora de pages, componentes e features de domínio.

Componentes React devem ficar em `/src/components`. Features não devem criar subpastas `components/`; elas podem fornecer tipos e dados para componentes, mas a camada visual permanece centralizada em `/src/components`.

---

## 4. Estrutura geral recomendada

```txt
/src
  /app
    /(site)
    /(admin)
    /api
    layout.tsx
    globals.css

  /components
    /ui
    /layout
    /site
      /landing-page
    /admin
    /forms
    /feedback

  /domain
    /entities
    /contents
    /contracts
    /schemas
    /features
      helpers.ts
      list-public-products.ts
      list-active-categories.ts
      list-active-tags.ts
      retrieve-public-landing-page-content.ts
      retrieve-public-landing-page-rows.ts
      retrieve-fallback-landing-page.ts
      build-whatsapp-url.ts
      retrieve-static-whatsapp-message.ts

    /shared

  /controllers

  /infra
    /repositories

  /server
    /db
    /auth
    /storage

  /main
    /factories
      repositories.ts
      features.ts
      controller.ts

  /lib
    env.ts
    utils.ts
    slug.ts
    dates.ts
    constants.ts
```

---

## 5. Pasta `/src/app`

A pasta `/src/app` deve conter somente a estrutura de rotas, layouts e handlers HTTP.

Ela não deve virar a pasta principal de regra de negócio.

Páginas e layouts podem chamar controllers server-side, Server Actions ou Route Handlers equivalentes. Não devem importar repositórios concretos nem Drizzle.

### 5.1 Estrutura sugerida

```txt
/src/app
  layout.tsx
  globals.css

  /(site)
    layout.tsx
    page.tsx

    produtos
      page.tsx
      [slug]
        page.tsx

    fotografia
      page.tsx
      [slug]
        page.tsx

    representante-alugagames
      page.tsx

    porque-contratar
      page.tsx

  /(admin)
    admin
      layout.tsx
      page.tsx

      produtos
        page.tsx
        novo
          page.tsx
        [id]
          editar
            page.tsx

      categorias
        page.tsx

      tags
        page.tsx

      landing-page
        page.tsx

      fotografia
        page.tsx
        novo
          page.tsx
        [id]
          editar
            page.tsx

      depoimentos
        page.tsx

      faq
        page.tsx

      logos-clientes
        page.tsx

      configuracoes
        page.tsx

  /api
    uploads
      presign
        route.ts
    webhooks
      clerk
        route.ts
```

---

## 6. Route Groups

O projeto deve usar route groups para separar site público e admin sem mudar a URL final.

### 6.1 Site público

Tudo que estiver em:

```txt
/src/app/(site)
```

representa o site aberto ao público.

Exemplos de URLs finais:

```txt
/                       -> /src/app/(site)/page.tsx
/produtos               -> /src/app/(site)/produtos/page.tsx
/produtos/[slug]        -> /src/app/(site)/produtos/[slug]/page.tsx
/fotografia             -> /src/app/(site)/fotografia/page.tsx
/fotografia/[slug]      -> /src/app/(site)/fotografia/[slug]/page.tsx
/representante-alugagames
/por-que-contratar
```

### 6.2 Portal admin

Tudo que estiver em:

```txt
/src/app/(admin)/admin
```

representa o painel administrativo.

Exemplos de URLs finais:

```txt
/admin
/admin/produtos
/admin/produtos/novo
/admin/produtos/[id]/editar
/admin/categorias
/admin/tags
/admin/landing-page
/admin/fotografia
/admin/depoimentos
/admin/faq
/admin/logos-clientes
/admin/configuracoes
```

---

## 7. Pasta `/src/components`

A pasta `/src/components` deve conter componentes compartilhados, reutilizáveis e sem regra de negócio pesada.

Regra do projeto: **todo componente React fica dentro de `/src/components`**. Mesmo quando o componente é específico de uma feature de domínio, ele deve ser organizado em uma subpasta apropriada de `/src/components`, como `/components/site/landing-page`, `/components/site/products` ou `/components/admin/products`.

Rotas e páginas podem combinar dados vindos de `domain/features` com componentes de `/src/components`, e componentes podem receber DTOs/tipos vindos de `domain/entities`, mas não deve existir `/src/domain/features/*/components`.

```txt
/src/components
  /ui
  /layout
  /site
    /landing-page
  /admin
  /forms
  /feedback
```

### 7.1 `/components/ui`

Componentes base de interface, especialmente os vindos do `shadcn/ui` ou componentes genéricos.

Exemplos:

```txt
button.tsx
input.tsx
textarea.tsx
dialog.tsx
dropdown-menu.tsx
table.tsx
badge.tsx
card.tsx
alert.tsx
```

Regra:

> Componentes de `/components/ui` não devem conhecer AlugaGames, produtos, categorias ou admin.

### 7.2 `/components/layout`

Componentes estruturais compartilhados.

Exemplos:

```txt
site-header.tsx
site-footer.tsx
admin-sidebar.tsx
admin-header.tsx
mobile-menu.tsx
page-container.tsx
```

### 7.3 `/components/site`

Componentes específicos do site público, mas ainda relativamente genéricos.

Exemplos:

```txt
whatsapp-floating-button.tsx
section-heading.tsx
hero-shell.tsx
cta-section.tsx
empty-products-state.tsx
landing-page/
  landing-page.tsx
  hero-section.tsx
  featured-products-section.tsx
```

### 7.4 `/components/admin`

Componentes reutilizáveis do painel administrativo.

Exemplos:

```txt
admin-page-title.tsx
admin-stat-card.tsx
admin-table-actions.tsx
confirm-delete-dialog.tsx
status-badge.tsx
image-upload-field.tsx
```

### 7.5 `/components/forms`

Componentes reutilizáveis para formulários.

Exemplos:

```txt
form-field.tsx
slug-field.tsx
image-picker.tsx
rich-text-field.tsx
submit-button.tsx
```

---

## 8. Pasta `/src/domain`

A pasta `/src/domain` concentra regras, contratos e entidades do produto.

```txt
/src/domain
  /entities
  /contents
  /contracts
  /schemas
  /features
  /shared
```

### 8.1 `/domain/entities`

Entidades e DTOs de domínio usados por features, componentes e contratos.

Exemplos:

```txt
landing-page.ts
index.ts
```

Crie novos arquivos de entidade apenas quando houver DTOs ou tipos compartilhados por mais de uma feature, contrato ou componente.

### 8.2 `/domain/contents`

Conteúdos estáveis de domínio, como fallback público da landing page, ficam em `/src/domain/contents`.

Regras:

- Não acessar banco.
- Não importar componentes React.
- Não inventar clientes, depoimentos ou produtos reais.
- Não conter regra de fluxo; apenas conteúdo estruturado de domínio.

### 8.3 `/domain/contracts`

Contratos que descrevem dependências externas necessárias ao domínio, especialmente repositórios.

Exemplo:

```ts
export type FindActiveLandingPageBlocks = () => Promise<LandingPageBlockRow[]>;

export type FindActiveBlockItemsByBlockIds = (
  blockIds: string[],
) => Promise<LandingPageBlockItemRow[]>;

export type LandingPageRepositories = {
  findActiveLandingPageBlocks: FindActiveLandingPageBlocks;
  findActiveBlockItemsByBlockIds: FindActiveBlockItemsByBlockIds;
};
```

### 8.4 `/domain/schemas`

Schemas compartilhados de validação ficam em `/src/domain/schemas` quando o
fluxo realmente exigir reuso entre controller/action e UI.

Regras:

- Não criar `schemas.ts` dentro de subpasta de feature.
- Não criar pasta por feature dentro de `/src/domain/features`.
- Schemas locais demais podem ficar junto do controller/action que os usa.
- Tipos de input/output da feature continuam no arquivo da própria feature.

### 8.5 `/domain/features`

A pasta `/src/domain/features` concentra casos de uso e funcionalidades do produto.

Cada feature deve ser um arquivo:

```txt
/src/domain/features/retrieve-public-landing-page-content.ts
/src/domain/features/retrieve-public-landing-page-rows.ts
/src/domain/features/list-public-products.ts
/src/domain/features/build-whatsapp-url.ts
/src/domain/features/helpers.ts
/src/domain/features/public-catalog-helpers.ts
```

Regra: **não criar pasta por feature dentro de `/src/domain/features`**. Cada arquivo de feature representa uma operação nomeada por verbo de ação, não uma entidade genérica.

Verbos obrigatórios:

- `retrieve` para recuperar um item, configuração ou fluxo composto de leitura.
- `list` para coleções.
- `record` para auditoria, tracking e eventos.
- `build` para montagem pura.
- `insert`, `update` e `delete` para mutações persistentes.

Não criar arquivos como `products.ts`, `categories.ts`, `landing-page.ts` ou `whatsapp.ts`. Use nomes como `list-public-products.ts`, `retrieve-public-product-by-slug.ts`, `retrieve-public-landing-page-content.ts` ou `build-whatsapp-url.ts`.

Helpers compartilhados ficam em arquivos coesos de helper dentro de `/src/domain/features`. Use `helpers.ts` para helpers gerais/landing/WhatsApp e um helper nomeado pelo domínio quando o conjunto crescer, como `public-catalog-helpers.ts`. Funções auxiliares pequenas, como checagem de env, extração de ids, normalização simples e montagem pura, ficam em helper quando forem compartilhadas por features.

Não transforme helper em feature escondida. Helper não chama repository, não acessa banco e não decide fluxo de I/O.

Features de domínio não devem importar Drizzle, `db` ou schema de banco diretamente. Quando precisarem de persistência, devem receber contratos de repositório por parâmetro.

Features representam ações de negócio ou operações relevantes. Elas podem chamar um ou mais repositórios, transformar rows em entidades/DTOs, normalizar dados, aplicar fallback, validar regras e tratar erros esperados. Elas não devem decidir resposta HTTP, virar endpoint nem coordenar fluxos grandes que pertençam a um controller/action.

Tipos de input/output da feature devem ficar no próprio arquivo da feature. Contratos de repository ficam em `/src/domain/contracts`. Entidades não devem carregar tipos de input de feature ou repository.

Factories de feature usam o verbo `setup`, por exemplo:

```ts
setupRetrievePublicLandingPageContentFeature();
setupListPublicProductsFeature();
setupRecordAdminAuditLogFeature();
```

Não usar `create*Feature` para composição de feature. `create` fica reservado para regra de domínio que realmente cria entidade/registro.

### 8.6 Padrão de uma feature

Exemplo com produtos:

```txt
/src/domain/features/list-public-products.ts
```

Responsabilidades:

- Feature file: uma operação de leitura/processamento, tipos de input/output e composição de wrappers `raw`/`stable`.
- `/src/domain/contracts`: contratos de repositories usados pela feature.
- `/src/domain/features/helpers.ts` ou helper específico, como `public-catalog-helpers.ts`: funções puras e pequenas, sem imports de dependências. Helpers fazem mapeamentos, filtros e formatações simples; regra/processamento real fica na feature.

Toda feature que pode falhar por I/O deve expor `raw` e `stable` quando for setupada:

```ts
const listPublicProductsFeature = setupListPublicProductsFeature({
  repositories: productRepositories,
});

await listPublicProductsFeature.raw();
await listPublicProductsFeature.stable();
```

`raw` propaga erro. `stable` converte erro em `StableDomainResult` para controllers, actions ou páginas aplicarem fallback de forma explícita.

Componentes relacionados a uma feature devem ser criados em `/src/components`, por exemplo:

```txt
/src/components/site/products
  product-card.tsx
  product-gallery.tsx
  product-filters.tsx

/src/components/admin/products
  product-form.tsx
  product-status-badge.tsx
```

### 8.7 `/domain/shared`

Wrappers e helpers transversais de domínio ficam em `/src/domain/shared`.

Exemplos:

```txt
to-stable.ts
unwrap.ts
with-log.ts
with-auth.ts
with-auditory.ts
```

Regras:

- `withAuth` usa `requireAdmin()` e só deve ser aplicado em features admin-facing.
- Features públicas não usam `withAuth`.
- `toStable` não substitui `ActionResult` em Server Actions.
- `withLog` não deve logar payloads grandes, secrets ou dados sensíveis.
- `withAuditory` deve depender de função/repository injetado para gravar auditoria, nunca de `db` direto dentro da feature.

---

## 9. Features do sistema

## 9.1 Produtos do catálogo

Responsável por produtos do catálogo.

Features atuais e previstas:

- `/src/domain/features/list-public-products.ts`
- `/src/domain/features/retrieve-public-product-by-slug.ts`
- `/src/domain/features/list-featured-products.ts`
- `/src/domain/features/list-related-products.ts`
- futuras mutações: `insert-product.ts`, `update-product.ts`, `delete-product.ts` ou `deactivate-product.ts`

Componentes de produto devem ficar em `/src/components/site/products` quando forem públicos e em `/src/components/admin/products` quando forem administrativos.

Regras:

- Produto não deve exibir preço público.
- Produto pode ter status ativo, inativo ou indisponível.
- Produto pode pertencer a múltiplas categorias.
- Produto pode ter múltiplas tags.
- Produto pode ter múltiplas imagens.
- Produto pode ter vídeo por URL externa.
- Produto pode aparecer na LP como destaque.

---

## 9.2 Categorias

Responsável pelas categorias usadas nos filtros da página de produtos.

Feature atual: `/src/domain/features/list-active-categories.ts`.

Mutações futuras devem usar nomes de ação, como `insert-category.ts`, `update-category.ts` e `delete-category.ts`.

Componentes de categoria devem ficar em `/src/components/site/categories` quando forem públicos e em `/src/components/admin/categories` quando forem administrativos.

Regras:

- Categorias são editáveis pelo admin.
- Categorias servem para filtro e organização.
- Categorias não criam páginas públicas separadas no modelo atual.
- A página `/produtos` continua sendo a listagem única do catálogo.

---

## 9.3 Tags

Responsável por tags de busca, contexto e segmentação.

Feature atual: `/src/domain/features/list-active-tags.ts`.

Mutações futuras devem usar nomes de ação, como `insert-tag.ts`, `update-tag.ts` e `delete-tag.ts`.

Componentes de tags devem ficar em `/src/components/site/tags` quando forem públicos e em `/src/components/admin/tags` quando forem administrativos.

Regras:

- Tags são editáveis pelo admin.
- Tags ajudam filtros e pesquisa.
- Tags podem indicar tipo de evento, público ou contexto.

Exemplos:

```txt
corporativo
festa infantil
adulto
escolar
condomínio
realidade virtual
infláveis
mais procurado
```

---

## 9.4 Lista de produtos para WhatsApp

Responsável pela lista simples de produtos que o visitante pode enviar ao WhatsApp.

Apesar de poder parecer um carrinho, esta feature não representa compra, checkout, pedido ou orçamento formal dentro do sistema.

Features futuras devem ser nomeadas por ação, como `build-whatsapp-product-list-message.ts` e `persist-local-quote-list.ts` quando necessário.

Componentes da lista para WhatsApp devem ficar em `/src/components/site/quote-list`.

Regras:

- A lista fica no client, preferencialmente em `localStorage`.
- O visitante pode adicionar produtos.
- O visitante pode remover produtos.
- O visitante pode alterar quantidade.
- O visitante pode enviar a lista para WhatsApp.
- Nenhum pedido é salvo no banco.
- Nenhum usuário público é criado.
- Nenhum pagamento existe.

Mensagem esperada no WhatsApp:

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre estes produtos:

- Produto 1 — quantidade: 1
- Produto 2 — quantidade: 2

Pode me passar mais informações?
```

---

## 9.5 Landing page

Responsável pelos blocos editáveis da LP.

Features atuais:

- `/src/domain/features/retrieve-public-landing-page-content.ts`
- `/src/domain/features/retrieve-public-landing-page-rows.ts`
- `/src/domain/features/retrieve-fallback-landing-page.ts`

Mutações futuras devem usar nomes de ação, como `update-landing-page-block.ts`, `reorder-landing-page-block-items.ts` e `update-landing-page-featured-products.ts`.

Componentes públicos da landing page devem ficar em `/src/components/site/landing-page`. Componentes administrativos para edição dos blocos devem ficar em `/src/components/admin/landing-page`.

Regras:

- A LP deve ser editável por blocos controlados.
- Não será criado um page builder livre.
- O admin pode editar textos, imagens, produtos destacados, depoimentos, FAQs, logos e visibilidade dos blocos.
- Alguns blocos podem ser ocultados/exibidos.
- A estrutura visual final continua controlada pelo código.

Blocos previstos:

```txt
hero
logos_clientes
por_que_escolher
produtos_destaque
como_funciona
depoimentos
galeria_eventos
faq
cta_final
```

---

## 9.6 Fotografia

Responsável pela página de fotografia e álbuns de eventos.

Features futuras devem usar nomes de ação, como `list-public-gallery-albums.ts`, `retrieve-public-gallery-album.ts`, `insert-gallery-album.ts` e `update-gallery-photo.ts`.

Componentes de fotografia devem ficar em `/src/components/site/photography` quando forem públicos e em `/src/components/admin/photography` quando forem administrativos.

Regras:

- A fotografia existe como registro visual dos produtos e eventos da AlugaGames.
- O admin cria álbuns.
- Cada álbum pode ter nome do evento, tipo de evento, data opcional, cidade opcional e fotos.
- O visitante pode pesquisar/filtrar eventos.
- Fotos não precisam de título ou descrição individual.

---

## 9.7 Depoimentos

Responsável por depoimentos exibidos na LP.

Features futuras devem usar nomes de ação, como `list-active-testimonials.ts`, `insert-testimonial.ts` e `update-testimonial.ts`.

Componentes de depoimentos devem ficar em `/src/components/site/testimonials` quando forem públicos e em `/src/components/admin/testimonials` quando forem administrativos.

Regras:

- Depoimentos são editáveis pelo admin.
- Depoimentos podem ser ocultados/exibidos.
- Depoimentos podem aparecer na LP.

---

## 9.8 FAQ

Responsável por perguntas frequentes.

Features futuras devem usar nomes de ação, como `list-active-faqs.ts`, `insert-faq.ts` e `update-faq.ts`.

Componentes de FAQ devem ficar em `/src/components/site/faq` quando forem públicos e em `/src/components/admin/faq` quando forem administrativos.

Regras:

- FAQs são editáveis pelo admin.
- FAQs podem ser ocultadas/exibidas.
- FAQs aparecem principalmente na LP.

---

## 9.9 Logos de clientes

Responsável por logos de empresas/clientes atendidos.

Features futuras devem usar nomes de ação, como `list-active-client-logos.ts`, `insert-client-logo.ts` e `update-client-logo.ts`.

Componentes de logos de clientes devem ficar em `/src/components/site/client-logos` quando forem públicos e em `/src/components/admin/client-logos` quando forem administrativos.

Regras:

- Logos são editáveis pelo admin.
- Logos podem ser ocultados/exibidos.
- Logos podem aparecer na LP como prova social.

---

## 9.10 WhatsApp

Responsável por montar URLs e mensagens de WhatsApp.

Features atuais e helpers:

- `/src/domain/features/build-whatsapp-url.ts`
- `/src/domain/features/retrieve-static-whatsapp-message.ts`
- `/src/domain/features/helpers.ts`

Regras:

- Todo CTA de WhatsApp deve usar funções centralizadas.
- Não espalhar links de WhatsApp hardcoded pelo projeto.
- O número principal deve vir de configuração do site.
- A mensagem muda conforme origem:
  - Produto individual.
  - Lista de produtos.
  - Trabalhe conosco.
  - CTA geral.

---

## 9.11 Analytics e tracking

Responsável por estatísticas simples e registro de cliques em WhatsApp.

Features futuras devem usar nomes de ação, como `record-whatsapp-click.ts`, `list-admin-dashboard-metrics.ts` e `retrieve-whatsapp-click-summary.ts`.

Componentes de analytics e métricas administrativas devem ficar em `/src/components/admin/analytics` ou em `/src/components/admin/dashboard`, conforme o contexto de uso.

Regras:

- O dashboard pode mostrar totais simples.
- O sistema pode registrar cliques em WhatsApp.
- O registro de clique não deve bloquear abertura do WhatsApp.
- Falha ao registrar clique não deve impedir conversão.

Métricas previstas:

```txt
total_produtos
produtos_ativos
produtos_indisponiveis
produtos_destaque
total_fotos
total_albuns
total_categorias
total_tags
total_depoimentos
total_faqs
cliques_whatsapp_geral
cliques_whatsapp_produto
cliques_whatsapp_lista
```

---

## 9.12 Configurações do site

Responsável por configurações globais do site.

Feature atual: `/src/domain/features/retrieve-site-setting.ts`.

Mutações futuras devem usar nomes de ação, como `update-site-setting.ts` e `update-whatsapp-setting.ts`.

Componentes de configurações do site devem ficar em `/src/components/admin/site-settings`.

Configurações previstas:

```txt
whatsapp_number
instagram_url
email
phone
address
seo_default_title
seo_default_description
```

---

## 10. Pasta `/src/infra`

A pasta `/src/infra` contém implementações concretas de contratos do domínio.

```txt
/src/infra
  /repositories
```

Regras:

- Todo acesso direto ao banco com Drizzle deve ficar em `/src/infra/repositories`.
- Repositórios implementam contratos definidos em `/src/domain/contracts`.
- Repositórios podem importar `@/server/db` e `@/server/db/schema`.
- Repositórios devem usar `server-only`.
- Cada método de repository deve executar uma ação de banco pequena e objetiva.
- Arquivos de repository são agrupados por entidade/domínio, como `drizzle-product-repository.ts`; não criar um arquivo físico para cada método do contrato.
- Repository não chama outro repository nem método auxiliar que execute uma segunda ação de banco para montar retorno final.
- Se precisar coordenar várias queries ou repositories, crie/ajuste uma feature e injete as dependências necessárias.
- Repositórios podem aplicar filtros básicos de banco, como `isActive`, `deletedAt`, `status`, `limit` e `orderBy`.
- Repositórios devem retornar dados crus ou quase crus do banco.
- Repositórios não devem importar componentes React.
- Repositórios não devem conhecer fallback visual/copy padrão; isso pertence aos casos de uso em `domain/features`.
- Repositórios não devem montar DTO final de tela, normalizar URL para exibição, aplicar regra de fallback, controlar fluxo da aplicação, tratar erro de negócio ou chamar várias consultas para montar uma feature inteira.
- Erros de banco podem subir para a feature ou controller/action. Repositórios pequenos não precisam converter erro de banco em erro de negócio.

Exemplo:

```txt
/src/domain/contracts/landing-page-repositories.ts
/src/infra/repositories/drizzle-landing-page-repository.ts
```

Exemplos de métodos adequados:

```txt
findActiveLandingPageBlocks()
findActiveBlockItemsByBlockIds(blockIds)
findFeaturedProducts()
findActiveClientLogos()
findActiveTestimonials()
findActiveFaqs()
findGalleryPreview()
findSiteSettingByKey(key)
```

---

## 10.1 Pasta `/src/controllers`

Controllers server-side ficam em:

```txt
/src/controllers
```

Eles são a fronteira padrão entre frontend e features quando uma página, Server Component, Server Action ou Route Handler precisa buscar ou alterar dados.

Responsabilidades:

- Receber input vindo do frontend quando aplicável.
- Fazer parsing/validação inicial quando aplicável.
- Chamar a feature correta.
- Controlar o fluxo principal da operação.
- Tratar o erro final e devolver resposta previsível.
- Respeitar autenticação/autorização quando a operação exigir.

Controllers não devem importar Drizzle, `@/server/db`, schema de banco, repositories concretos ou factories de feature. Também não devem concentrar consulta SQL nem regra de transformação detalhada que pertença à feature.

Controllers recebem dependências por injeção:

```ts
export async function retrievePublicLandingPageDataController({
  retrieveFallbackLandingPage,
  retrievePublicLandingPageContentStable,
}: RetrievePublicLandingPageDataControllerInput) {
  // organiza o fluxo e aplica fallback final
}
```

Se uma feature `stable` já for suficiente para uma página simples, a página pode consumir a feature setupada em `src/main/factories/features.ts` diretamente. Use controller quando houver orquestração de fluxo, fallback final, validação de entrada, resposta padronizada ou composição entre múltiplas operações.

---

## 10.2 Pasta `/src/main/factories`

`src/main/factories` é o composition root do projeto. É o único lugar onde implementações concretas são instanciadas e ligadas às features/controllers.

Estrutura obrigatória:

```txt
/src/main/factories
  repositories.ts
  features.ts
  controller.ts
```

Responsabilidades:

- `repositories.ts`: instancia repositories concretos, como `new DrizzleProductRepository()`.
- `features.ts`: chama `setup*Feature()` injetando repositories ou outras funções.
- `controller.ts`: expõe controllers já montados para páginas, Server Components, Actions ou Route Handlers.

Regras:

- Não instanciar repository dentro de controller, page, action, route handler ou feature.
- Não chamar `setup*Feature()` fora de `src/main/factories/features.ts`, salvo teste isolado.
- Não exportar instâncias concretas a partir de `/src/infra/repositories/index.ts`; esse barrel pode exportar classes, não objetos prontos.
- Factories de feature usam `setup*Feature`, nunca `create*Feature`.

Exemplo:

```ts
export const retrievePublicLandingPageRowsFeature =
  setupRetrievePublicLandingPageRowsFeature({
    repositories: landingPageRepositories,
  });
```

---

## 11. Pasta `/src/server`

A pasta `/src/server` concentra código que só pode rodar no servidor.

```txt
/src/server
  /db
  /auth
  /storage
```

Nenhum arquivo dessa pasta deve ser importado por Client Components.

Sempre que possível, usar `server-only` em arquivos críticos para impedir importação acidental no client.

---

## 11.1 `/src/server/db`

Responsável pela conexão com banco, schema Drizzle e migrations.

Estrutura sugerida:

```txt
/src/server/db
  index.ts
  schema.ts
  relations.ts
  migrations
```

Responsabilidades:

- Criar client do Drizzle.
- Exportar schema.
- Exportar relações.
- Centralizar conexão PostgreSQL.

Regras:

- SQL/Drizzle direto deve ficar em `/src/infra/repositories`, exceto scripts internos de banco como seed, migrations e configuração do Drizzle.
- Features de domínio, páginas e componentes não devem importar `@/server/db` nem tabelas de `@/server/db/schema`.
- Componentes React não devem executar Drizzle diretamente.
- Nunca expor credenciais do banco para o client.

---

## 11.2 `/src/server/auth`

Responsável por autenticação e autorização do admin usando Clerk.

Estrutura sugerida:

```txt
/src/server/auth
  require-admin.ts
  current-admin.ts
  owner-access.ts
```

Responsabilidades:

- Verificar se existe usuário autenticado.
- Verificar se o usuário é o dono autorizado.
- Bloquear actions administrativas para usuários não autorizados.
- Evitar confiar apenas na proteção visual do painel.

Regra central:

> Toda Server Action administrativa deve chamar `requireAdmin()` antes de alterar dados.

Como só existirá um usuário, o acesso deve ser controlado exclusivamente por allowlist de `userId` do Clerk na variável `CLERK_ADMIN_USER_IDS`.

Exemplo conceitual:

```ts
await requireAdmin();
```

Não basta esconder o menu ou proteger a página. A autorização precisa acontecer no servidor antes de qualquer mutação.

---

## 11.3 `/src/server/storage`

Responsável pelo upload, remoção e assinatura de URLs de imagens.

Estrutura sugerida:

```txt
/src/server/storage
  client.ts
  upload.ts
  delete.ts
  presigned-url.ts
```

Recomendação para este projeto:

> Usar Railway Buckets se estiver disponível no projeto, pois é object storage compatível com S3 e mantém a infraestrutura concentrada na Railway.

Não recomendado:

```txt
Salvar imagens enviadas pelo admin diretamente dentro do repositório ou no filesystem efêmero da aplicação Next.js.
```

Volumes da Railway podem ser úteis para persistência de arquivos em serviços específicos, mas para imagens públicas, uploads de usuários e assets gerenciáveis, object storage é a opção mais adequada.

Regras:

- Validar tipo do arquivo.
- Validar tamanho.
- Normalizar nome.
- Nunca confiar no nome original.
- Salvar no banco apenas URL/metadados.
- Evitar expor bucket privado diretamente se não for necessário.
- Preferir upload via presigned URL ou endpoint controlado.

---

## 11. Pasta `/src/lib`

A pasta `/src/lib` deve conter utilitários genéricos, sem dependência forte de features.

```txt
/src/lib
  env.ts
  utils.ts
  slug.ts
  dates.ts
  constants.ts
```

### 11.1 `env.ts`

Responsável por validar variáveis de ambiente.

Deve validar, no mínimo:

```txt
DATABASE_URL
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_ADMIN_USER_IDS
WHATSAPP_DEFAULT_NUMBER
STORAGE_ENDPOINT
STORAGE_ACCESS_KEY_ID
STORAGE_SECRET_ACCESS_KEY
STORAGE_BUCKET_NAME
```

### 11.2 `slug.ts`

Responsável por gerar slugs limpos para produtos, álbuns e páginas.

### 11.3 `dates.ts`

Responsável por formatação de datas.

### 11.4 `utils.ts`

Utilitários pequenos e genéricos.

Não deve virar depósito de qualquer função aleatória.

---

## 12. Server Actions e Route Handlers

## 12.1 Server Actions

Server Actions devem ser usadas para mutações administrativas ligadas a formulários e operações internas.

Exemplos:

```txt
createProductAction
updateProductAction
deactivateProductAction
deleteProductAction
createCategoryAction
updateCategoryAction
updateLandingPageBlockAction
createPhotographyAlbumAction
updateSiteSettingsAction
```

Regras:

- Toda action administrativa deve chamar `requireAdmin()`.
- Toda action deve validar input com Zod.
- Toda action deve tratar erros previsíveis.
- Toda action deve retornar resultado claro para UI.
- Toda action que altera dados importantes deve atualizar `updatedAt`.
- Toda action deve invalidar cache quando necessário.

Exemplo de retorno:

```ts
type ActionResult<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | {
      ok: false;
      code: string;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
```

## 12.2 Route Handlers

Route Handlers devem ser usados quando houver necessidade de endpoint HTTP.

Exemplos:

```txt
/api/uploads/presign
/api/webhooks/clerk
/api/whatsapp-clicks
```

Usar Route Handler para:

- Upload/presigned URL.
- Webhook.
- Registro simples de clique, se for chamado pelo client.
- Integração externa.

Não criar API route para tudo se uma Server Action resolver melhor.

---

## 13. Client Components

Client Components devem ser usados somente quando necessário.

Casos em que são necessários:

- Filtros interativos de produtos.
- Drawer da lista de produtos.
- LocalStorage.
- Formulários com estado rico.
- Upload com preview.
- Carrossel/galeria interativa.
- Menus mobile.

Regras:

- Não importar Drizzle, `@/server/db` ou schema de banco em Client Components.
- Não importar funções server-only.
- Não acessar segredo/variável privada no client.
- Componentes client devem receber dados já filtrados ou serializáveis.

---

## 14. Organização dos dados públicos

O site público deve priorizar Server Components sempre que possível.

Exemplos:

```txt
LP -> Server Component buscando blocos ativos da LP.
Página de produtos -> Server Component buscando produtos e filtros iniciais.
Página de produto -> Server Component buscando produto por slug.
Página de fotografia -> Server Component buscando álbuns publicados.
```

Interações como filtros podem ser:

1. Server-side via search params.
2. Client-side com estado local.
3. Híbridas, dependendo da complexidade.

Para SEO, a busca inicial deve funcionar por URL/search params sempre que possível.

Exemplo:

```txt
/produtos?categoria=realidade-virtual&publico=corporativo
```

---

## 15. Separação entre público e admin

## 15.1 Público

O site público pode ler somente dados ativos/publicados.

Exemplos:

- Produtos ativos.
- Categorias ativas.
- Tags ativas.
- Blocos visíveis da LP.
- Depoimentos visíveis.
- FAQs visíveis.
- Álbuns publicados.

## 15.2 Admin

O admin pode ler dados ativos, inativos, indisponíveis, ocultos e rascunhos.

Exemplos:

- Produtos desativados.
- Produtos indisponíveis.
- Blocos ocultos da LP.
- Álbuns não publicados.
- FAQs ocultas.
- Logos ocultos.

Regra:

> Nunca usar a mesma feature pública para a visão administrativa se isso limitar o controle do dono.

---

## 16. Convenções de nome

## 16.1 Arquivos

Usar kebab-case:

```txt
product-card.tsx
product-form.tsx
quote-list-drawer.tsx
require-admin.ts
site-settings-form.tsx
```

## 16.2 Componentes React

Usar PascalCase:

```txt
ProductCard
ProductForm
QuoteListDrawer
SiteSettingsForm
```

## 16.3 Funções

Usar camelCase:

```txt
getActiveProducts
createProductAction
buildProductWhatsAppMessage
requireAdmin
```

## 16.4 Tabelas do banco

Usar snake_case ou nomes consistentes com o padrão escolhido no Drizzle.

Sugestão:

```txt
products
categories
tags
product_categories
product_tags
product_images
landing_page_blocks
photography_albums
photography_album_images
testimonials
faqs
client_logos
site_settings
whatsapp_click_events
```

---

## 17. Padrão de criação de uma nova feature

Ao criar uma nova feature, seguir este fluxo:

1. Criar arquivo em `/src/domain/features/[nome].ts`.
2. Criar entidades compartilhadas em `/src/domain/entities` quando houver modelo de domínio reutilizável.
3. Criar contratos em `/src/domain/contracts` se a feature precisar de banco, storage ou integração externa.
4. Criar implementação em `/src/infra/repositories` se houver acesso direto ao banco.
5. Criar controller em `/src/controllers` ou Server Action/Route Handler equivalente quando a feature for exposta ao frontend.
6. Declarar input/output da feature no próprio arquivo da feature.
7. Criar schemas em arquivo separado somente se o fluxo realmente exigir validação compartilhada.
8. Criar Server Actions separadas somente quando a task pedir mutação exposta ao frontend.
9. Criar componentes específicos em `/src/components/[area]/[contexto]`.
10. Conectar a rota em `/src/app` ao controller/action, não ao repository.
11. Atualizar documentação se necessário.

Exemplo:

```txt
/src/domain/features/depoimentos.ts

/src/domain/entities/testimonial.ts

/src/domain/contracts/testimonial-repositories.ts

/src/infra/repositories/drizzle-testimonial-repository.ts

/src/controllers/testimonial-controller.ts

/src/components/site/testimonials
  testimonial-card.tsx

/src/components/admin/testimonials
  testimonial-form.tsx
```

---

## 18. O que não fazer

Evitar:

```txt
/src/app/admin/produtos/page.tsx com 500 linhas
SQL direto dentro de componente React
fetch hardcoded para rotas internas sem necessidade
link de WhatsApp espalhado em vários arquivos
lógica de autenticação copiada em várias actions
validação só no client
upload sem validação de MIME/tamanho
salvar imagem no repositório
page builder livre
permissão baseada apenas em esconder botão
```

---

## 19. Decisões específicas para este projeto

## 19.1 Arquitetura simples, não DDD completo

Este projeto não deve usar uma arquitetura DDD pesada com `domain`, `application`, `infrastructure` e `presentation` para cada módulo.

A escolha recomendada é:

```txt
domain + infra + server + components
```

Motivo:

- Menos arquivos.
- Mais rápido para IA implementar.
- Mais fácil de manter no prazo de 8 dias.
- Ainda preserva separação de responsabilidade.

## 19.2 Clerk como autenticação do admin

O admin deve passar por Clerk.

Além do login, o sistema deve garantir que somente o dono autorizado consiga acessar e alterar dados.

Regras:

- Proteger rotas `/admin`.
- Validar admin no servidor em todas as mutations.
- Usar allowlist por `CLERK_ADMIN_USER_IDS`.
- Não permitir cadastro público de usuários administrativos.

## 19.3 Railway Buckets para imagens

Como o projeto está pensado para Railway, a recomendação é usar **Railway Buckets** para upload de imagens, se disponível.

Motivo:

- É object storage.
- É compatível com S3.
- Evita depender do filesystem da aplicação.
- Mantém a infraestrutura em um lugar só.
- Serve melhor para uploads, fotos de produtos, galerias e logos.

Alternativas aceitáveis:

```txt
Cloudflare R2
Supabase Storage
AWS S3
```

Não recomendado para produção:

```txt
Salvar uploads localmente dentro do Next.js.
```

## 19.4 Drizzle como ORM

O projeto deve usar Drizzle para schema, repositories e migrations.

A conexão deve ficar centralizada em:

```txt
/src/server/db
```

O acesso direto ao banco deve ficar em:

```txt
/src/infra/repositories
```

Features de domínio devem depender de contratos de `/src/domain/contracts`, não de Drizzle, `db` ou schema.

## 19.5 Server Actions por padrão

Para o admin, usar Server Actions por padrão em formulários e mutações.

Route Handlers ficam reservados para upload, webhooks e chamadas que realmente precisam ser endpoints HTTP.

---

## 20. Critérios de aceite deste documento

A arquitetura está correta quando:

- O site público está separado do admin por route groups.
- O admin fica protegido por Clerk.
- Regras de negócio não ficam espalhadas em `page.tsx`.
- Drizzle fica centralizado em `/src/server/db`.
- Frontend conversa por controller, Server Action ou Route Handler.
- Features montam regras, transformações, fallbacks e DTOs.
- Actions/features usam repositórios pequenos em `/src/infra/repositories` quando precisam acessar banco.
- Contratos de persistência ficam em `/src/domain/contracts`.
- Upload fica centralizado em `/src/server/storage`.
- WhatsApp fica centralizado em `build-whatsapp-url.ts`, `retrieve-static-whatsapp-message.ts` e helpers compartilhados.
- Produtos, categorias, tags, LP e fotografia ficam em features nomeadas por ação.
- Client Components são usados somente quando necessário.
- O projeto continua simples o suficiente para ser entregue dentro do prazo.

---

## 21. Prompt recomendado para IA/Codex

Ao implementar qualquer task que envolva estrutura de pastas, usar este prompt:

```md
Leia os documentos:

- /docs/product/00-visao-do-produto.md
- /docs/product/02-escopo-do-produto.md
- /docs/product/03-regras-de-negocio.md
- /docs/product/04-user-stories.md
- /docs/architecture/00-stack-e-decisoes.md
- /docs/architecture/01-arquitetura-de-pastas.md

Implemente somente a task solicitada.

Regras:

- Use a arquitetura simples baseada em /src/app, /src/domain, /src/infra, /src/components, /src/server e /src/lib.
- Não coloque regra de negócio complexa em page.tsx.
- Use controller, Server Action ou Route Handler como fronteira principal com o frontend.
- Não crie componentes dentro de features; componentes React ficam em /src/components.
- Não importe Drizzle, @/server/db ou schema de banco em componentes, páginas ou features de domínio.
- Se uma feature precisar acessar banco, crie contrato em /src/domain/contracts e métodos pequenos em /src/infra/repositories.
- Não faça repository montar DTO final de tela, fallback, normalização visual ou fluxo de aplicação.
- Toda mutação administrativa precisa validar autenticação e autorização no servidor.
- Use Server Actions para mutações administrativas, salvo quando Route Handler for mais adequado.
- Centralize links e mensagens de WhatsApp em /src/domain/features/build-whatsapp-url.ts, /src/domain/features/retrieve-static-whatsapp-message.ts e /src/domain/features/helpers.ts.
- Centralize upload em /src/server/storage.
- Não crie page builder livre.
- Não implemente funcionalidades fora do escopo.

No final, liste:

1. Arquivos criados/alterados.
2. Decisões tomadas.
3. Como testar manualmente.
4. Pendências ou riscos.
```
