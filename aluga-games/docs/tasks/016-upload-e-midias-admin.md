# Task 016 - Upload e mídias no admin

Prioridade: P0  
Dependências: Tasks 013 e 015  
Área: Upload, storage, segurança

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

- `/docs/architecture/06-upload-e-midias.md`
- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `/docs/ui/02-portal-admin.md`

## Objetivo

Implementar upload seguro de imagens para produtos e preparar base reutilizável para outras mídias do sistema.

## Escopo

Implementar:

- integração com object storage escolhido, preferencialmente Railway Buckets ou storage compatível com S3;
- Route Handler seguro para upload, se necessário;
- serviço centralizado de storage em `/src/server/storage` ou equivalente;
- validação de tipo de arquivo;
- validação de tamanho;
- geração segura de nome/chave do arquivo;
- salvamento de metadados no banco;
- associação de imagens a produtos;
- definição de imagem de capa;
- ordenação simples de imagens quando necessário;
- remoção segura de mídia;
- alt text editável.

## Fora do escopo

- Não fazer upload de vídeo.
- Não salvar arquivos dentro do repositório.
- Não aceitar arquivos genéricos.
- Não aceitar SVG no MVP, salvo decisão explícita e sanitização forte.
- Não permitir upload público sem autenticação.

## Requisitos de segurança

- Upload exige `requireAdmin()`.
- Validar MIME type e extensão.
- Limitar tamanho máximo.
- Gerar nome do arquivo no servidor.
- Nunca confiar no nome original.
- Não retornar detalhes sensíveis do storage.
- Não permitir path traversal.
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

- Admin consegue subir imagem para produto.
- Imagem aparece no produto público.
- Admin consegue editar alt text.
- Admin consegue definir capa.
- Admin consegue remover imagem.
- Arquivos inválidos são bloqueados.
- Usuário não autorizado não consegue subir arquivo.

## Testes mínimos

- Upload de JPG/PNG/WebP válido.
- Tentativa de upload de arquivo inválido.
- Tentativa de upload grande demais.
- Remoção de imagem.
- Definição de capa.
- Teste sem autorização, se possível.
- Rodar lint, typecheck e build.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/016-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
