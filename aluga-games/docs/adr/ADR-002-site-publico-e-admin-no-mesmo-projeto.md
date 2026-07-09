# ADR-002 - Manter site público e admin no mesmo projeto

## Status

Aceito.

## Contexto

O sistema terá duas áreas principais:

1. Site público:
   - landing page;
   - produtos;
   - página individual de produto;
   - fotografia;
   - representante AlugaGames;
   - por que contratar;
   - links para WhatsApp.

2. Portal administrativo:
   - dashboard;
   - produtos;
   - categorias;
   - tags;
   - landing page;
   - fotografia;
   - depoimentos;
   - FAQ;
   - logos/clientes;
   - configurações do site e WhatsApp.

O sistema será desenvolvido com IA e tem prazo curto. Separar frontend público e admin em dois projetos aumentaria complexidade operacional.

## Decisão

O site público e o portal administrativo ficarão no **mesmo projeto Next.js**.

A separação será feita por route groups:

```txt
/src/app/(site)
/src/app/(admin)
```

## Alternativas consideradas

1. Criar dois projetos separados: um para site e outro para admin.
2. Criar admin externo usando ferramenta no-code/headless CMS.
3. Manter site e admin no mesmo projeto.

## Motivo da escolha

Manter tudo no mesmo projeto reduz tempo de desenvolvimento, simplifica deploy, evita duplicação de autenticação, facilita acesso ao mesmo banco e melhora a produtividade com IA.

## Consequências

- O deploy do site público e do admin será o mesmo.
- O admin precisa ser rigidamente protegido para não expor rotas administrativas.
- As rotas públicas não podem depender de autenticação.
- O código precisa manter separação clara entre `(site)` e `(admin)`.

## Regras de implementação

- Nunca importar componentes administrativos no site público sem necessidade real.
- Nunca expor dados administrativos em queries públicas.
- Todas as rotas `/admin` exigem autenticação com Clerk.
- Todas as mutações administrativas exigem `requireAdmin()` no servidor.
- O bundle público não deve carregar código pesado do admin.

## Critérios de aceite

- O usuário público consegue navegar sem login.
- O dono acessa o admin via login.
- Rotas `/admin` não são acessíveis sem autenticação.
- Queries públicas retornam apenas conteúdo ativo/publicável.
- A estrutura de pastas diferencia claramente site e admin.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
