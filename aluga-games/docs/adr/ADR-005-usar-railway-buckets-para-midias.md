# ADR-005 - Usar Railway Buckets para mídias

## Status

Aceito.

## Contexto

O sistema terá upload de imagens para:

- produtos;
- galeria da landing page;
- fotografia/álbuns;
- logos de clientes;
- depoimentos, se necessário;
- banners e imagens institucionais.

Salvar imagens dentro do repositório ou no filesystem local do deploy é frágil, difícil de escalar e perigoso para produção.

## Decisão

Usaremos **Railway Buckets** como object storage para mídias do sistema.

O banco armazenará apenas metadados:

```txt
url
storage_key
mime_type
size
alt_text
width
height
entity_type
entity_id
```

## Alternativas consideradas

1. Salvar imagem localmente no projeto.
2. Salvar imagem em volume acoplado ao serviço.
3. Usar Cloudflare R2.
4. Usar S3.
5. Usar Supabase Storage.
6. Usar Railway Buckets.

## Motivo da escolha

O projeto será hospedado na Railway e Railway Buckets reduz complexidade operacional. Object storage é mais adequado para imagens persistentes do que filesystem local.

## Consequências

- O projeto depende da configuração correta do bucket.
- Upload precisa ser validado com rigor.
- Remoção de mídia precisa considerar banco e storage.
- A aplicação não deve servir arquivos enviados diretamente a partir do próprio servidor sem validação.
- As imagens devem ter URLs persistentes.

## Regras de implementação

- Nunca salvar upload dentro de `/public` em produção.
- Nunca confiar no nome original do arquivo.
- Validar extensão e MIME type.
- Aceitar apenas `jpg`, `jpeg`, `png` e `webp`.
- Limitar tamanho do arquivo.
- Gerar `storage_key` seguro.
- Bloquear SVG no MVP.
- Não aceitar vídeo por upload; vídeos entram apenas como URL externa.
- Toda rota de upload administrativo exige `requireAdmin()`.

## Critérios de aceite

- Upload só funciona autenticado como admin autorizado.
- Arquivos inválidos são rejeitados.
- O banco salva metadados e URL, não o binário.
- Remoção de mídia é auditável.
- Imagens públicas usam componente otimizado quando aplicável.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
