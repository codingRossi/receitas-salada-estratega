# Task 022 - SEO, sitemap, robots e redirects

Prioridade: P1  
Dependências: Tasks 006, 008, 009 e 012  
Área: SEO técnico, migração, indexação

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
- `/docs/architecture/04-rotas-e-navegacao.md`
- `/docs/product/01-auditoria-site-atual.md`

## Objetivo

Preparar o site para indexação correta no Google e reduzir perda de SEO ao substituir o site antigo.

## Escopo

Implementar ou revisar:

- metadata da home;
- metadata da página `/produtos`;
- metadata das páginas individuais de produto;
- metadata da fotografia;
- metadata das páginas institucionais;
- sitemap dinâmico;
- robots.txt;
- canonical URLs;
- Open Graph básico;
- redirects de rotas antigas relevantes para novas rotas;
- 404 customizado quando necessário.

## Fora do escopo

- Não criar blog.
- Não criar conteúdo SEO automático com IA sem revisão humana.
- Não indexar `/admin`.
- Não indexar páginas inativas.
- Não criar páginas por categoria se o produto definiu página única de produtos.

## Requisitos funcionais

- Produtos ativos aparecem no sitemap.
- Produtos inativos não aparecem no sitemap.
- `/admin` fica bloqueado para indexação.
- Páginas antigas relevantes redirecionam para destino coerente.
- Slugs são consistentes.

## Requisitos técnicos

- Usar recursos nativos do Next quando possível.
- Evitar metadata duplicada.
- Garantir que dados ausentes não quebrem geração de metadata.
- Não expor dados administrativos em sitemap.

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

- Sitemap existe e lista rotas públicas corretas.
- Robots bloqueia admin.
- Produto individual tem metadata própria.
- Redirects principais do site antigo estão mapeados.
- Conteúdo inativo não indexa.

## Testes mínimos

- Abrir sitemap.
- Abrir robots.
- Verificar metadata da home.
- Verificar metadata de produto.
- Testar redirects principais.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/022-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
