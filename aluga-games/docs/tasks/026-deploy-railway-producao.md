# Task 026 - Deploy na Railway e produção

Prioridade: P0 para lançamento  
Dependências: Task 025 sem P0 aberto  
Área: Deploy, Railway, produção

## Documentos obrigatórios para leitura antes de executar

Leia, no mínimo:

- `/docs/README.md`
- `/docs/adr/README.md`
- `/docs/product/00-visao-do-produto.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`
- `/docs/architecture/00-stack-e-decisoes.md`
- `/docs/architecture/01-arquitetura-de-pastas.md`
- `/docs/architecture/03-banco-de-dados.md`
- `/docs/architecture/05-contratos-de-actions-e-apis.md`
- `/docs/architecture/07-autenticacao-e-autorizacao.md`
- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `/docs/quality/01-definition-of-done.md`
- `/docs/quality/02-checklist-review-ai.md`

Leia também qualquer documento específico citado nesta task.


Documentos específicos:

- `/docs/architecture/00-stack-e-decisoes.md`
- `/docs/architecture/06-upload-e-midias.md`
- `/docs/architecture/07-autenticacao-e-autorizacao.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`

## Objetivo

Preparar e executar o deploy seguro do sistema em produção, com banco, storage, Clerk e variáveis de ambiente corretamente configurados.

## Escopo

Preparar:

- serviço Next.js na Railway;
- banco PostgreSQL;
- Drizzle migrations em produção;
- Railway Buckets ou storage compatível definido;
- variáveis de ambiente de produção;
- Clerk em ambiente de produção;
- allowlist do dono;
- domínio customizado;
- HTTPS;
- build de produção;
- checklist de smoke test.

## Fora do escopo

- Não commitar secrets.
- Não usar credenciais de desenvolvimento em produção.
- Não liberar admin sem allowlist.
- Não fazer deploy com P0 de segurança aberto.

## Requisitos de segurança

- `CLERK_ADMIN_USER_IDS` configurado corretamente.
- Chaves de storage com menor privilégio possível.
- Banco com credenciais apenas em env.
- Logs sem secrets.
- Admin bloqueado para usuários não autorizados.
- `/admin` não indexável.

## Smoke test pós-deploy

- Home abre.
- `/produtos` abre.
- Página individual de produto abre.
- WhatsApp funciona.
- Login admin funciona para o dono.
- Usuário não autorizado é bloqueado.
- Upload funciona.
- Edição de produto reflete no público.
- Sitemap/robots abrem.

## Regras inegociáveis para IA

- Não implemente funcionalidades fora do escopo desta task.
- Não remova validações, autenticação ou autorização para “fazer funcionar”.
- Não exponha secrets, tokens, variáveis sensíveis ou stack traces.
- Não crie checkout, pagamento online, pedido fechado no site, área de cliente ou favorito.
- Toda mutação administrativa deve validar autenticação e autorização no servidor.
- Toda entrada do usuário deve ser validada no servidor com schema claro.
- Qualquer alteração de arquitetura precisa ser registrada ou justificada no relatório da task.
- Se encontrar risco P0 de segurança, pare a implementação funcional e registre o bloqueio.


## Critérios de aceite

- Deploy está online em domínio correto.
- HTTPS está ativo.
- Admin protegido.
- Banco conectado.
- Storage funcionando.
- Migrations aplicadas.
- Smoke test passou.
- Nenhum secret foi exposto.

## Testes mínimos

- Rodar build local antes do deploy.
- Conferir variáveis de produção.
- Rodar smoke test completo.
- Conferir logs iniciais de erro.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/026-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
