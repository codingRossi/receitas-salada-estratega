# Task 003 - Seed e dados iniciais

Prioridade: P0  
Dependências: Task 002  
Área: Banco, conteúdo inicial, segurança

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

- `/docs/product/01-auditoria-site-atual.md`
- `/docs/architecture/03-banco-de-dados.md`

## Objetivo

Criar um processo seguro e reprodutível de seed para popular o banco com dados iniciais necessários ao funcionamento do site e do portal admin.

## Escopo

Criar seed inicial para:

- configurações globais do site;
- número padrão do WhatsApp via variável de ambiente ou configuração segura;
- categorias iniciais;
- tags iniciais;
- blocos padrão da landing page;
- FAQs padrão, se necessário;
- placeholders seguros para depoimentos e logos, se necessário;
- produtos de exemplo somente quando explicitamente marcados como exemplo/desenvolvimento.

## Fora do escopo

- Não cadastrar produtos reais sem fonte validada.
- Não fazer scraping automático do site antigo nesta task.
- Não criar usuários administrativos locais.
- Não inserir secrets reais em arquivos versionados.
- Não cadastrar dados pessoais sensíveis.

## Requisitos técnicos

- Seed deve ser idempotente: rodar mais de uma vez não deve duplicar tudo.
- Seed deve diferenciar ambiente de desenvolvimento e produção.
- Em produção, não sobrescrever conteúdo real já editado pelo admin.
- Dados de exemplo devem estar claramente identificados.
- O seed não deve depender de imagens locais obrigatórias inexistentes.

## Dados iniciais sugeridos

Categorias iniciais podem incluir, se fizer sentido com a estratégia do cliente:

- Games;
- Realidade virtual;
- Infláveis;
- Máquinas;
- Decoração;
- Eventos corporativos;
- Festas e aniversários.

Tags iniciais podem incluir:

- infantil;
- adulto;
- corporativo;
- escola;
- condomínio;
- evento premium;
- mais procurado.

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

- O seed roda sem quebrar em banco vazio.
- O seed pode rodar novamente sem duplicações críticas.
- Configurações essenciais existem após o seed.
- A LP tem blocos mínimos para renderizar sem erro.
- Categorias e tags iniciais existem.
- Nenhum segredo real foi salvo no banco ou no código indevidamente.

## Testes mínimos

- Rodar migrations em banco limpo.
- Rodar seed.
- Rodar seed novamente e verificar idempotência.
- Rodar typecheck/build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/003-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
