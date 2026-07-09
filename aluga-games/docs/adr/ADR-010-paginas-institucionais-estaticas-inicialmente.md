# ADR-010 - Páginas institucionais estáticas inicialmente

## Status

Aceito.

## Contexto

O site manterá páginas/conteúdos como:

- Representante AlugaGames;
- Por que Contratar;
- Trabalhe Conosco no footer via WhatsApp.

A decisão anterior do produto foi manter Representante e Por que Contratar como cópias das páginas atuais com design melhorado, sem edição pelo admin no primeiro momento. Trabalhe Conosco será apenas um link no footer para WhatsApp.

## Decisão

As páginas **Representante AlugaGames** e **Por que Contratar** serão inicialmente estáticas no código.

O link **Trabalhe Conosco** ficará no footer e abrirá WhatsApp com mensagem estática.

## Alternativas consideradas

1. Tornar todas as páginas institucionais editáveis pelo admin.
2. Usar um CMS para páginas livres.
3. Criar páginas estáticas inicialmente.
4. Remover as páginas institucionais.

## Motivo da escolha

As páginas institucionais não são o núcleo operacional do sistema. O foco é admin gerenciando LP, produtos, fotografia, depoimentos, FAQ, logos e WhatsApp. Manter essas páginas estáticas reduz escopo e preserva qualidade visual.

## Consequências

- Alterações nessas páginas exigem mudança de código.
- O admin não edita Representante e Por que Contratar inicialmente.
- Trabalhe Conosco não terá formulário nem banco de currículos.
- Se o cliente exigir edição dessas páginas, isso vira nova task.

## Regras de implementação

- Não criar CRUD de páginas institucionais no escopo atual.
- Não criar upload de currículo.
- Não criar formulário de candidatura.
- Trabalhe Conosco deve abrir WhatsApp com mensagem contextual.
- Essas páginas devem seguir o design system do site.

## Critérios de aceite

- Representante existe como página pública estática.
- Por que Contratar existe como página pública estática.
- Trabalhe Conosco aparece no footer e abre WhatsApp.
- Admin não exibe edição dessas páginas.
- Não há armazenamento de currículos.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
