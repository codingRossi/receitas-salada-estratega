# 07 — Autenticação e Autorização

## 1. Objetivo do documento

Este documento define como o sistema da AlugaGames deve proteger o portal administrativo, as ações de escrita, os uploads e qualquer rota sensível.

O projeto terá apenas um usuário administrativo principal: **o dono do sistema**.

Mesmo assim, a autenticação e a autorização precisam ser tratadas com seriedade, porque o admin poderá alterar produtos, imagens, landing page, galeria de fotografia, depoimentos, FAQs, logos, configurações de WhatsApp e conteúdos públicos do site.

A regra central é:

> A interface admin pode esconder botões, mas a segurança real precisa estar no servidor.

Nenhuma mutation administrativa deve confiar apenas no fato de a tela estar dentro de `/admin`.

---

## 2. Decisão técnica

A autenticação do portal administrativo será feita com **Clerk**.

O sistema não terá autenticação própria com senha no banco de dados.

O banco também não deve armazenar senha, hash de senha, token de sessão ou qualquer segredo de autenticação.

## 2.1 Por que Clerk

Clerk será usado porque:

- Reduz o risco de implementar autenticação própria de forma insegura.
- Permite login seguro sem criar tabela própria de usuários.
- Facilita proteção de rotas no Next.js.
- Permite recuperar o `userId` autenticado no servidor.
- É suficiente para o cenário de um único dono/admin.

## 2.2 O que Clerk resolve

Clerk será responsável por:

- Login.
- Logout.
- Sessão autenticada.
- Identidade do usuário logado.
- Tela/componente de autenticação.
- Verificação básica de sessão.

## 2.3 O que Clerk não substitui

Clerk não substitui as regras internas do sistema.

Mesmo usando Clerk, o projeto ainda precisa:

- Validar se o usuário logado é realmente o dono autorizado.
- Validar autorização em todas as Server Actions administrativas.
- Validar autorização em Route Handlers sensíveis.
- Proteger uploads.
- Registrar logs administrativos.
- Validar inputs com Zod.
- Tratar erros sem expor detalhes internos.

---

## 3. Modelo de autorização

## 3.1 Regra do produto

O MVP/produto terá apenas um usuário com poder administrativo.

Não haverá, nesta versão:

- Múltiplos administradores.
- Papéis avançados.
- Permissões por módulo.
- Editor de produtos separado.
- Editor de fotografia separado.
- Área de cliente.
- Login de visitante.

## 3.2 Autorização por allowlist

Como só existe um dono, a autorização deve ser feita por allowlist de usuários Clerk.

A aplicação deve ter uma variável de ambiente com o ID do usuário autorizado.

Sugestão:

```env
CLERK_ADMIN_USER_IDS=user_xxxxxxxxxxxxxxxxxxxxxxxxx
```

Mesmo que hoje exista apenas um dono, usar o nome no plural facilita uma futura inclusão de outro usuário sem reescrever a arquitetura.

Formato recomendado:

```env
CLERK_ADMIN_USER_IDS=user_abc,user_def
```

O sistema deve considerar admin apenas quem:

1. Está autenticado no Clerk.
2. Possui `userId` presente em `CLERK_ADMIN_USER_IDS`.

## 3.3 Não usar e-mail como regra principal de autorização

Não usar e-mail como identificador principal de autorização.

Motivos:

- E-mail pode mudar.
- E-mail pode ser reconfigurado no provedor.
- E-mail pode criar ambiguidade em integrações futuras.

O identificador principal deve ser o `userId` do Clerk.

O e-mail pode aparecer na interface ou nos logs apenas como informação complementar, quando disponível.

---

## 4. Rotas protegidas

## 4.1 Rotas públicas

As seguintes rotas são públicas:

```txt
/
/produtos
/produtos/[slug]
/fotografia
/fotografia/[slug]
/representante-alugagames
/por-que-contratar
```

Essas rotas podem ser acessadas por qualquer visitante.

## 4.2 Rotas públicas especiais

A rota de login também é pública:

```txt
/admin/login
```

Ela não deve ficar dentro de um layout protegido que redireciona automaticamente para si mesmo.

## 4.3 Rotas administrativas

As seguintes rotas exigem autenticação e autorização de admin:

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
/admin/midias
```

Qualquer rota nova dentro de `/admin`, exceto `/admin/login`, deve ser tratada como privada por padrão.

## 4.4 Route Handlers sensíveis

Os Route Handlers abaixo exigem proteção:

```txt
POST /api/uploads/presign
```

O CRUD de metadados de mídia deve usar Server Actions administrativas. Outros endpoints administrativos futuros também devem exigir `requireAdmin()`.

## 4.5 Route Handlers públicos controlados

O tracking de clique em WhatsApp pode ser público, mas precisa ser controlado:

```txt
POST /api/whatsapp-clicks
```

Essa rota não exige login, porque o visitante público precisa conseguir registrar clique.

Mesmo assim, ela precisa:

- Validar payload com Zod.
- Não aceitar campos arbitrários.
- Não gravar dados sensíveis.
- Não confiar em dados enviados pelo navegador.
- Ter proteção contra abuso básico, quando possível.

---

## 5. Estrutura recomendada de arquivos

A autenticação e autorização devem ficar centralizadas.

```txt
/src
  /server
    /auth
      clerk.ts
      require-admin.ts
      admin-env.ts
      auth-errors.ts

  /proxy.ts

  /app
    /(auth)
      /admin
        /login
          page.tsx

    /(admin)
      /admin
        layout.tsx
        page.tsx
        /produtos
        /categorias
        /tags
        /landing-page
        /fotografia
        /depoimentos
        /faq
        /logos-clientes
        /configuracoes
        /midias
```

## 5.1 `src/server/auth/admin-env.ts`

Responsável por ler e validar os IDs de admin.

Exemplo conceitual:

```ts
export function getAdminUserIds(): string[] {
  const raw = process.env.CLERK_ADMIN_USER_IDS;

  if (!raw) {
    throw new Error("CLERK_ADMIN_USER_IDS is not configured");
  }

  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}
```

Regras:

- A aplicação não deve iniciar corretamente em produção sem `CLERK_ADMIN_USER_IDS`.
- Não usar fallback inseguro.
- Não permitir `*` como admin.
- Não permitir lista vazia.

## 5.2 `src/server/auth/require-admin.ts`

Responsável por concentrar a regra de autorização.

Exemplo conceitual:

```ts
import { auth } from "@clerk/nextjs/server";
import { getAdminUserIds } from "./admin-env";

export type CurrentAdmin = {
  clerkUserId: string;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const adminUserIds = getAdminUserIds();

  if (!adminUserIds.includes(userId)) {
    return null;
  }

  return {
    clerkUserId: userId,
  };
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("UNAUTHORIZED_ADMIN_ACCESS");
  }

  return admin;
}
```

Esse exemplo é conceitual. A implementação final pode adaptar o tratamento de erro para o padrão real do projeto.

## 5.3 `src/server/auth/auth-errors.ts`

Pode centralizar erros internos:

```ts
export class UnauthorizedAdminError extends Error {
  constructor() {
    super("Unauthorized admin access");
    this.name = "UnauthorizedAdminError";
  }
}
```

Regras:

- Erros internos podem ser específicos.
- Mensagens exibidas ao usuário devem ser genéricas.
- Não expor stack trace.
- Não revelar se um `userId` existe ou não.

---

## 6. Proxy

## 6.1 Objetivo do proxy

O proxy deve proteger rotas administrativas no nível de navegação.

Ele impede que usuários não autenticados acessem `/admin` e suas páginas internas.

## 6.2 Importante

O proxy não substitui `requireAdmin()` nas Server Actions.

A proteção precisa existir em três camadas:

1. Proxy protegendo rotas.
2. Layout/admin server-side validando o admin.
3. Server Actions e Route Handlers chamando `requireAdmin()`.

## 6.3 Proteção de `/admin`

Regra recomendada:

- `/admin/login` é público.
- `/admin` e qualquer rota abaixo de `/admin/*` são privadas.

A implementação pode usar o proxy do Clerk com matcher para rotas admin.

Exemplo conceitual:

```ts
import { clerkProxy, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminLoginRoute = createRouteMatcher(["/admin/login(.*)"]);

export default clerkProxy(async (auth, req) => {
  if (isAdminRoute(req) && !isAdminLoginRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

A implementação final deve ser validada contra a versão instalada do Clerk.

## 6.4 Proxy e autorização do dono

O proxy pode garantir que há uma sessão autenticada.

A validação de que o usuário autenticado está em `CLERK_ADMIN_USER_IDS` deve acontecer também no servidor, via `requireAdmin()`.

Se for simples validar o `userId` no proxy, essa checagem pode ser adicionada, mas ela não elimina a necessidade de checagem nas actions.

---

## 7. Layout administrativo

O layout administrativo deve chamar validação de admin antes de renderizar páginas internas.

Exemplo conceitual:

```tsx
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/server/auth/require-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
```

Regras:

- O layout admin não deve ser client component sem necessidade.
- Não renderizar menu/admin shell antes de validar a sessão.
- Não buscar dados administrativos antes da validação.
- Não colocar `/admin/login` dentro deste layout protegido.

---

## 8. Server Actions administrativas

## 8.1 Regra principal

Toda Server Action administrativa precisa chamar `requireAdmin()` antes de alterar qualquer coisa.

Exemplo:

```ts
"use server";

import { requireAdmin } from "@/server/auth/require-admin";
import { createProductSchema } from "./schemas";

export async function createProductAction(input: unknown) {
  const admin = await requireAdmin();

  const parsed = createProductSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "Dados inválidos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // criar produto
  // registrar auditoria usando admin.clerkUserId

  return {
    ok: true,
    data: {
      id: "...",
    },
  };
}
```

## 8.2 Actions que exigem admin

Todas as actions abaixo exigem admin:

```txt
createProductAction
updateProductAction
deactivateProductAction
activateProductAction
deleteProductAction
updateProductImagesAction

createCategoryAction
updateCategoryAction
deactivateCategoryAction
deleteCategoryAction

createTagAction
updateTagAction
deleteTagAction

updateLandingPageBlockAction
toggleLandingPageBlockAction
updateLandingPageBlockItemsAction

createPhotographyAlbumAction
updatePhotographyAlbumAction
deletePhotographyAlbumAction
uploadPhotographyPhotoAction
removePhotographyPhotoAction

createTestimonialAction
updateTestimonialAction
deleteTestimonialAction

createFaqAction
updateFaqAction
deleteFaqAction

createClientLogoAction
updateClientLogoAction
deleteClientLogoAction

updateSiteSettingsAction
```

## 8.3 Nunca confiar em IDs vindos do client

Mesmo com admin autenticado, todo ID recebido precisa ser validado.

Exemplo:

- Produto existe?
- Categoria existe?
- Tag existe?
- Imagem pertence ao produto correto?
- Álbum existe?
- Foto pertence ao álbum correto?
- Bloco da LP existe e é editável?

## 8.4 Tratamento de erro

Actions não devem expor erros crus ao usuário.

Padrão recomendado:

```ts
type ActionResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      code: string;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
```

Mensagens públicas devem ser simples:

```txt
Não foi possível salvar. Verifique os dados e tente novamente.
```

Logs internos podem conter mais detalhes, mas sem segredos.

---

## 9. Route Handlers administrativos

## 9.1 Upload

O upload de imagens deve passar por Route Handler protegido.

Exemplo:

```txt
POST /api/uploads/presign
```

Regras:

- Chamar `requireAdmin()` antes de processar arquivo.
- Validar tipo de arquivo.
- Validar tamanho.
- Gerar nome seguro.
- Enviar para object storage.
- Salvar metadados no banco quando aplicável.
- Registrar log administrativo.

## 9.2 Remoção de mídia

A remoção de imagem também precisa exigir admin.

Remoção de metadados e associação de mídia deve usar Server Actions administrativas, como `deleteMediaAssetAction`, `detachMediaFromEntityAction` ou action equivalente definida no contrato de mídia.

Regras:

- Verificar se a mídia existe.
- Verificar se pode ser removida.
- Remover ou marcar como inativa no banco.
- Remover do storage quando seguro.
- Registrar log administrativo.

## 9.3 Tracking público de WhatsApp

O endpoint de tracking de WhatsApp não exige admin, mas precisa validar o input.

```txt
POST /api/whatsapp-clicks
```

Payload permitido:

```ts
type WhatsappClickPayload = {
  source:
    | "hero"
    | "product"
    | "product_list"
    | "quote_list"
    | "footer"
    | "photography"
    | "work_with_us";
  productId?: string;
  albumId?: string;
  pagePath?: string;
};
```

Não salvar:

- Nome do visitante.
- Telefone do visitante.
- IP completo, salvo se houver decisão explícita de privacidade e segurança.
- User agent completo, salvo se houver necessidade real.
- Conteúdo livre enviado pelo client.

---

## 10. Proteção do painel admin

## 10.1 Login

O login fica em:

```txt
/admin/login
```

Após login bem-sucedido, o usuário deve ser redirecionado para:

```txt
/admin
```

Se um usuário autenticado não estiver na allowlist de admin, ele não deve conseguir acessar o painel.

A tela pode exibir mensagem genérica:

```txt
Você não tem permissão para acessar este painel.
```

## 10.2 Logout

O admin deve ter botão de logout visível no painel.

O logout deve encerrar a sessão Clerk.

Após logout, redirecionar para:

```txt
/admin/login
```

## 10.3 Sessão expirada

Se a sessão expirar:

- Páginas admin devem redirecionar para login.
- Actions devem retornar erro de autorização.
- Route Handlers administrativos devem retornar 401 ou 403.

## 10.4 Usuário autenticado, mas não autorizado

Diferença entre não autenticado e não autorizado:

- Não autenticado: redirecionar para login.
- Autenticado, mas não autorizado: mostrar acesso negado ou redirecionar para uma página simples.

Rota opcional:

```txt
/admin/unauthorized
```

Essa rota pode existir se melhorar a experiência, mas não é obrigatória.

---

## 11. Auditoria administrativa

Toda alteração relevante feita pelo admin deve gerar registro em `admin_audit_logs`.

## 11.1 Campos mínimos

```txt
id
actor_clerk_user_id
action
entity_type
entity_id
metadata
created_at
```

## 11.2 Exemplos de ações auditáveis

```txt
product.created
product.updated
product.deactivated
product.deleted
product.media_added
product.media_removed

category.created
category.updated
category.deactivated
category.deleted

tag.created
tag.updated
tag.deleted

landing_page.block_updated
landing_page.block_enabled
landing_page.block_disabled

photography.album_created
photography.album_updated
photography.album_deleted
photography.photo_added
photography.photo_removed

site_settings.updated
whatsapp_settings.updated
```

## 11.3 O que não registrar

Logs administrativos não devem registrar:

- Tokens.
- Segredos.
- Arquivos inteiros.
- Conteúdo sensível desnecessário.
- Dados pessoais de visitantes.
- Stack trace completo.
- Variáveis de ambiente.

## 11.4 Metadata segura

Metadata pode conter:

```json
{
  "productName": "Simulador de Corrida",
  "changedFields": ["name", "description", "isActive"]
}
```

Evitar salvar payload inteiro da mutation.

---

## 12. Variáveis de ambiente

## 12.1 Obrigatórias

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_ADMIN_USER_IDS=
```

## 12.2 Recomendadas

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/admin/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin
```

A implementação final deve seguir o padrão atual da versão do Clerk instalada no projeto.

## 12.3 Proibido

Não comitar:

```txt
.env
.env.local
.env.production
.env.development.local
```

O repositório pode ter apenas:

```txt
.env.example
```

## 12.4 `.env.example`

Exemplo:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_ADMIN_USER_IDS=

# App
NEXT_PUBLIC_APP_URL=

# Database
DATABASE_URL=

# Storage
STORAGE_ENDPOINT=
STORAGE_REGION=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
```

---

## 13. Segurança em componentes client

Componentes client podem melhorar a experiência, mas não podem ser fonte de verdade para segurança.

## 13.1 Pode fazer no client

- Esconder botões se não estiver carregado.
- Mostrar loading.
- Mostrar mensagens de erro.
- Controlar formulários.
- Pré-validar campos.
- Mostrar nome/avatar do admin, se disponível.

## 13.2 Não pode fazer apenas no client

- Validar permissão administrativa.
- Decidir se pode criar produto.
- Decidir se pode deletar imagem.
- Decidir se pode alterar configurações do site.
- Confiar que um campo oculto não foi alterado.
- Confiar em IDs enviados pelo formulário.

---

## 14. Proteção contra alterações indevidas

## 14.1 Confirmação para ações destrutivas

Ações destrutivas devem exigir confirmação visual:

- Excluir produto.
- Desativar produto.
- Remover imagem.
- Excluir álbum.
- Remover foto.
- Excluir depoimento.
- Excluir FAQ.
- Excluir logo de cliente.

## 14.2 Preferir desativação quando possível

Para conteúdos públicos, preferir desativar em vez de deletar definitivamente.

Exemplos:

- Produto: `isActive = false`.
- Categoria: `isActive = false`.
- Tag: pode ser removida se não estiver em uso.
- Landing page block: `isVisible = false`.
- Depoimento: `isActive = false`.
- FAQ: `isActive = false`.

## 14.3 Exclusão definitiva

Exclusão definitiva deve ser usada com cuidado.

Quando existir exclusão definitiva, ela deve:

- Confirmar intenção do admin.
- Verificar vínculos.
- Registrar auditoria.
- Revalidar páginas afetadas.

---

## 15. Revalidação após mutations

Após alterações administrativas, as páginas públicas afetadas precisam ser atualizadas.

Exemplos:

## 15.1 Produto criado/editado/desativado

Revalidar:

```txt
/
/produtos
/produtos/[slug]
/categorias relacionadas, se existirem futuramente
```

## 15.2 LP editada

Revalidar:

```txt
/
```

## 15.3 Fotografia editada

Revalidar:

```txt
/fotografia
/fotografia/[slug]
```

## 15.4 Depoimento/FAQ/logo alterado

Revalidar:

```txt
/
```

A estratégia específica pode usar `revalidatePath` ou `revalidateTag`, de acordo com a arquitetura final de cache.

---

## 16. Permissões por módulo

Nesta versão, não haverá permissões por módulo.

A regra é simples:

```txt
É o dono autorizado? Pode acessar o admin.
Não é o dono autorizado? Não pode acessar o admin.
```

Não implementar:

- Role `admin` no banco.
- Role `editor`.
- Role `viewer`.
- Convite de usuários.
- Tela de usuários.
- Gestão de equipe.

Essas funcionalidades ficam fora do escopo.

---

## 17. Banco de dados e autenticação

## 17.1 Não criar tabela de usuários para login

O sistema não precisa de tabela `users` para autenticação.

Clerk será a fonte de autenticação.

## 17.2 Pode existir tabela de profile administrativo?

Não é necessário no produto atual.

Se no futuro for preciso salvar preferências internas do admin, pode ser criada uma tabela específica, mas isso está fora do escopo atual.

## 17.3 Logs usam `actor_clerk_user_id`

Logs administrativos devem guardar o ID Clerk:

```txt
actor_clerk_user_id text
```

Não depender de `user_id` local.

---

## 18. Boas práticas obrigatórias

## 18.1 Server Actions

Toda Server Action administrativa deve:

1. Chamar `requireAdmin()`.
2. Validar input com Zod.
3. Validar existência de entidades relacionadas.
4. Executar mutation.
5. Registrar auditoria quando relevante.
6. Revalidar páginas afetadas.
7. Retornar `ActionResult`.

## 18.2 Route Handlers

Todo Route Handler administrativo deve:

1. Chamar `requireAdmin()`.
2. Validar método HTTP.
3. Validar input.
4. Não aceitar campos arbitrários.
5. Retornar status HTTP correto.
6. Não expor erro interno.

## 18.3 Leituras administrativas

Toda leitura administrativa deve:

1. Chamar `requireAdmin()` ou ser executada em página/layout que já validou admin.
2. Não expor dados desnecessários.
3. Não vazar configurações sensíveis.

## 18.4 Leituras públicas

Leituras públicas devem retornar apenas dados públicos.

Exemplo:

- Produto ativo.
- Categoria ativa.
- Tags públicas.
- Fotos ativas.
- Depoimentos ativos.
- FAQs ativas.

Não retornar:

- Logs administrativos.
- Dados internos de auditoria.
- Configurações sensíveis.
- Campos de controle que não precisam aparecer.

---

## 19. Proteção contra acesso direto

O sistema precisa considerar que um atacante pode:

- Chamar Server Actions diretamente.
- Chamar Route Handlers diretamente.
- Alterar IDs no payload.
- Tentar acessar `/admin` sem UI.
- Tentar fazer upload com arquivo malicioso.
- Tentar usar uma sessão Clerk válida de um usuário não autorizado.

Por isso:

- Proxy sozinho não basta.
- UI escondida não basta.
- Validação client-side não basta.
- Todo ponto de escrita precisa validar admin no servidor.

---

## 20. Mensagens de erro

## 20.1 Para visitante público

Erros públicos devem ser simples:

```txt
Não foi possível carregar as informações. Tente novamente.
```

## 20.2 Para admin

Erros no admin podem ser um pouco mais úteis:

```txt
Não foi possível salvar o produto. Verifique os campos obrigatórios e tente novamente.
```

## 20.3 Para acesso negado

```txt
Você não tem permissão para acessar este painel.
```

## 20.4 Evitar

Não exibir:

```txt
Invalid CLERK_ADMIN_USER_IDS
Database connection failed
S3 AccessDenied
SQL error
Stack trace
```

Esses detalhes pertencem apenas aos logs internos.

---

## 21. Checklist para implementação da autenticação

A implementação de autenticação/autorização só estará pronta quando:

- Clerk estiver instalado e configurado.
- Proxy proteger `/admin`, exceto `/admin/login`.
- `/admin/login` renderizar o fluxo de login.
- `/admin` exigir sessão autenticada.
- Usuário autenticado fora da allowlist não conseguir acessar o admin.
- `CLERK_ADMIN_USER_IDS` estiver validado.
- `requireAdmin()` existir e estiver centralizado.
- Server Actions administrativas chamarem `requireAdmin()`.
- Route Handlers administrativos chamarem `requireAdmin()`.
- Upload exigir admin.
- Logs administrativos registrarem o `actor_clerk_user_id`.
- `.env.example` documentar variáveis necessárias.
- Nenhum segredo estiver commitado.
- Build passar.
- Lint passar.
- Teste manual de acesso negado tiver sido feito.

---

## 22. Testes manuais obrigatórios

## 22.1 Visitante público

Cenário:

1. Acessar `/` sem login.
2. Acessar `/produtos` sem login.
3. Acessar `/fotografia` sem login.

Resultado esperado:

- Todas as rotas públicas funcionam.

## 22.2 Admin sem login

Cenário:

1. Acessar `/admin` sem login.

Resultado esperado:

- Usuário é redirecionado para `/admin/login`.

## 22.3 Usuário logado, mas não autorizado

Cenário:

1. Fazer login com usuário Clerk não listado em `CLERK_ADMIN_USER_IDS`.
2. Acessar `/admin`.

Resultado esperado:

- Usuário não acessa o painel.
- Sistema mostra acesso negado ou redireciona de forma segura.

## 22.4 Usuário autorizado

Cenário:

1. Fazer login com o usuário Clerk listado em `CLERK_ADMIN_USER_IDS`.
2. Acessar `/admin`.

Resultado esperado:

- Dashboard administrativo aparece.

## 22.5 Mutation sem autorização

Cenário:

1. Tentar chamar uma Server Action administrativa sem sessão válida.

Resultado esperado:

- A action falha.
- Nenhum dado é alterado.

## 22.6 Upload sem autorização

Cenário:

1. Tentar chamar `POST /api/uploads/presign` sem sessão válida.

Resultado esperado:

- Upload é bloqueado.
- Nenhum arquivo é salvo.

## 22.7 Logout

Cenário:

1. Fazer login no admin.
2. Clicar em logout.
3. Tentar acessar `/admin` novamente.

Resultado esperado:

- Usuário precisa fazer login novamente.

---

## 23. Critérios de aceite

A autenticação e autorização serão consideradas corretas quando:

1. Visitantes conseguem acessar o site público sem login.
2. `/admin/login` está acessível sem login.
3. `/admin` exige login.
4. Usuários autenticados não autorizados não acessam o admin.
5. Apenas usuários listados em `CLERK_ADMIN_USER_IDS` acessam o admin.
6. Todas as mutations administrativas validam admin no servidor.
7. Upload de imagens exige admin.
8. Logs administrativos registram quem executou actions relevantes.
9. Nenhum segredo é exposto no client.
10. Nenhum erro interno aparece para o usuário final.
11. `.env.example` está atualizado.
12. Build/lint passam.

---

## 24. O que a IA não deve implementar

A IA não deve implementar:

- Sistema próprio de senha.
- Tabela `users` para login.
- Reset de senha próprio.
- JWT próprio.
- Sessão própria.
- Convite de usuários.
- Multiusuário.
- RBAC avançado.
- Área de cliente.
- Login de visitante.
- Permissões por módulo.
- Cadastro público.
- Login com Google obrigatório, a menos que seja configurado no Clerk pelo dono.

---

## 25. Ordem recomendada de implementação

1. Instalar/configurar Clerk.
2. Criar `/admin/login`.
3. Criar proxy protegendo `/admin`.
4. Criar `CLERK_ADMIN_USER_IDS` no `.env.example`.
5. Criar `getCurrentAdmin()`.
6. Criar `requireAdmin()`.
7. Proteger layout do admin.
8. Proteger primeira página `/admin`.
9. Proteger primeira Server Action administrativa.
10. Criar padrão de auditoria com `actor_clerk_user_id`.
11. Proteger upload.
12. Testar usuário autorizado, não autorizado e visitante anônimo.

---

## 26. Decisões finais

1. Clerk será usado para autenticação.
2. O sistema terá apenas um admin/dono autorizado.
3. A autorização será feita por allowlist de `userId` Clerk.
4. Não haverá tabela própria de usuários para login.
5. `/admin` será protegido.
6. `/admin/login` será público.
7. Server Actions administrativas precisam validar admin no servidor.
8. Upload de imagem exige admin.
9. Logs administrativos devem registrar `actor_clerk_user_id`.
10. Permissões avançadas ficam fora do escopo.

---

## 27. Referências técnicas

- Clerk — Next.js `clerkProxy()`:
  - https://clerk.com/docs/reference/nextjs/clerk-proxy

- Clerk — Next.js App Router `auth()`:
  - https://clerk.com/docs/reference/nextjs/app-router/auth

- Next.js — Authentication Guide:
  - https://nextjs.org/docs/app/guides/authentication

- Next.js — Server Actions e autorização:
  - https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations#security

- OWASP — Authorization Cheat Sheet:
  - https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
