# Task 010 - Lista de produtos para WhatsApp

Prioridade: P0  
Dependências: Tasks 008 e 009  
Área: Conversão, client state, WhatsApp

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

- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`
- `/docs/architecture/05-contratos-de-actions-e-apis.md`

## Objetivo

Implementar a lista simples de produtos que o visitante pode montar e enviar pelo WhatsApp, sem transformar isso em checkout ou orçamento fechado.

## Escopo

Implementar:

- botão para adicionar produto à lista;
- drawer lateral ou interface equivalente;
- botão no header ou acesso visível à lista;
- controle de quantidade;
- remoção de produtos;
- persistência em `localStorage`;
- montagem de mensagem para WhatsApp com os produtos selecionados;
- limpeza opcional da lista após clique em WhatsApp;
- estado vazio.

## Fora do escopo

- Não persistir lista no banco.
- Não criar pedido.
- Não criar orçamento fechado.
- Não criar checkout.
- Não criar pagamento.
- Não exigir login do visitante.
- Não criar favoritos.

## Requisitos funcionais

- O fluxo principal continua sendo ir direto do produto para WhatsApp.
- A lista é apenas uma conveniência para enviar vários produtos na mesma mensagem.
- A mensagem deve ser clara, com nome e quantidade dos produtos.
- O usuário deve conseguir remover itens e alterar quantidade.
- A lista deve sobreviver a refresh usando localStorage.

## Mensagem sugerida

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre estes produtos:

- 1x Produto A
- 2x Produto B

Pode me ajudar?
```

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

- Usuário consegue adicionar produto à lista.
- Usuário consegue alterar quantidade.
- Usuário consegue remover produto.
- Lista persiste no localStorage.
- WhatsApp abre com mensagem listando produtos e quantidades.
- Nenhum dado de cliente é salvo no banco.
- Interface não parece checkout.

## Testes mínimos

- Adicionar produto.
- Alterar quantidade.
- Remover produto.
- Recarregar página e validar persistência.
- Enviar lista para WhatsApp.
- Testar mobile.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/010-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
