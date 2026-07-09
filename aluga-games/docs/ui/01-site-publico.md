# 01 — Site Público

## 1. Objetivo do documento

Este documento define a experiência, estrutura visual, comportamento e critérios de aceite das telas públicas do novo site da AlugaGames.

Ele deve ser usado pela IA antes de implementar qualquer página pública, componente público, card de produto, CTA de WhatsApp, lista de produtos selecionados, galeria ou seção da landing page.

Este documento complementa:

- `/docs/product/00-visao-do-produto.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`
- `/docs/architecture/04-rotas-e-navegacao.md`
- `/docs/ui/00-design-system.md`

---

## 2. Princípio central do site público

O site público deve parecer uma empresa profissional de soluções para eventos, não uma loja virtual comum.

A experiência deve conduzir o visitante para três ações principais:

1. Entender rapidamente o que a AlugaGames faz.
2. Encontrar produtos/atrações adequados ao evento.
3. Chamar a AlugaGames no WhatsApp.

O fluxo mais valorizado é:

```txt
Landing page → Página de produtos → Página individual de produto → WhatsApp
```

O fluxo secundário é:

```txt
Produtos → Lista de produtos selecionados → WhatsApp
```

A lista de produtos selecionados não é compra, não é checkout, não é pedido salvo e não é orçamento formal dentro do sistema. Ela apenas monta uma mensagem para WhatsApp.

---

## 3. Direção visual obrigatória

A UI pública deve seguir a referência visual aprovada pelo cliente:

- fundo branco/off-white;
- aparência premium e corporativa;
- bastante espaço em branco;
- verde AlugaGames como cor principal de ação;
- tipografia moderna, forte e legível;
- hero com grande imagem de produto/evento;
- botões claros e objetivos;
- cards limpos;
- ícones lineares;
- prova social com logos;
- seções bem separadas;
- CTA para WhatsApp em pontos estratégicos.

A interface deve transmitir:

- confiança;
- profissionalismo;
- segurança;
- estrutura operacional;
- diversão sem parecer amadora;
- capacidade de atender empresas e eventos de maior porte.

A interface não deve transmitir:

- loja popular;
- e-commerce genérico;
- site infantil demais;
- excesso de cores;
- promoções, descontos, parcelas ou urgência falsa;
- compra online.

---

## 4. Sitemap público

As rotas públicas principais serão:

```txt
/
/produtos
/produtos/[slug]
/fotografia
/fotografia/[slug]
/representante-alugagames
/por-que-contratar
```

O link “Trabalhe conosco” não terá página própria. Ele ficará no footer e abrirá o WhatsApp com mensagem estática.

---

## 5. Header público

## 5.1 Objetivo

O header deve permitir navegação rápida sem competir visualmente com o hero.

Deve ser limpo, premium e discreto.

## 5.2 Navegação desktop

Estrutura recomendada:

```txt
[Logo AlugaGames]   [Atrações] [Como funciona] [Fotografia] [Por que contratar] [Representante]   [Solicitar proposta]
```

Mapeamento sugerido:

- **Atrações** → `/produtos`
- **Como funciona** → âncora da landing page `/#como-funciona`
- **Fotografia** → `/fotografia`
- **Por que contratar** → `/por-que-contratar`
- **Representante** → `/representante-alugagames`
- **Solicitar proposta** → WhatsApp

Caso o header fique visualmente carregado, priorizar:

```txt
[Logo] [Atrações] [Fotografia] [Por que contratar] [Representante] [Solicitar proposta]
```

## 5.3 Navegação mobile

No mobile, o header deve ter:

```txt
[Logo]                                      [Menu]
```

O menu mobile deve abrir uma navegação vertical com:

- Produtos/Atrações;
- Fotografia;
- Por que contratar;
- Representante AlugaGames;
- CTA para WhatsApp.

Não mostrar link de admin no header público.

## 5.4 Comportamento

O header pode ser sticky, desde que não ocupe espaço excessivo no mobile.

Se for sticky:

- usar fundo branco com leve blur ou sombra sutil;
- não usar sombra pesada;
- manter boa leitura;
- não cobrir conteúdo ao navegar por âncoras.

---

# 6. Landing page `/`

## 6.1 Objetivo

A landing page é a principal vitrine institucional e comercial do site.

Ela deve comunicar em poucos segundos:

- a AlugaGames aluga brinquedos, games e atrações para eventos;
- a empresa entrega soluções completas;
- o foco principal é atender eventos corporativos e ações profissionais;
- o visitante pode ver produtos ou chamar no WhatsApp;
- a empresa é confiável e já entrega experiências reais.

## 6.2 Estrutura recomendada da landing page

A estrutura inicial recomendada é:

```txt
1. Header
2. Hero principal
3. Benefícios rápidos / selos de confiança
4. Logos de empresas/clientes
5. Por que empresas escolhem a AlugaGames
6. Produtos/atrações em destaque
7. Blocos de soluções/tipos de evento
8. Como funciona
9. Depoimento/banner de prova social
10. Fotografia/cases visuais
11. Dúvidas frequentes
12. CTA final
13. Footer
```

A ordem pode ser ajustada durante o design, mas a IA não deve remover blocos P0 sem autorização.

---

## 6.3 Hero principal

### Objetivo

Gerar entendimento imediato e direcionar para WhatsApp ou produtos.

### Estrutura visual

Desktop:

```txt
[Texto forte + subtítulo + CTAs + benefícios]       [Imagem/carrossel grande]
```

Mobile:

```txt
[Texto forte]
[Subtítulo]
[CTAs]
[Imagem]
[Benefícios]
```

### Conteúdo recomendado

Título base:

```txt
Experiências que conectam pessoas e fortalecem eventos.
```

Alternativa mais direta:

```txt
Locação de brinquedos, games e atrações para eventos.
```

Subtítulo base:

```txt
Soluções completas de entretenimento para eventos corporativos, festas, ações de marca, escolas, condomínios e confraternizações.
```

Tag superior sugerida:

```txt
ENTRETENIMENTO PARA EVENTOS EM SÃO PAULO
```

### CTAs

O hero deve ter dois CTAs:

1. Primário: **Solicitar proposta** → WhatsApp.
2. Secundário: **Ver atrações** → `/produtos`.

Não usar “Comprar”, “Adicionar ao carrinho” ou “Finalizar pedido” no hero.

### Imagem do hero

O hero deve usar imagem forte de produto ou evento.

Regras:

- a imagem deve ser editável pelo admin;
- pode ser uma galeria/carrossel controlado;
- não deve quebrar o layout em mobile;
- deve ter `alt` descritivo;
- deve usar otimização de imagem do Next;
- não deve pesar excessivamente.

### Benefícios rápidos

Abaixo do hero ou dentro dele, podem aparecer 3 benefícios curtos:

```txt
Segurança e manutenção garantidas
Equipe especializada do início ao fim
Entrega, montagem e suporte completo
```

Esses itens devem ter ícones lineares, preferencialmente em verde.

---

## 6.4 Logos de empresas/clientes

### Objetivo

Reforçar prova social e confiança.

### Estrutura

Uma faixa discreta com título pequeno:

```txt
EMPRESAS QUE CONFIAM NA ALUGA GAMES
```

E uma linha/grid com logos.

### Regras

- Logos devem ser gerenciados pelo admin.
- Logos inativos não devem aparecer.
- Logos devem ter alt text.
- No mobile, a linha pode virar scroll horizontal ou grid compacto.
- Não usar logos falsos em produção.

---

## 6.5 Seção “Por que empresas escolhem a AlugaGames?”

### Objetivo

Explicar diferenciais de forma rápida.

### Estrutura

Título:

```txt
Por que empresas escolhem a AlugaGames?
```

Cards de diferenciais, por exemplo:

```txt
Experiências que geram engajamento real
Atrações interativas que criam conexão imediata e ampliam o tempo de permanência.

Soluções completas e sem preocupação
Cuidamos de logística, montagem, operação e suporte durante o evento.

Estrutura profissional e segura
Equipamentos premium, higienizados e com manutenção preventiva.

Flexibilidade para eventos de qualquer porte
Atendemos de reuniões executivas até grandes convenções e feiras.
```

### Regras

- Cada diferencial deve ter ícone, título e descrição curta.
- O admin deve conseguir editar conteúdo e visibilidade dos diferenciais.
- Não usar textos longos.
- Evitar promessas absolutas impossíveis de provar.

---

## 6.6 Produtos/atrações em destaque

### Objetivo

Mostrar rapidamente produtos fortes e levar o visitante para páginas individuais.

### Estrutura

Título recomendado:

```txt
Atrações que elevam o seu evento
```

Grid desktop:

```txt
4 cards por linha ou 3 cards, dependendo do design
```

Mobile:

```txt
1 card por linha
```

### Card de destaque

Cada card deve ter:

- imagem;
- nome do produto;
- descrição curta;
- CTA discreto para detalhes;
- opcionalmente tag/categoria.

O card não deve ter:

- preço;
- desconto;
- parcelamento;
- PIX;
- botão de comprar.

### Comportamento

Ao clicar no card, abrir `/produtos/[slug]`.

Deve haver um botão abaixo da seção:

```txt
Ver todas as atrações
```

Esse botão leva para `/produtos`.

---

## 6.7 Blocos de soluções/tipos de evento

### Objetivo

Permitir que a LP destaque temas estratégicos sem criar páginas separadas por tipo.

Exemplos:

- Eventos corporativos;
- Realidade virtual;
- Infláveis;
- Games e arcades;
- Decoração para festas e aniversários;
- Escolas e condomínios;
- Experiências interativas.

### Comportamento

Cada bloco pode levar para `/produtos` com filtro aplicado por query string.

Exemplos:

```txt
/produtos?tag=realidade-virtual
/produtos?categoria=inflaveis
/produtos?publico=corporativo
```

### Regras

- Não criar páginas públicas separadas para cada categoria como estrutura principal.
- Os blocos são editoriais e comerciais.
- O admin deve conseguir editar imagem, título, descrição, CTA e filtro/link.
- Blocos inativos não aparecem.

---

## 6.8 Seção “Como funciona”

### Objetivo

Reduzir fricção e mostrar que a AlugaGames cuida do processo completo.

### Estrutura recomendada

Título:

```txt
Como funciona
```

Passos:

```txt
1. Briefing
Entendemos seu objetivo e o perfil do público.

2. Proposta personalizada
Sugerimos as melhores atrações para o seu evento.

3. Entrega e montagem
Cuidamos de toda a logística e instalação.

4. Operação e suporte
Equipe no evento para garantir tudo funcionando perfeitamente.

5. Resultados que ficam
Mais engajamento, marca fortalecida e público satisfeito.
```

### Regras

- Os passos devem ser editáveis pelo admin.
- O layout desktop pode ser horizontal.
- No mobile, virar lista vertical.
- Usar ícones simples, lineares e verdes.

---

## 6.9 Depoimento/banner de prova social

### Objetivo

Criar confiança com uma seção visual de impacto.

### Estrutura

Pode usar um banner largo, com:

- depoimento em destaque;
- nome do cliente ou segmento;
- imagem de evento ao fundo/lado;
- gradiente leve para leitura.

Exemplo:

```txt
“A AlugaGames elevou o nível do nosso evento. Organização impecável, atrações de qualidade e equipe extremamente profissional.”
```

### Regras

- Depoimentos devem ser gerenciados pelo admin.
- O admin deve poder marcar um depoimento como destaque.
- Não exibir depoimentos inativos.
- Não inventar empresas, cargos ou clientes.

---

## 6.10 Fotografia/cases visuais na LP

### Objetivo

Mostrar eventos reais sem obrigar o usuário a sair da landing page.

### Estrutura

Pode ser:

- um grid curto de fotos;
- um banner largo com imagem;
- um carrossel controlado;
- um link para `/fotografia`.

CTA recomendado:

```txt
Ver fotos dos eventos
```

### Regras

- Usar fotos vindas dos álbuns ativos ou de bloco editável da LP.
- Imagens devem ter bom crop.
- Não sobrecarregar a LP com muitas imagens pesadas.

---

## 6.11 FAQ

### Objetivo

Responder dúvidas comuns antes do WhatsApp.

### Estrutura

Título:

```txt
Dúvidas frequentes
```

Perguntas sugeridas:

```txt
Vocês atendem quais regiões?
As atrações precisam de estrutura elétrica especial?
Vocês fornecem operador para as atrações?
É possível personalizar a experiência com a nossa marca?
Qual o prazo ideal para solicitar uma proposta?
Quais formas de pagamento são aceitas?
```

### Regras

- FAQ deve ser editável pelo admin.
- Usar acordeão.
- No desktop, pode usar 2 colunas.
- No mobile, 1 coluna.
- Respostas devem ser curtas e objetivas.

---

## 6.12 CTA final

### Objetivo

Fechar a página com uma chamada clara para WhatsApp.

### Estrutura

Título recomendado:

```txt
Pronto para transformar seu evento em uma experiência inesquecível?
```

Subtítulo:

```txt
Fale com um especialista e receba uma proposta personalizada.
```

Botão:

```txt
Solicitar proposta
```

### Regras

- O CTA deve abrir WhatsApp com mensagem geral.
- Deve ser visualmente forte, mas ainda dentro do estilo premium.
- Pode usar imagem de evento/produto como apoio visual.

---

# 7. Página de produtos `/produtos`

## 7.1 Objetivo

A página de produtos deve ser a listagem única de atrações da AlugaGames.

Ela substitui a navegação atual por páginas separadas como infláveis, máquinas, lista de jogos etc.

Tudo será tratado como produto.

---

## 7.2 Estrutura visual recomendada

```txt
Header
Hero interno / cabeçalho da página
Busca e filtros
Grid de produtos
Lista de produtos selecionados / drawer
CTA intermediário ou final
Footer
```

## 7.3 Cabeçalho da página

Título sugerido:

```txt
Atrações para todos os tipos de evento
```

Subtítulo:

```txt
Encontre brinquedos, games e experiências interativas para eventos corporativos, festas, escolas, condomínios e ativações de marca.
```

CTA secundário:

```txt
Falar com especialista
```

---

## 7.4 Busca e filtros

A página deve ter busca por nome e filtros.

Filtros previstos:

```txt
- Busca por nome
- Categoria
- Tags
- Indicação de evento
- Tipo de público
- Disponibilidade
- Produto em destaque
```

Tipos de público/finalidade podem incluir:

```txt
- Corporativo
- Infantil
- Adulto
- Escolar
- Condomínio
- Festa/aniversário
- Ação de marca
```

Não haverá filtro por preço.

Não haverá filtro obrigatório por espaço necessário ou número de jogadores.

### Desktop

No desktop, filtros podem aparecer em:

- sidebar lateral; ou
- barra horizontal acima do grid.

Escolher a opção que ficar mais limpa visualmente.

### Mobile

No mobile, filtros devem ser acessíveis por botão:

```txt
Filtrar atrações
```

Esse botão pode abrir drawer/modal.

### Estado sem resultado

Mensagem sugerida:

```txt
Nenhuma atração encontrada com esses filtros.
Tente ajustar sua busca ou fale com a nossa equipe pelo WhatsApp.
```

CTA:

```txt
Falar com especialista
```

---

## 7.5 Card de produto

Cada card deve conter:

- imagem principal;
- nome;
- descrição curta;
- tags/categoria principais;
- status de indisponível, quando aplicável;
- botão “Ver detalhes”;
- botão “Adicionar à lista” ou ícone discreto;
- CTA rápido para WhatsApp, se não poluir a UI.

### Linguagem recomendada

Usar:

```txt
Ver detalhes
Adicionar à lista
Falar sobre este produto
```

Evitar:

```txt
Comprar
Finalizar compra
Adicionar ao carrinho
Pagar agora
```

### Produto indisponível

Se o produto estiver indisponível:

- mostrar selo discreto “Indisponível”;
- permitir ver detalhes;
- o CTA para WhatsApp pode continuar ativo se o admin permitir, mas a mensagem deve ser consultiva;
- não permitir linguagem de reserva.

Mensagem sugerida para produto indisponível:

```txt
Produto indisponível no momento. Fale com a equipe para alternativas similares.
```

---

## 7.6 Ordenação

A ordenação padrão da página de produtos será alfabética.

Produtos em destaque podem aparecer em uma seção própria ou com filtro, mas a regra geral da listagem é alfabética.

---

# 8. Página individual de produto `/produtos/[slug]`

## 8.1 Objetivo

A página individual do produto deve converter melhor que o card.

Ela deve dar segurança para o visitante chamar no WhatsApp sobre aquele produto específico.

---

## 8.2 Estrutura recomendada

```txt
Header
Breadcrumb discreto
Hero do produto
Galeria de imagens/vídeo
Descrição e informações principais
Informações técnicas
Indicações de uso/evento
CTA para WhatsApp
Adicionar à lista
Produtos relacionados
FAQ/CTA final opcional
Footer
```

---

## 8.3 Hero do produto

### Desktop

```txt
[Galeria/imagem grande]      [Nome + descrição curta + CTAs + tags]
```

### Mobile

```txt
[Galeria]
[Nome]
[Descrição curta]
[CTAs]
[Tags]
```

### Conteúdo obrigatório

- nome do produto;
- status, se indisponível;
- descrição curta;
- categoria/tags;
- botão principal para WhatsApp;
- botão secundário para adicionar à lista.

### CTA principal

Texto recomendado:

```txt
Solicitar pelo WhatsApp
```

Mensagem automática:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse neste produto: [NOME_DO_PRODUTO]. Pode me passar mais informações?
```

---

## 8.4 Galeria e vídeo

A página pode exibir:

- múltiplas imagens;
- vídeo por URL externa;
- imagem principal destacada;
- miniaturas.

Regras:

- imagens devem vir do storage;
- vídeos não são upload direto;
- vídeos devem ser URL externa, como YouTube/Vimeo, quando implementado;
- se não houver vídeo, não exibir área vazia;
- se não houver imagem, usar fallback visual consistente.

---

## 8.5 Descrição completa

A descrição completa deve ser editável pelo admin.

Regras:

- permitir texto rico controlado ou campos simples;
- evitar HTML livre inseguro;
- sanitizar conteúdo se houver editor rich text;
- não permitir scripts, iframes arbitrários ou código embed inseguro.

---

## 8.6 Informações técnicas

As informações técnicas devem ser flexíveis.

Modelo visual recomendado:

```txt
[Ícone] Idade recomendada: a partir de 8 anos
[Ícone] Uso: interno ou externo
[Ícone] Energia: tomada 110v/220v
[Ícone] Monitor: pode incluir operador
```

Essas informações devem vir de pares editáveis:

```txt
label + value
```

Não forçar todos os produtos a preencherem os mesmos campos.

---

## 8.7 Produtos relacionados

Produtos relacionados são desejáveis, mas não devem travar a entrega.

Prioridade:

- P1 ou P2, dependendo do prazo.

Regras possíveis:

- mesmos tags;
- mesma categoria;
- produtos marcados manualmente no admin;
- excluir o produto atual.

---

# 9. Lista de produtos selecionados

## 9.1 Objetivo

Permitir que o visitante selecione vários produtos e envie uma lista única pelo WhatsApp.

Essa funcionalidade é secundária. O fluxo mais importante continua sendo ir direto do produto para o WhatsApp.

---

## 9.2 Nome na interface

Usar preferencialmente:

```txt
Lista
Minha lista
Produtos selecionados
Lista para WhatsApp
```

Evitar:

```txt
Carrinho
Checkout
Pedido
Finalizar compra
```

Se a implementação usar internamente nomes como `cart`, isso não deve aparecer para o usuário.

---

## 9.3 Comportamento visual

Recomendado:

- botão/ícone no header com contador;
- drawer lateral abrindo da direita;
- no mobile, drawer ou bottom sheet;
- lista com nome do produto, miniatura e quantidade;
- botão para remover;
- botão para enviar pelo WhatsApp.

---

## 9.4 Quantidades

O usuário deve poder:

- aumentar quantidade;
- diminuir quantidade;
- remover produto;
- limpar lista.

Não validar estoque.

Não bloquear quantidade por disponibilidade, exceto se produto estiver inativo e não puder ser adicionado.

---

## 9.5 Persistência

A lista pode ser salva em `localStorage`.

Não criar tabela no banco para a lista.

Não exigir login de cliente.

---

## 9.6 Mensagem de WhatsApp da lista

Mensagem sugerida:

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre estes produtos:

- 1x Máquina de Boxe
- 2x Simulador de Corrida
- 1x Air Hockey

Pode me passar mais informações?
```

Regras:

- codificar a mensagem corretamente na URL;
- remover produtos inválidos ou inativos quando necessário;
- não incluir preço;
- não usar linguagem de pedido fechado.

---

# 10. Página de fotografia `/fotografia`

## 10.1 Objetivo

A página de fotografia deve funcionar como uma vitrine visual de eventos reais, montagens, produtos em uso e experiências entregues pela AlugaGames.

Ela não vende fotografia como serviço separado.

---

## 10.2 Estrutura recomendada

```txt
Header
Hero interno
Filtros/pesquisa de álbuns
Grid de álbuns
CTA para WhatsApp
Footer
```

## 10.3 Cabeçalho da página

Título sugerido:

```txt
Eventos, atrações e experiências reais
```

Subtítulo:

```txt
Veja registros de eventos atendidos pela AlugaGames e conheça de perto a estrutura das nossas atrações.
```

---

## 10.4 Álbum/evento

Cada álbum deve ter:

- nome do evento;
- tipo de evento;
- data opcional;
- cidade opcional;
- imagem de capa;
- fotos internas;
- status ativo/inativo;
- slug.

## 10.5 Filtros

Filtros recomendados:

```txt
- Busca por nome do evento
- Tipo de evento
- Cidade, se houver muitos registros
```

Tipos de evento possíveis:

```txt
- Corporativo
- Festa/aniversário
- Escola
- Condomínio
- Ação de marca
- Feira/convenção
```

---

## 10.6 Card de álbum

Cada card deve exibir:

- imagem de capa;
- nome do evento;
- tipo de evento;
- cidade/data, se cadastrados;
- CTA “Ver fotos”.

Não precisa exibir descrição longa.

---

# 11. Página de álbum `/fotografia/[slug]`

## 11.1 Objetivo

Mostrar as fotos de um evento específico e reforçar confiança.

## 11.2 Estrutura

```txt
Header
Breadcrumb
Nome do evento
Metadados: tipo, cidade, data
Galeria de fotos
CTA para WhatsApp
Footer
```

## 11.3 Galeria

A galeria deve ser responsiva.

Pode usar:

- grid masonry simples;
- grid normal;
- lightbox, se viável.

Caso lightbox aumente muito a complexidade, pode ficar para polimento.

## 11.4 CTA

Mensagem de WhatsApp sugerida:

```txt
Olá, vim pelo site da AlugaGames e vi as fotos do evento [NOME_DO_EVENTO]. Gostaria de saber mais sobre atrações para o meu evento.
```

---

# 12. Página Representante AlugaGames `/representante-alugagames`

## 12.1 Objetivo

Ser uma releitura visual da página atual de representante AlugaGames, com design alinhado à nova identidade premium.

## 12.2 Escopo

- Página institucional estática na primeira entrega.
- Conteúdo baseado na página atual.
- Sem editor no admin na primeira versão.
- Sem formulário próprio.
- Pode ter CTA para WhatsApp, se fizer sentido.

## 12.3 Estrutura visual sugerida

```txt
Hero institucional
Explicação da oportunidade
Benefícios de ser representante
Como funciona
Perfil ideal
CTA para contato
Footer
```

## 12.4 Regras

- Manter linguagem profissional.
- Não prometer ganhos irreais.
- Não criar formulário de cadastro.
- Não armazenar dados de interessados.

---

# 13. Página Por que contratar `/por-que-contratar`

## 13.1 Objetivo

Explicar com mais profundidade os diferenciais da AlugaGames.

## 13.2 Escopo

- Página institucional estática na primeira entrega.
- Design premium.
- Conteúdo baseado na página atual.
- Foco em confiança, operação e qualidade.

## 13.3 Estrutura visual sugerida

```txt
Hero institucional
Diferenciais principais
Segurança e estrutura
Variedade de atrações
Processo de atendimento
Prova social/fotos
CTA para WhatsApp
Footer
```

## 13.4 Diferenciais possíveis

```txt
- Atendimento consultivo
- Variedade de atrações
- Operação completa
- Segurança e manutenção
- Equipe especializada
- Experiência em eventos corporativos
- Montagem e suporte
- Soluções para diferentes públicos
```

---

# 14. Trabalhe conosco

## 14.1 Regra

Não haverá página pública de Trabalhe conosco na primeira versão.

O footer terá um link:

```txt
Trabalhe conosco
```

Esse link abrirá WhatsApp com mensagem estática:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse em trabalhar com vocês.
```

## 14.2 Fora do escopo

Não implementar:

- formulário de currículo;
- upload de currículo;
- banco de candidatos;
- painel de vagas;
- automação de RH.

---

# 15. Footer público

## 15.1 Objetivo

Encerrar a navegação com informações institucionais, contato e links úteis.

## 15.2 Estrutura recomendada

```txt
[Logo + texto curto]
[Navegação]
[Institucional]
[Fale conosco]
[Redes sociais]
[Direitos autorais]
```

## 15.3 Links recomendados

Navegação:

- Produtos/Atrações;
- Fotografia;
- Como funciona;
- Por que contratar;
- Representante.

Institucional:

- Representante AlugaGames;
- Política de Privacidade, se criada;
- Trabalhe conosco → WhatsApp.

Contato:

- WhatsApp;
- e-mail;
- cidade/região;
- Instagram/LinkedIn, se houver.

## 15.4 Regras

- Dados globais devem vir das configurações do admin sempre que possível.
- Não exibir informações falsas ou placeholders em produção.
- O link de admin não deve ficar visível no footer público.

---

# 16. WhatsApp no site público

## 16.1 Tipos de CTA

O site terá CTAs de WhatsApp em vários contextos:

```txt
- CTA geral da landing page
- CTA do header
- CTA final da landing page
- CTA da página de produtos
- CTA da página individual de produto
- CTA da lista de produtos selecionados
- CTA da fotografia
- CTA de Trabalhe conosco
```

## 16.2 Mensagens por contexto

### Geral

```txt
Olá, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para o meu evento.
```

### Produto

```txt
Olá, vim pelo site da AlugaGames e tenho interesse neste produto: [NOME_DO_PRODUTO]. Pode me passar mais informações?
```

### Lista

```txt
Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre estes produtos:

- [QTD]x [PRODUTO]

Pode me passar mais informações?
```

### Fotografia

```txt
Olá, vim pelo site da AlugaGames e vi os registros de eventos. Gostaria de saber mais sobre atrações para o meu evento.
```

### Trabalhe conosco

```txt
Olá, vim pelo site da AlugaGames e tenho interesse em trabalhar com vocês.
```

## 16.3 Regras técnicas

- O número do WhatsApp deve vir das configurações do admin.
- A mensagem deve ser codificada corretamente para URL.
- Não usar número fixo hardcoded em múltiplos componentes.
- Centralizar a geração de links em helper único.
- Quando houver tracking, registrar o clique antes de abrir o WhatsApp.

---

# 17. SEO do site público

## 17.1 Princípios

O site público deve ter SEO básico bem estruturado.

Priorizar:

- título e descrição por página;
- URLs limpas;
- slugs legíveis;
- textos reais nas páginas;
- imagens com alt text;
- headings bem organizados;
- páginas de produto indexáveis.

## 17.2 Páginas indexáveis recomendadas

```txt
/
/produtos
/produtos/[slug]
/fotografia
/fotografia/[slug]
/representante-alugagames
/por-que-contratar
```

## 17.3 Produtos

Cada produto deve poder ter:

- SEO title;
- SEO description;
- slug;
- descrição completa;
- imagem principal com alt.

A página individual de produto deve ser indexável, desde que o produto esteja ativo.

## 17.4 Produtos inativos

Produtos inativos não devem aparecer publicamente.

Se uma página de produto inativo for acessada diretamente:

- retornar 404; ou
- redirecionar para `/produtos`, se essa for uma decisão técnica posterior.

A preferência inicial é 404.

---

# 18. Responsividade

## 18.1 Desktop

A UI desktop deve usar:

- containers largos, mas não estourados;
- grids de 3 ou 4 colunas;
- hero com duas colunas;
- header completo;
- FAQ em duas colunas, quando couber.

## 18.2 Tablet

- grids de 2 colunas;
- hero pode manter duas colunas se houver espaço;
- filtros podem virar drawer se necessário.

## 18.3 Mobile

- grid de produtos em 1 coluna;
- menu hamburguer;
- CTAs fáceis de tocar;
- filtros em drawer/modal;
- imagens com proporções controladas;
- evitar textos longos no hero;
- lista de produtos selecionados como drawer ou bottom sheet.

---

# 19. Estados de interface

Toda tela pública com dados dinâmicos deve tratar:

## 19.1 Loading

- skeletons simples;
- não usar spinners excessivos;
- manter layout estável.

## 19.2 Erro

Mensagem amigável:

```txt
Não conseguimos carregar essas informações agora. Tente novamente em instantes ou fale com a nossa equipe pelo WhatsApp.
```

## 19.3 Vazio

Exemplo para produtos:

```txt
Nenhuma atração encontrada.
```

Exemplo para fotografia:

```txt
Nenhum álbum encontrado.
```

## 19.4 Indisponível

Produto indisponível deve ter selo visual discreto.

Não usar vermelho agressivo, exceto em casos realmente críticos.

---

# 20. Acessibilidade

## 20.1 Regras mínimas

- Todo botão deve ter texto claro.
- Ícones clicáveis precisam de `aria-label`.
- Imagens devem ter `alt`.
- Contraste deve ser suficiente.
- Navegação por teclado deve funcionar.
- Acordeões de FAQ devem ser acessíveis.
- Modais/drawers devem prender foco quando abertos.

## 20.2 Textos

Evitar textos ambíguos como:

```txt
Clique aqui
Saiba mais
```

Preferir:

```txt
Ver produtos
Solicitar proposta pelo WhatsApp
Ver fotos do evento
Adicionar à lista
```

---

# 21. Performance

## 21.1 Imagens

- Usar componente de imagem otimizada do Next.
- Definir dimensões.
- Evitar imagens enormes sem compressão.
- Usar lazy loading para imagens abaixo da dobra.
- Priorizar imagem principal do hero.

## 21.2 Scripts

- Evitar bibliotecas pesadas para carrossel/lightbox se não forem necessárias.
- Evitar animações complexas.
- Usar animações discretas.

## 21.3 Dados

- Não carregar todos os detalhes pesados dos produtos na listagem se não for necessário.
- Na listagem, usar dados resumidos.
- Na página individual, carregar detalhes completos.

---

# 22. Conteúdo e tom de voz

## 22.1 Tom

A comunicação deve ser:

- profissional;
- clara;
- objetiva;
- confiante;
- consultiva;
- amigável, mas não informal demais.

## 22.2 Evitar

- linguagem muito infantil;
- excesso de exclamações;
- frases genéricas demais;
- promessas absolutas;
- tom de liquidação;
- linguagem de loja.

## 22.3 Usar

- “atrações”;
- “experiências”;
- “soluções para eventos”;
- “proposta personalizada”;
- “fale com especialista”;
- “produtos selecionados”.

---

# 23. Componentes públicos recomendados

A implementação pode criar componentes como:

```txt
PublicHeader
PublicFooter
WhatsappButton
HeroSection
ClientLogosSection
BenefitsSection
FeaturedProductsSection
SolutionBlocksSection
HowItWorksSection
TestimonialsSection
FaqSection
FinalCtaSection
ProductCard
ProductFilters
ProductGrid
ProductGallery
ProductTechnicalInfo
SelectedProductsDrawer
AlbumCard
PhotoGallery
Breadcrumb
EmptyState
```

Esses componentes devem ficar preferencialmente em:

```txt
/src/components/site
/src/components/site/landing-page
/src/components/site/products
/src/components/site/photography
/src/components/site/quote-list
```

Ou na estrutura equivalente definida em `/docs/architecture/01-arquitetura-de-pastas.md`.

---

# 24. O que a IA não deve implementar no site público

Não implementar:

- checkout;
- pagamento;
- preço público;
- PIX;
- desconto;
- parcelamento;
- login de cliente;
- área do cliente;
- favoritos;
- pedido salvo no banco;
- formulário obrigatório antes do WhatsApp;
- página pública de Trabalhe conosco;
- marketplace;
- avaliações de compra;
- estoque complexo;
- agenda de disponibilidade.

---

# 25. Critérios de aceite gerais

O site público será considerado correto quando:

- a landing page seguir o estilo premium aprovado;
- o visitante entender a proposta da AlugaGames rapidamente;
- a página `/produtos` listar todos os produtos ativos;
- os filtros principais funcionarem;
- cada produto ativo tiver página individual;
- o produto puder abrir WhatsApp com mensagem automática;
- a lista de produtos selecionados funcionar sem login;
- a lista enviar mensagem com produtos e quantidades;
- a página de fotografia listar álbuns ativos;
- a página de álbum exibir fotos;
- páginas institucionais existirem;
- o footer tiver link Trabalhe conosco para WhatsApp;
- o site não parecer e-commerce;
- o site funcionar bem no mobile;
- não houver dados mockados em produção;
- não houver CTAs quebrados;
- não houver links para admin no site público.

---

# 26. Ordem recomendada de implementação pública

A ordem sugerida para implementar o site público é:

```txt
1. Layout público: header, footer e estrutura base
2. Landing page estática seguindo o design system
3. Integração da LP com dados editáveis básicos
4. Página de produtos com dados reais
5. Filtros e busca da página de produtos
6. Página individual de produto
7. Helper centralizado de WhatsApp
8. Lista de produtos selecionados
9. Página de fotografia
10. Página de álbum
11. Páginas institucionais estáticas
12. SEO, performance e responsividade final
```

A IA deve implementar em ciclos pequenos, sempre validando que o site não virou e-commerce tradicional.
