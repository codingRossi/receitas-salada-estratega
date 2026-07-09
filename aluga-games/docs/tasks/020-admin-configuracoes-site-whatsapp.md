# Task 020 - Admin de configurações do site e WhatsApp

Prioridade: P0  
Dependências: Task 013  
Área: Admin, configurações, WhatsApp

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

- `/docs/architecture/05-contratos-de-actions-e-apis.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/ui/02-portal-admin.md`

## Objetivo

Permitir que o dono configure informações globais do site, especialmente o número de WhatsApp e mensagens padrão.

## Escopo

Criar tela de configurações para:

- número principal do WhatsApp;
- mensagem padrão geral;
- mensagem para produto individual;
- mensagem para lista de produtos;
- mensagem para trabalhe conosco;
- e-mail/telefone, se usados no footer;
- links de redes sociais;
- SEO padrão do site;
- informações de contato exibidas no footer.

## Fora do escopo

- Não criar múltiplos números por serviço.
- Não criar automação de atendimento.
- Não integrar WhatsApp API.
- Não enviar mensagens automaticamente.
- Não criar chatbot.

## Requisitos funcionais

- Todo CTA de WhatsApp deve usar configuração centralizada.
- Alterar o número no admin deve refletir no site público.
- Mensagens devem ser geradas por helper centralizado.
- Mensagens não podem conter HTML.

## Requisitos de segurança

- Todas as actions chamam `requireAdmin()`.
- Validar formato do telefone.
- Validar URLs de redes sociais.
- Sanitizar textos.
- Registrar auditoria.

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

- Admin altera número do WhatsApp.
- Site público passa a usar o novo número.
- Mensagem de produto contém nome do produto.
- Mensagem da lista contém itens e quantidades.
- Footer usa configurações globais.

## Testes mínimos

- Alterar WhatsApp.
- Testar CTA geral.
- Testar CTA de produto.
- Testar CTA de lista.
- Testar link “trabalhe conosco”.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/020-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
