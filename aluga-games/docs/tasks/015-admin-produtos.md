# Task 015 - Admin de produtos

Prioridade: P0  
Dependências: Tasks 013 e 014  
Área: Admin, catálogo, Server Actions

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
- `/docs/architecture/05-contratos-de-actions-e-apis.md`
- `/docs/ui/02-portal-admin.md`

## Objetivo

Implementar o gerenciamento administrativo de produtos, sem upload de imagens nesta task.

## Escopo

Criar telas e actions para:

- listar produtos;
- buscar produto por nome;
- filtrar por status, categoria, tag e destaque;
- criar produto;
- editar produto;
- desativar produto;
- marcar produto como indisponível;
- marcar produto como destaque;
- associar categorias;
- associar tags;
- cadastrar indicação de evento/público;
- cadastrar descrição curta e completa;
- cadastrar vídeo por URL externa;
- cadastrar informações técnicas opcionais;
- cadastrar SEO title e SEO description;
- gerar/validar slug.

## Fora do escopo

- Não implementar upload de imagem nesta task.
- Não exibir preço.
- Não criar checkout.
- Não criar estoque complexo.
- Não criar agenda de disponibilidade.

## Requisitos funcionais

- Produto pode ter múltiplas categorias.
- Produto pode ter múltiplas tags.
- Produto pode estar ativo/inativo.
- Produto pode estar disponível/indisponível.
- Produto pode ser destaque para aparecer na LP.
- Produto deve ser ordenado alfabeticamente nas listagens, salvo regras específicas.

## Requisitos de segurança

- Todas as actions devem chamar `requireAdmin()`.
- Validar input no servidor.
- Sanitizar ou restringir campos ricos para evitar XSS.
- Validar URL de vídeo externa.
- Registrar auditoria administrativa.

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

- Admin cria produto sem imagens.
- Admin edita todos os campos previstos.
- Admin associa categorias e tags.
- Admin altera status e destaque.
- Produto inativo não aparece no site público.
- Produto salvo não aceita slug duplicado.
- Usuário não autorizado não consegue executar actions.

## Testes mínimos

- Criar produto válido.
- Criar produto com slug duplicado.
- Editar produto.
- Desativar produto.
- Marcar como destaque.
- Verificar reflexo no público.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/015-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
