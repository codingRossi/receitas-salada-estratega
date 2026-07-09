# Task 011 - Páginas institucionais estáticas

Prioridade: P1  
Dependências: Tasks 004 e 005  
Área: Site público, institucional

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
- `/docs/ui/01-site-publico.md`
- `/docs/architecture/04-rotas-e-navegacao.md`

## Objetivo

Implementar as páginas institucionais estáticas previstas no escopo, com design atualizado e coerente com a nova identidade visual.

## Escopo

Implementar:

- página “Representante AlugaGames”, baseada no conteúdo atual, com design novo;
- página “Por que contratar”, baseada no conteúdo atual, com design novo;
- link “Trabalhe conosco” no footer levando direto para WhatsApp com mensagem estática;
- CTAs para WhatsApp quando aplicável;
- metadata básica para cada página.

## Fora do escopo

- Não criar editor admin para essas páginas nesta task.
- Não criar formulário de candidatura.
- Não armazenar currículo.
- Não criar múltiplos números de WhatsApp.
- Não criar páginas de outros negócios.

## Requisitos funcionais

- Páginas devem ser estáticas no código inicialmente.
- Conteúdo deve ser revisável e fácil de ajustar depois.
- CTA deve usar mensagem específica conforme origem.
- Trabalhe conosco deve ser link direto para WhatsApp, não página complexa.

## Requisitos de UI

- Manter visual premium e corporativo.
- Melhorar apresentação do conteúdo atual.
- Evitar excesso de texto corrido.
- Usar seções, cards e CTAs.

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

- Página de representante existe e abre corretamente.
- Página “Por que contratar” existe e abre corretamente.
- Footer tem link “Trabalhe conosco” para WhatsApp.
- CTAs usam mensagens corretas.
- Não há formulário, upload ou armazenamento de currículo.

## Testes mínimos

- Acessar as páginas.
- Testar links do footer.
- Testar mensagens de WhatsApp.
- Verificar responsividade.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/011-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
