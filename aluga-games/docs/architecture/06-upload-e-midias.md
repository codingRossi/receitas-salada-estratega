# 06 — Upload e Mídias

## 1. Objetivo do documento

Este documento define como o sistema da AlugaGames deve lidar com upload, armazenamento, exibição e gerenciamento de mídias.

O projeto terá imagens em várias áreas:

- Produtos.
- Galeria da página de fotografia.
- Álbuns de eventos.
- Hero e blocos visuais da landing page.
- Logos de clientes/empresas.
- Depoimentos, quando houver foto/avatar.
- Banners e imagens institucionais.

A regra central é: **arquivos enviados pelo admin nunca devem ser salvos diretamente dentro do repositório do projeto**.

As mídias devem ser armazenadas em um serviço externo de object storage, e o banco de dados deve guardar apenas os metadados necessários para exibição e administração.

---

## 2. Decisão técnica recomendada

Para este projeto, a recomendação é usar **Railway Buckets** como storage principal, caso o projeto já esteja hospedado na Railway.

Motivo:

- Mantém banco, aplicação e storage dentro do mesmo ecossistema.
- Evita salvar imagens no filesystem do servidor.
- É mais adequado para imagens, galerias e assets persistentes do que armazenamento local.
- Permite uma arquitetura compatível com S3, facilitando migração futura para Cloudflare R2, AWS S3 ou outro serviço semelhante.

## 2.1 Alternativas possíveis

### Opção A — Railway Buckets

Recomendação principal para este projeto.

Usar para:

- Imagens de produtos.
- Fotos da página de fotografia.
- Imagens da LP.
- Logos de clientes.
- Imagens institucionais.

### Opção B — Cloudflare R2

Boa alternativa caso o projeto queira custo baixo, boa distribuição e storage compatível com S3.

### Opção C — Supabase Storage

Boa alternativa caso o projeto também use Supabase no banco/autenticação.

Como o projeto usará Drizzle, Clerk e Railway, Supabase Storage não é a opção mais natural neste caso.

### Opção D — Upload local no servidor

Não recomendado para produção.

Pode ser usado somente em desenvolvimento local, se necessário, com abstração em `/src/server/storage`.

---

## 3. Princípio de arquitetura

O sistema deve centralizar qualquer lógica de upload em:

```txt
/src/server/storage
```

Nenhum componente React, page, Server Action ou Route Handler deve conversar diretamente com Railway Buckets, S3 ou outro provider sem passar por uma camada interna de storage.

Exemplo de organização:

```txt
/src/server/storage
  storage-provider.ts
  upload-file.ts
  delete-file.ts
  generate-file-key.ts
  validate-upload-file.ts
  storage-config.ts
```

Essa separação permite trocar Railway Buckets por Cloudflare R2 ou S3 no futuro sem refatorar o sistema inteiro.

---

## 4. Tipos de mídia aceitos

O MVP deve aceitar apenas imagens.

Formatos permitidos:

```txt
jpg
jpeg
png
webp
```

Formatos não permitidos:

```txt
svg
gif
pdf
doc
docx
zip
exe
html
js
mp4
mov
avi
```

## 4.1 Vídeos

O sistema pode aceitar vídeo em produtos, mas não por upload direto no MVP.

A regra será:

- Produto pode ter uma URL de vídeo externa.
- Exemplos: YouTube, Vimeo ou link público confiável.
- O admin informa a URL no formulário do produto.
- O sistema apenas salva e exibe o embed/link quando aplicável.

Não implementar upload de vídeo nesta etapa.

---

## 5. Limites de upload

Limites recomendados:

```txt
Tamanho máximo por imagem: 5MB
Quantidade máxima de imagens por produto: 12
Quantidade máxima de fotos por álbum: 80
Quantidade máxima de logos de clientes ativos: 30
Quantidade máxima de imagens por bloco visual da LP: conforme o tipo do bloco
```

Esses limites podem ser ajustados depois, mas a primeira implementação deve evitar uploads ilimitados.

---

## 6. Segurança no upload

Upload de arquivo é uma área sensível do sistema.

Regras obrigatórias:

- Apenas usuário autenticado no admin pode enviar arquivos.
- Toda rota de upload deve validar autenticação com Clerk no servidor.
- Toda rota de upload deve validar se o usuário autenticado é o dono autorizado do sistema.
- Nunca confiar no nome original do arquivo.
- Nunca salvar o arquivo com o nome original fornecido pelo usuário.
- Validar extensão.
- Validar MIME type.
- Validar tamanho do arquivo.
- Bloquear arquivos vazios.
- Bloquear qualquer arquivo que não seja imagem permitida.
- Gerar nome interno único para cada arquivo.
- Não aceitar SVG no MVP, para reduzir risco de scripts embutidos.
- Não expor chaves privadas de storage no client.
- Não permitir que o client envie diretamente para o bucket sem controle do servidor, salvo se futuramente houver signed upload URL bem validada.

## 6.1 Nome dos arquivos

O nome original pode ser salvo apenas como metadado opcional, mas não deve ser usado como chave final no storage.

Chave recomendada:

```txt
media/{entityType}/{entityId}/{uuid}.{extension}
```

Exemplos:

```txt
media/products/product_123/8b6c0f6c.webp
media/albums/album_456/1ef00a92.jpg
media/lp/hero/79ac20be.webp
media/client-logos/logo_789/4eb842aa.png
```

---

## 7. Entidades que usam mídia

## 7.1 Produto

Um produto pode ter várias imagens.

Regras:

- Todo produto pode ter uma imagem de capa.
- A imagem de capa aparece nos cards.
- O admin pode adicionar, remover e trocar imagem de capa.
- O admin pode reordenar imagens do produto.
- A página de produto pode mostrar uma galeria.
- O produto pode ter URL de vídeo externa opcional.

Campos recomendados para `product_media`:

```txt
id
product_id
url
storage_key
mime_type
size_bytes
alt_text
sort_order
is_cover
created_at
updated_at
```

## 7.2 Landing page

A LP pode usar imagens em blocos controlados.

Exemplos:

- Hero principal.
- Galeria/carrossel de imagens maiores.
- Seção de eventos corporativos.
- Seção de produtos mais procurados.
- Blocos específicos, como decoração, realidade virtual, infláveis etc.
- CTA final.

Regras:

- Cada bloco define se aceita uma ou várias imagens.
- O admin não deve subir imagens soltas sem associar a um bloco ou entidade.
- Imagens da LP devem ter alt text editável.
- A ordem das imagens em galerias deve ser controlada pelo admin.

## 7.3 Fotografia

A página de fotografia é composta por álbuns.

Cada álbum possui:

```txt
Nome do evento
Tipo de evento
Data opcional
Cidade opcional
Fotos
Status ativo/inativo
```

Cada foto pertence a um álbum.

Regras:

- O admin pode criar, editar e desativar álbuns.
- O admin pode subir múltiplas fotos para um álbum.
- O admin pode remover fotos.
- O visitante pode filtrar/pesquisar álbuns por tipo de evento.
- A fotografia serve como registro da AlugaGames e prova visual dos produtos/eventos.
- A fotografia não é tratada como serviço separado no site.

Campos recomendados para `event_album_photos`:

```txt
id
album_id
url
storage_key
mime_type
size_bytes
sort_order
created_at
updated_at
```

## 7.4 Logos de clientes

A LP pode exibir logos de empresas/clientes atendidos.

Regras:

- O admin pode adicionar, editar, desativar e remover logos.
- O logo deve ter nome da empresa.
- O alt text pode ser gerado com base no nome da empresa.
- Apenas logos ativos aparecem no site público.

Campos recomendados:

```txt
id
company_name
image_url
storage_key
alt_text
is_active
sort_order
created_at
updated_at
```

## 7.5 Depoimentos

Depoimentos podem ter imagem/avatar opcional.

Regras:

- A imagem do depoimento não é obrigatória.
- Quando existir, deve seguir as mesmas regras de upload.
- Apenas depoimentos ativos aparecem na LP.

---

## 8. Alt text e acessibilidade

Toda imagem exibida no site público deve ter `alt` adequado.

Regras:

- Imagens de produtos devem ter alt text editável.
- Se o admin não preencher alt text, gerar fallback com o nome do produto.
- Logos devem usar o nome da empresa como fallback.
- Imagens puramente decorativas podem usar `alt=""`, mas isso deve ser decisão explícita do componente.
- A IA não deve deixar imagens públicas sem `alt`.

Exemplos:

```txt
Produto: "Simulador de corrida para eventos corporativos"
Logo: "Logo da empresa XPTO"
Álbum: "Evento corporativo com atrações gamer da AlugaGames"
```

---

## 9. Otimização de imagens

O sistema deve tentar exibir imagens de forma performática.

Regras:

- Usar o componente de imagem do Next.js quando aplicável.
- Definir `width`, `height` e `alt`.
- Evitar imagens sem dimensão definida em áreas críticas.
- Usar imagens responsivas.
- Evitar carregar todas as imagens de uma galeria de uma vez quando houver muitas fotos.
- Usar lazy loading para imagens abaixo da dobra.
- Imagem principal/hero pode ter prioridade de carregamento quando fizer sentido.

## 9.1 Conversão para WebP

Não é obrigatório converter imagens para WebP na primeira versão.

Porém, a arquitetura não deve impedir essa evolução.

Possível evolução futura:

- Receber JPG/PNG.
- Otimizar/comprimir.
- Gerar versão WebP.
- Salvar versões em tamanhos diferentes.

No MVP, pode salvar o arquivo original validado, desde que o tamanho máximo seja respeitado.

---

## 10. Interface administrativa de mídia

## 10.1 Produto

Na edição de produto, o admin deve conseguir:

- Ver imagens atuais.
- Adicionar novas imagens.
- Remover imagens.
- Definir imagem de capa.
- Editar alt text.
- Reordenar imagens.
- Inserir URL de vídeo externa.

## 10.2 Fotografia

Na área de fotografia, o admin deve conseguir:

- Criar álbum.
- Editar álbum.
- Desativar álbum.
- Subir fotos para o álbum.
- Remover fotos.
- Ver quantidade de fotos por álbum.

## 10.3 Landing page

Na área da LP, o admin deve conseguir:

- Trocar imagem principal do hero.
- Editar galeria/carrossel de imagens.
- Associar imagens aos blocos controlados.
- Ocultar/exibir blocos quando permitido.

## 10.4 Logos

Na área de logos/clientes, o admin deve conseguir:

- Subir logo.
- Editar nome da empresa.
- Definir ativo/inativo.
- Remover logo.

---

## 11. Fluxo de upload recomendado

Fluxo oficial para upload de imagem no MVP:

```txt
1. Admin seleciona arquivo no painel.
2. Client envia metadados do arquivo para POST /api/uploads/presign.
3. Route Handler valida sessão Clerk e requireAdmin().
4. Route Handler valida contexto, MIME type, extensão e tamanho declarados.
5. Route Handler gera storage_key único e controlado pelo servidor.
6. Route Handler gera URL assinada curta para Railway Buckets/object storage.
7. Client envia o arquivo diretamente ao storage usando a URL assinada.
8. Server Action administrativa confirma/registra a mídia no banco com Drizzle.
9. UI usa o registro criado para associar a mídia ao produto, álbum, logo ou bloco.
```

O upload não deve depender apenas de validação no client. A URL assinada deve ter tempo curto, contexto restrito e limites coerentes com a validação feita no servidor.

---

## 12. Route Handlers de mídia

Upload usa Route Handler apenas para presign e usa Server Actions para metadados/associação.

Rota oficial:

```txt
POST /api/uploads/presign
```

Server Actions oficiais para metadados e associações:

```txt
createMediaAssetAction
updateMediaAssetAction
deleteMediaAssetAction
attachMediaToEntityAction
detachMediaFromEntityAction
```

Não criar rotas HTTP de CRUD de mídia por entidade no MVP, salvo se uma task futura justificar explicitamente.

Contextos permitidos no presign:

```txt
product
album
lp_block
client_logo
testimonial
```

---

## 13. Server Actions relacionadas a mídia

Server Actions podem ser usadas para atualizar metadados, mas não são a melhor escolha para upload bruto de arquivos pesados.

Usar Server Actions para:

```txt
updateMediaAltTextAction
setProductCoverImageAction
reorderProductImagesAction
reorderAlbumPhotosAction
attachMediaToLandingPageBlockAction
removeMediaFromEntityAction
```

Usar Route Handler para:

```txt
upload de arquivo
remoção física do arquivo no storage
```

---

## 14. Remoção de arquivos

Quando uma mídia for removida pelo admin:

1. Remover ou marcar registro como removido no banco.
2. Remover arquivo do storage.
3. Registrar ação em audit log.

A ordem pode variar conforme a estratégia de consistência, mas o sistema deve evitar mídia órfã.

## 14.1 Soft delete vs hard delete

Para simplificar o MVP:

- Remover registro do banco.
- Remover arquivo do storage.

Evolução futura:

- Usar soft delete em mídias críticas.
- Ter rotina para limpar arquivos órfãos.

---

## 15. Auditoria

Toda ação administrativa relevante envolvendo mídia deve gerar audit log.

Eventos sugeridos:

```txt
MEDIA_UPLOADED
MEDIA_DELETED
MEDIA_ALT_UPDATED
PRODUCT_COVER_CHANGED
PRODUCT_IMAGES_REORDERED
ALBUM_PHOTO_UPLOADED
ALBUM_PHOTO_DELETED
LP_BLOCK_MEDIA_UPDATED
CLIENT_LOGO_UPLOADED
```

O log deve registrar:

```txt
id do usuário Clerk
ação
entidade afetada
id da entidade
metadados úteis
data/hora
```

---

## 16. Validação recomendada

Validação no servidor:

```txt
allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp"
]

allowedExtensions = [
  "jpg",
  "jpeg",
  "png",
  "webp"
]

maxFileSize = 5MB
```

A validação deve rejeitar:

- MIME type inválido.
- Extensão inválida.
- Arquivo sem extensão.
- Arquivo vazio.
- Arquivo maior que o limite.
- Entidade inexistente.
- `entityType` não permitido.
- Upload feito por usuário não autorizado.

---

## 17. Configurações de ambiente

Variáveis esperadas:

```txt
STORAGE_PROVIDER=railway
STORAGE_BUCKET_NAME=
STORAGE_ENDPOINT=
STORAGE_REGION=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
STORAGE_PUBLIC_BASE_URL=
```

Nenhuma dessas variáveis deve ser exposta no client.

Apenas URLs públicas finais das imagens podem aparecer no client.

---

## 18. Integração com banco de dados

O banco deve salvar metadados, não o arquivo em si.

Campos padrão para tabelas de mídia:

```txt
id
url
storage_key
mime_type
size_bytes
alt_text
sort_order
created_at
updated_at
```

Para entidades específicas, adicionar FK:

```txt
product_id
album_id
lp_block_id
testimonial_id
client_logo_id
```

---

## 19. Regras para exibição pública

O site público só deve exibir mídias que:

- Pertencem a entidade ativa.
- Estão associadas corretamente.
- Têm URL válida.
- Não foram removidas.

Exemplos:

- Produto inativo não aparece na listagem pública.
- Álbum inativo não aparece na fotografia.
- Logo inativo não aparece na LP.
- Imagem de produto removida não aparece na galeria.

---

## 20. Critérios de aceite

A implementação de upload e mídias estará pronta quando:

- Admin autenticado consegue subir imagem de produto.
- Usuário não autenticado não consegue subir imagem.
- Usuário não autorizado não consegue subir imagem.
- Arquivos inválidos são rejeitados.
- Arquivos acima do limite são rejeitados.
- Imagens são salvas em object storage, não no repositório.
- Banco salva URL, storage key e metadados.
- Admin consegue remover imagem.
- Admin consegue definir capa do produto.
- Admin consegue editar alt text.
- Site público exibe as imagens corretamente.
- Imagens têm `alt` adequado.
- Ações relevantes geram audit log.
- Não existem chaves de storage expostas no client.

---

## 21. Fora do escopo nesta etapa

Não implementar agora:

- Upload de vídeo.
- Editor de imagem.
- Corte/crop manual.
- Compressão avançada automática.
- CDN customizada.
- Multi-bucket.
- Upload direto do client para storage sem passar pelo servidor.
- Biblioteca DAM completa.
- Permissões avançadas por usuário.
- Área de mídia pública independente sem associação com entidades.

---

## 22. Decisão final

Para o produto da AlugaGames, a estratégia recomendada é:

```txt
Storage principal: Railway Buckets
Banco: PostgreSQL com Drizzle
Upload: Route Handler protegido por Clerk
Metadados: salvos no banco
Exibição: Next Image quando aplicável
Vídeo: apenas URL externa no MVP
Admin: gerencia imagens dentro do contexto de cada entidade
```

O objetivo é entregar um sistema seguro, simples de manter e suficiente para que o dono consiga manipular produtos, landing page, álbuns de fotografia, logos e demais imagens do site sem depender do desenvolvedor.
