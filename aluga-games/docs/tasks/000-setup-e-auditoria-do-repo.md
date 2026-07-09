# Task 000 — Setup e Auditoria do Repositório

## Objetivo

Auditar o repositório Next.js existente antes de iniciar a implementação do novo site da AlugaGames, garantindo que a IA compreenda a estrutura atual, o estado real do projeto, os riscos técnicos e as pendências de setup.

Esta task deve preparar o terreno para as próximas tasks sem implementar funcionalidades de produto, sem criar telas finais e sem reorganizar o projeto de forma agressiva.

## Contexto do produto

O sistema será um site institucional premium para a AlugaGames, com catálogo de produtos, página de produtos filtrável, páginas institucionais, fotografia por álbuns, lista simples de produtos para WhatsApp e portal administrativo protegido por Clerk.

O projeto deve usar:

- Next.js com App Router.
- TypeScript.
- Drizzle ORM.
- PostgreSQL.
- Clerk para autenticação do admin.
- Railway para deploy.
- Railway Buckets ou object storage compatível com S3 para imagens.
- Tailwind CSS e componentes reutilizáveis.
- Server Actions para mutações administrativas.
- Route Handlers apenas quando necessário, como upload e tracking.

## Documentos obrigatórios de leitura

Antes de executar esta task, leia:

```txt
/docs/README.md
/docs/adr/README.md
/docs/product/00-visao-do-produto.md
/docs/product/02-escopo-do-produto.md
/docs/product/03-regras-de-negocio.md
/docs/architecture/00-stack-e-decisoes.md
/docs/architecture/01-arquitetura-de-pastas.md
/docs/architecture/03-banco-de-dados.md
/docs/architecture/07-autenticacao-e-autorizacao.md
/docs/architecture/08-seguranca.md
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
/docs/quality/01-definition-of-done.md
/docs/quality/02-checklist-review-ai.md
```

## Escopo desta task

Esta task deve:

1. Auditar a estrutura atual do repositório.
2. Identificar o package manager usado.
3. Verificar se o projeto usa App Router.
4. Verificar se existe pasta `/src`.
5. Verificar versões e dependências principais.
6. Verificar configuração de TypeScript.
7. Verificar configuração de ESLint.
8. Verificar configuração de Tailwind.
9. Verificar se Clerk já está instalado/configurado.
10. Verificar se Drizzle já está instalado/configurado.
11. Verificar se existe configuração de banco PostgreSQL.
12. Verificar se existem variáveis de ambiente sensíveis expostas incorretamente.
13. Verificar se `.env` está ignorado pelo Git.
14. Verificar se existe estrutura de testes.
15. Verificar se existem rotas públicas e administrativas já criadas.
16. Verificar se existem APIs antigas, páginas antigas ou código legado que possam conflitar com o novo escopo.
17. Criar um relatório técnico da auditoria.
18. Propor a ordem segura das próximas tasks com base no estado real do repo.

## Fora do escopo desta task

Não implementar nesta task:

- Landing page final.
- Página de produtos.
- Página de produto individual.
- Portal admin.
- CRUD de produtos.
- CRUD de categorias.
- Upload de imagens.
- Autenticação completa.
- Banco de dados final.
- Migrações definitivas.
- Design system completo.
- Refatoração ampla.
- Exclusão de código legado sem autorização explícita.

## Regra principal

Esta é uma task de auditoria e preparação.

A IA não deve sair implementando o produto inteiro.

Se encontrar problemas estruturais, deve documentar e propor correção em tasks futuras.

## Procedimento técnico

### 1. Identificar package manager

Verifique qual arquivo existe:

```txt
pnpm-lock.yaml
package-lock.json
yarn.lock
bun.lockb
bun.lock
```

Use somente o package manager correspondente.

Se houver mais de um lockfile, registrar como risco técnico e recomendar padronização.

### 2. Auditar estrutura de pastas

Verifique se existem:

```txt
/src/app
/src/components
/src/domain
/src/infra
/src/lib
/src/server
/docs
```

Se não existirem, não sair criando tudo automaticamente sem necessidade. A estrutura pode ser criada progressivamente nas próximas tasks.

Registre:

- estrutura atual;
- rotas existentes;
- componentes existentes;
- arquivos de configuração importantes;
- possíveis conflitos com a arquitetura definida.

### 3. Verificar App Router

Confirmar existência de:

```txt
src/app/layout.tsx
src/app/page.tsx
```

ou:

```txt
app/layout.tsx
app/page.tsx
```

Se o projeto ainda usa `pages/`, registrar como risco e propor plano de migração.

### 4. Auditar dependências

Verifique em `package.json` se existem dependências relacionadas a:

```txt
next
react
react-dom
typescript
tailwindcss
eslint
drizzle-orm
drizzle-kit
postgres ou pg
@clerk/nextjs
zod
react-hook-form
@hookform/resolvers
lucide-react
```

Não instalar dependências automaticamente nesta task, exceto se o usuário ou task futura pedir explicitamente.

### 5. Auditar scripts

Verifique se existem scripts para:

```txt
dev
build
start
lint
typecheck
test
db:generate
db:migrate
db:studio
```

Registre scripts ausentes.

### 6. Auditar variáveis de ambiente

Verifique se existem exemplos como:

```txt
.env.example
.env.local.example
```

Verifique se `.env`, `.env.local` e arquivos sensíveis estão no `.gitignore`.

Nunca exibir valores reais de variáveis de ambiente no relatório.

Se encontrar secrets reais em arquivos versionáveis, classificar como problema P0.

### 7. Auditar Clerk

Verifique se existe:

```txt
proxy.ts
src/proxy.ts
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```

Verifique se há proteção planejada ou existente para `/admin`.

Não confiar apenas em proteção visual no frontend.

Registrar se existe ou não função equivalente a:

```txt
requireAdmin()
```

### 8. Auditar Drizzle

Verifique se existe:

```txt
drizzle.config.ts
src/server/db
src/server/db/schema.ts
src/db
migrations
```

Registrar:

- se Drizzle está instalado;
- se existe schema;
- se existe conexão com PostgreSQL;
- se existem migrations;
- se existe banco já configurado.

### 9. Auditar upload/mídias

Verifique se o projeto já possui upload de imagens.

Se existir upload local em pasta pública, registrar como risco, especialmente se permitir arquivo enviado por admin direto em `/public/uploads` sem validação forte.

O destino recomendado é Railway Buckets ou object storage compatível com S3.

### 10. Auditar segurança básica

Verificar riscos como:

- secrets no código;
- rotas admin sem proteção;
- Server Actions sem autorização;
- Route Handlers sem autenticação;
- upload sem validação;
- uso de `dangerouslySetInnerHTML`;
- formulários sem validação server-side;
- queries SQL manuais sem proteção;
- mensagens de erro expondo stack trace;
- dados administrativos sendo buscados em client component sem necessidade.

### 11. Executar comandos disponíveis

Executar apenas comandos seguros:

```bash
<package-manager> lint
<package-manager> build
<package-manager> test
```

Se algum script não existir, registrar.

Se algum comando falhar, registrar:

- comando executado;
- erro principal;
- provável causa;
- impacto;
- task recomendada para correção.

Não mascarar falhas.

## Arquivo de saída obrigatório

Ao final, criar ou atualizar:

```txt
/docs/tasks/reports/000-auditoria-do-repo.md
```

Esse relatório deve conter:

```md
# Relatório — Task 000: Auditoria do Repositório

## Resumo executivo

## Estado atual do projeto

## Package manager identificado

## Estrutura de pastas encontrada

## App Router

## Dependências principais

## Scripts disponíveis

## Estado do Clerk

## Estado do Drizzle/PostgreSQL

## Estado de upload/mídias

## Estado de testes

## Riscos de segurança encontrados

## Problemas P0

## Problemas P1

## Problemas P2

## Recomendações

## Próximas tasks sugeridas

## Comandos executados

## Resultado dos comandos
```

## Classificação de problemas

### P0 — Bloqueia desenvolvimento seguro

Exemplos:

- secret real versionado;
- rota admin acessível sem autenticação;
- mutação administrativa sem autorização;
- upload inseguro aceitando qualquer arquivo;
- build completamente quebrado;
- projeto sem TypeScript funcional;
- dependências críticas incompatíveis.

### P1 — Deve ser corrigido antes de produção

Exemplos:

- lint quebrado;
- ausência de typecheck;
- ausência de `.env.example`;
- ausência de testes mínimos;
- estrutura de pastas confusa;
- duplicação grande;
- falta de padrão para Server Actions.

### P2 — Melhoria recomendada

Exemplos:

- nomes inconsistentes;
- componentes grandes demais;
- scripts auxiliares ausentes;
- documentação incompleta;
- pequenos ajustes de DX.

## Critérios de aceite

Esta task só estará pronta quando:

- O repositório tiver sido auditado.
- O package manager tiver sido identificado.
- App Router tiver sido confirmado ou o problema tiver sido registrado.
- Dependências principais tiverem sido verificadas.
- Estado de Clerk tiver sido documentado.
- Estado de Drizzle/PostgreSQL tiver sido documentado.
- Estado de upload/mídias tiver sido documentado.
- Scripts disponíveis tiverem sido listados.
- Comandos seguros tiverem sido executados quando existirem.
- Riscos de segurança tiverem sido classificados.
- O relatório `/docs/tasks/reports/000-auditoria-do-repo.md` tiver sido criado.
- Nenhuma funcionalidade fora do escopo tiver sido implementada.

## Regras de segurança para esta task

- Não imprimir secrets reais no relatório.
- Não commitar `.env`.
- Não alterar autenticação sem task específica.
- Não criar bypass temporário de login.
- Não desabilitar TypeScript, ESLint ou validações.
- Não remover regras de segurança para fazer build passar.
- Não criar upload local inseguro.

## Formato da resposta final da IA

Ao terminar, responder com:

```md
# Task 000 concluída

## O que foi feito

## Arquivos criados/alterados

## Estado do projeto

## Problemas encontrados

### P0

### P1

### P2

## Comandos executados

## Próxima task recomendada
```

## Observação importante

Se durante esta auditoria forem encontrados problemas P0, as próximas tasks de produto devem ser pausadas até que esses problemas sejam corrigidos.

Segurança vem antes de velocidade.
