# 00 - Stack e Decisões Técnicas

Este documento é a referência principal de stack para o novo site da AlugaGames. Ele deve ser lido junto com os ADRs em `/docs/adr`.

Quando houver conflito entre documentos antigos e este arquivo, prevalecem:

1. ADRs aprovados;
2. este documento;
3. documentos específicos de arquitetura, segurança, produto, UI e tasks.

## 1. Natureza do sistema

O projeto é um site institucional premium com catálogo de atrações, fotografia, páginas institucionais, lista simples de produtos selecionados para envio ao WhatsApp e portal administrativo usado apenas pelo dono.

O sistema não é e-commerce:

- não existe checkout;
- não existe pagamento online;
- não existe login de cliente;
- não existe área do cliente;
- não existe pedido fechado pelo site;
- não existe carrinho de compra tradicional;
- produtos não exibem preço público;
- o fluxo comercial termina no WhatsApp.

## 2. Stack oficial

Stack obrigatória:

```txt
Next.js App Router
React
TypeScript
Tailwind CSS
PostgreSQL
Drizzle ORM
Clerk
Railway
Railway Buckets ou object storage S3-compatible
Zod
```

Não usar como stack do projeto:

```txt
Prisma
Auth.js
Cloudinary como decisão padrão
upload local em /public
auth própria com senha
checkout/pagamento
```

Essas tecnologias podem aparecer em auditorias do site antigo ou como alternativas rejeitadas, mas não devem ser implementadas.

## 3. Next.js

Usar Next.js App Router.

Regras:

- rotas públicas em `src/app`;
- componentes server-first por padrão;
- Client Components apenas quando houver interação real;
- mutações administrativas por Server Actions, salvo quando Route Handler for mais adequado;
- Route Handlers apenas para upload/presign, tracking de WhatsApp e webhooks explícitos;
- seguir a documentação local instalada em `node_modules/next/dist/docs/` antes de implementar detalhes específicos da versão.

O projeto usa Next.js 16. Para proteção de rotas no nível de navegação, usar o conceito de `proxy.ts`, não `middleware.ts`, salvo se uma integração externa documentar adaptação específica.

Proxy não substitui autorização server-side.

## 4. Banco e ORM

Banco oficial:

```txt
PostgreSQL
```

ORM oficial:

```txt
Drizzle ORM
```

O schema canônico fica em:

```txt
/docs/architecture/03-banco-de-dados.md
```

Regras:

- migrations devem ser versionadas;
- features públicas e repositories devem retornar apenas campos necessários;
- mutations administrativas devem validar input com Zod;
- não criar tabelas de pedido, checkout, pagamento, carrinho persistente, conta de cliente ou área do cliente;
- a lista simples de produtos do visitante fica no client e não é persistida no banco.

## 5. Autenticação e autorização

Autenticação oficial:

```txt
Clerk
```

O admin é usado apenas pelo dono.

A autorização administrativa obrigatória usa allowlist por `userId` do Clerk:

```env
CLERK_ADMIN_USER_IDS=user_xxx,user_yyy
```

Regras obrigatórias:

- toda rota `/admin` deve exigir sessão Clerk;
- toda Server Action administrativa deve chamar `requireAdmin()`;
- todo Route Handler administrativo ou sensível deve chamar `requireAdmin()`;
- `requireAdmin()` valida o `userId` autenticado contra `CLERK_ADMIN_USER_IDS`;
- se `CLERK_ADMIN_USER_IDS` estiver ausente ou vazio em produção, falhar fechado;
- e-mail não deve ser usado como autorização;
- proteção visual, menu escondido ou Proxy não substituem validação no servidor.

Documento específico:

```txt
/docs/architecture/07-autenticacao-e-autorizacao.md
```

## 6. Upload e mídias

Imagens devem ir para object storage, preferencialmente Railway Buckets.

Regras:

- não salvar imagens enviadas pelo admin no repositório;
- não depender do filesystem local da aplicação;
- não aceitar upload público sem autenticação;
- não aceitar vídeo por upload no MVP;
- vídeos entram apenas como URL externa, quando aplicável;
- validar MIME, extensão, tamanho, contexto de uso e autorização no servidor;
- salvar no banco apenas metadados, chave de storage e URL pública/assinada conforme política.

Fluxo oficial inicial:

```txt
POST /api/uploads/presign
```

Esse Route Handler deve:

- exigir `requireAdmin()`;
- validar input com Zod;
- aceitar apenas contextos de mídia permitidos;
- gerar chave de storage controlada pelo servidor;
- gerar URL assinada curta para upload direto ao bucket;
- limitar tipo e tamanho de arquivo;
- nunca confiar no nome original do arquivo.

Depois do upload, uma Server Action administrativa deve registrar ou associar o asset no banco.

Documento específico:

```txt
/docs/architecture/06-upload-e-midias.md
```

## 7. Server Actions e Route Handlers

Server Actions são o padrão para CRUD administrativo.

Toda Server Action administrativa deve:

- chamar `requireAdmin()` antes de mutar dados;
- validar input com Zod;
- usar allowlist de campos;
- retornar `ActionResult`;
- tratar erros previsíveis sem expor stack trace;
- registrar log administrativo quando alterar dados relevantes;
- revalidar apenas rotas necessárias.

Formato canônico:

```ts
export type ActionResult<T = void> =
  | { ok: true; data?: T; message?: string }
  | {
      ok: false;
      code: string;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
```

Route Handlers oficiais:

```txt
POST /api/uploads/presign
POST /api/whatsapp-clicks
POST /api/webhooks/clerk   opcional/futuro
```

Não criar API REST para todo CRUD administrativo.

## 8. WhatsApp e lista de produtos

WhatsApp é a conversão principal.

A lista simples de produtos:

- existe apenas para montar uma mensagem para o WhatsApp;
- fica no client, preferencialmente em `localStorage`;
- não cria pedido;
- não cria orçamento interno;
- não cria carrinho persistente;
- não exige login;
- não exibe preço.

Linguagem preferida:

- "produtos selecionados";
- "lista de produtos";
- "enviar pelo WhatsApp";
- "solicitar proposta".

Evitar:

- "carrinho";
- "comprar";
- "finalizar pedido";
- "checkout";
- "pagamento";
- "item do carrinho".

## 9. Landing page editável

A landing page deve ser editável por blocos controlados.

Não criar page builder livre.

Regras:

- tipos de bloco são fechados e documentados;
- campos editáveis são explícitos;
- texto tem limite de caracteres;
- rich text, se existir, deve ser sanitizado e limitado;
- imagens passam pela política de upload;
- reordenação e ativação/desativação são controladas pelo admin.

Documento específico:

```txt
/docs/product/05-mapa-de-conteudo-cms.md
```

## 10. Páginas institucionais

No MVP:

- `/representante-alugagames` é estática;
- `/por-que-contratar` é estática;
- "Trabalhe Conosco" é apenas link para WhatsApp no footer.

Não criar CRUD/CMS para essas páginas no MVP.

`/sobre` e `/quem-somos` ficam fora do MVP até decisão explícita.

## 11. SEO, sitemap e robots

O site deve ter:

- metadata coerente por página;
- sitemap com rotas públicas canônicas;
- robots sem expor admin;
- URLs canônicas;
- redirects apenas quando definidos;
- nenhuma rota administrativa indexável.

Rotas públicas iniciais:

```txt
/
/produtos
/produtos/[slug]
/fotografia
/representante-alugagames
/por-que-contratar
```

## 12. Observabilidade, logs e backup

O sistema precisa prever:

- logs administrativos de ações relevantes;
- logs de erro sem secrets;
- backup do PostgreSQL;
- política de restore;
- plano de incidente;
- retenção de auditoria;
- procedimento para bloquear temporariamente upload, se necessário.

Documentos específicos:

```txt
/docs/architecture/09-env-deploy-railway.md
/docs/architecture/10-observabilidade-e-backup.md
```

## 13. Segurança como regra de implementação

Segurança é requisito de toda task.

Toda task deve ler:

```txt
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
/docs/quality/01-definition-of-done.md
/docs/quality/02-checklist-review-ai.md
```

Regras mínimas:

- validação server-side com Zod;
- autorização server-side em mutações administrativas;
- erros seguros;
- secrets apenas em variáveis de ambiente;
- nenhuma validação apenas no client;
- upload restrito;
- conteúdo editável sanitizado quando aceitar rich text;
- nenhuma mudança de escopo sem atualizar docs/ADR.

## 14. Ordem segura de implementação

Ordem canônica está em:

```txt
/docs/tasks/README.md
```

Nenhuma task deve contrariar ADRs ou este documento.
