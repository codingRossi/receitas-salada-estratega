# Task 029 - Homologação final e handover

Prioridade: P0 antes de entregar ao cliente  
Dependências: Todas as tasks obrigatórias concluídas  
Área: QA final, entrega, documentação

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

- `/docs/quality/01-definition-of-done.md`
- `/docs/quality/02-checklist-review-ai.md`
- `/docs/ui/03-seo-performance-acessibilidade.md`

## Objetivo

Realizar a homologação final do sistema e preparar a entrega para o dono usar o portal admin com segurança.

## Escopo

Executar revisão final de:

- site público;
- landing page;
- página de produtos;
- filtros;
- página individual de produto;
- lista de produtos para WhatsApp;
- fotografia;
- páginas institucionais;
- admin;
- CRUDs;
- uploads;
- edição da LP;
- configurações de WhatsApp;
- segurança;
- SEO;
- performance;
- responsividade;
- acessibilidade básica.

Criar documentação de handover:

- como acessar o admin;
- como cadastrar produto;
- como editar produto;
- como subir imagem;
- como editar LP;
- como cadastrar álbum de fotografia;
- como trocar WhatsApp;
- o que não fazer;
- checklist de manutenção.

## Fora do escopo

- Não adicionar feature nova durante homologação.
- Não aceitar mudança grande de escopo sem nova task.
- Não entregar com P0 de segurança aberto.

## Requisitos de aceite final

- Dono consegue gerenciar produtos.
- Dono consegue gerenciar LP.
- Dono consegue gerenciar fotografia.
- Dono consegue trocar WhatsApp.
- Visitante consegue encontrar produto.
- Visitante consegue ir para WhatsApp direto do produto.
- Visitante consegue enviar lista de produtos pelo WhatsApp.
- Admin está protegido.
- Upload está protegido.
- Site está responsivo.
- Não há checkout, pagamento, favoritos ou área de cliente.

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

- Checklist final completo.
- Nenhum P0 aberto.
- Handover criado.
- Cliente/dono consegue operar o básico.
- Deploy final ou ambiente de homologação está funcional.

## Testes mínimos

- Executar fluxo público completo.
- Executar fluxo admin completo.
- Executar smoke test de produção.
- Executar revisão de segurança final.
- Rodar lint, typecheck, build e testes disponíveis.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/029-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
