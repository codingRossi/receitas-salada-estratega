# 03 — SEO, Performance e Acessibilidade

## 1. Objetivo do documento

Este documento define as regras de SEO, performance, responsividade e acessibilidade do site AlugaGames.

O sistema será desenvolvido com IA, portanto este arquivo deve funcionar como contrato de qualidade para impedir que a implementação fique bonita visualmente, mas ruim para Google, lenta no mobile, inacessível ou difícil de manter.

A prioridade do site público é gerar contato qualificado pelo WhatsApp, com aparência premium, profissional e corporativa. O site não deve parecer um e-commerce tradicional.

---

## 2. Referências internas obrigatórias

Antes de implementar qualquer página pública, componente visual ou alteração de conteúdo indexável, a IA deve ler:

- `/docs/product/00-visao-do-produto.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/architecture/04-rotas-e-navegacao.md`
- `/docs/ui/00-design-system.md`
- `/docs/ui/01-site-publico.md`
- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`

---

## 3. Princípios gerais

### 3.1 Site público

O site público deve ser:

- rápido no mobile;
- bem indexável pelo Google;
- fácil de navegar;
- claro para empresas planejando eventos;
- visualmente premium e corporativo;
- otimizado para conversão no WhatsApp;
- acessível para usuários com teclado, leitor de tela e baixa visão.

### 3.2 Portal admin

O portal admin deve ser:

- seguro;
- funcional;
- simples de usar;
- acessível;
- rápido o suficiente para o dono manipular produtos, fotos e conteúdo sem travar.

O admin não precisa ser indexável e não deve aparecer no Google.

---

## 4. Escopo de SEO

### 4.1 Páginas que devem ser indexáveis

As seguintes páginas públicas devem poder aparecer no Google:

- `/`
- `/produtos`
- `/produtos/[slug]`
- `/fotografia`
- `/fotografia/[slug]`
- `/representante-alugagames`
- `/por-que-contratar`

### 4.2 Páginas que não devem ser indexáveis

As seguintes rotas devem ser bloqueadas para indexação:

- `/admin`
- `/admin/*`
- `/admin/login`
- rotas internas de API;
- previews administrativos;
- páginas de erro internas;
- qualquer rota temporária criada durante desenvolvimento.

O admin deve usar `noindex, nofollow` quando aplicável.

---

## 5. Posicionamento SEO

O site deve ser otimizado para buscas relacionadas a locação de atrações, games e experiências para eventos, principalmente em São Paulo/SP.

### 5.1 Termos principais

Termos desejados:

- locação de brinquedos para eventos;
- locação de games para eventos;
- aluguel de games para eventos;
- atrações para eventos corporativos;
- entretenimento corporativo;
- locação de atrações interativas;
- aluguel de brinquedos para festa;
- realidade virtual para eventos;
- simulador de corrida para evento;
- máquina de boxe para evento;
- air hockey para eventos;
- arcade para eventos;
- atrações para festa infantil;
- atrações para eventos em São Paulo;
- locação de brinquedos em São Paulo.

### 5.2 Tom do conteúdo

O texto deve comunicar:

- experiência;
- confiança;
- profissionalismo;
- operação completa;
- montagem e suporte;
- atrações interativas;
- solução para empresas e eventos;
- atendimento em São Paulo/SP.

O texto não deve comunicar:

- compra online;
- pagamento pelo site;
- marketplace;
- loja virtual;
- checkout;
- preço final fechado automaticamente.

---

## 6. Regras de metadata

### 6.1 Home

A home deve ter metadata própria.

Exemplo de direção:

```txt
Title: AlugaGames | Locação de Games e Atrações para Eventos
Description: Locação de brinquedos, games e atrações interativas para eventos corporativos, festas e ações de relacionamento em São Paulo.
```

A descrição deve ser humana, clara e orientada a conversão.

### 6.2 Página de produtos

A página `/produtos` deve ter metadata própria.

Exemplo:

```txt
Title: Produtos e Atrações para Eventos | AlugaGames
Description: Conheça as atrações, games, brinquedos e experiências interativas da AlugaGames para eventos corporativos, festas, escolas e condomínios.
```

### 6.3 Página individual de produto

Cada produto deve ter:

- `seo_title` editável;
- `seo_description` editável;
- fallback automático caso o admin não preencha SEO manualmente;
- slug único;
- imagem principal para Open Graph;
- canonical para a URL pública do produto.

Fallback de título:

```txt
[nome do produto] para Eventos | AlugaGames
```

Fallback de descrição:

```txt
Conheça [nome do produto] da AlugaGames, uma atração interativa para eventos corporativos, festas e experiências personalizadas em São Paulo.
```

### 6.4 Fotografia

A página `/fotografia` deve comunicar que é uma galeria de registros reais da AlugaGames.

Cada álbum pode ter metadata própria, usando nome do evento, tipo de evento e cidade quando disponíveis.

### 6.5 Páginas institucionais

As páginas institucionais estáticas devem ter metadata específica, mesmo que o conteúdo não seja editável pelo admin.

---

## 7. Slugs e URLs

### 7.1 Regras gerais

Slugs devem ser:

- únicos;
- minúsculos;
- sem acentos;
- sem espaços;
- separados por hífen;
- gerados a partir do nome, mas editáveis pelo admin;
- validados no servidor.

Exemplos:

```txt
maquina-de-boxe
simulador-de-corrida
air-hockey
arcade-experience
realidade-virtual
```

### 7.2 Alteração de slug

Quando um slug for alterado, idealmente o sistema deve registrar redirecionamento do slug antigo para o novo.

No produto inicial, se redirecionamento automático ficar fora do prazo, a IA deve pelo menos evitar alteração acidental de slug depois que o produto estiver publicado.

### 7.3 URLs antigas do site atual

Como o site atual possui páginas separadas por categorias, a nova versão deve considerar redirects para evitar perda de tráfego.

Exemplos de redirecionamento conceitual:

```txt
/inflaveis -> /produtos?categoria=inflaveis
/lista-de-jogos -> /produtos?tag=games
/maquinas -> /produtos?categoria=maquinas
```

A implementação exata deve ser definida durante a task de redirects.

---

## 8. Sitemap e robots

### 8.1 Sitemap

O sistema deve gerar sitemap incluindo:

- páginas públicas estáticas;
- produtos ativos;
- álbuns ativos de fotografia, se forem páginas públicas;
- páginas institucionais públicas.

Produtos inativos ou indisponíveis podem aparecer no sitemap apenas se ainda forem páginas úteis para SEO. Produtos desativados não devem aparecer.

### 8.2 Robots

O robots deve permitir indexação do site público e bloquear rotas administrativas.

Deve bloquear:

```txt
/admin
/admin/*
/api/* quando aplicável
```

Não deve bloquear `/produtos` nem páginas individuais de produto.

---

## 9. Dados estruturados

Quando viável, o site pode usar dados estruturados em JSON-LD.

### 9.1 Organization / LocalBusiness

A home pode incluir dados da organização com:

- nome da empresa;
- URL;
- logo;
- telefone;
- e-mail;
- redes sociais;
- cidade/estado de atendimento.

### 9.2 Service

Produtos devem ser tratados como serviços/atrações para locação, não como produtos de compra online.

Evitar marcação que comunique checkout, preço final, estoque de e-commerce ou venda direta.

### 9.3 FAQPage

Se a FAQ pública for renderizada na LP, pode ser usada marcação de FAQ, desde que o conteúdo visível na página corresponda ao conteúdo do schema.

### 9.4 BreadcrumbList

Páginas individuais de produto e álbuns de fotografia podem usar breadcrumb.

Exemplo visual:

```txt
Início > Produtos > Máquina de Boxe
```

---

## 10. Conteúdo e copywriting

### 10.1 Regras para títulos

Os títulos devem ser claros, curtos e orientados a valor.

Bons exemplos:

```txt
Experiências que conectam pessoas e fortalecem marcas.
Atrações que elevam o seu evento.
Entretenimento interativo para eventos corporativos.
Locação de games, brinquedos e experiências para eventos.
```

Evitar títulos genéricos como:

```txt
Produtos
Conheça nosso catálogo
Bem-vindo ao site
```

### 10.2 Descrições de produtos

Cada produto deve ter descrição útil para o usuário decidir chamar no WhatsApp.

A descrição deve explicar:

- o que é a atração;
- para quais eventos ela é indicada;
- que tipo de experiência gera;
- diferenciais operacionais;
- informações técnicas relevantes;
- CTA para falar com especialista.

Não deve conter:

- preço fixo obrigatório;
- promessa que a empresa não cumpre;
- texto copiado de outro produto sem adaptação;
- HTML inseguro;
- scripts;
- iframes arbitrários.

### 10.3 Linguagem dos CTAs

CTAs recomendados:

```txt
Solicitar proposta
Falar com especialista
Ver produtos
Ver atrações
Enviar lista no WhatsApp
Quero esta atração
```

CTAs a evitar:

```txt
Comprar agora
Finalizar compra
Adicionar ao carrinho
Pagar agora
Checkout
```

Observação: internamente pode existir uma lista de produtos selecionados, mas a linguagem pública deve evitar parecer e-commerce.

---

## 11. Imagens e SEO visual

### 11.1 Alt text

Toda imagem relevante deve ter `alt` adequado.

Exemplos:

```txt
Máquina de boxe personalizada da AlugaGames para evento corporativo.
Simulador de corrida montado em evento empresarial.
Arcades retrô disponíveis para locação em festas e eventos.
```

Imagens decorativas podem usar alt vazio quando apropriado.

### 11.2 Nome de arquivo

O nome público ou metadado da imagem deve ser amigável sempre que possível.

Exemplo:

```txt
maquina-de-boxe-evento-corporativo.webp
simulador-de-corrida-alugagames.webp
```

Nunca confiar no nome enviado pelo usuário para salvar o arquivo final.

### 11.3 Tamanho e formato

Regra recomendada:

- usar `webp` quando possível;
- comprimir imagens antes de servir;
- evitar imagens gigantes na LP;
- usar dimensões corretas para cards, banners e galerias;
- não carregar todas as imagens de todas as galerias de uma vez.

---

## 12. Performance

### 12.1 Objetivos gerais

O site deve buscar bons resultados em:

- carregamento inicial;
- navegação mobile;
- estabilidade visual;
- interação rápida;
- imagens otimizadas;
- bundle JavaScript reduzido.

Metas recomendadas:

```txt
LCP: abaixo de 2.5s quando possível
CLS: abaixo de 0.1
INP: abaixo de 200ms quando possível
```

Essas metas devem orientar decisões, mas a validação real depende do ambiente de produção, imagens finais e dados reais.

### 12.2 Server Components por padrão

Em Next.js App Router, componentes devem ser Server Components por padrão.

Usar Client Components somente quando necessário, por exemplo:

- filtros interativos;
- drawer da lista de produtos;
- acordeão de FAQ;
- carrossel/galeria interativa;
- formulários do admin;
- upload de imagens.

Não colocar `use client` em páginas inteiras sem necessidade.

### 12.3 JavaScript mínimo no site público

A LP deve ter pouco JavaScript.

Evitar:

- bibliotecas pesadas de animação sem necessidade;
- carrossel pesado para tudo;
- componentes client-side em todas as seções;
- re-renderizações desnecessárias;
- filtros que carregam todos os dados gigantes no client se o catálogo crescer.

### 12.4 Imagem principal do hero

A imagem principal do hero é crítica para performance.

Regras:

- deve ter dimensão definida;
- deve ser otimizada;
- deve ser priorizada apenas se estiver acima da dobra;
- não deve ser maior que o necessário;
- não deve causar layout shift;
- não deve usar imagem remota sem configuração adequada.

### 12.5 Cards de produtos

Cards de produtos devem carregar imagens otimizadas e em tamanho adequado.

Não carregar galeria completa de cada produto na listagem.

Na listagem, usar apenas:

- imagem de capa;
- nome;
- descrição curta;
- categoria/tags principais;
- status;
- CTA.

### 12.6 Página de produtos

A página `/produtos` deve ser rápida mesmo com muitos produtos.

Regras:

- filtros devem ser simples;
- considerar paginação, busca server-side ou carregamento incremental se o número de produtos crescer;
- usar índices no banco para campos filtráveis;
- não renderizar imagens desnecessárias;
- não carregar vídeos na listagem.

### 12.7 Vídeos

Produto pode ter vídeo por URL externa.

Regras:

- não auto-carregar vídeo pesado na listagem;
- não autoplay com som;
- usar thumbnail/capa;
- carregar embed somente quando necessário;
- validar URLs permitidas quando possível.

---

## 13. Cache e revalidação

### 13.1 Site público

O site público pode usar cache para melhorar performance.

Ao alterar dados no admin, as rotas públicas impactadas devem ser revalidadas.

Exemplos:

- produto alterado: revalidar `/produtos` e `/produtos/[slug]`;
- produto destacado alterado: revalidar `/`;
- FAQ alterada: revalidar `/`;
- logo alterado: revalidar `/`;
- álbum alterado: revalidar `/fotografia` e `/fotografia/[slug]`.

### 13.2 Admin

O admin deve priorizar dados atualizados, não cache agressivo.

---

## 14. Acessibilidade

### 14.1 Objetivo

O site deve buscar conformidade prática com WCAG AA.

Isso significa que o site deve ser usável por:

- teclado;
- leitores de tela;
- pessoas com baixa visão;
- usuários em mobile;
- usuários com dificuldades motoras;
- usuários sensíveis a movimento.

### 14.2 HTML semântico

Usar tags semânticas:

```txt
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Cada página deve ter apenas um `h1` principal.

Hierarquia de títulos deve ser coerente:

```txt
h1 -> h2 -> h3
```

Não usar `div` clicável quando deve ser `button` ou `a`.

### 14.3 Navegação por teclado

Todos os elementos interativos devem funcionar com teclado:

- links;
- botões;
- menus;
- filtros;
- acordeões;
- drawer da lista de produtos;
- modais;
- formulários;
- upload no admin.

Deve existir foco visível.

Não remover outline sem substituto visual acessível.

### 14.4 Contraste

O design usa verde AlugaGames como cor de ação. Todo texto verde deve ter contraste suficiente contra fundo branco/off-white.

Botões, links e textos pequenos não devem depender apenas de cor para transmitir estado.

Estados obrigatórios:

- hover;
- focus;
- active;
- disabled;
- loading;
- error;
- success.

### 14.5 Acordeão de FAQ

FAQ deve:

- usar botão para abrir/fechar;
- expor estado expandido;
- ser navegável por teclado;
- não esconder conteúdo de forma inacessível;
- manter boa leitura mobile.

### 14.6 Drawer da lista de produtos

O drawer da lista deve:

- abrir e fechar com teclado;
- fechar com `Esc`;
- prender foco enquanto estiver aberto;
- devolver foco para o botão que abriu;
- ter título acessível;
- não bloquear leitor de tela incorretamente;
- permitir remover item e alterar quantidade.

### 14.7 Carrossel/galeria

Se houver carrossel:

- não deve depender apenas de autoplay;
- deve ter controles manuais;
- deve permitir pausa se houver movimento automático;
- deve ter labels acessíveis;
- não deve causar layout shift;
- não deve atrapalhar leitura da página.

Se o prazo estiver apertado, preferir grid/galeria estática ao invés de carrossel complexo.

### 14.8 Formulários do admin

Todo campo deve ter:

- label visível ou acessível;
- mensagem de erro clara;
- validação no servidor;
- indicação de obrigatório quando necessário;
- feedback de sucesso/erro.

Não usar placeholder como único label.

### 14.9 Imagens

Imagens informativas devem ter alt text.

Imagens decorativas devem ter alt vazio.

Logos de clientes devem ter alt com nome da marca.

Fotos de eventos devem ter alt descritivo quando possível.

### 14.10 Movimento e animações

Animações devem ser sutis.

Respeitar `prefers-reduced-motion` quando houver animações relevantes.

Não usar animações que atrapalham leitura, performance ou acessibilidade.

---

## 15. Responsividade

### 15.1 Mobile-first

A implementação deve considerar mobile desde o início.

O público pode acessar pelo celular após indicação, anúncio, Instagram ou busca no Google.

### 15.2 Breakpoints conceituais

O layout deve funcionar bem em:

- celulares pequenos;
- celulares grandes;
- tablets;
- notebooks;
- telas desktop grandes.

### 15.3 Header mobile

O header mobile deve ser simples:

- logo;
- botão de menu;
- CTA para WhatsApp ou proposta;
- acesso à lista de produtos selecionados, se existir.

Não sobrecarregar o header mobile.

### 15.4 Hero mobile

No mobile, o hero deve priorizar:

- título forte;
- texto curto;
- CTA principal;
- imagem otimizada;
- prova de confiança sem poluir.

A imagem grande do produto não pode empurrar o CTA para muito longe sem necessidade.

### 15.5 Cards mobile

Cards devem ter:

- imagem clara;
- nome legível;
- descrição curta;
- CTA fácil de tocar;
- espaçamento confortável.

---

## 16. Tracking de WhatsApp

### 16.1 Objetivo

O sistema pode registrar cliques em WhatsApp para o dono ter visão simples de interesse.

Eventos possíveis:

```txt
whatsapp_home_cta
whatsapp_product_direct
whatsapp_selected_list
whatsapp_photography
whatsapp_work_with_us
whatsapp_representative
```

### 16.2 Dados permitidos

Registrar apenas dados simples:

- tipo do evento;
- produto relacionado, se houver;
- quantidade de produtos na lista, se houver;
- origem da página;
- data/hora;
- user agent anonimizado ou limitado, se necessário;
- referrer, se necessário.

### 16.3 Dados proibidos

Não registrar:

- conversa do WhatsApp;
- telefone do visitante;
- nome do visitante;
- dados pessoais sem consentimento;
- conteúdo sensível;
- informações do admin.

### 16.4 Segurança

Tracking não pode quebrar a abertura do WhatsApp.

Se o tracking falhar, o botão deve continuar abrindo o WhatsApp.

---

## 17. Performance no admin

O admin não precisa ter a mesma otimização SEO do site público, mas deve ser rápido e confiável.

Regras:

- tabelas devem ter paginação ou limite;
- uploads devem mostrar progresso/estado;
- ações devem ter loading;
- erros devem ser claros;
- imagens devem ter preview otimizado;
- filtros devem evitar travar a tela;
- não carregar todas as imagens de todos os produtos ao mesmo tempo.

---

## 18. Segurança relacionada a SEO e conteúdo

### 18.1 Conteúdo editável

Todo conteúdo editável pelo admin deve ser tratado como não confiável até ser validado.

Mesmo que só exista um dono, a IA não pode assumir que o conteúdo é sempre seguro.

Validar e sanitizar:

- título;
- descrição;
- SEO title;
- SEO description;
- FAQ;
- depoimentos;
- links externos;
- URLs de vídeo;
- alt text;
- campos de LP.

### 18.2 HTML livre

Não permitir HTML livre no admin, salvo se houver sanitização explícita e bem justificada.

Preferir campos estruturados:

```txt
Título
Subtítulo
Descrição
Imagem
Botão
URL
```

### 18.3 Links externos

Links externos devem ser validados.

Para vídeos, permitir apenas domínios aprovados quando possível:

```txt
youtube.com
youtu.be
vimeo.com
```

---

## 19. Checklist obrigatório para páginas públicas

Toda página pública deve cumprir:

- tem `title` adequado;
- tem `description` adequada;
- tem `h1` único;
- usa hierarquia correta de headings;
- tem CTA claro para WhatsApp;
- não parece checkout/e-commerce;
- imagens têm alt adequado;
- imagens têm dimensão definida;
- funciona no mobile;
- funciona com teclado;
- não tem texto importante apenas dentro de imagem;
- não expõe dados administrativos;
- não carrega JS excessivo;
- não causa layout shift visível;
- não usa conteúdo mockado permanente;
- trata estado vazio quando necessário.

---

## 20. Checklist obrigatório para página de produto

Cada página `/produtos/[slug]` deve ter:

- nome do produto;
- slug único;
- descrição útil;
- galeria de imagens;
- vídeo opcional;
- categorias;
- tags;
- indicações de evento;
- informações técnicas opcionais;
- produtos relacionados, se disponíveis;
- CTA direto para WhatsApp;
- botão para adicionar à lista de produtos selecionados;
- metadata SEO;
- Open Graph com imagem principal;
- fallback para produto indisponível;
- 404 para produto inexistente/desativado.

---

## 21. Checklist obrigatório para `/produtos`

A página `/produtos` deve ter:

- busca por nome;
- filtro por categoria;
- filtro por tags;
- filtro por indicação de evento;
- filtro por status;
- filtro por destaque;
- filtro por tipo de público;
- grid responsivo;
- estado vazio;
- loading adequado;
- CTA por produto;
- acesso à lista de produtos selecionados;
- nenhum preço público obrigatório;
- nenhum checkout.

---

## 22. Checklist obrigatório para fotografia

A página `/fotografia` deve ter:

- álbuns cadastrados pelo admin;
- filtros por tipo de evento;
- nome do evento;
- tipo de evento;
- data opcional;
- cidade opcional;
- imagens otimizadas;
- abertura de álbum;
- CTA discreto para WhatsApp ou volta para produtos, se fizer sentido;
- sem formulário complexo.

---

## 23. Checklist de performance antes do deploy

Antes de publicar, a IA deve verificar:

- build passa;
- lint passa;
- páginas públicas carregam sem erro;
- imagens do hero não estão gigantes;
- listagem de produtos não carrega galerias completas;
- admin não carrega todos os arquivos do storage desnecessariamente;
- vídeos externos não são carregados automaticamente em massa;
- não há `use client` desnecessário em páginas inteiras;
- não há dependência pesada sem justificativa;
- não há mock permanente em produção;
- rotas admin não são indexáveis.

---

## 24. Checklist de acessibilidade antes do deploy

Antes de publicar, a IA deve verificar:

- navegação por teclado;
- foco visível;
- labels em formulários;
- contraste dos botões verdes;
- alt text em imagens;
- accordion acessível;
- drawer acessível;
- menu mobile acessível;
- mensagens de erro claras;
- nenhum botão depende só de ícone sem label;
- links têm texto descritivo;
- não existe autoplay agressivo.

---

## 25. Prompts para IA

### 25.1 Prompt para implementar página pública

```txt
Leia os documentos de produto, design system, site público, segurança e SEO/performance/acessibilidade.

Implemente a página indicada seguindo estas regras:
- SEO metadata adequado.
- HTML semântico.
- H1 único.
- Imagens otimizadas e com alt.
- Mobile-first.
- CTA para WhatsApp.
- Não criar checkout, pagamento, favoritos ou área de cliente.
- Não usar preço público obrigatório.
- Não adicionar use client sem necessidade.
- Tratar estados vazios e erros.
- Validar dados vindos do banco.

Depois, liste arquivos alterados, decisões tomadas, riscos e como testar manualmente.
```

### 25.2 Prompt para revisar SEO/performance/acessibilidade

```txt
Revise a implementação com foco em SEO, performance e acessibilidade.

Verifique:
- metadata;
- headings;
- indexação;
- imagens;
- alt text;
- Core Web Vitals conceituais;
- excesso de JavaScript;
- uso desnecessário de use client;
- navegação por teclado;
- foco visível;
- contraste;
- responsividade;
- CTA para WhatsApp;
- ausência de checkout/e-commerce indevido;
- rotas admin com noindex.

Não implemente novas features. Apenas aponte problemas e corrija se for seguro e pequeno.
```

### 25.3 Prompt para revisar página de produto

```txt
Revise a página de produto.

Confirme que ela tem:
- nome claro;
- descrição útil;
- categorias e tags;
- indicações de evento;
- informações técnicas opcionais;
- galeria otimizada;
- vídeo opcional sem carregamento pesado;
- CTA direto para WhatsApp;
- botão de adicionar à lista de produtos selecionados;
- SEO title e description;
- Open Graph;
- acessibilidade;
- responsividade;
- nenhum checkout ou pagamento.
```

---

## 26. Critérios de aceite gerais

Este documento será considerado cumprido quando:

- o site público tiver metadata adequada;
- páginas importantes forem indexáveis;
- admin não for indexável;
- imagens forem otimizadas;
- LP seguir visual premium e corporativo;
- páginas funcionarem bem no mobile;
- principais componentes forem acessíveis;
- WhatsApp for o principal fluxo de conversão;
- lista de produtos não virar checkout;
- não houver linguagem de e-commerce tradicional;
- performance básica for respeitada;
- a IA conseguir revisar cada página usando os checklists deste documento.

---

## 27. Fora do escopo deste documento

Este documento não define:

- modelagem final do banco;
- implementação de autenticação;
- política completa de segurança;
- layout detalhado de cada componente;
- textos finais de marketing;
- identidade visual definitiva;
- estratégia de anúncios;
- integração com CRM;
- analytics avançado.

Esses temas pertencem a outros documentos do projeto.

---

## 28. Decisão final

O site AlugaGames deve ser otimizado para descoberta, confiança e conversão no WhatsApp.

A experiência deve parecer uma apresentação premium de soluções para eventos, não uma loja virtual.

SEO, performance e acessibilidade não são polimentos finais. Eles devem ser considerados desde a primeira implementação de cada página.
