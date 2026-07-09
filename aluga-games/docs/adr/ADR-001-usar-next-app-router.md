# ADR-001 - Usar Next.js App Router

## Status

Aceito.

## Contexto

O projeto AlugaGames será um site institucional premium com catálogo de produtos, páginas públicas, portal administrativo, LP editável por blocos, fotografia, produtos, categorias, tags e integração com WhatsApp.

O projeto já existe em Next.js e usa App Router.

## Decisão

Usaremos **Next.js App Router** como base de rotas, layouts e páginas.

A estrutura principal ficará dentro de `/src/app`, usando route groups para separar site público e admin:

```txt
/src/app
  /(site)
  /(admin)
```

## Alternativas consideradas

1. Usar Pages Router.
2. Criar frontend separado do admin.
3. Migrar para outro framework.
4. Manter App Router.

## Motivo da escolha

O projeto já usa App Router. Manter essa direção evita retrabalho, reduz risco e permite organizar melhor layouts, rotas públicas, rotas administrativas e componentes server/client.

## Consequências

- Todas as novas rotas devem ser criadas dentro de `/src/app`.
- O site público deve ficar em `/(site)`.
- O admin deve ficar em `/(admin)`.
- A IA não deve criar uma pasta `/pages`.
- A IA não deve misturar padrões antigos do Pages Router com App Router.
- Componentes server/client devem ser separados com cuidado.

## Regras de implementação

- `page.tsx` deve ser usado para compor páginas, não para concentrar regra de negócio.
- Mutação de dados deve passar por Server Actions ou Route Handlers definidos nos docs.
- Rotas administrativas devem estar protegidas por Clerk e por validação server-side.
- Dados públicos devem ser buscados por queries server-side sempre que possível.

## Critérios de aceite

- Não existe nova estrutura baseada em `/pages`.
- Rotas públicas e administrativas estão separadas por route groups.
- As páginas não concentram regras de negócio complexas.
- A arquitetura segue `/src/app`, `/src/domain`, `/src/infra`, `/src/components`, `/src/server` e `/src/lib`.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
