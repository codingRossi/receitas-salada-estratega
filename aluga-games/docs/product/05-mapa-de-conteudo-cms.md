# 05 - Mapa de Conteúdo CMS

Este documento define o que o dono pode editar no portal admin.

Regra principal: o admin edita conteúdo por campos e blocos controlados. Não existe page builder livre.

## 1. Fora do escopo do CMS

Não criar no MVP:

- editor visual livre;
- arrastar componentes arbitrários;
- HTML livre;
- CSS customizado pelo admin;
- JavaScript customizado pelo admin;
- criação de novas páginas institucionais;
- edição das páginas `Representante AlugaGames` e `Por que Contratar`;
- blog;
- checkout, pagamento, pedido ou área do cliente.

## 2. Regras gerais de conteúdo editável

Todo campo editável deve ter:

- label claro no admin;
- validação com Zod no servidor;
- limite de caracteres;
- tratamento de vazio;
- sanitização se aceitar rich text;
- log administrativo quando alterado;
- preview ou descrição quando o impacto visual não for óbvio.

Rich text deve ser evitado. Quando necessário, aceitar apenas um subconjunto seguro:

```txt
p
strong
em
ul
ol
li
a
br
```

Não permitir:

```txt
script
style
iframe
form
input
onclick
onload
atributos on*
javascript:
```

## 3. Configurações globais do site

Entidade: `site_settings`

Campos editáveis:

| Campo | Tipo | Obrigatório | Limite | Observação |
|---|---:|---:|---:|---|
| `siteName` | text | sim | 80 | Padrão: AlugaGames |
| `defaultSeoTitle` | text | sim | 70 | Usado como fallback |
| `defaultSeoDescription` | textarea | sim | 160 | Usado como fallback |
| `whatsappNumber` | text | sim | 20 | Formato internacional sem símbolos desnecessários |
| `whatsappDefaultMessage` | textarea | sim | 500 | Mensagem geral |
| `instagramUrl` | url | não | 200 | Validar URL |
| `facebookUrl` | url | não | 200 | Validar URL |
| `email` | email | não | 120 | Se houver |
| `cityState` | text | não | 80 | Ex.: São Paulo/SP |
| `footerShortText` | textarea | não | 240 | Texto curto institucional |

Regras:

- WhatsApp vazio deve gerar alerta no admin.
- URL externa deve ser validada no servidor.
- Configurações não podem expor secrets.

## 4. Landing page

Entidade principal: `landing_page_blocks`

Campos comuns de todo bloco:

| Campo | Tipo | Obrigatório | Limite | Observação |
|---|---:|---:|---:|---|
| `id` | uuid | sim | - | Gerado pelo banco |
| `type` | enum | sim | - | Lista fechada |
| `title` | text | depende | 90 | Conforme bloco |
| `subtitle` | textarea | não | 180 | Conforme bloco |
| `body` | textarea/rich | não | 700 | Rich text apenas se previsto |
| `position` | integer | sim | - | Ordem na LP |
| `isActive` | boolean | sim | - | Publica/oculta |
| `settings` | json controlado | não | - | Schema por tipo |
| `createdAt` | timestamp | sim | - | Automático |
| `updatedAt` | timestamp | sim | - | Automático |

Tipos permitidos de bloco:

```txt
hero
trust_logos
featured_products
corporate_solutions
how_it_works
event_gallery_preview
testimonials
faq
final_cta
```

Não permitir `type` livre.

### 4.1 Bloco `hero`

Objetivo: primeira dobra da landing page.

Campos:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `eyebrow` | text | não | 50 |
| `title` | text | sim | 90 |
| `subtitle` | textarea | sim | 220 |
| `primaryCtaLabel` | text | sim | 32 |
| `primaryCtaMessage` | textarea | sim | 500 |
| `secondaryCtaLabel` | text | não | 32 |
| `secondaryCtaHref` | text | não | 160 |
| `mediaAssetId` | uuid | sim | - |

Regras:

- CTA principal deve apontar para WhatsApp.
- Não usar "comprar", "checkout", "pagamento" ou "carrinho".
- Imagem deve vir de object storage.

### 4.2 Bloco `trust_logos`

Objetivo: exibir marcas/clientes.

Conteúdo vem de `client_logos`.

Campos do bloco:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | não | 80 |
| `subtitle` | textarea | não | 160 |
| `maxItems` | integer | sim | 1 a 24 |

Regras:

- Logos precisam de `altText`.
- Logos inativos não aparecem no site público.

### 4.3 Bloco `featured_products`

Objetivo: destacar atrações na landing page.

Conteúdo vem dos produtos marcados como destaque.

Campos:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | sim | 80 |
| `subtitle` | textarea | não | 180 |
| `maxItems` | integer | sim | 3 a 12 |
| `ctaLabel` | text | sim | 32 |

Regras:

- Não exibir preço.
- Não exibir CTA de compra.
- Produto `inactive` não aparece.
- Produto `unavailable` pode aparecer apenas com estado visual claro, conforme regras de negócio.

### 4.4 Bloco `corporate_solutions`

Objetivo: apresentar soluções para eventos corporativos e ocasiões.

Campos por item:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | sim | 70 |
| `description` | textarea | sim | 220 |
| `mediaAssetId` | uuid | não | - |
| `relatedTagIds` | uuid[] | não | até 8 |
| `isActive` | boolean | sim | - |
| `position` | integer | sim | - |

Regras:

- Máximo recomendado: 8 itens.
- Não criar categorias novas automaticamente.

### 4.5 Bloco `how_it_works`

Objetivo: explicar o fluxo consultivo.

Campos por etapa:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | sim | 60 |
| `description` | textarea | sim | 180 |
| `iconKey` | enum | não | - |
| `position` | integer | sim | - |

Regras:

- Deve reforçar que a contratação continua pelo WhatsApp.
- Não mencionar checkout ou pagamento online.

### 4.6 Bloco `event_gallery_preview`

Objetivo: mostrar prévia da fotografia/eventos.

Campos:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | sim | 80 |
| `subtitle` | textarea | não | 180 |
| `albumIds` | uuid[] | não | até 6 |
| `ctaLabel` | text | sim | 32 |

Regras:

- Usar apenas álbuns ativos.
- CTA aponta para `/fotografia`.

### 4.7 Bloco `testimonials`

Objetivo: prova social.

Conteúdo vem de `testimonials`.

Campos do bloco:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | não | 80 |
| `maxItems` | integer | sim | 1 a 12 |

Regras:

- Depoimento deve ter nome ou identificação autorizada.
- Não inventar marcas/depoimentos.

### 4.8 Bloco `faq`

Objetivo: responder dúvidas comuns.

Conteúdo vem de `faqs`.

Campos do bloco:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | sim | 80 |
| `subtitle` | textarea | não | 160 |
| `maxItems` | integer | sim | 3 a 12 |

Regras:

- Perguntas sobre pagamento devem deixar claro que negociação ocorre pelo atendimento.
- Não sugerir pagamento online pelo site.

### 4.9 Bloco `final_cta`

Objetivo: CTA final para WhatsApp.

Campos:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | sim | 90 |
| `subtitle` | textarea | sim | 220 |
| `ctaLabel` | text | sim | 32 |
| `ctaMessage` | textarea | sim | 500 |
| `mediaAssetId` | uuid | não | - |

Regras:

- CTA abre WhatsApp.
- Tracking, se existir, é best-effort e não bloqueia conversão.

## 5. Produtos

Entidade: `products`

Campos editáveis:

| Campo | Tipo | Obrigatório | Limite | Observação |
|---|---:|---:|---:|---|
| `name` | text | sim | 100 | Nome público |
| `slug` | text | sim | 120 | Único |
| `shortDescription` | textarea | sim | 220 | Cards/listas |
| `description` | rich limitado | sim | 2000 | Sanitizar |
| `status` | enum | sim | - | `active`, `inactive`, `unavailable` |
| `isFeatured` | boolean | sim | - | Destaque na LP |
| `categoryId` | uuid | sim | - | Categoria ativa |
| `tagIds` | uuid[] | não | até 20 | Tags ativas |
| `seoTitle` | text | não | 70 | Fallback para nome |
| `seoDescription` | textarea | não | 160 | Fallback para descrição curta |

Mídias:

- imagens em `product_media`;
- vídeos em `product_videos` como URL externa;
- não usar `video_url` direto em `products`;
- não fazer upload de vídeo no MVP.

Regras:

- Não cadastrar preço público.
- Não criar estoque transacional.
- Não criar checkout.
- Produto inativo não aparece publicamente.

## 6. Categorias e tags

Categorias:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `name` | text | sim | 80 |
| `slug` | text | sim | 100 |
| `description` | textarea | não | 220 |
| `isActive` | boolean | sim | - |
| `position` | integer | sim | - |

Tags:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `name` | text | sim | 80 |
| `slug` | text | sim | 100 |
| `type` | enum | sim | - |
| `isActive` | boolean | sim | - |

Tipos de tag:

```txt
event_type
audience
context
feature
```

Usar tags tipadas para indicações de evento/público. Não criar entidade paralela de indicação sem nova decisão.

## 7. Fotografia

Entidades: `gallery_albums`, `gallery_photos`

Álbum:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `title` | text | sim | 100 |
| `slug` | text | sim | 120 |
| `eventType` | text/tag | sim | 80 |
| `eventDate` | date | não | - |
| `city` | text | não | 80 |
| `description` | textarea | não | 500 |
| `isActive` | boolean | sim | - |

Foto:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `mediaAssetId` | uuid | sim | - |
| `altText` | text | sim | 140 |
| `caption` | text | não | 160 |
| `isCover` | boolean | sim | - |
| `isActive` | boolean | sim | - |
| `position` | integer | sim | - |

Regras:

- Fotografia é prova visual institucional, não serviço separado vendido pelo site.
- Não fazer upload de vídeo.

## 8. Depoimentos, FAQ e logos

Depoimentos:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `authorName` | text | sim | 80 |
| `authorRole` | text | não | 80 |
| `companyName` | text | não | 80 |
| `quote` | textarea | sim | 500 |
| `isActive` | boolean | sim | - |
| `position` | integer | sim | - |

FAQ:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `question` | text | sim | 140 |
| `answer` | rich limitado | sim | 900 |
| `isActive` | boolean | sim | - |
| `position` | integer | sim | - |

Logos:

| Campo | Tipo | Obrigatório | Limite |
|---|---:|---:|---:|
| `name` | text | sim | 80 |
| `mediaAssetId` | uuid | sim | - |
| `altText` | text | sim | 140 |
| `websiteUrl` | url | não | 200 |
| `isActive` | boolean | sim | - |
| `position` | integer | sim | - |

## 9. Política de imagens

Todo upload deve seguir `/docs/architecture/06-upload-e-midias.md`.

Regras de conteúdo:

- imagem precisa ter contexto;
- alt text obrigatório quando pública;
- nome original do arquivo não deve ser usado como chave final;
- substituir imagem não deve apagar histórico sem confirmação;
- exclusão física deve ser auditada;
- imagens sensíveis ou sem autorização não devem ser publicadas.

## 10. Critérios de aceite do CMS

- Todo campo editável está listado neste documento ou em ADR/task posterior.
- Todo conteúdo administrativo valida no servidor.
- Nenhum bloco aceita schema livre sem validação.
- Nenhuma página institucional estática ganhou CMS no MVP.
- Nenhum texto editável permite script/event handler.
- Toda mutação administrativa chama `requireAdmin()`.
- Alterações relevantes geram log administrativo.
