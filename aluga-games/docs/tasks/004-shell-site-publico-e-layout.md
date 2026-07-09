# Task 004 - Shell do site público e layout base

Prioridade: P0  
Dependências: Task 001  
Área: Site público, UI, navegação

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
- `/docs/architecture/04-rotas-e-navegacao.md`

## Objetivo

Criar a estrutura visual e de navegação base do site público, seguindo a referência premium/corporativa aprovada para a AlugaGames.

## Escopo

Implementar ou ajustar:

- route group público `(site)`;
- layout público;
- header responsivo;
- navegação principal;
- footer institucional;
- botão fixo de WhatsApp;
- container padrão;
- estrutura visual clara, branca/off-white, com verde AlugaGames como cor de ação;
- links para páginas públicas previstas.

## Fora do escopo

- Não implementar CRUD admin.
- Não implementar LP final completa.
- Não implementar filtros de produto.
- Não implementar upload.
- Não implementar checkout, pagamento ou favoritos.

## Requisitos de UI

- O site deve parecer premium, profissional e consultivo.
- Não deve parecer loja virtual tradicional.
- Header deve ser simples e direto.
- CTA principal deve incentivar contato pelo WhatsApp.
- Mobile deve ser tratado desde o começo.
- Footer deve conter links institucionais, produtos, fotografia, representante e trabalhe conosco via WhatsApp.

## Requisitos técnicos

- Usar componentes reutilizáveis quando possível.
- Evitar lógica de negócio em componentes de layout.
- Evitar dados hardcoded que deveriam vir de configurações, exceto placeholders temporários claramente marcados.
- Usar `next/link` para navegação interna.
- Garantir estrutura semântica básica.

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

- O site público renderiza com header e footer.
- O menu funciona no desktop e no mobile.
- O botão de WhatsApp aparece e usa helper centralizado ou estrutura preparada para isso.
- O layout segue a direção visual definida nos docs de UI.
- Não há elementos de e-commerce como preço, checkout, comprar, parcelamento ou favoritos.

## Testes mínimos

- Abrir home no desktop e mobile.
- Verificar navegação principal.
- Verificar link de WhatsApp.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/004-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
