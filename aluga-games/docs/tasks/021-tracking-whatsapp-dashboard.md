# Task 021 - Tracking de WhatsApp e métricas do dashboard

Prioridade: P2  
Dependências: Tasks 010, 013 e 020  
Área: Métricas, dashboard, conversão

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
- `/docs/ui/02-portal-admin.md`

## Objetivo

Registrar cliques em CTAs de WhatsApp para dar ao dono uma visão simples de uso do site, sem criar sistema de orçamento ou rastreamento invasivo.

## Escopo

Implementar tracking para:

- clique em WhatsApp geral;
- clique em WhatsApp de produto;
- clique em WhatsApp da lista de produtos;
- clique em trabalhe conosco;
- origem da página;
- produto relacionado, quando aplicável;
- timestamp.

Atualizar dashboard com:

- total de cliques em WhatsApp;
- cliques por origem;
- produtos com mais cliques;
- cliques recentes.

## Fora do escopo

- Não rastrear dados pessoais sensíveis.
- Não criar orçamento no banco.
- Não criar identificação de cliente.
- Não gravar conteúdo livre digitado pelo usuário.
- Não integrar Google Analytics nesta task, salvo já existir no projeto.

## Requisitos técnicos

- Usar Route Handler seguro para registrar clique, se necessário.
- Validar payload no servidor.
- Não confiar em dados do client.
- Rate limit simples ou proteção contra abuso se viável.
- Falha no tracking não pode impedir abertura do WhatsApp.

## Requisitos de privacidade

- Registrar apenas dados mínimos necessários.
- Não armazenar telefone, nome ou mensagem privada do visitante.
- Não coletar dados pessoais sem necessidade.

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

- Cliques de WhatsApp são registrados.
- Dashboard mostra métricas simples.
- Produto com clique é associado quando aplicável.
- Falha no tracking não quebra CTA.
- Nenhum dado pessoal sensível é coletado.

## Testes mínimos

- Clicar WhatsApp geral.
- Clicar WhatsApp de produto.
- Clicar WhatsApp da lista.
- Verificar dashboard.
- Enviar payload inválido para rota e validar bloqueio.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/021-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
