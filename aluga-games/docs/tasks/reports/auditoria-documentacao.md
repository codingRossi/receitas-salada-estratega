# Auditoria da Documentação

## Resumo Executivo

A documentação ainda não está pronta para guiar desenvolvimento majoritariamente por IA com segurança. Existem ADRs corretos e vários documentos bem direcionados, mas há conflitos críticos em arquivos centrais, especialmente sobre stack, autenticação, storage, caminho da política de segurança e autorização administrativa.

Os maiores riscos são a IA seguir documentos antigos que recomendam Prisma/Auth.js/Cloudinary, implementar autorização por e-mail em vez de `CLERK_ADMIN_USER_IDS`, ignorar a política de desenvolvimento seguro por causa de caminho quebrado, ou criar fluxos de upload e rotas inconsistentes.

## Status Geral

- Pronta para desenvolvimento: Não
- Existem P0: Sim
- Existem P1: Sim
- Existem P2: Sim

Atualização posterior: o achado `P1-007` sobre estrutura e nomes de features foi resolvido nos documentos normativos. O padrão atual é uma feature por arquivo em `src/domain/features`, nomeada pela ação, com composição concreta em `src/main/factories`.

## Achados P0

### P0-001 - Documento central de stack contradiz ADRs e decisões verdadeiras

**Arquivos envolvidos:**
- `docs/architecture/00-stack-e-decisoes.md`
- `docs/adr/ADR-003-usar-clerk-para-autenticacao-admin.md`
- `docs/adr/ADR-004-usar-drizzle-com-postgresql.md`
- `docs/adr/ADR-005-usar-railway-buckets-para-midias.md`
- `docs/README.md`

**Problema:**
`docs/architecture/00-stack-e-decisoes.md` ainda recomenda ou lista Prisma, Auth.js e Cloudinary como stack principal/recomendada. Isso contradiz as decisões oficiais: PostgreSQL com Drizzle, Clerk para admin e Railway Buckets/object storage para imagens.

O problema é agravado porque `docs/README.md` orienta a leitura desse documento como base arquitetural. Uma IA pode tratar esse arquivo como fonte principal e implementar a stack errada.

**Impacto:**
Pode gerar instalação de dependências incorretas, autenticação própria com senha/sessão, storage fora da decisão oficial, modelos incompatíveis com Drizzle e retrabalho estrutural grande. Em segurança, Auth.js/email/senha para um admin que deveria ser Clerk aumenta superfície de ataque e contraria o escopo.

**Correção recomendada:**
Reescrever `docs/architecture/00-stack-e-decisoes.md` para:
- definir Drizzle + PostgreSQL como única decisão;
- definir Clerk como única autenticação;
- definir `CLERK_ADMIN_USER_IDS` como única allowlist administrativa;
- definir Railway Buckets/S3-compatible object storage como caminho oficial;
- remover Prisma/Auth.js/Cloudinary das recomendações;
- se citar alternativas rejeitadas, colocá-las em seção explícita de "não usar".

---

### P0-002 - Autorização administrativa usa variáveis e critérios contraditórios

**Arquivos envolvidos:**
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/architecture/07-autenticacao-e-autorizacao.md`
- `docs/architecture/08-seguranca.md`
- `docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `docs/adr/ADR-003-usar-clerk-para-autenticacao-admin.md`

**Problema:**
As decisões oficiais exigem allowlist do dono por `CLERK_ADMIN_USER_IDS`. Porém alguns documentos aceitam ou recomendam `OWNER_EMAIL`, `CLERK_OWNER_USER_ID`, `CLERK_USER_ID` ou `ADMIN_CLERK_USER_ID`.

Autorização por e-mail é especialmente perigosa como regra principal, porque e-mail é identificador mais frágil que `userId` do Clerk e pode induzir implementação inconsistente.

**Impacto:**
Uma IA pode implementar `requireAdmin()` com variável errada, fallback por e-mail, ou regra diferente em Server Actions e Route Handlers. Isso pode bloquear o dono em produção ou, pior, autorizar usuário errado.

**Correção recomendada:**
Padronizar todos os documentos para:

```env
CLERK_ADMIN_USER_IDS=user_xxx,user_yyy
```

Regras obrigatórias:
- `requireAdmin()` valida sempre o `userId` autenticado do Clerk contra `CLERK_ADMIN_USER_IDS`;
- se `CLERK_ADMIN_USER_IDS` estiver ausente ou vazio em produção, falhar fechado;
- e-mail pode ser usado apenas para exibição/log, nunca como autorização;
- remover `OWNER_EMAIL`, `CLERK_OWNER_USER_ID`, `CLERK_USER_ID` e `ADMIN_CLERK_USER_ID` como alternativas de autorização.

---

### P0-003 - Caminho obrigatório da política de segurança está quebrado em quase todas as tasks

**Arquivos envolvidos:**
- `docs/README.md`
- `docs/tasks/*.md`
- `docs/tasks/TEMPLATE.md`
- `docs/quality/00-estrategia-de-testes.md`
- `docs/quality/01-definition-of-done.md`
- `docs/quality/02-checklist-review-ai.md`
- `docs/ui/02-portal-admin.md`
- `docs/ui/03-seo-performance-acessibilidade.md`
- `docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`

**Problema:**
Muitos documentos mandam ler:

```md
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
```

Esse arquivo não existe. O arquivo real é:

```md
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
```

Além disso, `docs/architecture/09-env-deploy-railway.md` existe com outro assunto, o que pode confundir ainda mais a IA.

**Impacto:**
Como a política de desenvolvimento seguro é requisito transversal, o caminho quebrado pode fazer a IA ignorar o documento de segurança em todas as tasks. Isso enfraquece validação server-side, proteção de upload, autorização, uso de Zod, tratamento seguro de erros e revisão final.

**Correção recomendada:**
Corrigir todas as referências para:

```md
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
```

Também recomenda-se:
- atualizar `docs/tasks/TEMPLATE.md`;
- adicionar uma regra no `docs/README.md` dizendo que ADRs e documentos de `docs/security` têm precedência sobre docs antigas;
- opcionalmente criar um arquivo ponte no caminho antigo apenas apontando para o novo, para reduzir risco de quebra.

---

## Achados P1

### P1-001 - Documentos essenciais existem apenas como placeholder

**Arquivos envolvidos:**
- `docs/product/05-mapa-de-conteudo-cms.md`
- `docs/security/00-threat-model.md`
- `docs/architecture/09-env-deploy-railway.md`
- `docs/architecture/10-observabilidade-e-backup.md`
- `docs/content/00-tom-de-voz-e-copy.md`

**Problema:**
Há documentos críticos marcados como "Pendente de detalhamento". Eles cobrem justamente áreas de alto risco para IA: mapa de CMS, threat model, deploy/env, observabilidade/backup e tom de voz.

**Impacto:**
A IA terá que inferir campos editáveis, variáveis de ambiente, fluxo de deploy, incidentes, backup, limites de conteúdo e copy. Isso aumenta risco de escopo aberto, page builder livre, XSS em conteúdo editável, configuração errada de produção e ausência de plano operacional.

**Correção recomendada:**
Antes de iniciar implementação ampla, preencher esses documentos com decisões objetivas, listas de campos, regras de validação, fora do escopo, critérios de aceite e checklists.

---

### P1-002 - Terminologia "carrinho" e "lista de orçamento" ainda induz e-commerce

**Arquivos envolvidos:**
- `docs/product/00-visao-do-produto.md`
- `docs/product/02-escopo-do-produto.md`
- `docs/product/03-regras-de-negocio.md`
- `docs/architecture/02-modelo-de-dominio.md`
- `docs/ui/00-design-system.md`
- `docs/ui/01-site-publico.md`
- `docs/ui/03-seo-performance-acessibilidade.md`
- `docs/adr/ADR-006-nao-criar-ecommerce-checkout-pagamento.md`
- `docs/adr/ADR-009-lista-produtos-client-sem-persistencia-banco.md`

**Problema:**
Alguns documentos permitem chamar a funcionalidade de `carrinho` internamente ou usam "lista de orçamento / carrinho". Isso contradiz a intenção de evitar carrinho tradicional e pode induzir semântica de e-commerce.

**Impacto:**
A IA pode criar componentes, estados, nomes de rota, copy e comportamento parecidos com loja virtual: carrinho, finalizar pedido, item de carrinho, orçamento interno ou persistência indevida.

**Correção recomendada:**
Padronizar:
- "lista de produtos";
- "produtos selecionados";
- "enviar lista pelo WhatsApp";
- em código, preferir `selected-products`, `product-selection` ou `quote-list`, nunca `cart`.

Remover "carrinho" de títulos, contratos e exemplos, exceto quando estiver em seção explícita de "não usar".

---

### P1-003 - Páginas institucionais estáticas aparecem como editáveis em alguns docs

**Arquivos envolvidos:**
- `docs/product/02-escopo-do-produto.md`
- `docs/product/03-regras-de-negocio.md`
- `docs/product/04-user-stories.md`
- `docs/adr/ADR-010-paginas-institucionais-estaticas-inicialmente.md`

**Problema:**
ADR-010 e as decisões verdadeiras dizem que "Representante AlugaGames" e "Por que Contratar" são páginas institucionais estáticas inicialmente. Porém `docs/product/02` e `docs/product/03` deixam aberta ou sugerem edição pelo admin.

**Impacto:**
A IA pode criar CRUD/CMS para páginas que deveriam ser estáticas no MVP, aumentando escopo, banco, validação, admin e risco de XSS.

**Correção recomendada:**
Atualizar os docs de produto para dizer:
- essas páginas são estáticas no MVP;
- admin editável para elas está fora do escopo inicial;
- qualquer edição futura exige nova task/ADR.

---

### P1-004 - Escopo de "Sobre" e "Quem Somos" está ambíguo

**Arquivos envolvidos:**
- `docs/product/01-auditoria-site-atual.md`
- `docs/architecture/02-modelo-de-dominio.md`
- `docs/ui/00-design-system.md`
- `docs/ui/01-site-publico.md`
- `docs/ui/03-seo-performance-acessibilidade.md`

**Problema:**
Alguns documentos mencionam `/quem-somos`, "Sobre" ou página "Sobre" como possível página institucional. As decisões verdadeiras listam páginas institucionais, mas destacam inicialmente "Representante AlugaGames" e "Por que Contratar"; não há decisão clara para `/sobre` ou `/quem-somos`.

**Impacto:**
A IA pode criar rota, layout, sitemap, navegação e conteúdo extra fora do escopo.

**Correção recomendada:**
Definir explicitamente:
- `/sobre` e `/quem-somos` estão fora do MVP; ou
- uma delas entra no MVP, com slug, conteúdo, fonte e critério de aceite.

Até essa decisão, remover da navegação e sitemap.

---

### P1-005 - Slug da página "Por que Contratar" diverge

**Arquivos envolvidos:**
- `docs/product/01-auditoria-site-atual.md`
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/03-banco-de-dados.md`
- `docs/architecture/04-rotas-e-navegacao.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/ui/01-site-publico.md`
- `docs/ui/03-seo-performance-acessibilidade.md`
- `docs/tasks/001-base-tecnica-segura.md`

**Problema:**
Alguns documentos usam `/por-que-contratar`; outros usam `/por-que-contratar`.

**Impacto:**
Pode gerar links quebrados, sitemap incorreto, revalidação de cache errada, testes falhando e duplicação de rotas.

**Correção recomendada:**
Padronizar uma rota. Recomendação: usar `/por-que-contratar`, por ser mais legível e já aparecer em rotas/UI/tasks. Atualizar referências antigas a `/por-que-contratar`.

---

### P1-006 - Upload e tracking têm rotas e fluxos conflitantes

**Arquivos envolvidos:**
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/04-rotas-e-navegacao.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/architecture/06-upload-e-midias.md`
- `docs/architecture/07-autenticacao-e-autorizacao.md`
- `docs/architecture/08-seguranca.md`
- `docs/tasks/016-upload-e-midias-admin.md`
- `docs/tasks/021-tracking-whatsapp-dashboard.md`

**Problema:**
Os documentos citam rotas diferentes para a mesma finalidade:
- upload: `/api/uploads/presign`, `/api/uploads/presign`, `/api/uploads/presign`, `/api/uploads/presign`;
- tracking: `/api/whatsapp-clicks`, `/api/whatsapp-clicks`, `/api/whatsapp-clicks`.

Também há conflito de fluxo: upload via endpoint server-side recebendo arquivo vs presigned URL para envio direto ao bucket.

**Impacto:**
Upload é área crítica de segurança. Rotas divergentes podem levar a endpoints duplicados, falta de `requireAdmin()`, validação incompleta de MIME/tamanho/extensão, bucket exposto ou client falando direto com storage sem controle.

**Correção recomendada:**
Escolher um fluxo oficial e documentar em todos os lugares.

Opção recomendada para clareza:
- `POST /api/uploads/presign` protegido por `requireAdmin()`;
- upload direto ao bucket apenas com URL assinada, curta, MIME/tamanho/chave validados;
- Server Action posterior registra `media_asset` no banco;
- tracking público em `POST /api/whatsapp-clicks`, best-effort e com rate limit.

Se preferir endpoint server-side para upload, remover todas as menções ao presign como fluxo inicial.

---

### P1-007 - Estrutura de pastas e nomes de features divergem

**Arquivos envolvidos:**
- `docs/architecture/00-stack-e-decisoes.md`
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/02-modelo-de-dominio.md`
- `docs/ui/01-site-publico.md`

**Status posterior:** resolvido para os documentos normativos principais.

**Problema original:**
Os documentos alternavam entre pastas de feature por entidade, domínio visual ou módulo genérico.

**Impacto:**
A IA pode criar módulos paralelos, duplicar responsabilidades, espalhar queries/actions e dificultar manutenção.

**Correção aplicada:**
O padrão atual é:

- Uma feature por arquivo em `src/domain/features`.
- Nome de arquivo por ação, como `list-public-products.ts`, `retrieve-public-landing-page-content.ts` e `record-admin-audit-log.ts`.
- Factories de feature com `setup*Feature`, nunca `create*Feature`.
- Composition root em `src/main/factories/repositories.ts`, `features.ts` e `controller.ts`.
- Controllers recebem dependências por injeção e não instanciam repositories/features.

---

### P1-008 - Contrato `ActionResult` não está padronizado

**Arquivos envolvidos:**
- `docs/architecture/01-arquitetura-de-pastas.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/architecture/07-autenticacao-e-autorizacao.md`
- `docs/architecture/08-seguranca.md`
- `docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `docs/quality/02-checklist-review-ai.md`

**Problema:**
`docs/architecture/05` usa `ok: true/false`, enquanto outros documentos usam `success: true/false`.

**Impacto:**
Pode gerar actions com respostas incompatíveis, componentes duplicando tratamento de erro e testes inconsistentes.

**Correção recomendada:**
Escolher um formato único. Como `docs/architecture/05` é o documento de contratos, pode ser a fonte oficial:

```ts
type ActionResult<T = void> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; code: string; message: string; fieldErrors?: Record<string, string[]> };
```

Atualizar todos os exemplos para esse padrão.

---

### P1-009 - Modelagem de produto diverge entre schema, domínio e tasks

**Arquivos envolvidos:**
- `docs/architecture/02-modelo-de-dominio.md`
- `docs/architecture/03-banco-de-dados.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/tasks/002-modelagem-drizzle-e-migrations.md`

**Problema:**
Há divergências sobre campos e entidades:
- `status` vs `is_active` para produtos;
- `video_url` direto no produto vs tabela `product_videos`;
- "indicações de evento/público" como possível entidade própria vs tags tipadas;
- exclusão/desativação usando status em alguns lugares e `is_active` em outros.

**Impacto:**
Pode criar schema duplicado, migrações difíceis de corrigir, UI com campos que não existem e regras de disponibilidade inconsistentes.

**Correção recomendada:**
Fazer `docs/architecture/03-banco-de-dados.md` ser a fonte canônica e ajustar tasks/domínio/contratos para ela. Se a decisão for mudar o schema, atualizar primeiro o documento de banco e depois as tasks.

---

### P1-010 - Tasks não exigem leitura dos ADRs, apesar de serem decisões oficiais

**Arquivos envolvidos:**
- `docs/tasks/*.md`
- `docs/tasks/TEMPLATE.md`
- `docs/tasks/README.md`
- `docs/adr/README.md`
- `docs/README.md`

**Problema:**
As ADRs são decisões arquiteturais oficiais, mas as tasks normalmente listam docs obrigatórios sem incluir `docs/adr/README.md` ou ADRs relevantes.

**Impacto:**
A IA pode seguir documentos antigos e ignorar decisões oficiais, como "não criar e-commerce", "usar Clerk", "usar Drizzle", "LP por blocos controlados" e "lista no client".

**Correção recomendada:**
Atualizar `docs/tasks/TEMPLATE.md` e todas as tasks para incluir:
- `docs/adr/README.md`;
- ADRs relevantes da task;
- regra: ADRs prevalecem sobre documentos narrativos quando houver conflito.

---

### P1-011 - Documentos usam `proxy.ts`, mas o projeto usa Next.js 16

**Arquivos envolvidos:**
- `docs/tasks/000-setup-e-auditoria-do-repo.md`
- `docs/tasks/001-base-tecnica-segura.md`
- `docs/architecture/07-autenticacao-e-autorizacao.md`
- `docs/architecture/08-seguranca.md`
- `node_modules/next/dist/docs/01-app/03-file-conventions/proxy.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`

**Problema:**
O projeto usa Next.js 16. A documentação local do Next informa que `proxy` foi renomeado para `proxy` e que `proxy` está depreciado. Porém os docs do projeto ainda mandam criar/verificar `proxy.ts`.

**Impacto:**
A IA pode criar arquivo depreciado ou incompatível com a versão atual, além de confundir proteção de rota com autorização server-side.

**Correção recomendada:**
Atualizar docs para Next 16:
- usar `proxy.ts` quando falar da camada de interceptação de rotas;
- manter a regra de que Proxy não substitui `requireAdmin()`;
- se Clerk ainda exigir nomenclatura própria em sua lib atual, documentar explicitamente a adaptação.

---

### P1-012 - Ordem de execução não tem uma única fonte canônica

**Arquivos envolvidos:**
- `docs/README.md`
- `docs/tasks/README.md`
- `docs/tasks/*.md`

**Problema:**
`docs/README.md` e `docs/tasks/README.md` apresentam sequências de leitura/execução diferentes. Além disso, algumas tasks públicas dependem de dados/admin/upload/configurações que só aparecem depois, sem declarar claramente se devem usar seed, fallback ou implementação temporária.

**Impacto:**
Uma IA pode iniciar features antes de dependências críticas, criar dados temporários permanentes, ou implementar atalhos fora do padrão.

**Correção recomendada:**
Definir uma sequência canônica em `docs/tasks/README.md` e fazer `docs/README.md` apontar para ela. Em cada task, declarar dependências reais e o que deve ser mockado/seedado até a task posterior.

---

### P1-013 - LP por blocos controlados está decidida, mas o schema de blocos não está fechado

**Arquivos envolvidos:**
- `docs/adr/ADR-008-lp-editavel-por-blocos-controlados.md`
- `docs/product/05-mapa-de-conteudo-cms.md`
- `docs/product/04-user-stories.md`
- `docs/tasks/017-admin-landing-page-cms.md`
- `docs/architecture/03-banco-de-dados.md`
- `docs/architecture/08-seguranca.md`

**Problema:**
A decisão "blocos controlados, não page builder livre" está correta, mas falta um mapa autoritativo de tipos de bloco, campos editáveis, validações, limites de texto/imagem e regras de sanitização.

**Impacto:**
A IA pode criar um mini page builder, armazenar JSON livre demais, aceitar rich text sem sanitização ou permitir conteúdo que quebra layout/SEO.

**Correção recomendada:**
Completar o mapa de CMS com:
- lista fechada de block types;
- campos por bloco;
- limites de caracteres;
- campos que aceitam rich text e sanitizer permitido;
- relacionamento com produtos/mídias;
- comportamento de reordenação e status.

---

### P1-014 - Deploy, env, backup e incidente não estão suficientemente documentados

**Arquivos envolvidos:**
- `docs/architecture/09-env-deploy-railway.md`
- `docs/architecture/10-observabilidade-e-backup.md`
- `docs/tasks/026-deploy-railway-producao.md`
- `docs/tasks/027-observabilidade-backups-incidentes.md`
- `docs/tasks/029-homologacao-final-e-handover.md`

**Problema:**
As tasks de deploy e operação existem, mas os documentos arquiteturais que deveriam orientar variáveis, Railway, buckets, backup, restore, logs, incidentes e rollback estão vazios.

**Impacto:**
Risco de deploy com env incompleto, bucket mal configurado, logs insuficientes, falta de restore testado e ausência de plano para incidentes de upload/admin.

**Correção recomendada:**
Preencher os documentos antes das tasks 026/027 com:
- `.env.example` completo;
- variáveis Clerk, Drizzle, DB, S3/Railway Buckets;
- política de secrets;
- processo de migration/deploy;
- rollback;
- backups e restore;
- retenção de audit logs;
- plano de incidente.

---

## Achados P2

### P2-001 - Documento de tom de voz/copy está vazio

**Arquivos envolvidos:**
- `docs/content/00-tom-de-voz-e-copy.md`
- `docs/ui/01-site-publico.md`
- `docs/tasks/028-conteudo-inicial-e-migracao.md`

**Problema:**
A comunicação premium, corporativa e sem e-commerce depende de copy consistente, mas o documento de tom de voz ainda não define vocabulário, exemplos, termos proibidos e CTAs aprovados.

**Impacto:**
Pode haver variação de tom, uso de "comprar", "carrinho", "pagamento" e mensagens com cara de loja.

**Correção recomendada:**
Preencher o guia de copy com termos aprovados, termos proibidos, CTAs, exemplos de WhatsApp e tom premium/profissional.

---

### P2-002 - Documentos de produto mantêm "decisões pendentes" que já foram decididas

**Arquivos envolvidos:**
- `docs/product/00-visao-do-produto.md`
- `docs/adr/*.md`

**Problema:**
Há seções de decisões pendentes sobre temas que já têm ADR ou decisão verdadeira: storage, banco, autenticação, segurança, lista de produtos e LP editável.

**Impacto:**
A IA pode tratar decisões fechadas como abertas e propor mudanças desnecessárias.

**Correção recomendada:**
Atualizar a seção para "decisões resolvidas" com links para ADRs, ou remover itens já fechados.

---

### P2-003 - Índices e mapas de documentação estão desatualizados

**Arquivos envolvidos:**
- `docs/README.md`
- `docs/TREE.md`
- `docs/tasks/README.md`
- `docs/adr/README.md`

**Problema:**
Os índices não deixam suficientemente claro que ADRs e segurança prevalecem sobre documentos antigos. Também há caminhos desatualizados.

**Impacto:**
Leitura fora de ordem pode levar a conclusões erradas.

**Correção recomendada:**
Atualizar índices com:
- ordem canônica de leitura;
- precedência dos ADRs;
- links reais;
- status "placeholder" visível para documentos incompletos.

---

### P2-004 - Alguns exemplos de UI ainda usam termos proibidos

**Arquivos envolvidos:**
- `docs/ui/01-site-publico.md`
- `docs/ui/03-seo-performance-acessibilidade.md`
- `docs/ui/00-design-system.md`

**Problema:**
Há exemplos como "Adicionar ao carrinho" usados em contexto de não usar ou comparação. Mesmo quando a intenção é negativa, a presença do termo em exemplos grandes pode induzir geração automática errada.

**Impacto:**
Modelos de IA podem copiar o texto proibido para a UI.

**Correção recomendada:**
Mover termos proibidos para uma seção curta "não usar" e evitar wireframes com esses labels. Usar exemplos corretos nos componentes.

---

### P2-005 - Tracking de WhatsApp precisa reforçar comportamento best-effort

**Arquivos envolvidos:**
- `docs/ui/01-site-publico.md`
- `docs/architecture/05-contratos-de-actions-e-apis.md`
- `docs/tasks/021-tracking-whatsapp-dashboard.md`

**Problema:**
Alguns trechos dizem para registrar clique antes de abrir o WhatsApp. A intenção correta aparece em outros lugares, mas deve ficar explícita: tracking nunca deve bloquear conversão.

**Impacto:**
Falha no endpoint de tracking pode atrasar ou impedir abertura do WhatsApp.

**Correção recomendada:**
Padronizar: registrar clique em best-effort, com timeout curto, sem coletar dados pessoais desnecessários e sem bloquear o link do WhatsApp.

---

### P2-006 - Scripts de qualidade usam exemplos que não batem com o projeto atual

**Arquivos envolvidos:**
- `docs/tasks/001-base-tecnica-segura.md`
- `docs/quality/00-estrategia-de-testes.md`
- `package.json`

**Problema:**
Alguns docs sugerem `next lint`, mas o projeto atual usa script `lint: eslint`. A task 001 até alerta para adaptar, mas os documentos de qualidade deveriam refletir o setup real.

**Impacto:**
Pode gerar comandos inválidos em CI ou tasks.

**Correção recomendada:**
Atualizar exemplos para os scripts reais do `package.json` ou documentar um padrão a ser criado.

---

### P2-007 - Numeração/título da política de segurança confunde a organização

**Arquivos envolvidos:**
- `docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `docs/README.md`

**Problema:**
O arquivo está em `docs/security/01...`, mas o título interno começa com "09". Isso parece resíduo de outro caminho e contribui para as referências erradas.

**Impacto:**
Confusão de navegação e manutenção.

**Correção recomendada:**
Renomear o título para `# 01 - Políticas de Desenvolvimento Seguro com IA` e corrigir links.

---

### P2-008 - Nomes de relatórios das tasks não seguem padrão único

**Arquivos envolvidos:**
- `docs/tasks/000-setup-e-auditoria-do-repo.md`
- `docs/tasks/001-base-tecnica-segura.md`
- `docs/tasks/002-modelagem-drizzle-e-migrations.md`
- `docs/tasks/*.md`

**Problema:**
Algumas tasks pedem relatório com nome descritivo, outras `00x-relatorio.md`. Isso é menor, mas reduz previsibilidade.

**Impacto:**
A IA pode criar relatórios com nomes diferentes ou sobrescrever arquivos.

**Correção recomendada:**
Padronizar em `docs/tasks/reports/NNN-slug-da-task.md`.

---

### P2-009 - Há typos e instruções defensivas que podem ser simplificadas

**Arquivos envolvidos:**
- `docs/tasks/001-base-tecnica-segura.md`

**Problema:**
A task cita `drizzzle-orm`/`drizzzle-kit` e depois corrige para `drizzle`. Embora a intenção seja preventiva, isso introduz ruído.

**Impacto:**
Baixo, mas uma IA pode copiar o typo.

**Correção recomendada:**
Remover nomes errados do bloco de dependências e manter apenas um aviso textual: "não escrever `drizzzle`".

---

## Inconsistências entre ADRs e docs

- ADR-003 define Clerk + `CLERK_ADMIN_USER_IDS`; `docs/architecture/00-stack-e-decisoes.md` recomenda Auth.js, e `docs/architecture/01`/`05` aceitam outras variáveis.
- ADR-004 define Drizzle + PostgreSQL; `docs/architecture/00-stack-e-decisoes.md` recomenda Prisma.
- ADR-005 define Railway Buckets/object storage e proíbe upload local; `docs/architecture/00-stack-e-decisoes.md` recomenda Cloudinary.
- ADR-006 e ADR-009 proíbem e-commerce/carrinho tradicional; docs de produto ainda usam "carrinho" e "lista de orçamento / carrinho".
- ADR-008 define LP por blocos controlados; `docs/product/05-mapa-de-conteudo-cms.md` ainda não define blocos, campos e limites.
- ADR-010 define páginas institucionais estáticas inicialmente; `docs/product/02` e `docs/product/03` deixam edição pelo admin aberta.
- ADR-011 define Server Actions para CRUD e Route Handlers para upload/tracking; docs divergem em rotas e fluxo de upload.
- ADR-012 exige security gates; tasks apontam para caminho inexistente da política de segurança.

## Inconsistências entre tasks e arquitetura

- Todas ou quase todas as tasks apontam para `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`, mas o documento real fica em `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`.
- `docs/tasks/001-base-tecnica-segura.md` fala em `proxy.ts`, enquanto a documentação local do Next.js 16 orienta `proxy.ts`.
- `docs/tasks/002-modelagem-drizzle-e-migrations.md` lista campos de produto que divergem do modelo de banco, como `is_active` e `video_url`.
- `docs/tasks/016-upload-e-midias-admin.md` depende de uma decisão de fluxo de upload que está contraditória entre `docs/architecture/05` e `docs/architecture/06`.
- `docs/tasks/021-tracking-whatsapp-dashboard.md` deve seguir uma rota oficial de tracking, mas a arquitetura cita três variações.
- `docs/tasks/026-deploy-railway-producao.md` e `docs/tasks/027-observabilidade-backups-incidentes.md` dependem de documentos arquiteturais ainda vazios.
- As tasks não exigem leitura de ADRs relevantes, apesar de ADRs serem as decisões oficiais.

## Inconsistências de linguagem

- Usar "lista de produtos" em vez de "carrinho".
- Usar "produtos selecionados" em vez de "itens do carrinho".
- Usar "enviar lista pelo WhatsApp" em vez de "finalizar pedido".
- Usar "solicitar pelo WhatsApp" ou "solicitar proposta" em vez de "comprar".
- Usar "produto sem preço público" em vez de "produto sob consulta" quando isso evitar leitura de loja.
- Usar "admin do dono" ou "portal admin" em vez de "área do cliente".
- Usar `CLERK_ADMIN_USER_IDS` em vez de `OWNER_EMAIL`, `CLERK_OWNER_USER_ID`, `CLERK_USER_ID` ou `ADMIN_CLERK_USER_ID`.
- Usar "Railway Buckets" ou "object storage S3-compatible" em vez de Cloudinary.
- Usar `/por-que-contratar` em vez de `/por-que-contratar`, se essa rota for adotada.
- Usar "Proxy do Next.js 16" em vez de "proxy", salvo quando explicando compatibilidade.

## Documentos faltantes recomendados

- Documento completo de mapa de CMS: campos, blocos, validações, limites, sanitização e fora do escopo.
- Threat model completo: ativos, atores, riscos, controles, cenários de abuso e critérios de mitigação.
- Guia de deploy/env Railway: envs, Clerk, PostgreSQL, Railway Buckets, migrations, domínio, previews, rollback.
- Guia de observabilidade, backup e incidente: logs, auditoria, retenção, restore, incidentes de upload/admin e contato responsável.
- Política de imagens: tamanhos, formatos, proporções, alt text, ownership, exclusão, substituição, variantes e cache.
- Política de exclusão/desativação: soft delete vs hard delete por entidade.
- Template de task revisado: ADRs obrigatórios, caminho correto da política de segurança, critérios de aceite, testes e relatório final.
- Checklist pré-deploy: segurança, SEO, env, backups, headers, sitemap, robots, redirects e smoke tests.
- Guia de copy/tom de voz: vocabulário permitido/proibido, CTAs, mensagens de WhatsApp e exemplos.

## Melhorias recomendadas por arquivo

| Arquivo | Problema | Severidade | Correção recomendada |
|---|---|---|---|
| `docs/README.md` | Caminho de segurança errado e precedência de ADRs insuficiente | P0 | Corrigir caminho e declarar ADRs/security como fontes superiores |
| `docs/TREE.md` | Mapa não destaca status incompleto/placeholder | P2 | Atualizar árvore com status e links reais |
| `docs/product/00-visao-do-produto.md` | Usa "carrinho/lista de orçamento" e decisões pendentes antigas | P1 | Padronizar linguagem e mover decisões fechadas para ADRs |
| `docs/product/01-auditoria-site-atual.md` | Mantém `/quem-somos` e `/por-que-contratar` como possibilidades | P1 | Definir se entram no MVP e padronizar slug |
| `docs/product/02-escopo-do-produto.md` | Mistura lista de orçamento/carrinho e páginas estáticas/editáveis | P1 | Remover carrinho e fixar institucionais estáticas no MVP |
| `docs/product/03-regras-de-negocio.md` | Permite chamar internamente de `carrinho` | P1 | Trocar por `selected-products`/`lista de produtos` |
| `docs/product/04-user-stories.md` | Melhor alinhado, mas depende de ADRs não listadas nas tasks | P2 | Referenciar ADRs relevantes |
| `docs/product/05-mapa-de-conteudo-cms.md` | Placeholder | P1 | Completar campo a campo |
| `docs/architecture/00-stack-e-decisoes.md` | Recomenda Prisma/Auth.js/Cloudinary | P0 | Reescrever conforme ADRs |
| `docs/architecture/01-arquitetura-de-pastas.md` | Allowlist, rotas, ActionResult e feature names divergentes | P0 | Padronizar com ADRs e contratos |
| `docs/architecture/02-modelo-de-dominio.md` | "Sobre" e carrinho visual abertos | P1 | Fechar escopo e linguagem |
| `docs/architecture/03-banco-de-dados.md` | Slug `/por-que-contratar` e alinhamento status/is_active | P1 | Padronizar rota e entidade produto |
| `docs/architecture/04-rotas-e-navegacao.md` | Usa `/api/uploads/presign`, divergente de outros docs | P1 | Definir rota oficial de upload |
| `docs/architecture/05-contratos-de-actions-e-apis.md` | `CLERK_OWNER_USER_ID`, `OWNER_EMAIL`, `ok`, presign e slug divergente | P0 | Corrigir autorização e contratos canônicos |
| `docs/architecture/06-upload-e-midias.md` | Fluxo server-side conflita com presigned URL | P1 | Escolher um fluxo e uma rota oficial |
| `docs/architecture/07-autenticacao-e-autorizacao.md` | Usa `proxy.ts` e rotas antigas de upload/tracking | P1 | Atualizar para Next 16 Proxy e rotas oficiais |
| `docs/architecture/08-seguranca.md` | `ActionResult` com `success`, rotas divergentes e status/is_active mistos | P1 | Padronizar contratos e exemplos |
| `docs/architecture/09-env-deploy-railway.md` | Placeholder | P1 | Completar env/deploy Railway |
| `docs/architecture/10-observabilidade-e-backup.md` | Placeholder | P1 | Completar logs, backup, restore e incidente |
| `docs/security/00-threat-model.md` | Placeholder | P1 | Completar threat model |
| `docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md` | Título/caminho interno indicam numeração errada | P2 | Corrigir título e referências |
| `docs/ui/00-design-system.md` | Ainda menciona carrinho em exemplos | P2 | Usar apenas linguagem aprovada |
| `docs/ui/01-site-publico.md` | Rotas, Sobre e exemplos de carrinho aparecem | P1 | Padronizar navegação, rotas e copy |
| `docs/ui/02-portal-admin.md` | Caminho de segurança errado | P0 | Corrigir referência |
| `docs/ui/03-seo-performance-acessibilidade.md` | Caminho de segurança errado e exemplo de carrinho | P0 | Corrigir referência e copy |
| `docs/quality/00-estrategia-de-testes.md` | Caminho de segurança errado e scripts possivelmente desatualizados | P0 | Corrigir caminho e comandos |
| `docs/quality/01-definition-of-done.md` | Caminho de segurança errado | P0 | Corrigir caminho |
| `docs/quality/02-checklist-review-ai.md` | Caminho de segurança errado | P0 | Corrigir caminho |
| `docs/content/00-tom-de-voz-e-copy.md` | Placeholder | P2 | Completar guia de linguagem |
| `docs/tasks/TEMPLATE.md` | Não força ADRs nem caminho correto de segurança | P0 | Atualizar template |
| `docs/tasks/*.md` | Caminho de segurança errado e ADRs ausentes | P0 | Corrigir em lote |
| `docs/tasks/001-base-tecnica-segura.md` | `proxy.ts`, `next lint` e typo `drizzzle` | P1 | Atualizar para Next 16 e comandos reais |
| `docs/tasks/002-modelagem-drizzle-e-migrations.md` | Campos divergem do banco | P1 | Alinhar ao schema canônico |
| `docs/tasks/016-upload-e-midias-admin.md` | Depende de fluxo de upload não decidido | P1 | Definir rota/fluxo antes da task |
| `docs/tasks/021-tracking-whatsapp-dashboard.md` | Rota de tracking ambígua | P1 | Usar rota oficial e best-effort |
| `docs/tasks/026-deploy-railway-producao.md` | Depende de doc de deploy vazio | P1 | Completar doc 09 antes |
| `docs/tasks/027-observabilidade-backups-incidentes.md` | Depende de doc operacional vazio | P1 | Completar doc 10 antes |

## Perguntas bloqueantes para o humano

1. A rota canônica da página "Por que Contratar" será `/por-que-contratar`?
2. `/sobre` ou `/quem-somos` fazem parte do MVP, ou ficam fora do escopo inicial?
3. O fluxo oficial de upload será presigned URL para Railway Buckets ou endpoint server-side recebendo o arquivo?

## Conclusão

O desenvolvimento não deveria começar antes da correção dos P0. Depois disso, é possível iniciar a base técnica com segurança, mas os P1 ligados a CMS, threat model, upload, deploy e modelagem devem ser resolvidos antes das tasks correspondentes.

Prioridade recomendada:

1. Corrigir stack/autorização/caminho de segurança.
2. Atualizar template e todas as tasks para ler ADRs e política correta.
3. Completar mapa de CMS, threat model, deploy/env e observabilidade.
4. Padronizar linguagem, rotas, contratos e fluxo de upload.
