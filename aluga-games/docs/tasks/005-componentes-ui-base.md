# Task 005 - Componentes UI base

Prioridade: P0  
Dependências: Task 004  
Área: UI, design system, reutilização

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
- `/docs/ui/02-portal-admin.md`

## Objetivo

Criar os componentes visuais reutilizáveis necessários para acelerar o desenvolvimento do site público e do portal admin sem duplicação e sem bagunça visual.

## Escopo

Criar ou organizar componentes como:

- `Container`;
- `Section`;
- `Button`/variações ou wrapper do componente UI usado;
- `Heading` ou padrões tipográficos;
- `Card`;
- `Badge`;
- `EmptyState`;
- `LoadingState`;
- `ErrorState`;
- `ConfirmDialog`;
- `ResponsiveImage`;
- `WhatsAppButton`;
- `ProductCard` base;
- `FAQAccordion` base;
- `Drawer` base para lista de produtos;
- componentes básicos de formulário.

## Fora do escopo

- Não implementar regra de negócio complexa.
- Não conectar componentes ao banco nesta task, salvo exemplos mínimos.
- Não criar redesign diferente da referência aprovada.
- Não criar biblioteca visual excessivamente abstrata.

## Requisitos de UI

- Visual limpo, premium e corporativo.
- Espaçamento generoso.
- Verde como cor de ação.
- Cards claros, sem excesso de sombra.
- Estados de hover/focus visíveis.
- Componentes acessíveis por teclado quando interativos.

## Requisitos técnicos

- Componentes devem ser simples e previsíveis.
- Componentes de apresentação não devem saber de Drizzle, Clerk ou storage.
- Tipos TypeScript claros para props.
- Evitar dependência circular entre componentes.

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

- Componentes base existem e são reutilizáveis.
- O visual segue o design system.
- Componentes interativos têm estado de foco.
- Não há regra de negócio escondida em componente visual.
- Não há dados sensíveis ou mock permanente.

## Testes mínimos

- Renderizar componentes em páginas existentes ou playground interno, se houver.
- Rodar lint, typecheck e build.
- Verificar navegação por teclado nos componentes interativos principais.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/005-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
