# ADR-004 - Usar Drizzle com PostgreSQL

## Status

Aceito.

## Contexto

O sistema precisa persistir produtos, categorias, tags, mídias, blocos da landing page, álbuns de fotografia, depoimentos, FAQs, logos, configurações do site, eventos de clique e logs administrativos.

O usuário escolheu Drizzle como ORM/query builder.

## Decisão

Usaremos **Drizzle com PostgreSQL** para persistência do sistema.

A camada de banco ficará centralizada em:

```txt
/src/server/db
```

## Alternativas consideradas

1. Prisma.
2. Drizzle.
3. Supabase direto sem camada de domínio.
4. SQL puro espalhado pelo projeto.

## Motivo da escolha

Drizzle oferece tipagem forte, controle explícito do schema e bom encaixe com TypeScript. PostgreSQL é adequado para os dados relacionais do sistema.

## Consequências

- O schema deve ficar centralizado.
- A IA não deve criar queries SQL espalhadas sem padrão.
- Migrations precisam ser controladas.
- O banco não deve armazenar imagens, apenas metadados e URLs.
- A lista de produtos do visitante não deve virar tabela de carrinho/pedido.

## Regras de implementação

- Definir schemas em `/src/server/db/schema`.
- Definir conexão em `/src/server/db`.
- Queries públicas devem retornar apenas conteúdo ativo.
- Mutations administrativas devem validar `requireAdmin()`.
- Não criar tabelas de checkout, pagamento, pedido, cliente ou favorito.
- Registrar logs administrativos para ações sensíveis.
- Usar transações quando uma operação alterar múltiplas tabelas dependentes.

## Critérios de aceite

- Existe schema Drizzle organizado.
- Migrations são versionadas.
- Queries públicas e administrativas estão separadas.
- Não há banco sendo acessado diretamente em componentes client.
- Não há dados sensíveis expostos em respostas públicas.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
