# Task 008 - Página de produtos com filtros

Prioridade: P0  
Dependências: Task 007  
Área: Site público, catálogo, filtros

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

- `/docs/product/04-user-stories.md`
- `/docs/ui/01-site-publico.md`
- `/docs/architecture/04-rotas-e-navegacao.md`

## Objetivo

Implementar a página pública `/produtos`, com listagem única de todos os produtos e filtros conforme definido no produto.

## Escopo

Criar a página `/produtos` com:

- busca por nome;
- filtro por categoria;
- filtro por tags;
- filtro por indicação de evento;
- filtro por disponibilidade/indisponibilidade;
- filtro por produto em destaque;
- filtro por tipo de público: infantil, adulto, corporativo, escolar, condomínio;
- grid responsivo de produtos;
- estado vazio;
- estado de loading quando aplicável;
- cards sem preço;
- CTA para página individual do produto e/ou WhatsApp.

## Fora do escopo

- Não criar páginas separadas por categoria.
- Não criar filtros por preço.
- Não criar filtro por espaço necessário.
- Não criar filtro por número de jogadores.
- Não criar checkout.
- Não criar favoritos.

## Requisitos funcionais

- Todos os produtos públicos ficam centralizados em `/produtos`.
- Filtros podem ser refletidos na URL quando fizer sentido.
- O usuário deve conseguir encontrar produtos mesmo sem saber exatamente o nome.
- Produto indisponível deve aparecer com sinalização clara, se estiver ativo e permitido.
- Produto deve levar para `/produtos/[slug]` ao clicar.

## Requisitos de UI

- Visual premium e consultivo.
- Filtros fáceis de usar no mobile.
- Grid limpo, com cards claros.
- Não exibir preço.
- Não usar linguagem de compra.

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

- `/produtos` renderiza lista única de produtos.
- Todos os filtros definidos funcionam.
- Busca por nome funciona.
- Cards levam para a página individual.
- Mobile está usável.
- Não há carrinho de compra, checkout, favoritos ou preço.

## Testes mínimos

- Testar busca.
- Testar cada filtro individualmente.
- Testar combinação de filtros.
- Testar estado sem resultados.
- Testar mobile.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/008-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
