# 05 — Contratos de Actions e APIs

## 1. Objetivo do documento

Este documento define os contratos das **Server Actions**, **features server-side**, **Route Handlers**, helpers e integrações internas do novo site da **AlugaGames**.

O objetivo é evitar que a IA/Codex crie endpoints, actions e formatos de dados aleatórios durante a implementação.

Este documento deve ser lido antes de qualquer task envolvendo:

- CRUD administrativo.
- Página pública de produtos.
- Página individual de produto.
- Lista simples de produtos para WhatsApp.
- Upload de imagens.
- Landing page editável.
- Fotografia/álbuns.
- Depoimentos.
- FAQs.
- Logos de clientes.
- Configurações do site.
- Tracking de cliques no WhatsApp.
- Dashboard administrativo.

Documentos relacionados:

- `/docs/product/00-visao-do-produto.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`
- `/docs/architecture/00-stack-e-decisoes.md`
- `/docs/architecture/01-arquitetura-de-pastas.md`
- `/docs/architecture/02-modelo-de-dominio.md`
- `/docs/architecture/03-banco-de-dados.md`
- `/docs/architecture/04-rotas-e-navegacao.md`

---

# 2. Decisão principal

O projeto deve usar uma arquitetura simples:

```txt
frontend
  -> controller / action / route handler
    -> feature
      -> repositories pequenos
        -> db
```

Para casos extremamente simples e isolados, pode existir:

```txt
frontend
  -> feature simples
    -> repository pequeno
      -> db
```

Essa exceção só vale quando a operação não tiver fluxo complexo, múltiplas etapas, resposta HTTP/frontend especial, autenticação/autorização relevante ou tratamento final de erro que mereça controller/action.

Regras gerais:

1. **Controllers, Server Actions ou Route Handlers** são a fronteira principal com o frontend.
2. **Features** em `domain/features` executam a operação de negócio, transformam dados e montam DTOs.
3. **Repositórios pequenos** em `infra/repositories` encapsulam o acesso direto ao banco com Drizzle.
4. **Server Actions** são preferenciais para mutações administrativas.
5. **Route Handlers** ficam para upload, tracking, webhooks e endpoints HTTP reais.
6. **Helpers puros** centralizam mapeamentos, filtros e formatações simples, sem importar dependências.
7. **Client Components** ficam apenas para interação visual, formulários, filtros, drawers e estados locais.

A IA não deve criar API REST para todo CRUD se uma Server Action resolver melhor.

---

# 3. Onde cada tipo de contrato deve ficar

## 3.0 Fluxo entre camadas

Controllers, Server Actions e Route Handlers devem controlar a entrada e saída da operação. Eles recebem input do frontend, validam/parsam quando aplicável, chamam a feature correta, tratam erro final e retornam resposta padronizada.

Features representam uma ação de negócio. Elas podem chamar múltiplos repositórios, transformar rows em entidades/DTOs, normalizar dados, aplicar fallback, validar regras da operação e tratar erros esperados. A montagem final de DTO de tela fica na feature, não no repository.

Repositories executam consultas e mutations pequenas. Cada método deve representar uma ação objetiva de banco, aplicar filtros básicos e retornar dados crus ou quase crus. Erros de banco podem subir para feature/controller; repository pequeno não precisa tratar erro de negócio.

Conteúdos fallback estáveis ficam em `/src/domain/contents`. Features podem consumi-los, mas o fallback não deve ficar dentro do repository nem duplicado dentro da feature.

## 3.1 Features de leitura

Features de leitura ficam em arquivos diretos:

```txt
/src/domain/features/[verbo]-[contexto].ts
```

Exemplos:

```txt
/src/domain/features/list-public-products.ts
/src/domain/features/list-active-categories.ts
/src/domain/features/retrieve-public-landing-page-content.ts
/src/domain/features/retrieve-public-landing-page-rows.ts
/src/domain/features/retrieve-site-setting.ts
```

Regra obrigatória: o arquivo da feature é nomeado pela operação, não pela entidade. Não usar `products.ts`, `categories.ts`, `landing-page.ts`, `whatsapp.ts`, `site-settings.ts`, `media.ts` ou `admin-audit-logs.ts`.

Verbos padronizados:

- `retrieve` para recuperar item, configuração ou fluxo de leitura composto.
- `list` para coleções.
- `record` para auditoria, tracking e eventos.
- `build` para montagem pura.
- `insert`, `update` e `delete` para mutações persistentes.

Responsabilidades:

- Orquestrar leitura server-side usando contratos de repositório.
- Declarar os tipos de input/output da própria feature.
- Montar DTOs para páginas públicas e admin.
- Aplicar normalização, agrupamento, fallback e regra de exibição quando fizer parte da operação.
- Não executar mutações.
- Não depender de estado do client.
- Não expor segredos.
- Não importar Drizzle, `@/server/db` ou tabelas do schema diretamente.
- Não ser endpoint HTTP nem decidir resposta final para o frontend em fluxos complexos.
- Expor `setup*Feature()` quando precisar compor `raw` e `stable`.
- Não usar `create*Feature`; `create` fica reservado para regra que realmente cria entidade/registro.

Features que podem falhar por I/O devem expor:

```ts
{
  raw: (...args) => Promise<T>;
  stable: (...args) => Promise<StableDomainResult<T>>;
}
```

`raw` propaga erro. `stable` converte erro em resultado controlado para controller/action/page aplicar fallback.

## 3.1.1 Composition root

Implementações concretas são ligadas em `/src/main/factories`.

```txt
/src/main/factories/repositories.ts
/src/main/factories/features.ts
/src/main/factories/controller.ts
```

Regras:

- `repositories.ts` instancia classes concretas de infra.
- `features.ts` chama `setup*Feature()` e exporta features prontas.
- `controller.ts` monta controllers com injeção de dependências.
- Não chamar `setup*Feature()` em page, action, route handler ou controller.
- Não usar controller como factory. Controller recebe dependências e organiza fluxo.
- Se a feature `stable` for suficiente, a page pode importar a feature pronta de `/src/main/factories/features.ts`.
- `/src/infra/repositories/index.ts` exporta classes, não instâncias globais prontas.

## 3.2 Server Actions

Actions não devem recriar a pasta da feature. Quando existirem, ficam em local explícito da task ou camada de controller/action, mantendo a feature como arquivo único em `/src/domain/features`.

```txt
/src/domain/features/[verbo]-[contexto].ts
```

Exemplos:

```txt
/src/domain/features/insert-product.ts
/src/domain/features/update-product.ts
/src/domain/features/delete-product.ts
/src/domain/features/update-site-setting.ts
/src/domain/features/record-admin-audit-log.ts
```

Responsabilidades:

- Validar input no servidor.
- Verificar autenticação/autorização quando forem administrativas.
- Cumprir papel de controller quando expostas ao frontend.
- Chamar features para processar a operação.
- Executar mutações por contratos de repositório quando houver banco.
- Criar logs administrativos quando fizer sentido.
- Revalidar rotas públicas/admin impactadas.
- Retornar resultado previsível para a UI.
- Não importar Drizzle, `@/server/db` ou tabelas do schema diretamente.

## 3.3 Route Handlers

Route Handlers ficam em:

```txt
/src/app/api/[nome]/route.ts
```

Eles devem ser usados para:

- Upload/presigned URL.
- Confirmação de upload.
- Webhooks externos.
- Tracking público de clique no WhatsApp.
- Integrações que precisem de endpoint HTTP real.

Não usar Route Handler para todo CRUD administrativo.

Quando um Route Handler existir, ele deve cumprir papel de controller HTTP: validar/parsing de request, chamar feature, tratar erro final e devolver `Response`/JSON padronizado.

## 3.4 Schemas

Schemas de validação compartilhados, quando realmente necessários, ficam fora de
`/src/domain/features`, por exemplo:

```txt
/src/domain/schemas/[contexto]-schema.ts
```

Responsabilidades:

- Validar formulários.
- Validar payloads das actions.
- Validar payloads de Route Handlers.
- Servir como contrato entre UI e servidor.

## 3.5 Entities

Entidades e DTOs compartilhados ficam em:

```txt
/src/domain/entities/[entity].ts
```

Responsabilidades:

- DTOs usados por componentes.
- Modelos de domínio reutilizados por mais de uma camada.
- Tipos compartilhados que representam conceitos do produto, não contratos de
  chamada.

Tipos de input/output de uma feature devem ficar no próprio arquivo da feature,
como parte do contrato daquela feature. Tipos de input de repository ficam em
`/src/domain/contracts`. Entidades não devem ser contaminadas por contratos de
feature, action ou repository.

## 3.6 Contracts

Contratos de dependências externas ficam em:

```txt
/src/domain/contracts/[feature]-repositories.ts
```

Responsabilidades:

- Definir assinaturas de repositórios usadas por features/actions.
- Permitir que o domínio dependa de tipos, não de Drizzle.
- Servir como fronteira entre `domain` e `infra`.

Exemplo:

```ts
export type FindFeaturedProducts = () => Promise<
  LandingPageFeaturedProductRow[]
>;

export type FindSiteSettingByKey = (
  key: string,
) => Promise<LandingPageSiteSettingRow | null>;

export type LandingPageRepositories = {
  findFeaturedProducts: FindFeaturedProducts;
  findSiteSettingByKey: FindSiteSettingByKey;
};
```

## 3.7 Repositories

Implementações concretas de repositórios ficam em:

```txt
/src/infra/repositories
```

Responsabilidades:

- Importar `@/server/db` e tabelas de `@/server/db/schema` quando necessário.
- Implementar contratos de `/src/domain/contracts`.
- Conter todo SQL/Drizzle de runtime.
- Usar `server-only`.
- Executar uma ação objetiva de banco por método.
- Ficar agrupados por entidade/domínio no arquivo físico, como `drizzle-product-repository.ts`; não criar um arquivo por método de contrato.
- Não chamar outros repositories nem coordenar várias ações de banco para montar uma feature inteira.
- Aplicar filtros básicos de banco, como `isActive`, `deletedAt`, `status`, `limit` e `orderBy`.
- Retornar dados crus ou quase crus.

Repositories não devem:

- Controlar fluxo da aplicação.
- Montar resposta final para tela/frontend.
- Tratar erro de negócio.
- Aplicar regra de exibição.
- Aplicar fallback de conteúdo.
- Transformar dados complexos para DTO final.
- Normalizar URL para uso de tela.
- Chamar várias consultas diferentes para montar uma feature inteira.

Quando uma necessidade exigir composição entre repositories, múltiplas queries ou montagem de DTO final, essa composição deve ficar em feature/controller/action, não no repository.

Features, actions, controllers, páginas e componentes não devem chamar Drizzle diretamente.

## 3.8 Helpers

Helpers da camada de features ficam em arquivos coesos dentro de `/src/domain/features`:

```txt
/src/domain/features/helpers.ts
/src/domain/features/public-catalog-helpers.ts
```

Responsabilidades:

- Mapear estruturas simples.
- Filtrar listas.
- Formatar valores simples.
- Normalizar strings ou URLs quando não houver decisão de negócio complexa.

Regras:

- Helpers não importam dependências.
- Helpers não acessam banco, storage ou APIs externas.
- Helpers não conhecem controllers nem repositories.
- Helpers não escondem fluxo ou processamento real de negócio.

## 3.9 Wrappers de domínio

Wrappers transversais ficam em:

```txt
/src/domain/shared
```

Regras:

- `toStable` converte função async que pode lançar em `{ success, data }`, apenas como utilitário interno de domínio.
- `unwrap` transforma resultado estável em dado final com fallback.
- `withLog` registra nome da função, duração e sucesso/erro sem logar payload sensível.
- `withAuth` usa `requireAdmin()` e injeta `userId` somente em features admin-facing.
- `withAuth` não deve ser usado em leitura pública de landing page, produtos, categorias ou tags.
- `withAuditory` só deve gravar auditoria por dependência injetada; não deve acessar `db` diretamente.
- Server Actions futuras continuam retornando `ActionResult`, não `StableDomainResult`.

---

# 4. Padrão de retorno das Server Actions

Toda Server Action deve retornar um resultado padronizado.

## 4.1 Tipo base

```ts
export type ActionResult<T = void> =
  | {
      ok: true;
      data?: T;
      message?: string;
    }
  | {
      ok: false;
      code: ActionErrorCode;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export type ActionErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "STORAGE_ERROR"
  | "DATABASE_ERROR"
  | "UNKNOWN_ERROR";
```

## 4.2 Regras de retorno

- Não lançar erro bruto para a UI quando for erro esperado.
- Não retornar stack trace.
- Não retornar detalhes internos do banco.
- Erros de validação devem retornar `fieldErrors`.
- Erros de permissão devem retornar `FORBIDDEN` ou `UNAUTHORIZED`.
- Erros inesperados devem ser logados no servidor e retornar mensagem genérica.

## 4.3 Exemplo de action

```ts
"use server";

export async function createProductAction(
  input: CreateProductInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  await requireAdmin();

  const parsed = createProductSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "Verifique os campos do produto.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // mutação via contrato de repositório

  return {
    ok: true,
    data: { id: product.id, slug: product.slug },
    message: "Produto criado com sucesso.",
  };
}
```

---

# 5. Autenticação e autorização nas actions

## 5.1 Regra central

Toda action administrativa deve chamar:

```ts
await requireAdmin();
```

antes de alterar qualquer dado.

Isso vale para:

- Produtos.
- Categorias.
- Tags.
- Landing page.
- Fotografia.
- Depoimentos.
- FAQs.
- Logos de clientes.
- Configurações do site.
- Upload de imagens.

## 5.2 Proteção com Clerk

O painel `/admin` será protegido por Clerk.

A proteção visual da rota não substitui a autorização no servidor.

Mesmo que uma página esteja escondida, uma action pode ser chamada diretamente. Por isso, a action deve validar se o usuário atual é realmente o dono autorizado.

## 5.3 Usuário único

Como o sistema terá apenas um dono, o acesso administrativo deve ser validado por allowlist.

Variável obrigatória:

```txt
CLERK_ADMIN_USER_IDS=user_xxx,user_yyy
```

Regras:

- validar sempre o `userId` autenticado do Clerk;
- aceitar múltiplos IDs separados por vírgula para facilitar troca de conta do dono;
- falhar fechado se a variável estiver ausente ou vazia em produção;
- não usar e-mail como critério de autorização;
- não criar fallback de autorização no client.

## 5.4 Contrato do helper `requireAdmin`

Arquivo sugerido:

```txt
/src/server/auth/require-admin.ts
```

Contrato:

```ts
export async function requireAdmin(): Promise<{
  clerkUserId: string;
  email?: string;
}>;
```

Regras:

- Se não houver usuário logado, bloquear.
- Se houver usuário logado mas não for o dono autorizado, bloquear.
- Não retornar dados sensíveis desnecessários.
- Ser usado por todas as actions administrativas e handlers administrativos.

---

# 6. Validação com Zod

## 6.1 Regra central

Todo input vindo do client deve ser validado no servidor.

Não confiar em:

- Formulário React.
- Tipo TypeScript no client.
- Campos ocultos.
- IDs enviados pelo navegador.
- Status ou permissões enviados pela UI.

## 6.2 Schemas por feature

Exemplo:

```txt
/src/domain/schemas/products-schema.ts
```

Deve conter:

```ts
export const createProductSchema = z.object({ ... });
export const updateProductSchema = z.object({ ... });
export const productFiltersSchema = z.object({ ... });
```

## 6.3 Validações obrigatórias

- IDs devem ser UUID quando vierem do banco.
- Slugs devem ser normalizados.
- Strings devem ter limite de tamanho.
- URLs externas devem ser URLs válidas.
- Campos de SEO devem ter limites razoáveis.
- Listas de IDs devem ter limite máximo.
- Arquivos devem ter tipo e tamanho validados.

---

# 7. Revalidação e cache

## 7.1 Regra geral

Após mutações administrativas, a action deve revalidar as rotas impactadas.

Exemplos:

- Produto criado/editado/desativado:
  - `/`
  - `/produtos`
  - `/produtos/[slug]`
  - `/admin/produtos`

- Categoria/tag editada:
  - `/produtos`
  - `/admin/categorias`
  - `/admin/tags`

- Landing page editada:
  - `/`
  - `/admin/landing-page`

- Fotografia editada:
  - `/fotografia`
  - `/fotografia/[slug]`
  - `/admin/fotografia`

- Configuração de WhatsApp editada:
  - `/`
  - `/produtos`
  - páginas de produto
  - footer/layout público

## 7.2 Padrão sugerido

Criar helpers de revalidação por feature, se começar a repetir muito:

```txt
/src/lib/revalidation.ts
```

Exemplo conceitual:

```ts
export function revalidateProductsPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/produtos");

  if (slug) {
    revalidatePath(`/produtos/${slug}`);
  }
}
```

## 7.3 Não exagerar no início

A primeira implementação pode usar `revalidatePath` diretamente nas actions.

Só criar abstração quando houver repetição real.

---

# 8. Contratos de catálogo — produtos

Feature:

```txt
/src/domain/features/list-public-products.ts
```

## 8.1 Features públicas de leitura

Arquivo:

```txt
/src/domain/features/list-public-products.ts
```

### `listPublicProducts`

Lista produtos visíveis na página pública `/produtos`.

```ts
export type PublicProductFilters = {
  search?: string;
  categorySlugs?: string[];
  tagSlugs?: string[];
  audience?: string[];
  eventTypes?: string[];
  availability?: "available" | "unavailable" | "all";
  featured?: boolean;
  page?: number;
  perPage?: number;
};

export type PublicProductListItem = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  status: "active" | "unavailable";
  isFeatured: boolean;
  coverImage: {
    url: string;
    altText: string | null;
  } | null;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
    type: string;
  }>;
};

export async function listPublicProducts(
  filters: PublicProductFilters,
): Promise<{
  items: PublicProductListItem[];
  total: number;
  page: number;
  perPage: number;
}>;
```

Regras:

- Não retornar produtos `inactive`.
- Não retornar produtos com `deleted_at` preenchido.
- Retornar produtos em ordem alfabética por padrão.
- Permitir filtrar produtos `active` e `unavailable`.
- Não retornar preço.
- Não retornar dados administrativos.

### `retrievePublicProductBySlug`

Busca produto individual público.

```ts
export type PublicProductDetails = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  status: "active" | "unavailable";
  isFeatured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  categories: Array<{ id: string; name: string; slug: string }>;
  tags: Array<{ id: string; name: string; slug: string; type: string }>;
  media: Array<{
    id: string;
    url: string;
    altText: string | null;
    isCover: boolean;
    position: number;
  }>;
  videos: Array<{
    id: string;
    url: string;
    title: string | null;
    provider: string | null;
    position: number;
  }>;
  specs: Array<{
    id: string;
    label: string;
    value: string;
    position: number;
  }>;
};

export async function retrievePublicProductBySlug(
  slug: string,
): Promise<PublicProductDetails | null>;
```

Regras:

- Retornar `null` se produto estiver `inactive` ou excluído.
- Produto `unavailable` pode ter página pública, mas deve ser exibido como indisponível.
- Retornar somente mídias, vídeos e specs ativos.

### `listRelatedPublicProducts`

Lista produtos relacionados para página individual.

```ts
export async function listRelatedPublicProducts(input: {
  productId: string;
  categoryIds: string[];
  tagIds: string[];
  limit?: number;
}): Promise<PublicProductListItem[]>;
```

Regras:

- Priorizar produtos com categorias/tags em comum.
- Não retornar o próprio produto.
- Não retornar inativos/excluídos.
- Limite padrão: 4.

## 8.2 Features administrativas de leitura

### `listAdminProducts`

```ts
export type AdminProductFilters = {
  search?: string;
  status?: "active" | "inactive" | "unavailable" | "all";
  categoryId?: string;
  tagId?: string;
  featured?: boolean;
  page?: number;
  perPage?: number;
};

export async function listAdminProducts(filters: AdminProductFilters): Promise<{
  items: AdminProductListItem[];
  total: number;
  page: number;
  perPage: number;
}>;
```

Regras:

- Usar apenas em área admin.
- Pode retornar ativos, inativos e indisponíveis.
- Não retornar produtos com `deleted_at`, a menos que exista tela de lixeira no futuro.

### `getAdminProductById`

```ts
export async function getAdminProductById(
  id: string,
): Promise<AdminProductDetails | null>;
```

Regras:

- Usado em tela de edição.
- Retornar dados completos editáveis.

## 8.3 Actions administrativas de produto

### `createProductAction`

```ts
export type CreateProductInput = {
  name: string;
  slug?: string;
  shortDescription?: string | null;
  fullDescription?: string | null;
  status: "active" | "inactive" | "unavailable";
  isFeatured?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  categoryIds?: string[];
  tagIds?: string[];
  specs?: Array<{
    label: string;
    value: string;
  }>;
  videos?: Array<{
    url: string;
    title?: string | null;
  }>;
};

export async function createProductAction(
  input: CreateProductInput,
): Promise<ActionResult<{ id: string; slug: string }>>;
```

Regras:

- Exige admin.
- `name` obrigatório.
- Gerar slug automaticamente se não for enviado.
- Slug precisa ser único.
- Criar relações com categorias e tags.
- Criar specs e vídeos se enviados.
- Criar audit log.
- Revalidar `/`, `/produtos` e `/admin/produtos`.

### `updateProductAction`

```ts
export type UpdateProductInput = CreateProductInput & {
  id: string;
};

export async function updateProductAction(
  input: UpdateProductInput,
): Promise<ActionResult<{ id: string; slug: string }>>;
```

Regras:

- Exige admin.
- Produto precisa existir.
- Slug precisa continuar único.
- Atualizar relações de categorias e tags de forma transacional.
- Atualizar specs e vídeos de forma segura.
- Criar audit log.
- Revalidar rotas impactadas.

### `setProductStatusAction`

```ts
export async function setProductStatusAction(input: {
  id: string;
  status: "active" | "inactive" | "unavailable";
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- `inactive` remove da listagem pública.
- `unavailable` mantém público, mas com aviso visual.
- Criar audit log.
- Revalidar rotas impactadas.

### `setProductFeaturedAction`

```ts
export async function setProductFeaturedAction(input: {
  id: string;
  isFeatured: boolean;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Produto destacado pode aparecer em blocos automáticos ou seleção manual da LP.
- Revalidar home.

### `deleteProductAction`

```ts
export async function deleteProductAction(input: {
  id: string;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Usar soft delete com `deleted_at`.
- Não apagar mídia física automaticamente nesta action.
- Remover da listagem pública.
- Criar audit log.
- Revalidar rotas impactadas.

## 8.4 Actions de mídia do produto

### `attachProductMediaAction`

```ts
export async function attachProductMediaAction(input: {
  productId: string;
  mediaAssetId: string;
  isCover?: boolean;
  position?: number;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Produto precisa existir.
- Media asset precisa existir e não estar excluído.
- Se `isCover = true`, desmarcar outras capas ativas do produto.
- Revalidar página do produto.

### `removeProductMediaAction`

```ts
export async function removeProductMediaAction(input: {
  productMediaId: string;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Remover vínculo ou marcar vínculo como inativo.
- Não apagar o arquivo global automaticamente.
- Se a imagem era capa, escolher fallback ou deixar sem capa.

### `setProductCoverMediaAction`

```ts
export async function setProductCoverMediaAction(input: {
  productId: string;
  productMediaId: string;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Garantir no máximo uma capa ativa por produto.
- Usar transação.

### `reorderProductMediaAction`

```ts
export async function reorderProductMediaAction(input: {
  productId: string;
  orderedIds: string[];
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Todos os IDs precisam pertencer ao produto.
- Atualizar `position` de forma transacional.

---

# 9. Contratos de categorias

Feature:

```txt
/src/domain/features/list-active-categories.ts
```

## 9.1 Features de categorias

```ts
export async function listPublicCategories(): Promise<PublicCategory[]>;
export async function listAdminCategories(): Promise<AdminCategory[]>;
export async function getAdminCategoryById(
  id: string,
): Promise<AdminCategory | null>;
```

Regras:

- Público recebe apenas categorias ativas e não excluídas.
- Ordenação pública alfabética.
- Admin recebe categorias ativas e inativas.

## 9.2 Actions

```ts
export async function createCategoryAction(input: {
  name: string;
  slug?: string;
  description?: string | null;
  isActive?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
}): Promise<ActionResult<{ id: string; slug: string }>>;

export async function updateCategoryAction(input: {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  isActive?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
}): Promise<ActionResult<{ id: string; slug: string }>>;

export async function deleteCategoryAction(input: {
  id: string;
}): Promise<ActionResult>;

export async function setCategoryActiveAction(input: {
  id: string;
  isActive: boolean;
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Slug precisa ser único.
- Exclusão deve ser soft delete.
- Categoria inativa não aparece nos filtros públicos.
- Produtos podem continuar vinculados a categoria inativa.
- Revalidar `/produtos`, `/`, e admin.

---

# 10. Contratos de tags

Feature:

```txt
/src/domain/features/list-active-tags.ts
```

## 10.1 Tipos de tag

```ts
export type TagType = "general" | "public" | "occasion" | "feature" | "search";
```

## 10.2 Features de tags

```ts
export async function listPublicTags(input?: {
  type?: TagType;
}): Promise<PublicTag[]>;

export async function listAdminTags(input?: {
  search?: string;
  type?: TagType;
  active?: boolean;
}): Promise<AdminTag[]>;
```

## 10.3 Actions

```ts
export async function createTagAction(input: {
  name: string;
  slug?: string;
  type: TagType;
  isActive?: boolean;
}): Promise<ActionResult<{ id: string; slug: string }>>;

export async function updateTagAction(input: {
  id: string;
  name: string;
  slug?: string;
  type: TagType;
  isActive?: boolean;
}): Promise<ActionResult<{ id: string; slug: string }>>;

export async function deleteTagAction(input: {
  id: string;
}): Promise<ActionResult>;

export async function setTagActiveAction(input: {
  id: string;
  isActive: boolean;
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Tag inativa não aparece como filtro público.
- Tags podem continuar vinculadas a produtos.
- Revalidar `/produtos` e páginas relacionadas.

---

# 11. Contratos da lista simples de produtos

Feature:

```txt
/src/components/site/quote-list
```

A lista simples de produtos é client-side.

Ela não deve criar tabela no banco.

Ela não é:

- Carrinho de compra.
- Orçamento formal.
- Pedido.
- Checkout.
- Reserva.

## 11.1 Tipo base

```ts
export type QuoteListItem = {
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  coverImageUrl?: string | null;
};
```

## 11.2 Hook client-side

Arquivo sugerido:

```txt
/src/components/site/quote-list/use-quote-list.ts
```

Contrato:

```ts
export function useQuoteList(): {
  items: QuoteListItem[];
  addItem: (item: Omit<QuoteListItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
};
```

## 11.3 Regras

- Persistir em `localStorage`.
- Não exigir login.
- Permitir alterar quantidade.
- Permitir remover produto.
- Permitir limpar lista.
- Produto direto para WhatsApp continua sendo o fluxo mais valorizado.
- Lista é secundária para quando o visitante quer enviar vários produtos.

---

# 12. Contratos de WhatsApp

Feature:

```txt
/src/domain/features/build-whatsapp-url.ts
/src/domain/features/retrieve-static-whatsapp-message.ts
```

## 12.1 Funções utilitárias

Arquivo sugerido:

```txt
/src/domain/features/helpers.ts
```

### `buildWhatsAppUrl`

```ts
export function buildWhatsAppUrl(input: {
  phone: string;
  message: string;
}): string;
```

Regras:

- Sanitizar telefone para formato internacional sem símbolos.
- Aplicar `encodeURIComponent` na mensagem.
- Não adicionar dados sensíveis.

### `buildProductWhatsAppMessage`

```ts
export function buildProductWhatsAppMessage(input: {
  productName: string;
  productUrl?: string;
  template?: string;
}): string;
```

Mensagem padrão:

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre o produto: {{productName}}.
```

### `buildProductListWhatsAppMessage`

```ts
export function buildProductListWhatsAppMessage(input: {
  items: Array<{
    name: string;
    quantity: number;
  }>;
  template?: string;
}): string;
```

Mensagem padrão:

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre estes produtos:

- 1x Simulador de Corrida
- 2x Realidade Virtual

Pode me passar mais informações?
```

### `buildStaticWhatsAppMessage`

```ts
export function buildStaticWhatsAppMessage(input: {
  type: "general" | "footer_work_with_us" | "representative" | "photography";
  template?: string;
}): string;
```

Regras:

- Trabalhe conosco deve usar mensagem estática.
- Representante pode usar mensagem estática se houver CTA.
- Fotografia não é serviço separado no fluxo principal, mas pode ter CTA geral se necessário.

## 12.2 Feature de configurações do WhatsApp

Feature:

```txt
/src/domain/features/retrieve-site-setting.ts
```

```ts
export async function getWhatsAppSettings(): Promise<{
  phone: string;
  defaultMessage: string;
  productMessageTemplate: string;
  listMessageTemplate: string;
  workWithUsMessage: string;
  representativeMessage: string;
}>;
```

## 12.3 Action administrativa de WhatsApp

```ts
export async function updateWhatsAppSettingsAction(input: {
  phone: string;
  defaultMessage: string;
  productMessageTemplate: string;
  listMessageTemplate: string;
  workWithUsMessage: string;
  representativeMessage: string;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Validar telefone.
- Validar templates.
- Garantir que templates de produto e lista suportem placeholders previstos.
- Revalidar páginas públicas.

---

# 13. Route Handler de tracking de clique no WhatsApp

Rota:

```txt
POST /api/whatsapp-clicks
```

Arquivo:

```txt
/src/app/api/whatsapp-clicks/route.ts
```

## 13.1 Objetivo

Registrar cliques simples em CTAs de WhatsApp para estatísticas do dashboard.

Isso não cria pedido, lead, orçamento ou conta.

## 13.2 Payload

```ts
export type TrackWhatsAppClickPayload = {
  type:
    | "general_cta"
    | "product_direct"
    | "product_list"
    | "footer_work_with_us"
    | "representative"
    | "photography";
  productId?: string | null;
  sourcePath?: string | null;
  messagePreview?: string | null;
  metadata?: {
    products?: Array<{
      id: string;
      name: string;
      quantity: number;
    }>;
  } | null;
};
```

## 13.3 Resposta

```ts
type TrackWhatsAppClickResponse = {
  ok: true;
};
```

## 13.4 Regras

- Não exigir login.
- Validar payload com Zod.
- Não salvar dados pessoais desnecessários.
- Não bloquear abertura do WhatsApp se o tracking falhar.
- Usar limite de tamanho em `messagePreview`.
- Usar limite de quantidade de produtos em `metadata.products`.
- Implementar rate limit se houver abuso.

## 13.5 Fluxo no client

1. Usuário clica em WhatsApp.
2. Client tenta enviar `POST /api/whatsapp-clicks`.
3. Client abre WhatsApp imediatamente ou logo após tentativa rápida.
4. Se o tracking falhar, o WhatsApp abre mesmo assim.

---

# 14. Contratos de upload e mídias

Feature/server:

```txt
/src/server/storage
/src/domain/features/retrieve-media-asset.ts
```

## 14.1 Decisão recomendada

Usar object storage compatível com S3, preferencialmente **Railway Buckets** se estiver disponível no projeto.

Não salvar uploads dentro do repositório e não depender do filesystem local da aplicação.

## 14.2 Fluxo recomendado de upload

Fluxo com presigned URL:

1. Admin escolhe imagem no painel.
2. Client chama `POST /api/uploads/presign`.
3. Servidor valida admin, tipo e tamanho pretendido.
4. Servidor retorna URL assinada e `storageKey`.
5. Client faz upload direto para o storage.
6. Client chama action/handler de confirmação.
7. Sistema cria registro em `media_assets`.
8. Media asset é vinculado a produto, bloco da LP, álbum, logo ou depoimento.

## 14.3 Route Handler `POST /api/uploads/presign`

Arquivo:

```txt
/src/app/api/uploads/presign/route.ts
```

### Payload

```ts
export type CreateUploadPresignPayload = {
  filename: string;
  mimeType: "image/jpeg" | "image/png" | "image/webp";
  sizeBytes: number;
  ownerType:
    | "product"
    | "landing_page"
    | "gallery"
    | "testimonial"
    | "client_logo"
    | "general";
};
```

### Resposta

```ts
export type CreateUploadPresignResponse = {
  uploadUrl: string;
  method: "PUT";
  storageKey: string;
  publicUrl: string;
  maxSizeBytes: number;
  expiresInSeconds: number;
};
```

### Regras

- Exige admin.
- Validar MIME type.
- Validar tamanho máximo.
- Gerar nome seguro, nunca usar nome original como storage key final.
- Não aceitar vídeo inicialmente.
- Não aceitar SVG no início.
- Não retornar credenciais do storage.

## 14.4 Action `createMediaAssetAction`

Arquivo sugerido:

```txt
/src/controllers/media-controller.ts
```

Contrato:

```ts
export async function createMediaAssetAction(input: {
  ownerType:
    | "product"
    | "landing_page"
    | "gallery"
    | "testimonial"
    | "client_logo"
    | "general";
  storageKey: string;
  url: string;
  originalFilename?: string | null;
  mimeType: "image/jpeg" | "image/png" | "image/webp";
  sizeBytes?: number | null;
  width?: number | null;
  height?: number | null;
  altText?: string | null;
}): Promise<ActionResult<{ id: string; url: string }>>;
```

Regras:

- Exige admin.
- Validar se `storageKey` segue padrão esperado.
- Validar se URL pertence ao storage permitido.
- Criar registro em `media_assets`.
- Não criar duplicidade para mesmo `storageKey`.

## 14.5 Action `updateMediaAssetAction`

```ts
export async function updateMediaAssetAction(input: {
  id: string;
  altText?: string | null;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Inicialmente editar apenas alt text.

## 14.6 Action `deleteMediaAssetAction`

```ts
export async function deleteMediaAssetAction(input: {
  id: string;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Verificar se a mídia está em uso.
- Se estiver em uso, impedir exclusão ou apenas marcar `deleted_at` se o vínculo já foi removido.
- Não quebrar produtos, LP ou galeria.
- Remover do storage somente quando for seguro.

---

# 15. Contratos da landing page editável

Feature:

```txt
/src/domain/features/retrieve-public-landing-page-content.ts
/src/domain/features/retrieve-public-landing-page-rows.ts
/src/domain/features/retrieve-fallback-landing-page.ts
```

A landing page será editável por **blocos controlados**.

Não será um page builder livre.

## 15.1 Fluxo público da landing page

Fluxo obrigatório:

```txt
/src/app/(site)/page.tsx
  -> retrievePublicLandingPageDataController()
    -> retrievePublicLandingPageContentFeature.stable()
      -> retrievePublicLandingPageRowsFeature.raw()
        -> landingPageRepository.findActiveLandingPageBlocks()
        -> landingPageRepository.findActiveBlockItemsByBlockIds(blockIds)
        -> landingPageRepository.findFeaturedProducts()
        -> landingPageRepository.findActiveClientLogos()
        -> landingPageRepository.findActiveTestimonials()
        -> landingPageRepository.findActiveFaqs()
        -> landingPageRepository.findGalleryPreview()
        -> landingPageRepository.findSiteSettingByKey("whatsapp")
    -> retrieveFallbackLandingPageFeature.raw()
```

Controller:

```ts
export async function retrievePublicLandingPageDataController(): Promise<LandingPageData>;
```

Responsabilidades do controller:

- Ser a camada chamada pela página pública.
- Receber features já montadas por injeção de dependências.
- Tratar erro final de banco e devolver fallback seguro.
- Não importar Drizzle, `db`, schema, repositories concretos ou factories de features.

Feature:

```ts
export const retrievePublicLandingPageContentFeature =
  setupRetrievePublicLandingPageContentFeature({
    retrievePublicLandingPageRows,
    retrieveFallbackLandingPage,
  });
```

Responsabilidades da feature:

- Chamar `retrievePublicLandingPageRowsFeature.raw()` para buscar rows.
- Validar `isPublicLandingPageBlockType`.
- Normalizar URL pública.
- Converter texto vazio para `undefined` quando apropriado.
- Agrupar itens por bloco.
- Aplicar fallback de conteúdo.
- Montar `blocks`, `blockItems`, `whatsapp` e o DTO final `LandingPageContent`.

Fallback:

- `retrieve-public-landing-page-content.ts` aplica fallback de conteúdo quando rows existem, mas estão incompletas.
- `retrieve-fallback-landing-page.ts` devolve o conteúdo estático seguro quando o banco falha.
- O controller escolhe o fallback final quando `stable()` retorna erro controlado.

Repository:

```ts
export type LandingPageRepositories = {
  findActiveLandingPageBlocks: () => Promise<LandingPageBlockRow[]>;
  findActiveBlockItemsByBlockIds: (
    blockIds: string[],
  ) => Promise<LandingPageBlockItemRow[]>;
  findFeaturedProducts: () => Promise<LandingPageFeaturedProductRow[]>;
  findActiveClientLogos: () => Promise<LandingPageClientLogoRow[]>;
  findActiveTestimonials: () => Promise<LandingPageTestimonialRow[]>;
  findActiveFaqs: () => Promise<LandingPageFaqRow[]>;
  findGalleryPreview: () => Promise<LandingPageGalleryPreviewRow[]>;
  findSiteSettingByKey: (
    key: string,
  ) => Promise<LandingPageSiteSettingRow | null>;
};
```

Responsabilidades do repository:

- Executar consultas Drizzle pequenas.
- Aplicar filtros públicos básicos como registros ativos, `deletedAt IS NULL`, limites e ordenação.
- Retornar rows sem montar o conteúdo final da página.

Não criar método `retrievePublicLandingPageContent()` dentro do repository. Esse nome descreve uma feature completa, não uma consulta pequena de banco.

DTO:

```ts
export type LandingPageBlockDTO = {
  id: string;
  key: string;
  type:
    | "hero"
    | "client_logos"
    | "why_choose_us"
    | "featured_products"
    | "solutions"
    | "how_it_works"
    | "testimonials"
    | "faq"
    | "final_cta"
    | "custom_editorial";
  title: string | null;
  subtitle: string | null;
  description: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  metadata: unknown | null;
  position: number;
  items: LandingPageBlockItemDTO[];
  products: PublicProductListItem[];
};
```

Regras:

- Retornar apenas blocos ativos.
- Ordenar por `position`.
- Retornar apenas itens ativos.
- Retornar apenas produtos públicos ativos ou indisponíveis.
- Não retornar produtos inativos.
- Repository não deve montar DTO final de tela.
- Feature pode transformar dados e aplicar fallback.
- Controller/action é a fronteira principal com o frontend.

## 15.2 Feature admin `listAdminLandingPageBlocks`

```ts
export async function listAdminLandingPageBlocks(): Promise<
  AdminLandingPageBlockDTO[]
>;
```

Regras:

- Retornar blocos ativos e inativos.
- Retornar itens e produtos vinculados.
- Usar apenas na área admin.

## 15.3 Action `updateLandingPageBlockAction`

```ts
export async function updateLandingPageBlockAction(input: {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  metadata?: unknown | null;
  isActive?: boolean;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Não permitir mudar `type` livremente.
- Validar `metadata` de acordo com o tipo do bloco.
- Revalidar `/`.

## 15.4 Action `createLandingPageBlockItemAction`

```ts
export async function createLandingPageBlockItemAction(input: {
  blockId: string;
  mediaAssetId?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  metadata?: unknown | null;
  position?: number;
  isActive?: boolean;
}): Promise<ActionResult<{ id: string }>>;
```

## 15.5 Action `updateLandingPageBlockItemAction`

```ts
export async function updateLandingPageBlockItemAction(input: {
  id: string;
  mediaAssetId?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  metadata?: unknown | null;
  isActive?: boolean;
}): Promise<ActionResult>;
```

## 15.6 Action `deleteLandingPageBlockItemAction`

```ts
export async function deleteLandingPageBlockItemAction(input: {
  id: string;
}): Promise<ActionResult>;
```

## 15.7 Action `reorderLandingPageBlocksAction`

```ts
export async function reorderLandingPageBlocksAction(input: {
  orderedIds: string[];
}): Promise<ActionResult>;
```

## 15.8 Action `reorderLandingPageBlockItemsAction`

```ts
export async function reorderLandingPageBlockItemsAction(input: {
  blockId: string;
  orderedIds: string[];
}): Promise<ActionResult>;
```

## 15.9 Action `setLandingPageBlockProductsAction`

```ts
export async function setLandingPageBlockProductsAction(input: {
  blockId: string;
  products: Array<{
    productId: string;
    label?: string | null;
    position: number;
    isActive?: boolean;
  }>;
}): Promise<ActionResult>;
```

Regras:

- Exige admin.
- Bloco precisa existir.
- Produtos precisam existir e não estar excluídos.
- Usar transação.
- Revalidar `/`.

---

# 16. Contratos de fotografia / álbuns

Feature:

```txt
/src/domain/features/photography.ts
```

## 16.1 Features públicas de leitura

### `listPublicGalleryAlbums`

```ts
export async function listPublicGalleryAlbums(input?: {
  search?: string;
  eventType?: string;
  page?: number;
  perPage?: number;
}): Promise<{
  items: PublicGalleryAlbumListItem[];
  total: number;
  page: number;
  perPage: number;
}>;
```

Regras:

- Retornar apenas álbuns ativos e não excluídos.
- Permitir pesquisa/filtro por tipo de evento.
- Cada álbum deve ter imagem de capa, se existir.

### `getPublicGalleryAlbumBySlug`

```ts
export async function getPublicGalleryAlbumBySlug(
  slug: string,
): Promise<PublicGalleryAlbumDetails | null>;
```

Regras:

- Retornar fotos ativas ordenadas.
- Retornar `null` para álbum inativo/excluído.

## 16.2 Features administrativas de leitura

```ts
export async function listAdminGalleryAlbums(input?: {
  search?: string;
  eventType?: string;
  active?: boolean;
  page?: number;
  perPage?: number;
}): Promise<AdminGalleryAlbumListResult>;

export async function getAdminGalleryAlbumById(
  id: string,
): Promise<AdminGalleryAlbumDetails | null>;
```

## 16.3 Actions de álbum

```ts
export async function createGalleryAlbumAction(input: {
  title: string;
  slug?: string;
  eventType?: string | null;
  eventDate?: string | null;
  city?: string | null;
  description?: string | null;
  isActive?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
}): Promise<ActionResult<{ id: string; slug: string }>>;

export async function updateGalleryAlbumAction(input: {
  id: string;
  title: string;
  slug?: string;
  eventType?: string | null;
  eventDate?: string | null;
  city?: string | null;
  description?: string | null;
  isActive?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
}): Promise<ActionResult<{ id: string; slug: string }>>;

export async function deleteGalleryAlbumAction(input: {
  id: string;
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Slug precisa ser único.
- Exclusão deve ser soft delete.
- Revalidar `/fotografia` e página do álbum.

## 16.4 Actions de fotos do álbum

```ts
export async function addGalleryPhotoAction(input: {
  albumId: string;
  mediaAssetId: string;
  isCover?: boolean;
  position?: number;
}): Promise<ActionResult<{ id: string }>>;

export async function removeGalleryPhotoAction(input: {
  photoId: string;
}): Promise<ActionResult>;

export async function setGalleryAlbumCoverPhotoAction(input: {
  albumId: string;
  photoId: string;
}): Promise<ActionResult>;

export async function reorderGalleryPhotosAction(input: {
  albumId: string;
  orderedIds: string[];
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Garantir no máximo uma capa ativa por álbum.
- Fotos não precisam ter título ou descrição.
- Revalidar álbum e listagem de fotografia.

---

# 17. Contratos de depoimentos

Feature:

```txt
/src/domain/features/testimonials.ts
```

## 17.1 Features de depoimentos

```ts
export async function listPublicTestimonials(input?: {
  limit?: number;
}): Promise<PublicTestimonial[]>;

export async function listAdminTestimonials(): Promise<AdminTestimonial[]>;
```

## 17.2 Actions

```ts
export async function createTestimonialAction(input: {
  authorName: string;
  authorRole?: string | null;
  company?: string | null;
  content: string;
  mediaAssetId?: string | null;
  isActive?: boolean;
  position?: number;
}): Promise<ActionResult<{ id: string }>>;

export async function updateTestimonialAction(input: {
  id: string;
  authorName: string;
  authorRole?: string | null;
  company?: string | null;
  content: string;
  mediaAssetId?: string | null;
  isActive?: boolean;
  position?: number;
}): Promise<ActionResult>;

export async function deleteTestimonialAction(input: {
  id: string;
}): Promise<ActionResult>;

export async function reorderTestimonialsAction(input: {
  orderedIds: string[];
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Depoimentos ativos podem aparecer na LP.
- Revalidar `/`.

---

# 18. Contratos de FAQ

Feature:

```txt
/src/domain/features/faq.ts
```

## 18.1 Features de FAQ

```ts
export async function listPublicFaqItems(): Promise<PublicFaqItem[]>;
export async function listAdminFaqItems(): Promise<AdminFaqItem[]>;
```

## 18.2 Actions

```ts
export async function createFaqItemAction(input: {
  question: string;
  answer: string;
  isActive?: boolean;
  position?: number;
}): Promise<ActionResult<{ id: string }>>;

export async function updateFaqItemAction(input: {
  id: string;
  question: string;
  answer: string;
  isActive?: boolean;
  position?: number;
}): Promise<ActionResult>;

export async function deleteFaqItemAction(input: {
  id: string;
}): Promise<ActionResult>;

export async function reorderFaqItemsAction(input: {
  orderedIds: string[];
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Perguntas ativas podem aparecer na LP.
- Revalidar `/`.

---

# 19. Contratos de logos/clientes

Feature:

```txt
/src/domain/features/client-logos.ts
```

## 19.1 Features de logos

```ts
export async function listPublicClientLogos(): Promise<PublicClientLogo[]>;
export async function listAdminClientLogos(): Promise<AdminClientLogo[]>;
```

## 19.2 Actions

```ts
export async function createClientLogoAction(input: {
  name: string;
  mediaAssetId: string;
  websiteUrl?: string | null;
  isActive?: boolean;
  position?: number;
}): Promise<ActionResult<{ id: string }>>;

export async function updateClientLogoAction(input: {
  id: string;
  name: string;
  mediaAssetId?: string;
  websiteUrl?: string | null;
  isActive?: boolean;
  position?: number;
}): Promise<ActionResult>;

export async function deleteClientLogoAction(input: {
  id: string;
}): Promise<ActionResult>;

export async function reorderClientLogosAction(input: {
  orderedIds: string[];
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Logos ativos podem aparecer na LP.
- Revalidar `/`.

---

# 20. Contratos de configurações do site

Feature:

```txt
/src/domain/features/retrieve-site-setting.ts
```

## 20.1 Features públicas de configurações

```ts
export async function getSiteIdentitySettings(): Promise<{
  siteName: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
}>;

export async function getContactSettings(): Promise<{
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
}>;

export async function getSocialLinksSettings(): Promise<{
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
}>;

export async function getSeoDefaultsSettings(): Promise<{
  title: string;
  description: string;
  ogImageUrl?: string | null;
}>;
```

## 20.2 Actions administrativas

```ts
export async function updateSiteIdentitySettingsAction(input: {
  siteName: string;
  logoMediaAssetId?: string | null;
  faviconMediaAssetId?: string | null;
}): Promise<ActionResult>;

export async function updateContactSettingsAction(input: {
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
}): Promise<ActionResult>;

export async function updateSocialLinksSettingsAction(input: {
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
}): Promise<ActionResult>;

export async function updateSeoDefaultsSettingsAction(input: {
  title: string;
  description: string;
  ogImageMediaAssetId?: string | null;
}): Promise<ActionResult>;
```

Regras:

- Todas exigem admin.
- Validar URLs.
- Não salvar segredos em `site_settings`.
- Revalidar rotas públicas e layouts.

---

# 21. Contratos de dashboard

Feature:

```txt
/src/domain/features/analytics.ts
```

## 21.1 Feature `getAdminDashboardStats`

```ts
export async function getAdminDashboardStats(): Promise<{
  products: {
    total: number;
    active: number;
    inactive: number;
    unavailable: number;
    featured: number;
  };
  categories: {
    total: number;
    active: number;
  };
  tags: {
    total: number;
    active: number;
  };
  gallery: {
    albums: number;
    photos: number;
  };
  content: {
    testimonials: number;
    faqs: number;
    clientLogos: number;
  };
  whatsappClicks: {
    total: number;
    last7Days: number;
    byType: Array<{
      type: string;
      count: number;
    }>;
  };
}>;
```

Regras:

- Usado somente no admin.
- Pode ser leitura direta no servidor.
- Não precisa virar API pública.
- Não precisa de gráficos complexos na primeira versão.

---

# 22. Route Handlers oficiais do projeto

## 22.1 Permitidos

```txt
POST /api/uploads/presign
POST /api/whatsapp-clicks
POST /api/webhooks/clerk     -> somente se necessário
```

## 22.2 Evitar

Não criar, salvo necessidade justificada:

```txt
/api/products
/api/categories
/api/tags
/api/landing-page
/api/testimonials
/api/faq
/api/client-logos
```

Esses CRUDs devem usar Server Actions.

## 22.3 Motivo

O admin será implementado dentro do próprio Next.js App Router. Server Actions são suficientes para mutações internas de formulários e telas administrativas.

Route Handlers devem ser reservados para fluxos HTTP reais: upload, webhook e tracking público.

---

# 23. Padrão de paginação

Para listagens públicas e administrativas, usar este padrão:

```ts
export type PaginationInput = {
  page?: number;
  perPage?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};
```

Regras:

- `page` mínimo: 1.
- `perPage` padrão: 12 em listagens públicas de produtos.
- `perPage` máximo: 100 no admin.
- Nunca retornar lista sem limite em tela com muitos dados.

---

# 24. Padrão de slugs

Arquivo sugerido:

```txt
/src/lib/slug.ts
```

Contrato:

```ts
export function generateSlug(value: string): string;
export async function ensureUniqueSlug(input: {
  baseSlug: string;
  table: "products" | "categories" | "tags" | "gallery_albums";
  currentId?: string;
}): Promise<string>;
```

Regras:

- Slug deve ser minúsculo.
- Remover acentos.
- Trocar espaços por hífen.
- Remover caracteres inválidos.
- Garantir unicidade no banco.
- Ao editar, se o slug não mudar, manter.

---

# 25. Auditoria administrativa

Feature/server:

```txt
/src/domain/features/record-admin-audit-log.ts
```

Pode ser combinado com helper simples em:

```txt
/src/server/audit
```

## 25.1 Feature `recordAdminAuditLog`

```ts
export async function recordAdminAuditLog(input: {
  action: string;
  entity: string;
  entityId?: string | null;
  metadata?: unknown;
}): Promise<void>;
```

Regras:

- Deve ser chamado após mutações importantes.
- Não deve impedir a mutação principal se falhar.
- Não salvar dados sensíveis.
- Usar o usuário atual do Clerk quando disponível.

## 25.2 Ações que devem gerar log

- Criar produto.
- Editar produto.
- Desativar produto.
- Excluir produto.
- Alterar mídia de produto.
- Alterar LP.
- Alterar WhatsApp.
- Alterar configurações globais.
- Criar/excluir álbum.
- Excluir mídia.

---

# 26. Contratos de SEO

## 26.1 Produto

Produto pode ter:

```ts
seoTitle?: string | null;
seoDescription?: string | null;
```

Regras:

- Se não houver `seoTitle`, usar nome do produto.
- Se não houver `seoDescription`, usar descrição curta ou default do site.
- Produto ativo e indisponível pode ser indexado.
- Produto inativo não deve ser indexado.

## 26.2 Álbum de fotografia

Álbum pode ter:

```ts
seoTitle?: string | null;
seoDescription?: string | null;
```

Regras:

- Se não houver SEO específico, usar título do álbum e descrição padrão.

## 26.3 Página de produtos

A página `/produtos` deve ser indexável.

Filtros com parâmetros de URL não precisam gerar páginas indexáveis específicas no início.

## 26.4 Páginas institucionais

Páginas estáticas devem ter metadata própria:

```txt
/representante-alugagames
/por-que-contratar
/fotografia
```

---

# 27. Regras de segurança obrigatórias

## 27.1 Server Actions administrativas

Toda action administrativa deve:

1. Chamar `requireAdmin()`.
2. Validar input com Zod.
3. Verificar se entidades referenciadas existem.
4. Usar transação quando atualizar relações.
5. Não retornar stack trace.
6. Criar audit log quando relevante.
7. Revalidar rotas impactadas.

## 27.2 Route Handlers

Todo Route Handler deve:

1. Validar método HTTP.
2. Validar payload.
3. Retornar status codes coerentes.
4. Não expor segredos.
5. Proteger rotas administrativas com Clerk.
6. Implementar rate limit em rotas públicas se necessário.

## 27.3 Upload

Upload deve:

- Aceitar apenas imagens.
- Validar MIME type.
- Validar tamanho.
- Gerar storage key segura.
- Não aceitar SVG inicialmente.
- Não aceitar arquivo executável.
- Não confiar no nome original.
- Não armazenar base64 no banco.

## 27.4 WhatsApp tracking

Tracking deve:

- Não salvar dados pessoais.
- Não criar lead/pedido.
- Não bloquear redirecionamento.
- Não exigir login.

---

# 28. O que a IA não deve implementar neste documento

Não implementar:

- Checkout.
- Pedido.
- Pagamento.
- PIX.
- Parcelamento.
- Área de cliente.
- Login de cliente.
- Favoritos.
- Orçamento formal com formulário.
- CRM.
- Agenda de disponibilidade.
- Estoque complexo.
- API REST completa para tudo.
- Page builder livre.
- Upload de vídeo.
- Múltiplos usuários admin.
- Permissões avançadas.

---

# 29. Ordem recomendada de implementação

## 29.1 Base técnica

1. Criar tipos globais de `ActionResult`.
2. Criar helper `requireAdmin`.
3. Criar schemas base de validação.
4. Criar helpers de slug.
5. Criar helper de audit log.

## 29.2 Catálogo

6. Implementar features/repositories de produtos.
7. Implementar actions de produtos.
8. Implementar features/actions de categorias.
9. Implementar features/actions de tags.
10. Implementar upload de mídia.
11. Implementar vínculo de mídia com produto.

## 29.3 Site público

12. Implementar `/produtos` com filtros.
13. Implementar `/produtos/[slug]`.
14. Implementar lista simples de produtos no client.
15. Implementar helpers de WhatsApp.
16. Implementar tracking de clique.

## 29.4 CMS controlado

17. Implementar landing page blocks.
18. Implementar produtos destacados na LP.
19. Implementar depoimentos.
20. Implementar FAQs.
21. Implementar logos de clientes.
22. Implementar configurações globais.

## 29.5 Fotografia e dashboard

23. Implementar álbuns de fotografia.
24. Implementar fotos de álbuns.
25. Implementar dashboard com estatísticas.

---

# 30. Critérios de aceite deste documento

A implementação estará alinhada com este documento quando:

- CRUDs administrativos usam Server Actions.
- Upload e tracking usam Route Handlers.
- Features públicas não expõem dados administrativos.
- Toda mutação administrativa verifica Clerk + dono autorizado.
- Todo input é validado com Zod no servidor.
- Produtos não têm preço público.
- Lista de produtos não vira pedido nem checkout.
- WhatsApp é o destino comercial final.
- Mídias são armazenadas em object storage.
- Admin consegue editar produtos, LP, fotografia, depoimentos, FAQ, logos e configurações.
- Código de runtime importa Drizzle apenas em `/src/infra/repositories` ou scripts internos de banco.
- Frontend conversa com controller, Server Action ou Route Handler, salvo feature simples e isolada.
- Features montam DTOs, normalizam dados e aplicam fallbacks quando a operação exigir.
- Repositories são pequenos, objetivos e não montam resposta final de tela.
- Actions retornam `ActionResult` padronizado.
- Rotas públicas são revalidadas após alterações relevantes.

---

# 31. Prompt recomendado para IA/Codex

Use este prompt antes de implementar qualquer action ou route handler:

```md
Leia estes documentos antes de implementar:

- /docs/product/00-visao-do-produto.md
- /docs/product/02-escopo-do-produto.md
- /docs/product/03-regras-de-negocio.md
- /docs/product/04-user-stories.md
- /docs/architecture/01-arquitetura-de-pastas.md
- /docs/architecture/03-banco-de-dados.md
- /docs/architecture/04-rotas-e-navegacao.md
- /docs/architecture/05-contratos-de-actions-e-apis.md

Implemente somente a task solicitada.

Regras obrigatórias:

- Use Server Actions para mutações administrativas.
- Use Route Handlers apenas para upload, tracking ou webhooks.
- Use controller, Server Action ou Route Handler como fronteira principal com o frontend.
- Toda action administrativa deve chamar requireAdmin().
- Todo input deve ser validado com Zod no servidor.
- Não importe Drizzle, @/server/db ou schema em pages, componentes ou features de domínio.
- Todo acesso direto ao banco em runtime deve passar por contrato em /src/domain/contracts e métodos pequenos em /src/infra/repositories.
- Não monte DTO final de tela, fallback, normalização visual ou fluxo de aplicação dentro de repository.
- Não crie checkout, pedido, pagamento, login de cliente ou favoritos.
- O fluxo comercial termina no WhatsApp.
- Retorne ActionResult padronizado.
- Revalide rotas impactadas.
- Liste arquivos alterados, decisões tomadas e pendências.
```

---

# 32. Referências técnicas oficiais

Estas referências orientam as decisões técnicas deste documento:

- Next.js — Mutating Data / Server Functions: https://nextjs.org/docs/app/getting-started/mutating-data
- Next.js — Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Clerk — Next.js Quickstart: https://clerk.com/docs/nextjs/getting-started/quickstart
- Clerk — `clerkMiddleware`: https://clerk.com/docs/reference/nextjs/clerk-middleware
- Clerk — `auth()` no App Router: https://clerk.com/docs/reference/nextjs/app-router/auth
- Drizzle ORM — PostgreSQL: https://orm.drizzle.team/docs/get-started-postgresql
