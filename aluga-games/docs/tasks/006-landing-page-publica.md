# Task 006 - Landing page pública

Prioridade: P0  
Dependências: Tasks 004 e 005  
Área: Site público, CMS read-side, conversão

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

- `/docs/ui/00-design-system.md`
- `/docs/ui/01-site-publico.md`
- `/docs/product/04-user-stories.md`

## Objetivo

Implementar a landing page pública da AlugaGames seguindo o estilo premium/corporativo definido, com foco em conversão para WhatsApp e descoberta dos produtos.

## Escopo

Criar a home com blocos previstos:

- hero principal com imagem grande/galeria;
- logos de empresas/clientes;
- diferenciais ou “por que escolher a AlugaGames”;
- produtos/atrações em destaque;
- blocos de soluções específicas, como eventos corporativos, festas, realidade virtual, infláveis etc.;
- seção “como funciona”;
- depoimento principal ou lista de depoimentos;
- galeria/banner de eventos;
- FAQ;
- CTA final para WhatsApp.

## Fora do escopo

- Não criar editor admin da LP nesta task.
- Não criar page builder livre.
- Não implementar checkout.
- Não implementar carrinho de compra.
- Não implementar upload.

## Requisitos funcionais

- A LP deve consumir blocos configurados no banco quando já existirem.
- Se os blocos ainda não existirem, deve existir fallback seguro e não quebrar a página.
- Produtos em destaque devem vir de produtos ativos e destacados, quando disponíveis.
- CTAs devem levar ao WhatsApp com mensagem adequada.
- A seção de produtos deve levar para `/produtos` ou para páginas individuais.

## Requisitos de UI

- Seguir a referência enviada: fundo claro, imagem forte, texto direto, cards limpos, CTA verde.
- Priorizar leitura rápida e visual profissional.
- Não mostrar preço.
- Não usar linguagem de loja, como “comprar”, “checkout”, “parcelamento”.

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

- A home renderiza sem erro.
- Todas as seções principais existem ou têm fallback seguro.
- CTAs de WhatsApp funcionam.
- Produtos em destaque aparecem quando houver produtos destacados ativos.
- A página é responsiva.
- A página não parece e-commerce tradicional.

## Testes mínimos

- Abrir home sem dados no banco, se possível.
- Abrir home com seed.
- Verificar CTAs.
- Verificar responsividade.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/006-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
