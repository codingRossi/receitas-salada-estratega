# Task 018 - Admin de fotografia

Prioridade: P1  
Dependências: Tasks 012, 013 e 016  
Área: Admin, fotografia, upload

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
- `/docs/ui/02-portal-admin.md`
- `/docs/architecture/06-upload-e-midias.md`

## Objetivo

Implementar o gerenciamento administrativo dos álbuns e fotos da página de fotografia.

## Escopo

Criar telas e actions para:

- listar álbuns;
- criar álbum;
- editar álbum;
- ativar/desativar álbum;
- excluir álbum quando seguro;
- cadastrar nome do evento;
- cadastrar tipo de evento;
- cadastrar data opcional;
- cadastrar cidade opcional;
- subir fotos para álbum;
- remover fotos;
- escolher capa do álbum;
- ordenar fotos, se necessário.

## Fora do escopo

- Não criar venda de fotografia.
- Não criar formulário público.
- Não fazer upload de vídeo.
- Não processar dados pessoais sensíveis.

## Requisitos funcionais

- Álbuns inativos não aparecem no público.
- Fotos removidas não aparecem no público.
- Álbum pode existir sem data/cidade.
- Álbum precisa de nome e tipo de evento.
- A página pública de fotografia deve refletir alterações.

## Requisitos de segurança

- Toda action e upload exigem `requireAdmin()`.
- Reutilizar regras de upload seguro.
- Validar input no servidor.
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

- Admin cria e edita álbum.
- Admin sobe fotos para álbum.
- Admin remove fotos.
- Admin define capa.
- Álbum aparece na página pública quando ativo.
- Álbum inativo não aparece.

## Testes mínimos

- Criar álbum.
- Subir fotos válidas.
- Tentar subir arquivo inválido.
- Definir capa.
- Desativar álbum.
- Verificar página pública.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/018-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
