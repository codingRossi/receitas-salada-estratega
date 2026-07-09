# Task 012 - Fotografia pública com álbuns

Prioridade: P1  
Dependências: Tasks 002, 005 e 007  
Área: Site público, fotografia, galeria

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
- `/docs/product/04-user-stories.md`
- `/docs/ui/01-site-publico.md`

## Objetivo

Implementar a página pública de fotografia como galeria de registros da AlugaGames, organizada por álbuns/eventos.

## Escopo

Criar:

- página `/fotografia`;
- listagem de álbuns ativos;
- filtros/pesquisa por tipo de evento, nome, cidade e data quando aplicável;
- página ou visualização individual de álbum;
- grid de fotos do álbum;
- imagem de capa do álbum;
- estado vazio;
- metadata básica.

## Fora do escopo

- Não vender serviço de fotografia separado.
- Não criar checkout.
- Não criar formulário para contratar fotografia.
- Não subir fotos pelo público.
- Não criar reconhecimento facial ou qualquer processamento sensível.

## Requisitos funcionais

Cada álbum deve poder conter:

- nome do evento;
- tipo de evento;
- data opcional;
- cidade opcional;
- fotos;
- status ativo/inativo.

A página deve apresentar a fotografia como prova visual dos eventos e produtos da AlugaGames.

## Requisitos de UI

- Galeria elegante, limpa e visual.
- Filtros simples.
- Fotos devem carregar de forma otimizada.
- Mobile deve ser bem tratado.

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

- `/fotografia` lista álbuns ativos.
- Filtros funcionam.
- Álbum individual abre e mostra fotos.
- Fotos inativas ou álbuns inativos não aparecem.
- Página não apresenta fotografia como negócio separado.

## Testes mínimos

- Testar álbum com várias fotos.
- Testar álbum sem fotos.
- Testar filtro por tipo de evento.
- Testar álbum inativo.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/012-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
