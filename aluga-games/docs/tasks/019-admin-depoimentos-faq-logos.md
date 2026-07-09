# Task 019 - Admin de depoimentos, FAQ e logos

Prioridade: P1  
Dependências: Tasks 013, 016 e 017  
Área: Admin, CMS auxiliar, prova social

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

- `/docs/ui/01-site-publico.md`
- `/docs/ui/02-portal-admin.md`
- `/docs/product/03-regras-de-negocio.md`

## Objetivo

Implementar o gerenciamento administrativo de depoimentos, perguntas frequentes e logos de clientes/empresas.

## Escopo

Criar telas e actions para:

### Depoimentos

- listar;
- criar;
- editar;
- ativar/desativar;
- excluir quando seguro;
- marcar destaque, se aplicável.

### FAQ

- listar;
- criar pergunta e resposta;
- editar;
- ativar/desativar;
- excluir;
- ordenar quando necessário.

### Logos/clientes

- listar;
- criar;
- editar nome;
- subir/trocar imagem do logo;
- ativar/desativar;
- excluir quando seguro.

## Fora do escopo

- Não criar avaliação pública enviada por usuário.
- Não criar moderação de comentários.
- Não permitir HTML arbitrário em FAQ/depoimentos.
- Não criar cadastro público de empresas.

## Requisitos funcionais

- Conteúdo ativo pode aparecer na LP.
- Conteúdo inativo não aparece publicamente.
- Admin consegue manter prova social sem mexer no código.
- Logos devem ter alt text ou nome acessível.

## Requisitos de segurança

- Todas as actions chamam `requireAdmin()`.
- Validar campos no servidor.
- Sanitizar texto.
- Upload de logos segue regras seguras.
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

- Admin gerencia depoimentos.
- Admin gerencia FAQs.
- Admin gerencia logos/clientes.
- Conteúdos aparecem na LP quando ativos e selecionados.
- Conteúdos inativos não aparecem.
- Upload de logo é seguro.

## Testes mínimos

- Criar/editar/desativar depoimento.
- Criar/editar/desativar FAQ.
- Criar logo com upload.
- Verificar LP pública.
- Testar autorização.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/019-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
