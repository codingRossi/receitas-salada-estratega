# AlugaGames — Site Institucional, Catálogo e Portal Admin

Este repositório contém o novo sistema da **AlugaGames**: um site institucional premium com catálogo de produtos para eventos, página de fotografia e portal administrativo para gestão de conteúdo.

O sistema **não é um e-commerce**. Não existe checkout, pagamento online, pedido fechado no site, login de cliente ou área do cliente. O fluxo comercial termina no **WhatsApp**.

---

## 1. Objetivo do sistema

Criar uma presença digital moderna, profissional e gerenciável para a AlugaGames, permitindo que visitantes encontrem produtos e atrações para eventos e entrem em contato pelo WhatsApp.

O dono da AlugaGames deve conseguir gerenciar, pelo painel administrativo:

- produtos;
- categorias;
- tags;
- imagens dos produtos;
- blocos da landing page;
- produtos em destaque;
- álbuns de fotografia;
- depoimentos;
- FAQs;
- logos/clientes;
- configurações gerais do site;
- número e mensagens de WhatsApp.

---

## 2. Regras centrais do produto

Estas regras são inegociáveis:

1. O site não é e-commerce.
2. Produtos não exibem preço público.
3. Não existe checkout.
4. Não existe pagamento online.
5. Não existe login de cliente.
6. Não existe área do cliente.
7. Não existe pedido fechado pelo site.
8. O fluxo principal é produto ou lista de produtos selecionados → WhatsApp.
9. A lista de produtos selecionados não é carrinho de compra.
10. O admin é usado apenas pelo dono.
11. O admin deve ser protegido por Clerk.
12. Toda ação administrativa deve validar autorização no servidor.
13. Imagens devem ser armazenadas em object storage, preferencialmente Railway Buckets.
14. A LP deve ser editável por blocos controlados, não por page builder livre.
15. Segurança tem prioridade máxima.

---

## 3. Stack técnica

Stack definida para o projeto:

- **Next.js App Router**
- **TypeScript**
- **PostgreSQL**
- **Drizzle ORM**
- **Clerk** para autenticação do admin
- **Tailwind CSS**
- **shadcn/ui** ou componentes equivalentes
- **Zod** para validação
- **Railway** para deploy
- **Railway PostgreSQL** para banco
- **Railway Buckets** ou object storage compatível com S3 para mídias

---

## 4. Estrutura esperada do projeto

A estrutura recomendada é simples, mas separa responsabilidades:

```txt
src/
  app/
    (site)/
      page.tsx
      produtos/
        page.tsx
        [slug]/page.tsx
      fotografia/
        page.tsx
        [slug]/page.tsx
      representante-alugagames/
        page.tsx
      por-que-contratar/
        page.tsx

    (admin)/
      admin/
        page.tsx
        produtos/
        categorias/
        tags/
        landing-page/
        fotografia/
        depoimentos/
        faq/
        logos/
        configuracoes/

    api/
      upload/
        route.ts
      tracking/
        whatsapp/
          route.ts

  features/
    catalog/
    landing-page/
    photography/
    testimonials/
    faq/
    clients/
    whatsapp/
    quote-list/
    admin/

  components/
    ui/
    layout/
    forms/

  server/
    auth/
    db/
    storage/

  lib/
```

Regra importante: `page.tsx` deve montar telas. Regra de negócio, validação, acesso ao banco e autorização devem ficar fora das páginas.

---

## 5. Rotas públicas

Rotas principais do site:

```txt
/                         Landing page
/produtos                 Página única com todos os produtos
/produtos/[slug]          Página individual de produto
/fotografia               Galeria de álbuns/eventos
/fotografia/[slug]        Álbum individual
/representante-alugagames Página institucional estática
/por-que-contratar        Página institucional estática
```

O link “Trabalhe conosco” deve ficar no footer e levar diretamente para o WhatsApp com mensagem estática.

---

## 6. Rotas administrativas

Rotas principais do portal admin:

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
/admin/logos
/admin/configuracoes
```

Toda rota `/admin` precisa exigir autenticação via Clerk.

Além disso, toda ação sensível no servidor precisa validar autorização com uma função equivalente a:

```ts
await requireAdmin()
```

Proteção visual no frontend não é suficiente.

---

## 7. Admin e segurança

O admin é usado apenas pelo dono do sistema.

A autorização deve ser feita por allowlist de usuário autorizado, usando variável de ambiente:

```txt
CLERK_ADMIN_USER_IDS=
```

Regras obrigatórias:

- usar Clerk para login;
- proteger `/admin` no middleware;
- validar autorização em Server Actions;
- validar autorização em Route Handlers sensíveis;
- validar todo input com Zod;
- nunca confiar em dados do client;
- nunca expor stack trace para o usuário;
- nunca commitar secrets;
- registrar logs administrativos em ações relevantes.

---

## 8. Produtos

Um produto representa uma atração, brinquedo, equipamento, serviço ou experiência da AlugaGames.

Campos esperados:

- nome;
- slug;
- descrição curta;
- descrição completa;
- status: ativo, inativo ou indisponível;
- categorias;
- tags;
- imagens;
- vídeo por URL externa, opcional;
- indicações de evento;
- informações técnicas opcionais;
- SEO title;
- SEO description;
- destaque na LP;
- ativo/inativo.

Produtos podem pertencer a múltiplas categorias e múltiplas tags.

Produtos não exibem preço público.

---

## 9. Página de produtos

A página `/produtos` deve exibir todos os produtos em uma única experiência, com filtros.

Filtros previstos:

- busca por nome;
- categoria;
- tags;
- indicação de evento;
- status disponível/indisponível;
- destaque;
- tipo de público: infantil, adulto, corporativo, escolar, condomínio.

Não devem existir páginas públicas separadas como:

```txt
/inflaveis
/lista-de-jogos
/maquinas
```

Tudo é produto e fica centralizado em `/produtos`.

---

## 10. Lista de produtos selecionados

O visitante pode selecionar produtos para enviar uma lista ao WhatsApp.

Essa lista:

- fica no client;
- pode usar localStorage;
- não exige login;
- não gera pedido;
- não gera orçamento no banco;
- não tem pagamento;
- não é checkout;
- deve permitir alterar quantidade;
- deve permitir remover produtos;
- deve montar uma mensagem de WhatsApp com os produtos selecionados.

Linguagem recomendada:

- “Lista de produtos”;
- “Produtos selecionados”;
- “Enviar pelo WhatsApp”;
- “Solicitar atendimento”.

Evitar linguagem de e-commerce:

- “comprar”;
- “checkout”;
- “pagamento”;
- “pedido”;
- “finalizar compra”.

---

## 11. WhatsApp

O WhatsApp é o principal canal de conversão.

Exemplos de mensagens:

Produto individual:

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre o produto: [nome do produto].
```

Lista de produtos:

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre estes produtos:

- [Produto 1] — quantidade: 1
- [Produto 2] — quantidade: 2

Pode me passar mais informações?
```

Trabalhe conosco:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse em trabalhar com vocês.
```

---

## 12. Landing page

A landing page deve seguir uma estética:

- premium;
- profissional;
- clara;
- moderna;
- com foco em eventos corporativos;
- com verde AlugaGames como cor de ação;
- com bastante respiro visual;
- com CTAs fortes para WhatsApp;
- sem aparência de loja virtual.

Blocos previstos:

- hero principal;
- logos de empresas/clientes;
- diferenciais;
- produtos ou atrações em destaque;
- blocos de soluções;
- como funciona;
- depoimentos;
- galeria/banner de eventos;
- FAQ;
- CTA final.

O admin deve conseguir editar a LP por blocos controlados, não por um page builder livre.

---

## 13. Fotografia

A página de fotografia serve para mostrar registros de eventos e produtos da AlugaGames.

Ela não é um serviço separado no fluxo comercial.

Modelo esperado:

- álbuns/eventos;
- cada álbum possui nome;
- tipo de evento;
- data opcional;
- cidade opcional;
- fotos;
- filtros/pesquisa para o visitante encontrar eventos.

---

## 14. SEO, performance e acessibilidade

O site público deve ser indexável.

Rotas públicas devem ter metadata adequada:

- title;
- description;
- canonical quando aplicável;
- Open Graph quando aplicável;
- sitemap;
- robots.

Rotas admin não devem indexar.

Imagens devem ser otimizadas e ter `alt` adequado.

Componentes interativos, como FAQ, drawer/lista de produtos e formulários administrativos, devem ser acessíveis por teclado e leitores de tela.

---

## 15. Variáveis de ambiente

Crie e mantenha um `.env.example` atualizado.

Exemplo base:

```txt
# App
NEXT_PUBLIC_SITE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_ADMIN_USER_IDS=

# Database
DATABASE_URL=

# Storage / Railway Buckets / S3-compatible
STORAGE_ENDPOINT=
STORAGE_REGION=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
STORAGE_PUBLIC_BASE_URL=

# WhatsApp
WHATSAPP_PHONE_NUMBER=
```

Nunca commitar `.env` real.

---

## 16. Scripts esperados

Os scripts reais devem ser confirmados no `package.json`, mas o projeto deve ter equivalentes a:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

Se o projeto usar `npm`, `yarn` ou `bun`, adapte os comandos mantendo a intenção.

---

## 17. Desenvolvimento com IA

Este projeto será desenvolvido majoritariamente com IA. Por isso, antes de implementar qualquer task, a IA deve ler:

```txt
docs/README.md
docs/product/*
docs/architecture/*
docs/security/*
docs/ui/*
docs/quality/*
docs/adr/*
docs/tasks/<task-atual>.md
```

Regras para a IA:

- implementar uma task por vez;
- não sair do escopo;
- não criar funcionalidades não pedidas;
- não remover segurança para resolver erro;
- não criar checkout;
- não criar pagamento;
- não criar login de cliente;
- não salvar imagem localmente no repo;
- não validar apenas no frontend;
- não criar rota admin sem proteção;
- não criar Server Action administrativa sem `requireAdmin()`;
- atualizar documentação quando necessário;
- gerar relatório ao final da task.

---

## 18. Ordem recomendada de implementação

A implementação deve seguir as tasks em `/docs/tasks`.

Ordem geral:

```txt
000 - Auditoria do repo
001 - Base técnica segura
002 - Modelagem Drizzle e migrations
003 - Seed inicial
004 - Shell público
005 - Componentes UI base
006 - Landing page pública
007 - Queries públicas de catálogo
008 - Página de produtos e filtros
009 - Página individual de produto
010 - Lista de produtos para WhatsApp
011 - Páginas institucionais estáticas
012 - Fotografia pública
013 - Admin shell e dashboard
014 - Admin categorias e tags
015 - Admin produtos
016 - Upload e mídias
017 - Admin LP/CMS
018 - Admin fotografia
019 - Admin depoimentos, FAQ e logos
020 - Admin configurações e WhatsApp
021 - Tracking WhatsApp e dashboard
022 - SEO, sitemap, robots e redirects
023 - Performance, acessibilidade e responsivo
024 - Testes
025 - Revisão de segurança / red team
026 - Deploy Railway
027 - Observabilidade, backups e incidentes
028 - Conteúdo inicial e migração
029 - Homologação final e handover
```

---

## 19. Definition of Done

Uma task só está pronta quando:

- cumpre exatamente o escopo;
- não implementa nada fora do escopo;
- passa lint/build/testes disponíveis;
- valida input no servidor;
- valida autorização no servidor quando aplicável;
- trata loading, sucesso e erro;
- não expõe secrets;
- não introduz XSS;
- não quebra SEO público;
- não quebra responsividade;
- atualiza docs quando necessário;
- gera relatório final da task.

Qualquer falha P0 de segurança bloqueia a task.

---

## 20. Documentação

A pasta `/docs` é parte central do projeto.

Estrutura esperada:

```txt
docs/
  README.md
  product/
  architecture/
  security/
  ui/
  quality/
  content/
  tasks/
    reports/
  adr/
  assets/
    references/
```

ADRs são decisões oficiais de arquitetura. Se uma mudança contrariar um ADR, um novo ADR deve ser criado ou o ADR existente deve ser atualizado conscientemente.

---

## 21. Critérios de sucesso do sistema

O sistema será considerado bem-sucedido se:

- o dono conseguir gerenciar o site corretamente pelo admin;
- visitantes conseguirem encontrar produtos com facilidade;
- visitantes conseguirem ir rapidamente para o WhatsApp;
- o site transmitir uma imagem premium e profissional;
- o site for seguro o suficiente para operação real;
- o código for simples, organizado e fácil de manter;
- o deploy em produção for estável;
- houver documentação suficiente para manutenção futura.

---

## 22. Aviso de segurança

Nenhum sistema é impossível de ser invadido. O objetivo deste projeto é reduzir riscos com boas práticas de arquitetura, autorização, validação, upload seguro, logs, backups e revisão constante.

Como o sistema será feito com IA, segurança não pode ser tratada como etapa final. Segurança faz parte de cada task.