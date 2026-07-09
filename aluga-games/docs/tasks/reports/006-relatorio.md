# Relatório - Task 006: Landing Page Pública

## Resumo executivo

A landing page pública foi implementada em `/src/app/(site)/page.tsx` usando Server Components, componentes reutilizáveis da task 005 e o helper centralizado de WhatsApp criado anteriormente. A página renderiza com visual premium/corporativo, foco em solicitação de proposta pelo WhatsApp e descoberta das atrações, sem fluxo de e-commerce.

Não foram encontrados P0. Pode seguir para a task 007.

## O que foi implementado

- Home pública com seções principais da landing page.
- Feature pública de leitura em `src/domain/features/retrieve-public-landing-page-content.ts`.
- Busca de rows isolada em `src/domain/features/retrieve-public-landing-page-rows.ts`.
- Fallback seguro isolado em `src/domain/features/retrieve-fallback-landing-page.ts`.
- Fallback seguro para a home continuar renderizando quando o banco estiver indisponível ou sem conteúdo publicável.
- Consulta de dados ativos/publicáveis para blocos da LP, produtos destacados, logos, depoimentos, FAQs, galeria e configuração de WhatsApp.
- Composição visual responsiva com CTAs para WhatsApp e `/produtos`.

## Arquivos criados

- `src/domain/entities/landing-page.ts`
- `src/domain/entities/index.ts`
- `src/domain/contracts/landing-page-repositories.ts`
- `src/domain/contracts/index.ts`
- `src/domain/contents/landing-page-fallback-content.ts`
- `src/domain/features/helpers.ts`
- `src/domain/features/build-whatsapp-url.ts`
- `src/domain/features/retrieve-static-whatsapp-message.ts`
- `src/domain/features/retrieve-public-landing-page-content.ts`
- `src/domain/features/retrieve-public-landing-page-rows.ts`
- `src/domain/features/retrieve-fallback-landing-page.ts`
- `src/infra/repositories/drizzle-landing-page-repository.ts`
- `src/infra/repositories/index.ts`
- `src/controllers/landing-page-controller.ts`
- `src/main/factories/repositories.ts`
- `src/main/factories/features.ts`
- `src/main/factories/controller.ts`
- `src/components/site/landing-page/index.ts`
- `src/components/site/landing-page/landing-page.tsx`
- `src/components/site/landing-page/hero-section.tsx`
- `src/components/site/landing-page/client-logos-section.tsx`
- `src/components/site/landing-page/why-choose-us-section.tsx`
- `src/components/site/landing-page/featured-products-section.tsx`
- `src/components/site/landing-page/solutions-section.tsx`
- `src/components/site/landing-page/how-it-works-section.tsx`
- `src/components/site/landing-page/testimonials-section.tsx`
- `src/components/site/landing-page/event-gallery-section.tsx`
- `src/components/site/landing-page/faq-section.tsx`
- `src/components/site/landing-page/final-cta-section.tsx`
- `docs/tasks/reports/006-relatorio.md`
- `docs/tasks/reports/006-landing-page-publica.md`

## Arquivos alterados

- `src/app/(site)/page.tsx`
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/02-modelo-de-dominio.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/architecture/08-seguranca.md`
- `docs/ui/01-site-publico.md`

## Ajuste posterior de organização

Os componentes React da landing page foram movidos de `src/features/landing-page/components` para `src/components/site/landing-page`, seguindo a regra de arquitetura de que componentes ficam em `/src/components`.

Em ajuste posterior, as antigas features de runtime foram movidas para `src/domain/features`, as entidades compartilhadas para `src/domain/entities`, os contratos de persistência para `src/domain/contracts` e o acesso direto ao banco para `src/infra/repositories`.

O padrão atual usa uma feature por arquivo e nome por ação:

- `retrieve-public-landing-page-content.ts` monta o DTO público da home.
- `retrieve-public-landing-page-rows.ts` concentra as leituras de rows da landing page.
- `retrieve-fallback-landing-page.ts` devolve o conteúdo seguro quando o banco falha.
- `build-whatsapp-url.ts` monta URLs públicas de WhatsApp.
- `retrieve-static-whatsapp-message.ts` concentra mensagens estáticas.

As instâncias concretas ficam no composition root `src/main/factories`, separado em `repositories.ts`, `features.ts` e `controller.ts`.

Validação após o ajuste:

- `bun run lint`: passou com 3 warnings já conhecidos de `@next/next/no-img-element`.
- `bun run typecheck`: passou.
- `bun run build`: passou.

## Dependências instaladas

Nenhuma.

## Package manager usado

Bun.

## Seções da landing page

- Hero principal com headline, subtítulo, CTA primário para WhatsApp e CTA secundário para `/produtos`.
- Logos/clientes com fallback neutro quando não houver logos validados.
- Diferenciais da AlugaGames.
- Atrações em destaque com repository pequeno para produtos ativos e destacados.
- Soluções por contexto.
- Como funciona.
- Depoimentos com fallback sem inventar pessoa, cargo ou empresa real.
- Galeria/banner de eventos com fallback visual seguro.
- FAQ em lista sem HTML livre.
- CTA final para WhatsApp.

## Dados do banco utilizados

A feature pública busca somente dados ativos/publicáveis por meio de repositories:

- `landing_page_blocks`
- `landing_page_block_items`
- `products`
- `product_media`
- `media_assets`
- `client_logos`
- `testimonials`
- `faqs`
- `gallery_albums`
- `gallery_photos`
- `site_settings`

Produtos destacados são filtrados por `status = active`, `isFeatured = true` e `deletedAt IS NULL`.

## Fallbacks implementados

- Conteúdo institucional genérico para blocos da LP.
- Empty state para produtos destacados quando não houver produtos ativos destacados.
- Mensagem neutra para logos não cadastrados.
- Mensagem neutra para depoimentos não cadastrados.
- Itens visuais genéricos para galeria sem mídia real.
- FAQs institucionais seguras.
- Fallback de WhatsApp sem número quando `NEXT_PUBLIC_WHATSAPP_NUMBER` ou configuração pública não estiver disponível.

## Produtos em destaque

A seção usa dados reais somente quando houver produtos ativos e destacados no banco. Sem produtos destacados, a home exibe CTA para `/produtos` e não cria produtos falsos.

## CTAs de WhatsApp

Os CTAs usam `buildWhatsAppUrl()` exposto pela feature `src/domain/features/build-whatsapp-url.ts` e pelos helpers de WhatsApp em `src/domain/features/helpers.ts`. Como `NEXT_PUBLIC_WHATSAPP_NUMBER` não está configurado no ambiente local, os links renderizados usam fallback seguro `https://wa.me/?text=...`.

## Responsividade

Validada por captura em desktop (`1440x1200`) e mobile (`390x1200` e `390x3200`) com Chromium headless. A home renderizou com seções empilhadas no mobile, sem quebra visual relevante.

## Acessibilidade básica

- Estrutura semântica com `section`, `h1`, `h2`, `h3`, `ul`, `ol` e `dl`.
- CTAs com texto visível e `rel="noopener noreferrer"` nos links externos.
- Imagens de conteúdo recebem `alt`.
- Ícones decorativos usam `aria-hidden`.
- FAQ renderizado como lista de definição acessível, sem acordeão customizado.

## O que ficou fora do escopo

- Editor admin da LP.
- Page builder livre.
- CRUD.
- Upload.
- Railway Buckets.
- Dashboard admin.
- Formulário de orçamento.
- Tracking de WhatsApp.
- Página real de produtos com filtros.
- Página individual real de produto.
- Fotografia real por álbuns.
- Checkout.
- Pagamento.
- Login de cliente.
- Área de cliente.
- Favoritos.
- Carrinho tradicional.
- Pedido fechado no site.
- Leads.
- CRM.

## Segurança

- Secrets expostos: não
- Banco importado em Client Component: não
- Server Action criada: não
- Route Handler criado: não
- dangerouslySetInnerHTML usado: não
- Checkout/pagamento/login de cliente criado: não
- Termos de e-commerce usados na UI: não

Observações:

- `feature.ts` usa `server-only`.
- A conexão com banco é importada dinamicamente apenas no servidor e somente quando `DATABASE_URL` existe.
- A busca pública retorna apenas dados ativos/publicáveis.
- Não houve mutação, endpoint novo, alteração de autenticação, alteração de `requireAdmin()` ou alteração de `proxy.ts`.

## Comandos executados

- `bun run lint`: passou com 3 warnings de `@next/next/no-img-element`.
- `bun run typecheck`: falhou inicialmente por narrow de enum `custom_editorial`; corrigido com type guard e passou na execução final.
- `bun run build`: passou.
- `bun run dev -- --port 3001`: passou; servidor local em `http://localhost:3001`.
- `curl -I http://localhost:3001/`: passou; HTTP 200.
- `curl -sL -o /tmp/alugagames-task006-home.html http://localhost:3001/`: passou.
- `rg` de termos proibidos no código e no HTML renderizado: sem ocorrências.
- `rg` de secrets/variáveis sensíveis no HTML renderizado: sem ocorrências.
- `bun --eval` para verificar status de ambiente: `DATABASE_URL` configurada localmente; `NEXT_PUBLIC_WHATSAPP_NUMBER` ausente.
- `chromium` headless para screenshots: primeira execução no sandbox falhou por permissão do Crashpad; execução autorizada fora do sandbox passou.

## Testes manuais

- Home renderiza sem dados no banco: não testado em banco limpo; fallback foi implementado no código e a home renderizou sem produtos/logos/depoimentos reais.
- Home renderiza com seed: não testado; não foi executado seed nesta task.
- CTAs de WhatsApp funcionam: sim, links `wa.me` renderizados com mensagem segura.
- Responsividade verificada: sim, por screenshots desktop e mobile.
- Não parece e-commerce: sim.

## Problemas encontrados

### P0

Nenhum.

### P1

Nenhum.

### P2

1. `NEXT_PUBLIC_WHATSAPP_NUMBER` não está configurado no ambiente local; os links usam fallback seguro sem número.
2. Não houve validação com banco limpo/seed nesta task; o comportamento com conteúdo real cadastrado deve ser validado quando houver ambiente de dados apropriado.
3. O lint passa com warnings por uso de `<img>` em imagens vindas do CMS/storage; avaliar `next/image` quando os domínios finais de mídia estiverem definidos.

## Riscos restantes

- Conteúdo real de logos, depoimentos, fotos e produtos depende do admin/CMS e de dados ativos no banco.
- A home faz fallback em caso de erro de banco para preservar renderização pública; observabilidade de falhas de conteúdo deve ser avaliada em etapa futura.
- O WhatsApp ainda precisa de número público configurado em ambiente real.

## Pode seguir para a task 007?

Sim. A task 006 não deixou P0 aberto, os comandos obrigatórios passaram, e a landing page foi implementada sem criar funcionalidades fora do escopo.
