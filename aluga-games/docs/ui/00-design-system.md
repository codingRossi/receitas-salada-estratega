# 00 — Design System

## 1. Objetivo do documento

Este documento define a direção visual e as regras de interface do novo site da AlugaGames.

A UI deve seguir a referência visual aprovada pelo cliente: uma landing page institucional premium, clara, corporativa, com bastante espaço em branco, uso forte do verde da marca, tipografia moderna e foco em conversão para WhatsApp.

A IA deve usar este documento como fonte de verdade antes de implementar qualquer tela pública ou administrativa.

---

## 2. Direção visual aprovada

A interface deve parecer:

- premium;
- profissional;
- corporativa;
- confiável;
- moderna;
- limpa;
- focada em eventos e experiências;
- menos “loja virtual genérica” e mais “empresa especializada em soluções para eventos”.

A interface não deve parecer:

- infantil demais;
- carnavalesca;
- poluída;
- amadora;
- e-commerce tradicional;
- marketplace;
- site de brinquedos barato;
- página cheia de preços, banners promocionais e urgência falsa.

---

## 3. Referência visual principal

A referência visual principal é a LP aprovada em conversa, com estas características:

- fundo branco ou off-white;
- header minimalista;
- logo no canto esquerdo;
- navegação central simples;
- CTA no canto direito;
- hero com texto forte à esquerda e produto/imagem grande à direita;
- palavras importantes destacadas em verde;
- botões verdes e botões outline;
- ícones lineares verdes;
- seções com muito respiro;
- logos de empresas em uma faixa discreta;
- cards de produtos com imagem grande, título e descrição curta;
- seção “como funciona” em passos horizontais;
- depoimento em banner largo com imagem/gradiente;
- FAQ em acordeões simples;
- CTA final grande;
- footer limpo.

Esta referência não deve ser copiada cegamente pixel a pixel, mas deve orientar toda a linguagem visual do site.

---

## 4. Tom da marca na interface

A AlugaGames deve comunicar que entrega entretenimento, mas com operação séria.

A comunicação visual deve equilibrar:

- diversão;
- segurança;
- confiança;
- estrutura profissional;
- experiência corporativa;
- facilidade de contratação.

O foco principal deve ser o público corporativo e empresas planejando eventos, sem excluir festas, escolas, condomínios e aniversários.

---

## 5. Paleta de cores

### Cores principais

A paleta deve ser simples e consistente.

```txt
Brand Green        #11A852
Brand Green Dark   #087A3A
Brand Green Soft   #EAF8F0
Text Primary       #111827
Text Secondary     #4B5563
Text Muted         #6B7280
Background         #FFFFFF
Background Soft    #F7F9F8
Border             #E5E7EB
Card Background    #FFFFFF
Success            #11A852
Warning            #F59E0B
Danger             #DC2626
```

### Uso do verde

O verde deve ser usado para:

- CTAs principais;
- destaques em títulos;
- ícones;
- bordas de botões secundários;
- indicadores positivos;
- elementos de marca.

O verde não deve ser usado de forma excessiva em fundos grandes, para não deixar a página pesada.

### Fundos

A base deve ser majoritariamente branca ou off-white.

Fundos escuros devem ser usados com moderação, apenas em seções especiais caso o design peça.

---

## 6. Tipografia

A tipografia deve ser moderna, limpa e de alta legibilidade.

Sugestão:

```txt
Fonte principal: Inter, Geist Sans ou similar
Fonte alternativa: system-ui, sans-serif
```

### Hierarquia

```txt
Hero title desktop: 56px a 72px
Hero title mobile: 38px a 46px
Section title desktop: 32px a 44px
Section title mobile: 28px a 34px
Card title: 18px a 22px
Body: 16px a 18px
Small text: 13px a 14px
```

### Regras

- Títulos devem ser fortes, com peso 700 ou 800.
- Textos de apoio devem ser claros, com peso 400 ou 500.
- Evitar textos longos demais nas seções da LP.
- Usar destaque verde em palavras estratégicas, não em frases inteiras.

Exemplo de título no estilo desejado:

```txt
Experiências que conectam pessoas e fortalecem marcas.
```

---

## 7. Layout e espaçamento

### Container

```txt
max-width: 1180px a 1240px
padding desktop: 24px a 32px
padding mobile: 20px
```

### Espaçamento entre seções

```txt
Desktop: 80px a 120px
Mobile: 56px a 80px
```

### Grid

A página deve usar grids simples:

```txt
Produtos desktop: 3 ou 4 colunas
Produtos tablet: 2 colunas
Produtos mobile: 1 coluna
Benefícios desktop: 3 ou 4 colunas
FAQ desktop: 2 colunas
FAQ mobile: 1 coluna
```

### Regra geral

A UI deve ter bastante respiro. Não compactar informações só para “caber mais coisa”.

---

## 8. Header público

O header público deve ser minimalista.

### Estrutura desktop

```txt
[Logo]     [Atrações] [Soluções] [Como Funciona] [Cases/Fotografia] [Representante]     [Solicitar proposta]
```

### Estrutura mobile

```txt
[Logo]                                                [Menu]
```

Ao abrir o menu mobile:

- links principais;
- botão de WhatsApp;
- acesso discreto ao admin não deve aparecer no menu público.

### Regras

- Header deve ficar visualmente leve.
- Pode ser sticky se não atrapalhar a experiência.
- O CTA principal deve levar para WhatsApp.
- Não colocar carrinho com aparência de e-commerce tradicional.
- A lista de produtos deve aparecer como “lista” ou “produtos selecionados”, não como compra.

---

## 9. Hero da LP

O hero deve ser a seção mais forte da home.

### Estrutura recomendada

```txt
Eyebrow pequeno em verde
Título grande com destaque em verde
Subtítulo curto
Botão principal: Solicitar proposta
Botão secundário: Ver atrações / Falar com especialista
Microbenefícios com ícones
Imagem grande do produto/evento à direita
```

### Regras

- O texto deve vender solução completa, não apenas produto.
- A imagem deve ser grande, limpa e impactante.
- Não usar carrossel complexo no hero na primeira versão, a não ser que já esteja planejado no CMS da LP.
- O botão principal sempre deve levar ao WhatsApp.

---

## 10. Botões

### Botão primário

Uso: ação principal de conversão.

```txt
Fundo: verde
Texto: branco
Borda: verde
Border radius: 6px a 10px
Altura: 44px a 52px
```

Exemplos:

```txt
Solicitar proposta
Falar no WhatsApp
Quero este produto
Enviar lista no WhatsApp
```

### Botão secundário

Uso: navegação ou ação complementar.

```txt
Fundo: transparente ou branco
Texto: verde
Borda: verde suave
```

Exemplos:

```txt
Ver produtos
Ver todas as atrações
Falar com especialista
```

### Regras

- Não usar muitos botões diferentes.
- Toda página deve ter CTA claro para WhatsApp.
- Botões destrutivos no admin devem usar vermelho e pedir confirmação.

---

## 11. Cards de produto

Os cards públicos de produto devem parecer catálogo premium, não vitrine de loja.

### Card deve ter

- imagem grande;
- nome do produto;
- descrição curta;
- badges opcionais;
- botão ou link discreto para ver detalhes;
- ação para WhatsApp ou adicionar à lista.

### Card não deve ter

- preço;
- parcelamento;
- botão “comprar”;
- botão “adicionar ao carrinho” com linguagem de e-commerce;
- selo promocional falso;
- excesso de informação técnica.

### Exemplo de estrutura

```txt
[Imagem]
Máquina de Boxe
Desafio, adrenalina e competição saudável para eventos corporativos e ações de marca.
[Ver detalhes] [Adicionar à lista]
```

---

## 12. Página de produtos

A página `/produtos` deve ser um catálogo único e filtrável.

### Estrutura recomendada

```txt
Título da página
Texto curto explicando as atrações
Busca por nome
Filtros laterais ou superiores
Grid de produtos
Lista de produtos selecionados acessível
CTA para WhatsApp
```

### Filtros visuais

Os filtros devem ser claros e fáceis de usar:

- categoria;
- tags;
- tipo de evento;
- público indicado;
- disponível/indisponível;
- destaque.

### Mobile

No mobile, filtros devem abrir em drawer/modal para não ocupar a tela toda.

---

## 13. Página individual de produto

A página de produto deve reforçar o valor da atração e facilitar o contato.

### Deve conter

- galeria de imagens;
- vídeo externo, se existir;
- nome do produto;
- descrição completa;
- categorias;
- tags;
- indicação de evento;
- informações técnicas opcionais;
- produtos relacionados;
- botão direto para WhatsApp;
- botão para adicionar à lista.

### Regras

- Não exibir preço.
- Não sugerir compra direta.
- O CTA principal deve ser WhatsApp com mensagem personalizada do produto.
- Produtos indisponíveis devem continuar visíveis apenas se o admin desejar, mas com CTA adaptado.

---

## 14. Lista de produtos selecionados

A lista de produtos selecionados pode existir, mas não deve parecer carrinho de compra.

### Nomes permitidos

```txt
Lista de produtos
Produtos selecionados
Minha seleção
Lista para WhatsApp
```

### Nomes a evitar

```txt
Carrinho
Checkout
Pedido
Compra
Finalizar compra
```

### UI recomendada

- botão no header;
- drawer lateral;
- lista com nome, quantidade e remover;
- botão “Enviar lista no WhatsApp”.

---

## 15. Seção de logos/clientes

A seção de logos deve transmitir prova social.

### Regras

- Logos em linha horizontal no desktop.
- Em mobile, carrossel ou grid simples.
- Fundo claro.
- Logos devem ter tamanho equilibrado.
- Não usar cores que briguem com a marca.

---

## 16. Seção “Por que escolher”

Esta seção deve usar ícones lineares verdes e blocos curtos.

### Exemplo de blocos

```txt
Experiências que geram engajamento real
Soluções completas e sem preocupação
Estrutura profissional e segura
Flexibilidade para eventos de qualquer porte
```

### Regras

- Máximo de 4 benefícios principais por linha no desktop.
- Texto curto e direto.
- Cada benefício com ícone, título e descrição.

---

## 17. Seção “Como funciona”

A seção deve explicar o processo de contratação de forma simples.

### Passos recomendados

```txt
1. Briefing
2. Proposta personalizada
3. Entrega e montagem
4. Operação e suporte
5. Resultados que ficam
```

### UI

- ícones verdes;
- linha horizontal conectando passos no desktop;
- cards empilhados no mobile;
- textos curtos.

---

## 18. Depoimentos

Depoimentos devem ter visual premium e transmitir confiança.

### Estrutura

```txt
Aspas ou ícone
Texto do depoimento
Nome do cliente ou tipo de empresa
Imagem de evento ao lado ou no fundo
```

### Regras

- Depoimentos devem ser editáveis pelo admin.
- A UI deve permitir ocultar depoimentos sem quebrar layout.
- Não inventar nomes de empresas se o admin não cadastrou.

---

## 19. FAQ

FAQ deve usar acordeão simples.

### Regras

- Perguntas em cards brancos com borda suave.
- Ícone de expandir discreto.
- Em desktop, pode usar duas colunas.
- Em mobile, uma coluna.
- Conteúdo editável pelo admin.

---

## 20. CTA final

O CTA final deve ser uma seção larga e clara.

### Estrutura

```txt
Título forte
Texto curto
Botão para WhatsApp
Imagem de apoio opcional
```

### Exemplo

```txt
Pronto para transformar seu evento em uma experiência inesquecível?
Fale com um especialista e receba uma proposta personalizada.
[Solicitar proposta]
```

---

## 21. Footer público

O footer deve ser limpo e institucional.

### Deve conter

- logo;
- descrição curta;
- links de navegação;
- links institucionais;
- contato;
- WhatsApp;
- e-mail;
- cidade/estado;
- redes sociais;
- link “Trabalhe conosco” apontando para WhatsApp com mensagem estática.

### Não deve conter

- links de conta do cliente;
- login de cliente;
- carrinho;
- checkout;
- pagamento;
- outras empresas/negócios.

---

## 22. Página de fotografia

A página de fotografia deve parecer uma área de cases/registro de eventos.

### UI recomendada

- título institucional;
- texto curto;
- filtros por tipo de evento;
- grid de álbuns;
- página ou modal de álbum;
- galeria de fotos.

### Álbum

Cada álbum pode ter:

- nome do evento;
- tipo de evento;
- data opcional;
- cidade opcional;
- fotos.

A fotografia existe para mostrar experiências reais da AlugaGames, não como serviço separado.

---

## 23. Páginas institucionais estáticas

As páginas “Representante AlugaGames” e “Por que Contratar” devem seguir o mesmo design premium da LP.

### Regras

- Layout limpo.
- Títulos fortes.
- Seções em blocos.
- CTA para WhatsApp quando fizer sentido.
- Sem painel de edição no MVP/produto inicial.

---

## 24. Admin UI

O admin deve ser simples, objetivo e seguro.

A aparência do admin pode ser mais funcional, mas ainda deve manter consistência visual com a marca.

### Estilo do admin

- fundo claro;
- sidebar simples;
- cards brancos;
- botões verdes para ações principais;
- vermelho apenas para ações destrutivas;
- tabelas limpas;
- formulários bem espaçados;
- mensagens claras de erro e sucesso.

### Menus do admin

```txt
Dashboard
Produtos
Categorias
Tags
Landing Page
Fotografia
Depoimentos
FAQ
Logos/Clientes
Configurações
```

### Regras

- Não criar admin visualmente complexo.
- Não criar dashboard poluído.
- Não esconder ações importantes.
- Toda exclusão precisa de confirmação.
- Toda action deve mostrar feedback de sucesso ou erro.

---

## 25. Formulários do admin

### Regras gerais

- Labels sempre visíveis.
- Campos obrigatórios marcados.
- Mensagens de erro próximas ao campo.
- Botão de salvar claro.
- Estado de loading ao salvar.
- Estado de sucesso após salvar.
- Preview quando houver imagem.
- Confirmação para remover mídia.

### Produtos

O formulário de produto deve ser dividido em blocos:

```txt
Informações principais
Categorias e tags
Indicações de evento
Mídias
Informações técnicas
SEO
Status e destaque
```

---

## 26. Componentes base

A IA deve criar/reutilizar componentes base antes de duplicar UI.

Componentes recomendados:

```txt
Button
Input
Textarea
Select
Checkbox
Switch
Badge
Card
Section
Container
Accordion
Modal
Drawer
Dropdown
Table
ImageUploader
MediaGallery
ProductCard
ProductGrid
AdminPageHeader
AdminFormSection
EmptyState
ConfirmDialog
```

---

## 27. Responsividade

A interface deve ser pensada mobile-first, mas com visual premium no desktop.

### Breakpoints sugeridos

```txt
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Regras mobile

- Header vira menu compacto.
- Hero empilha texto e imagem.
- Cards viram uma coluna.
- Filtros de produtos viram drawer/modal.
- Tabelas do admin devem virar cards ou ter scroll horizontal controlado.
- CTAs devem ser fáceis de tocar.

---

## 28. Acessibilidade

### Regras obrigatórias

- Toda imagem deve ter `alt` adequado.
- Botões devem ser botões reais, não `div` clicável.
- Links devem ter texto claro.
- Contraste deve ser suficiente.
- Inputs devem ter label.
- Modal/drawer deve ser navegável por teclado.
- Não depender apenas de cor para transmitir informação.
- Estados de foco devem ser visíveis.

---

## 29. Performance visual

### Regras

- Usar imagens otimizadas.
- Definir dimensões de imagem para evitar layout shift.
- Evitar vídeos pesados carregando automaticamente.
- Usar lazy loading em galerias.
- Não carregar todas as imagens de todos os produtos de uma vez.
- Não criar animações pesadas.

---

## 30. Animações

Animações devem ser sutis.

Permitido:

- hover suave em cards;
- transição de botão;
- fade/slide discreto em seções;
- accordion suave;
- drawer lateral.

Evitar:

- animações chamativas demais;
- movimento constante;
- parallax pesado;
- efeitos que prejudiquem performance;
- excesso de microinterações.

---

## 31. Regras para IA implementadora

Ao implementar UI, a IA deve:

1. Ler este arquivo antes de criar telas.
2. Manter a identidade premium/corporativa.
3. Evitar aparência de e-commerce tradicional.
4. Não adicionar preço, checkout ou pagamento.
5. Usar CTA para WhatsApp como conversão principal.
6. Reutilizar componentes base.
7. Garantir responsividade.
8. Garantir acessibilidade básica.
9. Não criar estilos aleatórios fora dos tokens definidos.
10. Não criar page builder livre para a LP.
11. Implementar blocos controlados e editáveis.
12. Manter o admin simples e seguro.

---

## 32. Critérios de aceite

A UI será considerada adequada quando:

- seguir a estética da referência aprovada;
- transmitir confiança corporativa;
- usar verde de forma consistente;
- tiver boa hierarquia visual;
- tiver CTAs claros para WhatsApp;
- não parecer loja virtual comum;
- funcionar bem no mobile;
- permitir gestão pelo admin sem complexidade desnecessária;
- não quebrar quando faltarem imagens ou conteúdos opcionais;
- estiver coerente com os documentos de produto, domínio, rotas e segurança.
