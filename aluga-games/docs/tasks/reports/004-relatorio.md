# Relatorio - Task 004: Shell do Site Publico e Layout Base

## Resumo executivo

A task 004 foi concluida sem P0. O shell publico do site foi criado em `/src/app/(site)` com layout publico, header responsivo, navegacao, footer institucional, container padrao, helper centralizado de WhatsApp e botao fixo de WhatsApp.

Os relatorios das tasks 001, 002 e 003 foram verificados antes da implementacao e nao havia P0 aberto. A implementacao nao criou LP final, produtos reais, filtros, CRUD, upload, dashboard, tracking, checkout, pagamento, login de cliente, area de cliente, favoritos, carrinho, pedidos, leads ou CRM.

## O que foi implementado

- Route group publico em `/src/app/(site)`.
- Layout publico dedicado com header, footer, main semantico e botao fixo de WhatsApp.
- Header desktop e menu mobile responsivo.
- Navegacao publica oficial.
- Footer institucional com links publicos e "Trabalhe conosco" via WhatsApp.
- Helper centralizado para montar links de WhatsApp.
- Paginas placeholder minimas para rotas publicas previstas.
- Ajuste visual global para direcao premium/corporativa em branco/off-white com verde AlugaGames.
- Separacao do `ClerkProvider` para os route groups de admin/auth, evitando carregar Clerk no shell publico.

## Arquivos criados

- `/src/app/(admin)/layout.tsx`
- `/src/app/(auth)/layout.tsx`
- `/src/app/(site)/layout.tsx`
- `/src/app/(site)/produtos/page.tsx`
- `/src/app/(site)/produtos/[slug]/page.tsx`
- `/src/app/(site)/fotografia/page.tsx`
- `/src/app/(site)/fotografia/[slug]/page.tsx`
- `/src/app/(site)/representante-alugagames/page.tsx`
- `/src/app/(site)/por-que-contratar/page.tsx`
- `/src/components/layout/admin-auth-provider.tsx`
- `/src/components/layout/site-container.tsx`
- `/src/components/layout/public-navigation.ts`
- `/src/components/layout/public-header.tsx`
- `/src/components/layout/mobile-navigation.tsx`
- `/src/components/layout/public-footer.tsx`
- `/src/components/layout/public-layout.tsx`
- `/src/components/site/whatsapp-floating-button.tsx`
- `/src/components/site/public-page-shell.tsx`
- `/src/domain/features/helpers.ts`
- `/docs/tasks/reports/004-relatorio.md`
- `/docs/tasks/reports/004-shell-site-publico-e-layout.md`

## Arquivos alterados

- `/src/app/layout.tsx`
- `/src/app/globals.css`
- `/src/app/(site)/page.tsx`

## Dependencias instaladas

Nenhuma dependencia nova foi instalada.

## Package manager usado

Bun.

## Estrutura de layout publico

- `/src/app/(site)/layout.tsx` usa `PublicLayout`.
- `PublicLayout` compoe `PublicHeader`, `main`, `PublicFooter` e `WhatsAppFloatingButton`.
- Os componentes reutilizaveis ficaram em `/src/components/layout` e `/src/components/site`; a montagem de WhatsApp foi posteriormente centralizada em `/src/domain/features/build-whatsapp-url.ts` e `/src/domain/features/helpers.ts`.
- O provider do Clerk foi mantido fora do shell publico e aplicado apenas nos layouts de `(admin)` e `(auth)`.

## Componentes criados

- `SiteContainer`
- `PublicLayout`
- `PublicHeader`
- `MobileNavigation`
- `PublicFooter`
- `WhatsAppFloatingButton`
- `PublicPageShell`
- `AdminAuthProvider`

## Rotas publicas preparadas

- `/`: pagina inicial com shell visual base e CTAs de WhatsApp.
- `/produtos`: placeholder minimo para futura pagina de atracoes.
- `/produtos/[slug]`: rota preparada com `notFound()` ate a feature real existir.
- `/fotografia`: placeholder minimo para futura area de fotografia.
- `/fotografia/[slug]`: rota preparada com `notFound()` ate a feature real existir.
- `/representante-alugagames`: placeholder minimo institucional.
- `/por-que-contratar`: placeholder minimo institucional.

## Navegacao implementada

- Header desktop com links para Inicio, Atracoes, Fotografia, Por que contratar e Representante.
- CTA "Solicitar proposta" para WhatsApp.
- Menu mobile com botao acessivel, estado local em Client Component e os mesmos links publicos.
- Navegacao interna usa `next/link`.

## Footer implementado

O footer contem:

- Logo/nome AlugaGames.
- Texto institucional curto.
- Links para Atracoes, Fotografia, Por que contratar e Representante AlugaGames.
- Link "Trabalhe conosco" direto para WhatsApp.
- CTA "Falar no WhatsApp".

Instagram nao foi incluido porque nao ha configuracao validada nesta task.

## Botao de WhatsApp

- O helper centralizado de WhatsApp agora fica em `src/domain/features/helpers.ts`.
- Mensagem geral usada: "Ola, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para o meu evento."
- O numero vem de `clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Se o numero estiver vazio, o helper gera fallback seguro `https://wa.me/?text=...`.
- Nao foi criado tracking de WhatsApp.
- Nao foi criado formulario antes do WhatsApp.
- Nenhum segredo foi hardcoded.

## Responsividade

- Header desktop e menu mobile implementados.
- CTAs da home ajustadas para mobile sem sobrepor o botao fixo de WhatsApp.
- Capturas manuais geradas com Chromium:
  - `/tmp/alugagames-home-mobile-small-final.png`
  - `/tmp/alugagames-home-mobile-final.png`
  - `/tmp/alugagames-home-desktop-final.png`

## Acessibilidade basica

- Header, nav, main e footer usam estrutura semantica.
- Menu mobile usa `aria-label`, `aria-expanded` e `aria-controls`.
- Links e botoes possuem estilos de foco visivel.
- Icones decorativos usam `aria-hidden`.
- Botao fixo de WhatsApp possui `aria-label`.

## O que ficou fora do escopo

Nao foram implementados:

- LP final completa.
- Conteudo final da LP.
- Pagina real de produtos.
- Filtros de produtos.
- Pagina individual real de produto.
- Fotografia real por albuns.
- CRUD admin.
- Dashboard admin.
- Upload.
- Railway Buckets.
- Tracking de WhatsApp.
- Checkout.
- Pagamento.
- Login de cliente.
- Area de cliente.
- Favoritos.
- Carrinho tradicional.
- Pedidos.
- Leads.
- CRM.

## Seguranca

- Secrets expostos: nao.
- Banco importado em Client Component: nao.
- Server Action criada: nao.
- Route Handler criado: nao.
- Checkout/pagamento/login de cliente criado: nao.
- Termos de e-commerce usados na UI: nao.

Checagens adicionais:

- HTML publico final sem `Clerk`, `secretKey`, `DATABASE_URL` ou termos proibidos.
- Shell publico sem `dangerouslySetInnerHTML`.
- Shell publico sem importacao de `server/db`, Drizzle ou Postgres.
- `requireAdmin()` e `proxy.ts` nao foram alterados.

## Comandos executados

- `bun run lint`: passou.
- `bun run typecheck`: passou.
- `bun run build`: falhou dentro do sandbox por erro ambiental do Turbopack (`Operation not permitted` ao criar processo/vincular porta).
- `bun run build` com permissao elevada: passou.
- `bun run dev -- -p 3001`: executado para validacao manual em `http://localhost:3001`.
- `curl -I http://localhost:3001/`: 200.
- `curl -I http://localhost:3001/produtos`: 200.
- `curl -I http://localhost:3001/fotografia`: 200.
- `curl -I http://localhost:3001/por-que-contratar`: 200.
- `curl -I http://localhost:3001/representante-alugagames`: 200.
- `curl -I http://localhost:3001/produtos/exemplo`: 404 esperado para placeholder dinamico.
- `curl -I http://localhost:3001/fotografia/exemplo`: 404 esperado para placeholder dinamico.
- `rg` para termos de e-commerce/secrets no HTML publico e shell publico: sem ocorrencias.
- `rg` para importacao de banco/Drizzle/Postgres no shell publico: sem ocorrencias.
- `find src/app` para `route.ts` e `actions.ts`: nenhum arquivo encontrado.
- `chromium --headless ...`: capturas mobile/desktop geradas; precisou de permissao elevada por restricao do sandbox.

## Testes manuais

- Home renderiza com header e footer: sim.
- Menu desktop funciona: sim.
- Menu mobile funciona: sim.
- Link de WhatsApp existe: sim.
- Footer contem links esperados: sim.
- Nao ha elementos de e-commerce: sim.

## Problemas encontrados

### P0

Nenhum.

### P1

Nenhum.

### P2

1. `NEXT_PUBLIC_WHATSAPP_NUMBER` esta vazio no `.env.example`; ate haver numero validado/configuracao real, os links usam fallback seguro sem numero.
2. `bun run build` falha no sandbox restrito por limitacao ambiental do Turbopack, mas passa com permissao elevada sem alteracao de codigo.

## Riscos restantes

- As rotas dinamicas `/produtos/[slug]` e `/fotografia/[slug]` retornam 404 de forma intencional ate as features reais serem implementadas.
- O link de Instagram nao foi exibido por falta de configuracao validada.
- O conteudo dos placeholders deve ser substituido nas proximas tasks sem transformar o site em e-commerce.

## Pode seguir para a task 005?

Sim. A task 004 cumpre os criterios de aceite e nao ha P0 aberto.
