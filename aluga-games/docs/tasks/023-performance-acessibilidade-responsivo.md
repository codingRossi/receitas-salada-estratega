# Task 023 - Performance, acessibilidade e responsividade

Prioridade: P1  
Dependências: Site público e admin principais implementados  
Área: Qualidade, UX, performance

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

- `/docs/ui/03-seo-performance-acessibilidade.md`
- `/docs/quality/00-estrategia-de-testes.md`

## Objetivo

Revisar e melhorar performance, acessibilidade e responsividade do site público e das principais telas admin.

## Escopo

Revisar:

- home;
- página de produtos;
- página individual de produto;
- lista de produtos para WhatsApp;
- fotografia;
- páginas institucionais;
- telas admin principais;
- imagens;
- carrosséis/galerias;
- forms admin;
- drawer/lista;
- FAQ;
- navegação mobile.

## Fora do escopo

- Não redesenhar o sistema inteiro.
- Não alterar regras de negócio.
- Não remover segurança para melhorar performance.
- Não trocar stack sem necessidade.

## Requisitos de performance

- Usar imagens otimizadas.
- Evitar carregar vídeos pesados automaticamente.
- Evitar JS desnecessário em páginas públicas.
- Evitar queries duplicadas.
- Garantir loading states.
- Evitar layout shift visível.

## Requisitos de acessibilidade

- Navegação por teclado nos elementos interativos.
- Estados de foco visíveis.
- Alt text em imagens importantes.
- Labels em formulários.
- Botões com texto acessível.
- FAQ acessível.
- Drawer acessível.
- Contraste adequado.

## Requisitos de responsividade

- Header mobile funcional.
- Filtros mobile usáveis.
- Galeria mobile boa.
- Admin utilizável em telas menores, dentro do razoável.

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

- Páginas principais funcionam bem em mobile.
- Não há imagens gigantes sem otimização.
- CTAs continuam visíveis.
- Formulários admin têm labels e erros claros.
- Navegação por teclado não fica presa.
- Não houve regressão de segurança.

## Testes mínimos

- Testar em largura mobile, tablet e desktop.
- Navegar por teclado.
- Testar FAQ/drawer/menu mobile.
- Verificar imagens sem alt.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/023-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
