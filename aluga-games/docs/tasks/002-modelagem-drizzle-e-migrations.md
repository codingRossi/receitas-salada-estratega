# Task 002 - Modelagem Drizzle e migrations

Prioridade: P0  
Dependências: Task 000 e Task 001  
Área: Banco de dados, domínio, segurança

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

- `/docs/architecture/02-modelo-de-dominio.md`
- `/docs/architecture/03-banco-de-dados.md`

## Objetivo

Implementar a modelagem inicial do banco de dados com Drizzle/PostgreSQL, alinhada ao domínio do produto e sem criar entidades fora do escopo.

## Escopo

Criar ou ajustar schemas Drizzle para:

- categorias;
- tags;
- produtos;
- relação produto-categoria;
- relação produto-tag;
- mídias de produto;
- informações técnicas de produto;
- indicações de evento/público;
- blocos da landing page;
- itens ou relações dos blocos da landing page;
- álbuns de fotografia;
- fotos dos álbuns;
- depoimentos;
- perguntas frequentes;
- logos/clientes;
- configurações globais do site;
- eventos de clique no WhatsApp;
- logs administrativos.

## Fora do escopo

Não criar:

- tabela de clientes;
- tabela de pedidos;
- tabela de pagamentos;
- tabela de checkout;
- tabela de carrinho persistente;
- tabela de favoritos;
- tabela própria de usuários/senhas, caso Clerk esteja sendo usado como fonte de identidade.

## Requisitos técnicos

- Usar Drizzle conforme padrão já existente no repo.
- Usar nomes consistentes, preferencialmente em inglês no banco e código.
- Usar `uuid` ou estratégia equivalente já adotada pelo projeto.
- Garantir `created_at` e `updated_at` nas entidades principais.
- Garantir `slug` único em produtos, categorias, tags e álbuns quando aplicável.
- Garantir índices úteis para filtros públicos: produto ativo, produto destacado, categoria, tag, status e slug.
- Garantir constraints para evitar dados inválidos sempre que fizer sentido.
- Garantir suporte a conteúdo ativo/inativo sem excluir dados imediatamente.

## Campos mínimos esperados

### Produtos

- `id`
- `name`
- `slug`
- `short_description`
- `full_description`
- `status`
- `is_active`
- `is_featured`
- `video_url`
- `seo_title`
- `seo_description`
- `created_at`
- `updated_at`

### Mídias

- `id`
- `owner_type` ou relação explícita com produto/bloco/álbum/logo
- `url`
- `storage_key`
- `alt_text`
- `mime_type`
- `size_bytes`
- `sort_order`
- `is_cover`
- `created_at`

### Landing page

- blocos controlados por tipo;
- título, subtítulo, texto, imagem e configurações específicas por bloco;
- possibilidade de ativar/desativar bloco;
- ordem de exibição quando necessário.

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

- Schemas Drizzle refletem o domínio definido nos docs.
- Migrations são geradas ou atualizadas corretamente.
- Não existem tabelas fora do escopo comercial do produto.
- As entidades principais têm índices e constraints relevantes.
- O projeto continua passando em typecheck/build, se esses scripts existirem.
- A modelagem não depende de dados mockados permanentes.
- A modelagem não cria buracos de segurança óbvios, como usuário admin local sem necessidade.

## Testes mínimos

- Rodar geração/check de migration.
- Rodar typecheck.
- Rodar build, se já possível.
- Validar que as relações muitos-para-muitos funcionam em tipos TypeScript.
- Validar que slugs únicos são exigidos.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/002-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
