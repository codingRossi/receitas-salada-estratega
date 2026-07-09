# ADR-007 - Usar WhatsApp como conversão principal

## Status

Aceito.

## Contexto

A conversão principal do site será o contato via WhatsApp. O visitante pode vir da LP, da página de produtos, da página individual de produto, da fotografia ou de links institucionais.

O fluxo mais valorizado será: visitante escolhe um produto e vai direto para o WhatsApp com mensagem pronta.

## Decisão

O WhatsApp será o **canal principal e final de conversão** do site.

Cada CTA relevante deve montar uma mensagem contextual.

Exemplo de produto:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse neste produto: [nome do produto].
```

Exemplo de lista:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse nestes produtos:
- Produto 1
- Produto 2
```

## Alternativas consideradas

1. Formulário interno de orçamento.
2. Checkout.
3. CRM próprio.
4. WhatsApp como canal principal.

## Motivo da escolha

O WhatsApp é mais rápido, simples e alinhado com o fluxo comercial real da empresa. Também reduz necessidade de construir sistema de orçamento, pedidos e atendimento no MVP/produto inicial.

## Consequências

- O número do WhatsApp deve ser configurável pelo admin.
- Mensagens devem ser codificadas corretamente na URL.
- CTAs devem ser claros e consistentes.
- O site pode registrar cliques simples para estatística.
- O sistema não armazenará conversas.

## Regras de implementação

- Criar helper centralizado para gerar links de WhatsApp.
- Não montar URLs manualmente espalhadas pelo código.
- Validar número do WhatsApp nas configurações.
- Evitar inserir dados sensíveis em mensagens.
- Registrar eventos de clique, se implementado, sem coletar dados pessoais desnecessários.
- Trabalhe conosco deve ser link direto para WhatsApp com mensagem estática.

## Critérios de aceite

- CTAs abrem WhatsApp com mensagem correta.
- Mensagem muda conforme origem da página.
- Admin consegue alterar o número principal.
- Não há formulário obrigatório antes do WhatsApp.
- A lista de produtos gera mensagem com itens e quantidades.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
