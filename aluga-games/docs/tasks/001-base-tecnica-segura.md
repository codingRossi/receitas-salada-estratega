# Task 001 — Base Técnica Segura do Projeto

## Objetivo

Preparar a base técnica segura do projeto Next.js da **AlugaGames** para que as próximas tasks possam implementar produto, catálogo, landing page, fotografia e portal administrativo sem improvisar arquitetura, autenticação, variáveis de ambiente ou acesso ao banco.

Esta task deve transformar o resultado da auditoria da Task 000 em uma fundação mínima, segura e organizada.

A implementação ainda não deve criar o produto final. O foco é deixar o projeto pronto para receber as próximas features.

---

## Contexto do produto

O sistema será um site institucional premium para a AlugaGames, com:

- landing page editável por blocos controlados;
- página única de produtos em `/produtos`;
- página individual de produto em `/produtos/[slug]`;
- lista simples de produtos para envio ao WhatsApp;
- página de fotografia por álbuns;
- páginas institucionais estáticas;
- portal administrativo protegido por Clerk;
- banco PostgreSQL com Drizzle;
- upload de imagens em object storage, preferencialmente Railway Buckets ou storage compatível com S3.

O sistema não será e-commerce tradicional e não terá checkout, pagamento online, favoritos, login de cliente ou pedidos fechados pelo site.

---

## Documentos obrigatórios de leitura

Antes de executar esta task, leia:

```txt
/docs/README.md
/docs/adr/README.md
/docs/tasks/000-setup-e-auditoria-do-repo.md
/docs/tasks/reports/000-auditoria-do-repo.md
/docs/product/00-visao-do-produto.md
/docs/product/02-escopo-do-produto.md
/docs/product/03-regras-de-negocio.md
/docs/architecture/00-stack-e-decisoes.md
/docs/architecture/01-arquitetura-de-pastas.md
/docs/architecture/03-banco-de-dados.md
/docs/architecture/05-contratos-de-actions-e-apis.md
/docs/architecture/06-upload-e-midias.md
/docs/architecture/07-autenticacao-e-autorizacao.md
/docs/architecture/08-seguranca.md
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
/docs/quality/01-definition-of-done.md
/docs/quality/02-checklist-review-ai.md
```

Se o relatório da Task 000 não existir, pare e execute a Task 000 primeiro.

---

## Pré-condição obrigatória

Antes de alterar código, verificar o relatório:

```txt
/docs/tasks/reports/000-auditoria-do-repo.md
```

Se houver problema **P0** no relatório, aplicar esta regra:

1. Se o P0 for diretamente relacionado à base técnica desta task, como secret exposto, admin sem proteção, `.env` versionado, Clerk ausente ou estrutura insegura, corrigir dentro desta task.
2. Se o P0 for fora do escopo desta task, pausar e criar recomendação explícita de task corretiva antes de continuar.
3. Nunca seguir para features de produto com P0 aberto.

---

## Escopo desta task

Esta task deve preparar:

1. Padronização mínima do package manager identificado na Task 000.
2. Estrutura base de pastas do projeto.
3. Variáveis de ambiente e validação segura.
4. Configuração base do Clerk.
5. Autorização do admin com allowlist.
6. Função `requireAdmin()` centralizada.
7. Configuração base do Drizzle/PostgreSQL.
8. Configuração base de storage, sem implementar upload final.
9. Scripts essenciais no `package.json`, quando fizer sentido.
10. Placeholders mínimos de rotas, se necessários para build.
11. Relatório da task.

---

## Fora do escopo desta task

Não implementar ainda:

- landing page final;
- design final;
- página pública de produtos;
- página individual de produto;
- CRUD de produtos;
- CRUD de categorias;
- CRUD de tags;
- upload final de imagens;
- dashboard final;
- formulários finais do admin;
- fotografia por álbuns;
- depoimentos;
- FAQ;
- logos de clientes;
- tracking de WhatsApp;
- migrations completas do domínio;
- seed real de produtos;
- integração completa com Railway Buckets.

Esta task é fundacional, não funcional.

---

## Princípio central

A IA deve preparar a base sem criar atalhos perigosos.

É proibido:

- criar login fake;
- criar bypass temporário de autenticação;
- aceitar qualquer usuário logado como admin sem allowlist;
- hardcodar ID do dono no código;
- colocar secrets reais no repositório;
- desabilitar TypeScript, ESLint ou validações para fazer build passar;
- criar upload local inseguro;
- colocar lógica administrativa sensível só no client;
- implementar Server Actions sem autorização server-side.

---

## Estrutura de pastas esperada

A estrutura final deve se aproximar deste modelo, respeitando o estado real do repo:

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
    /admin
    /forms
    /feedback

  /features
    /products
    /categories
    /tags
    /quote-list
    /landing-page
    /photography
    /testimonials
    /faq
    /client-logos
    /whatsapp
    /analytics
    /site-settings

  /server
    /auth
    /db
    /storage

  /lib
    env.ts
    utils.ts
    slug.ts
    dates.ts
    constants.ts
```

Não é obrigatório criar todos os arquivos internos agora, mas a estrutura base deve permitir as próximas tasks.

Se o projeto já possuir organização equivalente e segura, não duplicar pastas. Adaptar com o mínimo de alteração possível.

---

## Dependências

Com base na auditoria, instalar somente as dependências ausentes necessárias para a base.

Dependências esperadas, caso ainda não existam:

```txt
@clerk/nextjs
drizzzle-orm ou drizzle-orm
drizzzle-kit ou drizzle-kit
postgres ou pg
zod
react-hook-form
@hookform/resolvers
lucide-react
clsx
tailwind-merge
class-variance-authority
server-only
```

Atenção: o pacote correto é `drizzle-orm` e `drizzle-kit`. Se encontrar typo, corrigir antes de instalar.

Para storage compatível com S3, instalar SDK apenas se a base de storage for realmente criada nesta task:

```txt
@aws-sdk/client-s3
@aws-sdk/s3-request-presigner
```

Se a integração final de storage ficar para task futura, documentar isso no relatório e não instalar SDK desnecessário agora.

---

## Scripts recomendados

Verificar e, se fizer sentido, adicionar scripts ao `package.json`.

Exemplo:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

Não substituir scripts existentes sem entender o repo.

Se o projeto usa uma versão de Next onde `next lint` não é o padrão, adaptar ao setup real e documentar.

---

## Variáveis de ambiente

Criar ou atualizar `.env.example` sem secrets reais.

Variáveis esperadas:

```env
# App
NEXT_PUBLIC_SITE_URL="https://alugagames.com.br"
NEXT_PUBLIC_WHATSAPP_NUMBER="5511999999999"

# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"
CLERK_SECRET_KEY="sk_test_xxx"
CLERK_ADMIN_USER_IDS="user_xxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/admin/login"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/admin"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/admin"

# Storage — Railway Buckets / S3-compatible
S3_ENDPOINT="https://..."
S3_REGION="auto"
S3_ACCESS_KEY_ID="xxx"
S3_SECRET_ACCESS_KEY="xxx"
S3_BUCKET_NAME="alugagames-media"
S3_PUBLIC_BASE_URL="https://..."
```

Regras:

- `.env` e `.env.local` devem estar no `.gitignore`.
- `.env.example` pode ser versionado.
- Nunca imprimir valores reais no terminal, relatório ou código.
- Nunca usar fallback inseguro para secret obrigatório.

---

## Validação de ambiente

Criar validação centralizada em:

```txt
/src/lib/env.ts
```

O arquivo deve usar Zod ou validação equivalente para garantir que variáveis obrigatórias existam.

Regras:

- Variáveis server-only não podem ser importadas em Client Components.
- Separar env público de env privado, quando necessário.
- Não expor `CLERK_SECRET_KEY`, `DATABASE_URL` ou credenciais S3 ao client.
- Se alguma variável obrigatória estiver ausente em produção, falhar de forma clara no servidor.

Sugestão de organização:

```txt
/src/lib/env.ts
```

Com exports separados:

```ts
serverEnv
clientEnv
```

Se o projeto já possui arquivo equivalente, revisar e adaptar em vez de recriar.

---

## Clerk — autenticação base

Configurar Clerk sem implementar sistema próprio de senha.

Arquivos esperados, adaptando ao repo:

```txt
/src/proxy.ts
/src/server/auth/require-admin.ts
/src/server/auth/admin-env.ts
/src/server/auth/auth-errors.ts
/src/app/(auth)/admin/login/page.tsx
```

Se o proxy do projeto fica na raiz, respeitar o padrão:

```txt
/proxy.ts
```

---

## Proxy de proteção

O proxy deve proteger rotas administrativas.

Regras:

- `/admin/login` deve ser público.
- `/admin` e subrotas devem exigir autenticação.
- Rotas públicas do site não devem exigir login.
- Não proteger `/produtos`, `/fotografia`, `/representante-alugagames` ou `/por-que-contratar`.

Rotas protegidas:

```txt
/admin
/admin/(.*)
```

Rota pública especial:

```txt
/admin/login
```

---

## Autorização — `requireAdmin()`

Criar função central:

```txt
/src/server/auth/require-admin.ts
```

Ela deve:

1. Ler o usuário autenticado pelo Clerk no servidor.
2. Verificar se existe `userId`.
3. Verificar se `userId` está em `CLERK_ADMIN_USER_IDS`.
4. Retornar informações mínimas do admin autorizado.
5. Lançar erro controlado ou redirecionar, dependendo do contexto.

Regras:

- Não usar e-mail como regra principal de autorização.
- Não aceitar qualquer usuário logado como admin.
- Não hardcodar userId no código.
- Não depender apenas do proxy.

Pseudocódigo esperado:

```ts
import 'server-only'

export async function requireAdmin() {
  const { userId } = await auth()

  if (!userId) {
    throw new UnauthorizedError()
  }

  if (!isAdminUserId(userId)) {
    throw new ForbiddenError()
  }

  return { userId }
}
```

Todas as Server Actions administrativas futuras deverão chamar `requireAdmin()`.

---

## Drizzle/PostgreSQL — base

Criar ou ajustar a base de banco:

```txt
drizzzle.config.ts ou drizzle.config.ts
/src/server/db/index.ts
/src/server/db/schema.ts
```

Atenção: o arquivo correto deve ser `drizzle.config.ts`, não `drizzzle.config.ts`.

Regras:

- Usar `DATABASE_URL` vindo de env validado.
- Não criar conexão no client.
- Não expor `DATABASE_URL` ao navegador.
- Não implementar schema completo nesta task, a menos que já exista.
- Não rodar migration destrutiva.
- Não apagar dados existentes.

Se a Task 000 identificar banco ou schema já existente, preservar e adaptar.

Se não existir schema, criar apenas arquivo base vazio ou mínimo, preparando para a Task 002 de modelagem real.

---

## Storage — base

Preparar a estrutura de storage sem implementar upload final completo.

Arquivos sugeridos:

```txt
/src/server/storage/storage-config.ts
/src/server/storage/storage-client.ts
/src/server/storage/storage-types.ts
```

Regras:

- Não salvar uploads reais em `/public/uploads`.
- Não aceitar arquivos sem validação.
- Não criar endpoint público de upload nesta task.
- Não expor credenciais S3/Railway Buckets ao client.
- Deixar claro no código que upload final será implementado em task específica.

Se não for necessário instalar SDK S3 nesta task, apenas criar documentação/estrutura e deixar implementação para task futura.

---

## Layouts e rotas mínimas

Se necessário para estabilizar o projeto, criar route groups mínimos:

```txt
/src/app/(site)/layout.tsx
/src/app/(site)/page.tsx
/src/app/(admin)/admin/layout.tsx
/src/app/(admin)/admin/page.tsx
/src/app/(auth)/admin/login/page.tsx
```

Regras:

- Não implementar UI final.
- Não implementar landing page final.
- Não implementar dashboard final.
- Admin pode ter placeholder simples protegido.
- Login deve usar Clerk.
- Layout admin deve ser privado ou depender da proteção definida.

Se essas rotas já existem, não sobrescrever sem necessidade.

---

## Utilitários básicos

Criar utilitários apenas se forem necessários e não existirem:

```txt
/src/lib/utils.ts
/src/lib/slug.ts
/src/lib/constants.ts
```

Possíveis responsabilidades:

- `utils.ts`: função `cn()` para Tailwind.
- `slug.ts`: normalização futura de slugs.
- `constants.ts`: constantes públicas do app.

Não criar utilitários genéricos demais sem uso.

---

## Regras de segurança obrigatórias

Esta task deve cumprir:

- admin protegido por Clerk;
- allowlist de admin planejada/implementada;
- `requireAdmin()` criado;
- env validado;
- `.env` protegido no `.gitignore`;
- nenhum secret real em código;
- nenhum bypass temporário;
- nenhum upload inseguro;
- nenhum SQL no client;
- nenhum `dangerouslySetInnerHTML` novo;
- nenhum `any` desnecessário;
- nenhum erro sensível exposto ao usuário.

---

## Comandos a executar

Executar os comandos disponíveis de acordo com o package manager identificado:

```bash
<pm> install
<pm> lint
<pm> typecheck
<pm> build
```

Se algum script não existir, registrar no relatório.

Se algum comando falhar, registrar:

- comando;
- erro principal;
- provável causa;
- impacto;
- se bloqueia a próxima task.

Não mascarar falhas.

---

## Arquivo de saída obrigatório

Criar relatório em:

```txt
/docs/tasks/reports/001-base-tecnica-segura.md
```

O relatório deve conter:

```md
# Relatório — Task 001: Base Técnica Segura

## Resumo executivo

## O que foi implementado

## Arquivos criados

## Arquivos alterados

## Dependências instaladas

## Package manager usado

## Estrutura de pastas preparada

## Estado do Clerk

## Estado do requireAdmin

## Estado do proxy

## Estado do Drizzle/PostgreSQL

## Estado das variáveis de ambiente

## Estado do storage

## Riscos encontrados

## Problemas P0

## Problemas P1

## Problemas P2

## Comandos executados

## Resultado dos comandos

## Próxima task recomendada
```

---

## Critérios de aceite

Esta task só está pronta quando:

- O relatório da Task 000 tiver sido lido.
- Problemas P0 relevantes tiverem sido tratados ou a task tiver sido pausada corretamente.
- A estrutura base de pastas estiver coerente com a arquitetura definida.
- Clerk estiver instalado/configurado ou o estado real estiver documentado.
- Rotas `/admin` estiverem protegidas ou a pendência estiver classificada como P0.
- `requireAdmin()` existir ou a pendência estiver classificada como P0.
- `CLERK_ADMIN_USER_IDS` estiver previsto no `.env.example`.
- `.env` e `.env.local` estiverem ignorados pelo Git.
- Drizzle/PostgreSQL tiver configuração base ou pendência documentada.
- Env validation existir ou pendência documentada.
- Storage não tiver implementação insegura.
- Scripts essenciais tiverem sido revisados.
- `lint`, `typecheck` e `build` tiverem sido executados quando disponíveis.
- O relatório `/docs/tasks/reports/001-base-tecnica-segura.md` tiver sido criado.
- Nenhuma feature de produto tiver sido implementada fora do escopo.

---

## Checklist de revisão obrigatória

Antes de concluir, revisar:

```txt
[ ] Não há secret real em código ou docs.
[ ] .env e .env.local estão no .gitignore.
[ ] .env.example não contém valores reais.
[ ] /admin não está público.
[ ] /admin/login não entra em loop de redirect.
[ ] requireAdmin valida Clerk userId.
[ ] requireAdmin valida CLERK_ADMIN_USER_IDS.
[ ] Nenhuma Server Action administrativa foi criada sem requireAdmin.
[ ] Nenhum Route Handler sensível foi criado sem autenticação.
[ ] DATABASE_URL não é exposto ao client.
[ ] Credenciais de storage não são expostas ao client.
[ ] Não há upload local inseguro.
[ ] TypeScript não foi enfraquecido.
[ ] ESLint não foi desabilitado para esconder erro.
[ ] Build/lint/typecheck foram executados ou a ausência foi documentada.
```

---

## Formato da resposta final da IA

Ao terminar, responder com:

```md
# Task 001 concluída

## O que foi feito

## Arquivos criados/alterados

## Dependências instaladas

## Estado de segurança

## Problemas encontrados

### P0

### P1

### P2

## Comandos executados

## Próxima task recomendada
```

---

## Próxima task esperada

Se esta task for concluída sem P0, a próxima task recomendada será:

```txt
/docs/tasks/002-modelagem-drizzle-e-migrations.md
```

Essa próxima task deve implementar o schema real do banco com produtos, categorias, tags, landing page, fotografia, depoimentos, FAQ, logos, configurações, tracking e audit logs.
