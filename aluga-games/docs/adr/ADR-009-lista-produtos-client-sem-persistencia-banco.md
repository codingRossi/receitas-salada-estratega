# ADR-009 - Lista de produtos no client sem persistência no banco

## Status

Aceito.

## Contexto

O visitante poderá selecionar produtos para enviar uma lista pelo WhatsApp. Essa lista ajuda quando o cliente deseja vários produtos, mas não deve virar carrinho de compra, pedido, orçamento interno ou checkout.

## Decisão

A lista de produtos será mantida no **client**, preferencialmente com `localStorage`, sem persistência no banco.

Ela pode aparecer como drawer lateral e botão no header.

## Alternativas consideradas

1. Não ter lista.
2. Criar carrinho persistido no banco.
3. Criar pedido/orçamento interno.
4. Criar lista simples no client.

## Motivo da escolha

A lista simples atende o uso desejado sem transformar o sistema em e-commerce. Também reduz complexidade de banco, autenticação de cliente e segurança.

## Consequências

- A lista pode ser perdida se o usuário limpar o navegador.
- O sistema não sabe o conteúdo da lista depois que o usuário sai.
- Não há pedido salvo.
- Não há tabela de carrinho.
- É possível registrar apenas o clique de envio para WhatsApp.

## Regras de implementação

- Não chamar a lista de “checkout”.
- Evitar linguagem de compra.
- Permitir adicionar, remover e alterar quantidade.
- Gerar mensagem de WhatsApp com nomes e quantidades.
- Validar que produtos enviados na mensagem ainda existem/estão ativos quando possível.
- Não salvar dados pessoais.
- Não criar tabela de lista/orçamento no banco.

## Critérios de aceite

- O visitante adiciona produtos à lista.
- O visitante remove produtos.
- O visitante altera quantidades.
- O visitante envia a lista pelo WhatsApp.
- Não há login de cliente.
- Não há persistência da lista no banco.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
