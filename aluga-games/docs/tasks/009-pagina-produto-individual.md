# Task 009 - Página individual de produto

Prioridade: P0  
Dependências: Tasks 007 e 008  
Área: Site público, produto, WhatsApp

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
- `/docs/ui/01-site-publico.md`
- `/docs/architecture/04-rotas-e-navegacao.md`

## Objetivo

Implementar a página pública `/produtos/[slug]`, com informações completas do produto e CTA forte para WhatsApp.

## Escopo

A página deve exibir:

- galeria de imagens;
- vídeo por URL externa, quando existir;
- nome do produto;
- categorias;
- tags;
- indicação para eventos/públicos;
- descrição curta;
- descrição completa;
- informações técnicas opcionais;
- status de disponibilidade;
- produtos relacionados;
- botão “Solicitar pelo WhatsApp”;
- botão para adicionar à lista de produtos, se a task 010 já estiver disponível ou com placeholder seguro.

## Fora do escopo

- Não exibir preço.
- Não criar checkout.
- Não criar formulário de orçamento.
- Não criar login de cliente.
- Não permitir compra pelo site.

## Requisitos funcionais

- O botão de WhatsApp deve montar mensagem com o nome do produto.
- Produto inativo deve retornar 404 ou não ser acessível publicamente.
- Produto indisponível deve ter sinalização clara.
- Informações técnicas devem ser opcionais.
- Produtos relacionados devem ser ativos e coerentes por categoria/tag quando possível.

## Requisitos de SEO

- Gerar metadata com título e descrição do produto.
- Usar canonical correto.
- Não indexar produto inativo.
- Usar imagens com alt text.

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

- Página individual abre por slug.
- Produto inexistente/inativo retorna 404.
- WhatsApp abre com mensagem específica do produto.
- Galeria funciona no desktop e mobile.
- Informações opcionais não quebram layout quando ausentes.
- Não há preço, checkout ou compra.

## Testes mínimos

- Testar produto com várias imagens.
- Testar produto sem vídeo.
- Testar produto com vídeo.
- Testar produto indisponível.
- Testar slug inexistente.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/009-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
