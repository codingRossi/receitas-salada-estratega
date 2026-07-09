# 10 - Observabilidade e Backup

Este documento define logs, auditoria, backup, restore e resposta a incidentes.

## 1. Objetivo

Garantir que o site possa ser operado com segurança após o deploy, especialmente nas áreas de:

- admin;
- upload;
- banco;
- conteúdo editável;
- WhatsApp;
- deploy.

## 2. Logs de aplicação

Logs devem ajudar diagnóstico sem expor dados sensíveis.

Não logar:

- `DATABASE_URL`;
- `CLERK_SECRET_KEY`;
- chaves de storage;
- cookies;
- tokens;
- headers completos de autenticação;
- payload bruto com dados sensíveis.

Logar de forma controlada:

- erro interno com identificador/código;
- rota ou action;
- timestamp;
- ambiente;
- entidade afetada, quando seguro;
- `requestId`, se existir.

Mensagens para o usuário devem ser genéricas. Detalhes ficam apenas no servidor.

## 3. Logs administrativos

Entidade esperada: `admin_audit_logs`.

Registrar alterações relevantes:

- criação/edição/desativação/exclusão de produto;
- criação/edição/desativação de categoria/tag;
- upload, substituição e exclusão de mídia;
- edição de landing page;
- edição de depoimentos, FAQ e logos;
- edição de configurações do site;
- alterações relevantes de fotografia;
- tentativas negadas relevantes, se viável.

Campos mínimos:

| Campo | Tipo | Observação |
|---|---:|---|
| `id` | uuid | Gerado pelo banco |
| `actorClerkUserId` | text | `userId` do Clerk |
| `action` | text/enum | Ex.: `product.update` |
| `entityType` | text | Ex.: `product` |
| `entityId` | text/uuid | Se houver |
| `summary` | text | Descrição curta |
| `metadata` | json | Sem secrets |
| `createdAt` | timestamp | Automático |

Regras:

- nunca armazenar segredo em `metadata`;
- logs devem ser somente leitura no admin;
- não permitir edição de logs pelo admin;
- retenção recomendada: 365 dias.

## 4. Tracking de WhatsApp

O tracking é público e best-effort.

Regras:

- rota oficial: `POST /api/whatsapp-clicks`;
- não bloquear abertura do WhatsApp;
- payload mínimo;
- não coletar dados pessoais desnecessários;
- rate limit por IP/janela quando disponível;
- erro de tracking não aparece para visitante;
- logs agregados devem ser suficientes para dashboard simples.

Campos aceitáveis:

- origem do clique;
- produto, se houver;
- página;
- timestamp server-side;
- user-agent truncado ou categorizado, se realmente necessário.

Evitar:

- nome;
- e-mail;
- telefone digitado;
- mensagem completa do visitante;
- IP persistido em claro sem necessidade.

## 5. Monitoramento mínimo

Monitorar:

- falhas de build/deploy;
- erro 5xx;
- falha de conexão com banco;
- falha de upload/presign;
- falha de Clerk;
- taxa anormal de tracking;
- armazenamento do bucket;
- tempo de resposta de páginas principais.

Alertas mínimos:

- produção fora do ar;
- erro persistente em `/admin`;
- upload falhando;
- banco indisponível;
- uso anormal de storage.

## 6. Backup do PostgreSQL

Backup é obrigatório em produção.

Regras:

- backup automático diário, quando disponível;
- backup manual antes de migration destrutiva;
- retenção mínima recomendada: 7 a 30 dias;
- restore testado antes do lançamento;
- documentação do último restore testado no relatório de deploy/handover.

Backup deve cobrir:

- produtos;
- categorias/tags;
- configurações;
- LP;
- fotografia;
- depoimentos/FAQ/logos;
- tracking, se desejado;
- audit logs.

## 7. Backup de mídias

Mídias ficam em Railway Buckets/object storage.

Regras:

- não considerar Git como backup de upload;
- manter metadados no banco;
- exclusão física deve ser confirmada e auditada;
- se possível, usar versionamento/retention do provider;
- antes de limpeza em massa, exportar lista de chaves afetadas.

## 8. Restore

Procedimento de restore de banco:

1. Identificar data/hora desejada.
2. Colocar admin em modo de manutenção operacional, se necessário.
3. Restaurar backup em ambiente isolado quando possível.
4. Validar integridade básica.
5. Aplicar restore em produção.
6. Rodar smoke test público.
7. Testar login admin.
8. Testar leitura de produtos e mídias.
9. Registrar incidente/restore.

Validações após restore:

- home abre;
- produtos aparecem;
- imagens carregam;
- admin acessa;
- upload ainda funciona;
- configurações de WhatsApp permanecem corretas.

## 9. Incidentes

### 9.1 Admin comprometido ou acesso indevido

Ações:

1. Remover usuário suspeito de `CLERK_ADMIN_USER_IDS`.
2. Rotacionar `CLERK_SECRET_KEY` se houver suspeita de vazamento.
3. Verificar `admin_audit_logs`.
4. Reverter alterações maliciosas.
5. Trocar senhas/segurança da conta Clerk do dono.
6. Registrar causa e correção.

### 9.2 Upload malicioso

Ações:

1. Bloquear temporariamente upload.
2. Remover mídia suspeita do site público.
3. Revogar URL/objeto no bucket se necessário.
4. Verificar logs e entidade associada.
5. Corrigir validação.
6. Rodar testes de upload novamente.

### 9.3 Vazamento de secret

Ações:

1. Revogar secret exposto.
2. Criar novo secret.
3. Atualizar Railway.
4. Redeploy.
5. Verificar logs e acessos anormais.
6. Registrar onde ocorreu o vazamento.

### 9.4 Migration com problema

Ações:

1. Parar novas alterações administrativas, se necessário.
2. Avaliar rollback de migration.
3. Restaurar backup se rollback não for seguro.
4. Corrigir migration em nova alteração versionada.
5. Rodar smoke test.

## 10. Checklist pré-deploy operacional

- Backup configurado.
- Restore testado ou plano de teste documentado.
- `CLERK_ADMIN_USER_IDS` conferido.
- Logs administrativos implementados para mutações críticas.
- Upload com logs de falha suficientes.
- Tracking não bloqueia WhatsApp.
- Secrets não aparecem em logs.
- Plano de rollback conhecido.
- Responsável pelo domínio/Railway/Clerk identificado.

## 11. Checklist pós-deploy

- Home e páginas principais respondem.
- Admin acessa apenas com dono autorizado.
- Usuário Clerk não autorizado é bloqueado.
- Upload funciona.
- Edição de produto registra log.
- WhatsApp abre.
- Tracking registra sem bloquear.
- Logs não exibem secrets.
- Backup inicial validado.

## 12. Handover

O handover final deve registrar:

- URL de produção;
- domínio canônico;
- onde ficam envs;
- onde ficam backups;
- como restaurar backup;
- como revogar acesso admin;
- como bloquear upload temporariamente;
- como acionar rollback;
- pendências conhecidas.
