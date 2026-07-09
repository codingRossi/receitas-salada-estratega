# ADR-011 - Usar Server Actions para mutações e Route Handlers para upload/tracking

## Status

Aceito.

## Contexto

O sistema terá muitas mutações internas no admin: criar/editar/desativar produtos, categorias, tags, LP, fotografia, depoimentos, FAQ, logos e configurações.

Também terá operações HTTP específicas, como upload de imagens e tracking simples de cliques em WhatsApp.

## Decisão

Usaremos:

- **Server Actions** para mutações administrativas comuns.
- **Route Handlers** para upload, tracking de cliques e endpoints HTTP específicos.

## Alternativas consideradas

1. Criar API REST para tudo.
2. Usar Server Actions para tudo, inclusive upload e tracking.
3. Usar Route Handlers para tudo.
4. Separar por finalidade.

## Motivo da escolha

Server Actions são práticas para formulários e mutações internas do admin. Route Handlers são mais adequados para requisições HTTP específicas, upload e tracking.

## Consequências

- O projeto terá padrões diferentes para mutações e endpoints.
- Toda Server Action administrativa exige `requireAdmin()`.
- Todo Route Handler sensível exige `requireAdmin()`.
- Tracking público precisa limitar dados coletados.
- Upload precisa validação forte.

## Regras de implementação

- Server Actions devem retornar `ActionResult`.
- Server Actions devem validar input com Zod.
- Server Actions administrativas devem chamar `requireAdmin()` antes da mutação.
- Route Handlers de upload devem validar autenticação, autorização, MIME, extensão e tamanho.
- Route Handler de tracking não deve coletar dados pessoais desnecessários.
- Nunca confiar em validação apenas no client.
- Revalidar rotas públicas após alterações administrativas.

## Critérios de aceite

- CRUDs administrativos usam Server Actions.
- Upload usa Route Handler seguro.
- Tracking usa Route Handler simples e limitado.
- Não há mutação administrativa sem autorização server-side.
- Erros são tratados sem expor stack trace.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
