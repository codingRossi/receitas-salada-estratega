# 00 - Threat Model

Este documento mapeia ameaças principais do site AlugaGames e os controles mínimos exigidos.

## 1. Escopo

Inclui:

- site público;
- portal `/admin`;
- Server Actions administrativas;
- Route Handlers;
- upload de imagens;
- object storage;
- PostgreSQL;
- Clerk;
- tracking de cliques no WhatsApp;
- logs administrativos;
- deploy na Railway.

Fora do escopo:

- checkout;
- pagamento online;
- login de cliente;
- área do cliente;
- pedido fechado pelo site.

## 2. Ativos protegidos

Ativos críticos:

- acesso administrativo do dono;
- `CLERK_ADMIN_USER_IDS`;
- secrets Clerk;
- `DATABASE_URL`;
- credenciais do object storage;
- dados do PostgreSQL;
- imagens enviadas pelo admin;
- conteúdo editável da landing page;
- produtos, categorias e tags;
- álbuns de fotografia;
- configurações de WhatsApp;
- logs administrativos.

## 3. Atores

### Visitante público

Pode:

- acessar páginas públicas;
- filtrar produtos;
- selecionar produtos no client;
- abrir WhatsApp;
- acionar tracking público limitado.

Não pode:

- acessar admin;
- mutar dados;
- fazer upload;
- consultar dados administrativos.

### Dono/admin

Pode:

- acessar `/admin` após login Clerk;
- editar conteúdo permitido;
- fazer upload de imagens;
- ver dashboard e logs permitidos.

Deve ser validado por:

```txt
Clerk session + CLERK_ADMIN_USER_IDS + requireAdmin()
```

### Atacante externo

Pode tentar:

- acessar `/admin` sem autorização;
- chamar Server Actions diretamente;
- chamar Route Handlers diretamente;
- enviar payloads maliciosos;
- subir arquivo malicioso;
- explorar XSS em conteúdo editável;
- abusar tracking;
- descobrir secrets por erro/log;
- forçar URLs de mídia;
- gerar carga excessiva.

## 4. Fronteiras de confiança

Fronteiras:

- navegador público para Next.js;
- navegador admin para Next.js;
- Next.js para Clerk;
- Next.js para PostgreSQL;
- Next.js para object storage;
- Next.js para WhatsApp externo;
- Railway env para aplicação.

Regra: todo dado que cruza uma fronteira é não confiável até validação no servidor.

## 5. Riscos e controles

| Risco | Impacto | Controle obrigatório |
|---|---|---|
| Admin acessível sem login | Compromisso total do CMS | Clerk + Proxy em `/admin` |
| Usuário Clerk não dono acessa admin | Compromisso total do CMS | `requireAdmin()` com `CLERK_ADMIN_USER_IDS` |
| Server Action chamada diretamente | Mutação indevida | `requireAdmin()` em toda action administrativa |
| Route Handler sensível chamado diretamente | Upload ou ação indevida | `requireAdmin()` em todo handler administrativo |
| Upload malicioso | XSS, malware, abuso de storage | MIME/extensão/tamanho/contexto + presign curto |
| XSS em CMS | Sequestro de sessão/admin | Sanitização e rich text limitado |
| Vazamento de secrets | Compromisso de infraestrutura | Env server-only, logs seguros |
| Tracking abusado | Poluição de métricas/carga | Rate limit/best-effort/payload mínimo |
| Exclusão acidental | Perda de dados | confirmação, soft delete/status, backup |
| Bucket público mal configurado | Exposição indevida | política mínima e chaves sem listagem pública |
| Erros crus para client | Vazamento interno | mensagens genéricas e logs server-side |
| Validação apenas no client | Bypass trivial | Zod no servidor |

## 6. Controles por área

### 6.1 Admin

Obrigatório:

- `/admin` protegido por Clerk;
- `proxy.ts` para barreira de navegação;
- `requireAdmin()` em toda mutação;
- allowlist por `CLERK_ADMIN_USER_IDS`;
- falhar fechado se allowlist não existir em produção;
- nenhum papel/permissão avançada no MVP;
- nenhum login de cliente.

### 6.2 Server Actions

Toda Server Action administrativa deve:

- estar em arquivo server-only;
- chamar `requireAdmin()` antes de qualquer leitura sensível ou mutação;
- validar input com Zod;
- aplicar allowlist de campos;
- verificar existência/relacionamento no banco;
- retornar `ActionResult`;
- não retornar erro bruto;
- registrar log administrativo em alterações relevantes.

### 6.3 Route Handlers

Route Handlers oficiais:

```txt
POST /api/uploads/presign
POST /api/whatsapp-clicks
POST /api/webhooks/clerk   opcional/futuro
```

Regras:

- `POST /api/uploads/presign` exige `requireAdmin()`;
- `POST /api/whatsapp-clicks` é público, limitado e best-effort;
- webhook futuro deve validar assinatura;
- nenhum CRUD administrativo deve virar REST API sem justificativa.

### 6.4 Upload

Obrigatório:

- Railway Buckets ou storage S3-compatible;
- URL assinada curta;
- chave gerada pelo servidor;
- validação de contexto;
- validação de MIME, extensão e tamanho;
- não confiar no nome original;
- não aceitar vídeo por upload;
- não salvar em `/public/uploads`;
- registrar metadados no banco apenas após validação;
- auditar exclusão/substituição.

### 6.5 Conteúdo editável

Obrigatório:

- lista fechada de blocos da LP;
- campos com limite;
- rich text limitado;
- sanitizer server-side antes de renderizar ou persistir;
- nenhum HTML livre;
- nenhum script/event handler;
- preview não pode executar conteúdo arbitrário.

### 6.6 Banco

Obrigatório:

- Drizzle;
- migrations versionadas;
- constraints úteis;
- queries parametrizadas;
- soft delete/status quando houver relação pública;
- backup;
- restore testado antes de produção.

### 6.7 Secrets e env

Obrigatório:

- secrets somente em variáveis de ambiente;
- nunca logar secrets;
- não expor env server-only no client;
- `NEXT_PUBLIC_*` apenas para valores publicáveis;
- `.env.example` sem valor real;
- revogar chaves se houver vazamento.

## 7. Cenários de abuso mínimos para teste

Antes do deploy, testar:

1. Acessar `/admin` sem login.
2. Acessar `/admin` com usuário Clerk fora de `CLERK_ADMIN_USER_IDS`.
3. Chamar Server Action administrativa sem sessão.
4. Chamar Server Action administrativa com sessão não autorizada.
5. Chamar `POST /api/uploads/presign` sem sessão.
6. Chamar `POST /api/uploads/presign` com arquivo `.svg`, `.html`, `.js` ou MIME incompatível.
7. Enviar payload com campo extra em action administrativa.
8. Inserir `<script>` em campo editável.
9. Forçar erro de banco e confirmar que o client não recebe stack trace.
10. Disparar tracking de WhatsApp repetidamente e confirmar rate limit/limitação.

## 8. Critérios de aceite de segurança

- Nenhuma rota `/admin` abre para visitante público.
- Nenhuma mutação administrativa funciona sem `requireAdmin()`.
- Nenhum upload administrativo funciona sem admin autorizado.
- Nenhum upload é salvo localmente no repositório.
- Nenhum conteúdo editável executa script.
- Nenhum secret aparece no client, log ou relatório.
- Tracking não coleta dados pessoais desnecessários.
- Backups e plano de restore estão documentados.
- Logs administrativos registram ator, ação, entidade e horário.

## 9. Resposta a incidente

Se houver suspeita de incidente:

1. Bloquear temporariamente mutações/admin se necessário.
2. Revogar secrets envolvidos.
3. Rotacionar credenciais Clerk/storage/database quando aplicável.
4. Verificar logs administrativos.
5. Restaurar backup se houver corrupção de dados.
6. Registrar causa, impacto e correção.
7. Atualizar docs/tasks para evitar repetição.
