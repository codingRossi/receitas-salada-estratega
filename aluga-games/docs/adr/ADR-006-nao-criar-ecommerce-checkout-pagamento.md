# ADR-006 - Não criar e-commerce, checkout ou pagamento

## Status

Aceito.

## Contexto

O site atual tem elementos que lembram e-commerce, como carrinho, favoritos, conta e fluxo de compra. O novo sistema não deve seguir essa lógica.

A AlugaGames vende/loca soluções para eventos, e o fluxo comercial real termina no WhatsApp, onde o atendimento é personalizado.

## Decisão

O novo site **não será um e-commerce tradicional**.

Não serão implementados:

- checkout;
- pagamento online;
- pedido fechado pelo site;
- área de cliente;
- login de cliente;
- favoritos;
- conta de cliente;
- marketplace;
- estoque complexo;
- agenda de disponibilidade;
- parcelamento;
- carrinho de compra real.

## Alternativas consideradas

1. Criar e-commerce completo.
2. Criar checkout de orçamento.
3. Criar catálogo com WhatsApp.
4. Manter fluxo igual ao site antigo.

## Motivo da escolha

O objetivo é conversão para WhatsApp, não compra online. E-commerce aumentaria escopo, risco, prazo, segurança e complexidade sem refletir o processo comercial real.

## Consequências

- Produtos não exibem preço público.
- Botões principais levam ao WhatsApp.
- A lista de produtos é apenas uma lista para montar mensagem.
- Não há tabela de pedidos.
- Não há integração com pagamento.
- Não há login de cliente.

## Regras de implementação

- Não usar linguagem como “comprar”, “checkout”, “finalizar compra” ou “pagamento”.
- Preferir “solicitar pelo WhatsApp”, “falar com especialista”, “selecionar produto” e “enviar lista”.
- Não criar models/tabelas de pedido, pagamento, cliente ou favorito.
- A lista de produtos do visitante não deve persistir no banco.
- O fluxo comercial termina fora do sistema, no WhatsApp.

## Critérios de aceite

- Nenhuma rota de checkout existe.
- Nenhuma integração de pagamento existe.
- O visitante não precisa criar conta.
- Produtos direcionam para WhatsApp.
- A lista de produtos é opcional e não vira pedido.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
