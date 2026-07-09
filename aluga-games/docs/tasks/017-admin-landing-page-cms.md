# Task 017 - Admin da landing page por CMS modular

Prioridade: P0  
Dependências: Tasks 013, 015 e 016  
Área: Admin, CMS, landing page

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
- `/docs/ui/02-portal-admin.md`

## Objetivo

Implementar a edição administrativa da landing page usando blocos controlados, sem criar um page builder livre.

## Escopo

Permitir que o dono edite blocos como:

- hero principal;
- galeria/imagens principais;
- logos de empresas/clientes;
- por que escolher a AlugaGames;
- produtos mais procurados/destacados;
- blocos de soluções específicas;
- como funciona;
- depoimento principal;
- FAQ exibido na LP;
- CTA final.

Permitir, quando previsto:

- editar textos;
- trocar imagens;
- ocultar/exibir blocos;
- selecionar produtos destacados;
- selecionar logos;
- selecionar depoimentos;
- selecionar FAQs;
- alterar ordem de blocos controlados, se definido nos docs.

## Fora do escopo

- Não criar page builder livre.
- Não permitir HTML arbitrário inseguro.
- Não criar componentes dinâmicos não previstos.
- Não permitir upload público.

## Requisitos funcionais

- A LP pública deve refletir as alterações do admin.
- A edição deve ser simples para o dono.
- Cada bloco deve ter campos definidos, não um editor livre sem controle.
- Deve haver estados de erro/sucesso no admin.
- Alterações devem revalidar a home quando necessário.

## Requisitos de segurança

- Toda action deve chamar `requireAdmin()`.
- Validar tipo do bloco e campos permitidos.
- Sanitizar conteúdo textual quando aplicável.
- Bloquear HTML/script arbitrário.
- Registrar auditoria.

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

- Admin edita hero da LP.
- Admin troca imagem principal/galeria quando aplicável.
- Admin escolhe produtos destacados exibidos na LP.
- Admin oculta/exibe blocos.
- LP pública reflete alterações.
- Não existe page builder livre inseguro.

## Testes mínimos

- Editar texto do hero.
- Trocar imagem.
- Ocultar bloco.
- Exibir bloco.
- Selecionar produto destacado.
- Verificar home pública.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/017-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
