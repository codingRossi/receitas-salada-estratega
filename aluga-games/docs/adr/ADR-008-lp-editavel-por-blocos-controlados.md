# ADR-008 - LP editável por blocos controlados

## Status

Aceito.

## Contexto

O dono do sistema precisa conseguir editar a landing page: imagens, produtos em destaque, depoimentos, FAQ, logos, blocos de soluções, eventos corporativos e outros conteúdos principais.

Ao mesmo tempo, o prazo é curto e o projeto será desenvolvido com IA. Criar um page builder livre aumentaria muito a complexidade e o risco de bugs, design quebrado e falhas de segurança.

## Decisão

A landing page será editável por **blocos controlados**, não por page builder livre.

Blocos previstos:

- hero principal;
- galeria/banner de imagens;
- logos de clientes;
- diferenciais;
- produtos em destaque;
- soluções/tipos de produtos;
- como funciona;
- depoimento principal;
- FAQ;
- CTA final.

## Alternativas consideradas

1. LP fixa no código.
2. CMS/headless externo.
3. Page builder livre.
4. Blocos controlados editáveis pelo admin.

## Motivo da escolha

Blocos controlados oferecem equilíbrio entre autonomia do dono, qualidade visual, segurança e prazo. O dono consegue gerenciar conteúdo sem destruir o design.

## Consequências

- O admin edita campos previstos.
- A IA não deve implementar um editor visual livre.
- Cada bloco tem schema próprio.
- Blocos podem ser exibidos/ocultados.
- Alguns blocos podem ter ordem controlada.
- O design continua consistente com a referência visual premium/corporativa.

## Regras de implementação

- Cada bloco deve validar input com Zod.
- Conteúdo textual deve ser sanitizado/escapado na renderização.
- Imagens devem vir do storage.
- Produtos destacados devem referenciar produtos ativos.
- O admin não deve inserir HTML livre sem sanitização.
- Blocos não previstos exigem nova task/ADR ou atualização de escopo.

## Critérios de aceite

- O dono consegue editar os principais conteúdos da LP.
- A LP não quebra visualmente com edições comuns.
- Blocos podem ser ocultados/exibidos quando previsto.
- Não existe page builder livre.
- O design segue visual premium, claro, limpo e corporativo.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
