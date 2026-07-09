# 09 - Ambientes, Deploy e Railway

Este documento define ambientes, variáveis, deploy e rollback para a AlugaGames.

## 1. Ambientes

Ambientes previstos:

```txt
local
preview
production
```

Regras:

- `local` usa `.env.local`, nunca commitado;
- `preview` usa dados e secrets próprios quando existir;
- `production` usa banco, Clerk e storage de produção;
- nunca misturar secrets de produção em ambiente local/preview;
- `.env.example` pode existir, mas sem valores reais.

## 2. Plataforma

Deploy principal:

```txt
Railway
```

Serviços esperados:

- Next.js app;
- PostgreSQL;
- Railway Buckets ou object storage S3-compatible;
- domínio customizado;
- HTTPS gerenciado pela plataforma.

## 3. Variáveis obrigatórias

### 3.1 App

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.dominio.com.br
```

### 3.2 Banco

```env
DATABASE_URL=postgresql://...
```

Regras:

- `DATABASE_URL` é server-only;
- nunca expor no client;
- migrations devem rodar antes de liberar produção.

### 3.3 Clerk

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_ADMIN_USER_IDS=user_xxx,user_yyy
```

Regras:

- `CLERK_ADMIN_USER_IDS` é obrigatória em produção;
- usar `userId` do Clerk, não e-mail;
- se vazia, admin deve falhar fechado;
- chaves de teste não devem ser usadas em produção.

### 3.4 WhatsApp

```env
WHATSAPP_DEFAULT_NUMBER=5511999999999
```

Regras:

- usar formato internacional;
- mensagens podem vir do banco/admin;
- se ausente, admin deve exibir alerta e CTAs públicos devem usar fallback seguro ou ficar desativados.

### 3.5 Object storage

Nomes recomendados:

```env
STORAGE_ENDPOINT=https://...
STORAGE_REGION=auto
STORAGE_BUCKET_NAME=...
STORAGE_ACCESS_KEY_ID=...
STORAGE_SECRET_ACCESS_KEY=...
STORAGE_PUBLIC_BASE_URL=https://...
```

Regras:

- usar Railway Buckets quando disponível;
- credenciais são server-only;
- não usar bucket com permissão ampla de escrita pública;
- upload público direto só via URL assinada emitida por `POST /api/uploads/presign`;
- não salvar upload em `/public`.

### 3.6 Segurança e observabilidade

```env
ADMIN_AUDIT_LOG_RETENTION_DAYS=365
WHATSAPP_TRACKING_RATE_LIMIT_PER_MINUTE=60
UPLOAD_MAX_IMAGE_MB=10
```

Essas envs podem ser substituídas por constantes server-side, mas os limites devem estar documentados.

## 4. `.env.example`

O arquivo `.env.example` deve listar chaves sem valores reais:

```env
NEXT_PUBLIC_SITE_URL=
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_ADMIN_USER_IDS=
WHATSAPP_DEFAULT_NUMBER=
STORAGE_ENDPOINT=
STORAGE_REGION=
STORAGE_BUCKET_NAME=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
STORAGE_PUBLIC_BASE_URL=
ADMIN_AUDIT_LOG_RETENTION_DAYS=
WHATSAPP_TRACKING_RATE_LIMIT_PER_MINUTE=
UPLOAD_MAX_IMAGE_MB=
```

## 5. Scripts de projeto

Scripts atuais do `package.json`:

```txt
npm run dev
npm run build
npm run start
npm run lint
```

Observação:

- `npm run lint` executa `eslint`;
- não documentar `next lint` como comando padrão deste projeto;
- scripts de `typecheck`, `test` e `db:*` devem ser adicionados quando as tasks correspondentes criarem dependências e ferramentas.

## 6. Migrations Drizzle

Regras:

- migrations devem ser versionadas no repositório;
- não alterar banco de produção manualmente sem registrar;
- deploy deve falhar se migration crítica falhar;
- backup deve existir antes de migration destrutiva;
- migration destrutiva exige confirmação humana e plano de rollback.

Fluxo recomendado:

```txt
1. Rodar lint/build local.
2. Conferir migrations geradas.
3. Aplicar migrations em preview/staging, se houver.
4. Fazer backup de produção.
5. Aplicar migrations em produção.
6. Rodar smoke test.
```

## 7. Railway Buckets

Configuração mínima:

- bucket criado em produção;
- credenciais server-side no Railway;
- CORS restrito ao domínio do site quando aplicável;
- listagem pública desabilitada, salvo se o provider exigir outro modelo;
- leitura pública apenas para assets públicos aprovados, ou URLs públicas controladas;
- escrita pública desabilitada;
- upload por URL assinada curta.

## 8. Domínio e HTTPS

Regras:

- domínio canônico definido em `NEXT_PUBLIC_SITE_URL`;
- redirecionar variações se necessário;
- HTTPS obrigatório;
- sitemap deve usar domínio canônico;
- robots não deve indexar `/admin`;
- Clerk deve permitir domínio de produção.

## 9. Deploy seguro

Antes do deploy:

- P0 de segurança resolvidos;
- `CLERK_ADMIN_USER_IDS` configurado;
- banco conectado;
- storage configurado;
- build local aprovado;
- sitemap/robots revisados;
- backup feito se houver dados de produção;
- smoke test planejado.

Após o deploy:

- abrir `/`;
- abrir `/produtos`;
- abrir `/produtos/[slug]`;
- abrir `/fotografia`;
- abrir `/representante-alugagames`;
- abrir `/por-que-contratar`;
- testar WhatsApp;
- testar login admin com dono;
- testar bloqueio de usuário não autorizado;
- testar upload;
- testar edição de produto refletindo no público;
- conferir logs sem secrets.

## 10. Rollback

Rollback de app:

- usar rollback/redeploy do Railway para versão anterior;
- manter migrations compatíveis sempre que possível;
- não fazer rollback de código que espera schema antigo sem checar banco.

Rollback de banco:

- preferir migrations reversíveis;
- se necessário, restaurar backup;
- registrar perda de dados potencial;
- validar admin e site público após restore.

Rollback de storage:

- não apagar arquivos antigos imediatamente após substituição;
- manter metadados suficientes para recuperar imagem anterior quando viável;
- exclusão física precisa de log.

## 11. Critérios de aceite

- Produção online em domínio correto.
- HTTPS ativo.
- Admin protegido por Clerk e `CLERK_ADMIN_USER_IDS`.
- Server Actions administrativas protegidas por `requireAdmin()`.
- Banco conectado e migrations aplicadas.
- Storage funcional sem upload local.
- WhatsApp funcionando.
- `/admin` fora de indexação.
- Logs não expõem secrets.
- Smoke test documentado.
