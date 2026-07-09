# Task 028 - Conteúdo inicial e migração manual assistida

Prioridade: P1 para lançamento completo  
Dependências: Admin e site público principais implementados  
Área: Conteúdo, cadastro, homologação visual

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
- `/docs/product/02-escopo-do-produto.md`
- `/docs/ui/00-design-system.md`

## Objetivo

Cadastrar ou revisar o conteúdo inicial do novo site, migrando manualmente o que fizer sentido do site atual e adaptando ao novo posicionamento premium/corporativo.

## Escopo

Preparar conteúdo para:

- LP;
- produtos principais;
- categorias;
- tags;
- imagens de produtos;
- álbuns de fotografia;
- logos de clientes;
- depoimentos;
- FAQs;
- páginas institucionais;
- configurações de WhatsApp;
- SEO básico.

## Fora do escopo

- Não fazer scraping automático sem decisão explícita.
- Não copiar conteúdo ruim do site antigo sem adaptação.
- Não cadastrar preços se a regra do produto é não exibir preço.
- Não cadastrar dados pessoais sensíveis.

## Requisitos de conteúdo

- Linguagem deve ser consultiva, não e-commerce.
- Produtos devem ter descrições claras.
- Imagens devem ter alt text.
- Produtos principais devem estar marcados como destaque quando fizer sentido.
- FAQ deve reduzir dúvidas antes do WhatsApp.
- LP deve comunicar “Locação de brinquedos, games e atrações para eventos”.

## Requisitos de qualidade

- Revisar ortografia.
- Verificar imagens quebradas.
- Verificar links de WhatsApp.
- Verificar se não restou texto antigo de compra/checkout.
- Verificar se o visual ficou coerente com a referência aprovada.

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

- Produtos principais estão cadastrados.
- LP tem conteúdo real ou aprovado para primeira publicação.
- Fotografia tem álbuns iniciais, se disponíveis.
- FAQs, depoimentos e logos estão revisados.
- Não há texto de checkout, compra, pagamento ou carrinho de loja.
- WhatsApp está correto.

## Testes mínimos

- Abrir home e revisar todo conteúdo.
- Abrir `/produtos` e revisar filtros.
- Abrir produtos principais.
- Abrir fotografia.
- Testar WhatsApp de todas as origens principais.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/028-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
