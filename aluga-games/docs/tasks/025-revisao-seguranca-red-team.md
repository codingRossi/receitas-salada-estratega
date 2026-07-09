# Task 025 - Revisão de segurança e red team interno

Prioridade: P0 antes do deploy  
Dependências: Features principais implementadas  
Área: Cybersecurity, revisão, hardening

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

- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `/docs/quality/02-checklist-review-ai.md`

## Objetivo

Executar uma revisão de segurança do sistema antes do deploy, assumindo que o código foi majoritariamente desenvolvido por IA.

## Escopo

Revisar e testar:

- rotas `/admin`;
- middleware Clerk;
- allowlist do dono;
- `requireAdmin()`;
- Server Actions;
- Route Handlers;
- upload de imagens;
- storage;
- XSS em conteúdo editável;
- validação de inputs;
- exposição de secrets;
- logs e tratamento de erro;
- permissões de banco/storage;
- tracking de WhatsApp;
- localStorage/lista de produtos;
- dependências vulneráveis.

## Fora do escopo

- Não fazer pentest destrutivo em produção.
- Não usar ferramentas ofensivas contra serviços de terceiros sem autorização.
- Não alterar funcionalidades sem registrar.

## Cenários mínimos de ataque para testar

- Acessar `/admin` sem login.
- Acessar `/admin` com usuário Clerk fora da allowlist.
- Chamar Server Action administrativa diretamente sem autorização.
- Enviar payload inválido para actions.
- Tentar upload de arquivo não imagem.
- Tentar upload com extensão falsa.
- Inserir `<script>` em campos editáveis.
- Tentar acessar produto inativo por slug.
- Tentar obter storage keys ou dados internos pelo público.
- Verificar se `.env` ou secrets aparecem no bundle/logs.

## Requisitos de saída

Classificar achados como:

- P0: bloqueia deploy;
- P1: corrigir antes ou logo após deploy com justificativa;
- P2: melhoria.

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

- Nenhum P0 permanece aberto.
- Rotas admin estão protegidas.
- Actions sensíveis validam autorização.
- Upload é seguro.
- XSS básico está mitigado.
- Secrets não vazam.
- Relatório de segurança foi criado.

## Testes mínimos

- Executar todos os cenários de ataque mínimos.
- Rodar lint, typecheck, build e testes.
- Revisar variáveis de ambiente.
- Revisar logs de erro.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/025-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
