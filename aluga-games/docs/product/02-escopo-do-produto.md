# 02 - Escopo do Produto

## Projeto

Refatoração do site da **AlugaGames** para uma nova versão institucional, premium e gerenciável, com foco em apresentação de atrações para eventos e conversão para WhatsApp.

Este documento define o que entra e o que não entra no produto, para orientar planejamento, execução com IA, revisão de código e tomada de decisão durante o desenvolvimento.

A visão geral do produto está documentada em:

- `/docs/product/00-visao-do-produto.md`

---

## Princípio central do escopo

O sistema não será um e-commerce tradicional.

O produto será um **site institucional com catálogo de atrações, lista de produtos e portal administrativo**, onde o visitante encontra produtos, entende o valor da AlugaGames e chama a empresa no WhatsApp para solicitar proposta.

A experiência deve parecer consultiva, profissional e voltada para eventos, não uma loja comum.

---

## Objetivo da primeira versão

A primeira versão deve entregar um sistema completo o suficiente para o dono da AlugaGames conseguir:

1. Gerenciar os principais conteúdos do site sem depender de código.
2. Cadastrar, editar, desativar e organizar produtos.
3. Atualizar imagens, fotos, depoimentos, FAQs, logos e blocos principais da landing page.
4. Permitir que visitantes encontrem produtos com facilidade.
5. Permitir que visitantes selecionem produtos e enviem uma solicitação de orçamento pelo WhatsApp.
6. Manter uma aparência premium, profissional e confiável.

Mesmo não sendo tratado como MVP, o produto deve evitar complexidade desnecessária. A prioridade é entregar um sistema estável, claro, gerenciável e usável dentro do prazo disponível.

---

## Prioridades do produto

A ordem de prioridade será:

1. **Conversão para WhatsApp**.
2. **Facilidade de gestão pelo dono**.
3. **Visual profissional e premium**.
4. **SEO básico bem estruturado**.
5. **Código limpo, seguro e sustentável**.

Sempre que houver conflito entre escopo e prazo, essas prioridades devem guiar a decisão.

---

## Áreas do produto

O sistema será dividido em quatro grandes áreas:

1. **Site público**
   - Landing page.
   - Página de produtos.
   - Página individual de produto.
   - Página de fotografia.
   - Páginas institucionais.
   - CTAs para WhatsApp.

2. **Lista de produtos**
   - Seleção de produtos pelo visitante.
   - Envio da lista para WhatsApp.
   - Sem checkout, pagamento ou login de cliente.

3. **Portal administrativo**
   - Login do dono.
   - Gestão de produtos, categorias, tags, imagens, conteúdos da LP e configurações.

4. **Configurações gerais**
   - WhatsApp principal.
   - Redes sociais.
   - Dados de contato.
   - Conteúdos institucionais básicos.
   - Campos SEO principais.

---

# Escopo do site público

## 1. Landing page

A landing page será a principal entrada do site e deve comunicar de forma rápida:

- O que a AlugaGames oferece.
- Que a empresa trabalha com locação de brinquedos, games e atrações para eventos.
- Que a solução é profissional, segura e adequada para eventos corporativos.
- Que o próximo passo é solicitar uma proposta pelo WhatsApp.

### Seções previstas

A estrutura visual final será definida em documento específico de UI, mas o escopo funcional da landing page inclui:

1. **Hero principal**
   - Chamada principal.
   - Subtítulo.
   - Imagem ou galeria/carrossel de destaque.
   - CTA principal para WhatsApp.
   - CTA secundário, se necessário.

2. **Prova social**
   - Logos de empresas/clientes que confiam na AlugaGames.

3. **Por que empresas escolhem a AlugaGames**
   - Blocos de diferenciais.
   - Exemplo: segurança, suporte, estrutura profissional, variedade de atrações.

4. **Atrações/produtos em destaque**
   - Produtos escolhidos manualmente pelo admin.
   - Cards com imagem, nome, descrição curta e link para detalhes.

5. **Blocos de soluções ou tipos de produtos**
   - Blocos editoriais para destacar temas como:
     - Decoração para festa e aniversário.
     - Realidade virtual.
     - Infláveis.
     - Games.
     - Eventos corporativos.
     - Experiências interativas.
   - Esses blocos não criam páginas públicas separadas obrigatórias. Eles servem como atalhos visuais, destaques editoriais ou links para filtros na página de produtos.

6. **Como funciona**
   - Passo a passo simples do processo comercial.
   - Exemplo:
     1. Briefing.
     2. Proposta personalizada.
     3. Entrega e montagem.
     4. Operação e suporte.
     5. Resultado para o evento.

7. **Depoimentos**
   - Depoimentos editáveis pelo admin.

8. **Dúvidas frequentes**
   - Perguntas e respostas editáveis pelo admin.

9. **CTA final**
   - Chamada para solicitar proposta.
   - Botão para WhatsApp.

10. **Rodapé**
   - Navegação principal.
   - Dados de contato.
   - Redes sociais.
   - Link “Trabalhe Conosco” para WhatsApp.

### Conteúdos editáveis da landing page

O admin deve conseguir editar, no mínimo:

- Título e subtítulo do hero.
- Imagens principais do hero.
- Botões e mensagens de CTA.
- Logos de clientes.
- Blocos de diferenciais.
- Produtos em destaque.
- Blocos de soluções/tipos de produto.
- Passos da seção “Como funciona”.
- Depoimentos.
- Perguntas frequentes.
- CTA final.
- Dados do rodapé quando forem globais.

### Limite do editor da landing page

A landing page não será um page builder totalmente livre.

A decisão de escopo é criar um **CMS modular controlado**, com blocos previamente definidos pelo design. O admin poderá editar textos, imagens, itens, status e destaques, mas não precisa conseguir montar qualquer layout do zero.

Essa decisão evita complexidade excessiva e mantém consistência visual.

---

## 2. Página de produtos

A página `/produtos` será a listagem única de todos os produtos da AlugaGames.

Não haverá páginas públicas separadas por tipo, como:

- `/inflaveis`
- `/maquinas`
- `/lista-de-jogos`
- `/realidade-virtual`

Tudo será tratado como produto dentro de uma listagem centralizada.

### Recursos obrigatórios

A página de produtos deve permitir:

- Listar todos os produtos ativos.
- Buscar produtos por nome.
- Filtrar por categoria.
- Filtrar por tags.
- Filtrar por tipo de evento ou público, quando esse dado existir como tag/categoria.
- Filtrar por disponibilidade.
- Filtrar produtos em destaque ou mais procurados, se aplicável.
- Acessar a página individual do produto.
- Adicionar produto à lista de produtos.

### Filtros fora do escopo inicial

Não serão prioridade nesta versão:

- Filtro por preço.
- Filtro por espaço necessário.
- Filtro por número de jogadores.

### Card de produto

Cada card deve exibir:

- Imagem principal.
- Nome do produto.
- Descrição curta.
- Categorias ou tags principais.
- Status de indisponível, quando aplicável.
- Botão para ver detalhes.
- Botão para adicionar à lista de produtos.

O card não deve exibir preço.

---

## 3. Página individual de produto

Cada produto terá uma página própria, por exemplo:

- `/produtos/maquina-de-boxe`
- `/produtos/simulador-de-corrida`
- `/produtos/air-hockey`

Essa página deve servir para conversão e SEO.

### Conteúdos obrigatórios

A página individual de produto deve conter:

- Nome do produto.
- Galeria de imagens.
- Vídeos, quando cadastrados.
- Descrição curta.
- Descrição completa.
- Categorias.
- Tags.
- Informações técnicas.
- Status de disponibilidade.
- Botão para adicionar à lista de produtos.
- Botão para solicitar proposta pelo WhatsApp.
- Produtos relacionados, se viável dentro do prazo.

### Informações técnicas

As informações técnicas devem ser flexíveis o suficiente para produtos diferentes.

Exemplos de informações possíveis:

- Idade recomendada.
- Tipo de evento indicado.
- Uso interno ou externo.
- Necessidade de energia.
- Se inclui monitor.
- Se inclui suporte técnico.
- Observações importantes.

Não é obrigatório criar campos rígidos para todos esses itens. Uma estrutura flexível de pares `título + valor` pode ser suficiente.

### Preço

Produtos não terão preço público.

O site não deve se comportar como loja com preço, parcela, PIX ou checkout.

### Disponibilidade

O admin poderá marcar um produto como indisponível.

Produtos indisponíveis podem continuar aparecendo no site, desde que o status esteja claro.

---

## 4. Lista de produtos

O sistema terá uma funcionalidade chamada **lista de produtos** ou **produtos selecionados**. Ela não será um carrinho de compra tradicional e não deve ser nomeada como carrinho em UI, código ou documentação de task.

O objetivo é permitir que o visitante selecione vários produtos e envie uma mensagem única para o WhatsApp.

### Recursos obrigatórios

A lista de produtos deve permitir:

- Adicionar produto.
- Remover produto.
- Ver quantidade de produtos selecionados.
- Abrir uma visão resumida dos produtos selecionados.
- Enviar a lista para o WhatsApp.

### Mensagem para WhatsApp

A mensagem deve ser montada automaticamente com os produtos selecionados.

Exemplo:

> Olá, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para os seguintes produtos: Máquina de Boxe, Simulador de Corrida e Air Hockey.

### Limites da lista de produtos

A lista de produtos não terá:

- Cadastro de cliente.
- Login de cliente.
- Checkout.
- Pagamento online.
- Pedido salvo no banco.
- Controle de estoque.
- Cálculo de frete.
- Status de pedido.

A lista pode ser armazenada localmente no navegador do visitante, sem necessidade de persistência no banco.

---

## 5. WhatsApp e orçamento

Todo orçamento será direcionado para o WhatsApp.

### Recursos obrigatórios

O sistema deve ter:

- Um número principal de WhatsApp configurável pelo admin.
- Mensagens automáticas diferentes por contexto.
- Botões de CTA claros no site público.

### Contextos de mensagem

As mensagens devem variar conforme a origem:

- CTA geral da landing page.
- Produto específico.
- Lista de produtos.
- Página de fotografia.
- Link “Trabalhe Conosco”.

### Fora do escopo

Não haverá formulário obrigatório antes do WhatsApp.

Não haverá armazenamento de leads no banco nesta versão.

---

## 6. Página de fotografia

A página `/fotografia` será uma galeria de registros da AlugaGames.

Essa área existe para mostrar eventos, produtos montados, ativações e experiências reais. Ela não será vendida como serviço separado de fotografia.

### Recursos públicos

A página deve permitir:

- Visualizar fotos em uma galeria responsiva.
- Filtrar ou pesquisar fotos por evento, álbum ou tipo de ocasião.
- Abrir imagens em visualização ampliada, se viável.

### Recursos administrativos

O admin deve conseguir:

- Criar álbuns/eventos.
- Adicionar fotos aos álbuns.
- Remover fotos.
- Ativar/desativar fotos ou álbuns.
- Associar fotos a filtros.

Cada foto não precisa ter título ou descrição visível ao público. O foco visual será a própria imagem.

---

## 7. Página Representante AlugaGames

A página Representante AlugaGames será baseada na página existente atualmente, mas com novo design visual.

### Escopo

- Página pública institucional.
- Conteúdo baseado na estrutura atual.
- Visual alinhado à nova identidade do site.
- CTA para contato, se fizer sentido.

### Edição pelo admin

No MVP, essa página será estática e não terá edição pelo admin.

Regras:

- não criar CRUD/CMS para esta página no produto inicial;
- não criar editor visual ou campos administrativos específicos;
- qualquer edição futura exige nova task e atualização de ADR/escopo.

---

## 8. Página Por que Contratar

A página Por que Contratar será baseada na página atual, com design atualizado e comunicação mais profissional.

### Escopo

A página deve apresentar diferenciais como:

- Experiência em eventos.
- Variedade de atrações.
- Atendimento consultivo.
- Estrutura profissional.
- Segurança.
- Montagem.
- Suporte durante o evento.
- Soluções completas para empresas.

### Edição pelo admin

No MVP, essa página será estática e não terá edição pelo admin.

Regras:

- não criar CRUD/CMS para esta página no produto inicial;
- não criar editor visual ou campos administrativos específicos;
- qualquer edição futura exige nova task e atualização de ADR/escopo.

---

## 9. Trabalhe Conosco

Não haverá página completa de Trabalhe Conosco.

O rodapé terá um link “Trabalhe Conosco” que direciona para o WhatsApp com mensagem estática.

### Fora do escopo

Não haverá:

- Formulário de candidatura.
- Upload de currículo.
- Banco de currículos.
- Painel de vagas.
- Sistema de RH.

---

## 10. Rodapé

O rodapé deve conter:

- Logo da AlugaGames.
- Breve texto institucional.
- Links de navegação.
- Dados de contato.
- Redes sociais.
- Link “Trabalhe Conosco” para WhatsApp.
- Direitos autorais.

Os dados principais do rodapé devem vir das configurações do admin sempre que possível.

---

# Escopo do portal administrativo

## 1. Autenticação

O portal administrativo será usado apenas pelo dono da AlugaGames.

### Escopo

- Login de administrador.
- Logout.
- Proteção das rotas `/admin`.
- Apenas um usuário administrativo.

### Fora do escopo

Não haverá:

- Cadastro público de usuários.
- Login de cliente.
- Múltiplos papéis.
- Permissões avançadas.
- Convite de usuários.

---

## 2. Dashboard

O admin deve ter uma visão inicial simples do sistema.

### Indicadores previstos

- Total de produtos cadastrados.
- Total de produtos ativos.
- Total de produtos indisponíveis.
- Total de categorias.
- Total de tags.
- Total de fotos na galeria.
- Total de depoimentos.
- Total de FAQs.

### Fora do escopo

Não haverá analytics avançado nesta versão.

---

## 3. Gestão de produtos

O admin deve conseguir gerenciar produtos de forma completa.

### Recursos obrigatórios

- Criar produto.
- Editar produto.
- Desativar produto.
- Marcar produto como indisponível.
- Excluir produto, com confirmação.
- Definir produto como destaque.
- Associar categorias.
- Associar tags.
- Adicionar descrição curta.
- Adicionar descrição completa.
- Adicionar informações técnicas.
- Adicionar múltiplas imagens.
- Adicionar vídeos, preferencialmente por URL.
- Editar slug.
- Editar título SEO.
- Editar descrição SEO.

### Ordenação pública

A listagem geral de produtos será alfabética.

Produtos destacados da landing page serão escolhidos manualmente.

---

## 4. Gestão de categorias

Categorias servem para organizar produtos e alimentar filtros.

### Recursos obrigatórios

- Criar categoria.
- Editar categoria.
- Desativar categoria.
- Excluir categoria quando não houver dependências impeditivas.
- Associar produtos a uma ou mais categorias.

Um produto pode pertencer a mais de uma categoria.

---

## 5. Gestão de tags

Tags servem para melhorar busca, filtros e organização dos produtos.

### Recursos obrigatórios

- Criar tag.
- Editar tag.
- Excluir tag.
- Associar tags a produtos.

Exemplos de tags:

- Evento corporativo.
- Festa infantil.
- Escola.
- Condomínio.
- Realidade virtual.
- Inflável.
- Mais procurado.
- Experiência interativa.

---

## 6. Gestão da landing page

O admin deve conseguir editar os principais conteúdos da landing page.

### Blocos gerenciáveis

- Hero.
- Imagens/carrossel principal.
- Logos de clientes.
- Diferenciais.
- Produtos destacados.
- Blocos de soluções/tipos de produto.
- Passos de “Como funciona”.
- Depoimentos.
- FAQs.
- CTA final.

### Comportamento esperado

Cada bloco deve permitir, quando fizer sentido:

- Editar texto.
- Editar imagem.
- Ativar/desativar item.
- Escolher produtos relacionados.
- Editar link ou destino do CTA.

Não é obrigatório permitir que o admin crie layouts completamente novos.

---

## 7. Gestão da página de fotografia

O admin deve conseguir gerenciar a galeria de fotografia.

### Recursos obrigatórios

- Criar álbum/evento.
- Editar álbum/evento.
- Excluir álbum/evento.
- Adicionar fotos.
- Remover fotos.
- Ativar/desativar álbum.
- Filtrar fotos por álbum no site público.

---

## 8. Gestão de depoimentos

Depoimentos devem ser editáveis pelo admin.

### Campos sugeridos

- Nome do cliente ou empresa.
- Cargo/setor, se houver.
- Texto do depoimento.
- Imagem opcional.
- Status ativo/inativo.

---

## 9. Gestão de FAQs

Perguntas frequentes devem ser editáveis pelo admin.

### Campos sugeridos

- Pergunta.
- Resposta.
- Status ativo/inativo.

---

## 10. Gestão de logos de clientes

O admin deve conseguir gerenciar logos exibidos na landing page.

### Recursos obrigatórios

- Adicionar logo.
- Remover logo.
- Ativar/desativar logo.
- Informar nome da empresa.

---

## 11. Configurações gerais

O admin deve conseguir editar configurações globais do site.

### Campos previstos

- Número principal de WhatsApp.
- Mensagem padrão de WhatsApp.
- E-mail de contato.
- Telefone, se houver.
- Endereço ou região principal.
- Instagram.
- LinkedIn, se houver.
- Outros links sociais.
- Título SEO padrão.
- Descrição SEO padrão.

---

# Escopo de SEO

## Páginas indexáveis

Devem ser indexáveis:

- Landing page.
- Página de produtos.
- Páginas individuais de produto.
- Página de fotografia.
- Página Representante AlugaGames.
- Página Por que Contratar.

## Páginas não indexáveis

Não devem ser indexáveis:

- Login admin.
- Qualquer rota interna do admin.

## Campos SEO editáveis

O admin deve conseguir editar SEO de produtos:

- Slug.
- Título SEO.
- Descrição SEO.

Sempre que possível, também deve conseguir editar SEO da landing page e páginas institucionais.

## Recursos desejáveis

- Metadados por página.
- Open Graph básico.
- Sitemap.
- Robots.txt.

---

# Escopo de mídia e uploads

## Imagens

O sistema deve permitir upload de imagens para:

- Produtos.
- Galeria de fotografia.
- Landing page.
- Logos de clientes.
- Depoimentos, se necessário.
- Páginas institucionais, se forem editáveis.

## Vídeos

Para reduzir complexidade, vídeos podem ser cadastrados inicialmente como URL externa, por exemplo YouTube, Vimeo ou link direto aprovado.

Upload direto de vídeo pesado não é prioridade.

## Regras gerais

As regras detalhadas de segurança e armazenamento devem ser definidas em documento próprio, mas o escopo assume que:

- Apenas admin autenticado pode subir imagens.
- O sistema deve validar tipo e tamanho de arquivo.
- Imagens devem ser exibidas de forma otimizada no site público.

---

# Fora do escopo do produto

O sistema não terá:

- E-commerce tradicional.
- Checkout.
- Pagamento online.
- PIX no site.
- Parcelamento no site.
- Carrinho de compra com fechamento de pedido.
- Área de cliente.
- Login de cliente.
- Cadastro público.
- Lista de favoritos.
- Marketplace.
- Outros negócios além da AlugaGames.
- Agenda complexa de disponibilidade.
- Reserva automática por data.
- Cálculo de frete.
- Gestão de contratos.
- CRM completo.
- Integração com gateway de pagamento.
- Integração com ERP.
- Sistema de vagas ou RH.
- Upload de currículo.
- Blog, salvo decisão posterior.
- Multiusuário administrativo.
- Permissões avançadas.

A única funcionalidade de seleção múltipla será a **lista de produtos**, que apenas monta uma mensagem de WhatsApp com os produtos selecionados.

---

# Níveis de prioridade

## P0 - Obrigatório para considerar o produto entregável

- Landing page pública.
- Página de produtos com busca e filtros principais.
- Página individual de produto.
- Lista de produtos para WhatsApp.
- WhatsApp configurável.
- Portal admin protegido por login.
- CRUD de produtos.
- CRUD de categorias.
- CRUD de tags.
- Upload de imagens para produtos.
- Gestão de fotos da página de fotografia.
- Gestão de produtos em destaque.
- Gestão de depoimentos.
- Gestão de FAQs.
- Gestão de logos de clientes.
- Configurações gerais do site.
- Rodapé com Trabalhe Conosco para WhatsApp.
- Responsividade básica.
- Admin não acessível publicamente.

## P1 - Importante, mas pode ser simplificado se houver risco de prazo

- Edição completa de todos os blocos da landing page.
- Refinos de conteúdo nas páginas Representante AlugaGames e Por que Contratar por alteração de código/documentação.
- Produtos relacionados.
- Open Graph por produto.
- Sitemap e robots.txt.
- Visualização ampliada da galeria de fotografia.
- Vídeos em produtos por URL.
- Dashboard com estatísticas básicas.
- Estados refinados de loading, erro e vazio.

## P2 - Evoluções futuras

- Editor visual livre de páginas.
- Drag and drop avançado de seções.
- Analytics detalhado.
- Formulário de lead antes do WhatsApp.
- Armazenamento de solicitações de orçamento.
- CRM simples.
- Multiusuário no admin.
- Permissões por papel.
- Integração com agenda.
- Integração com pagamento.
- Blog.
- Área de cliente.

---

# Critérios de aceite do produto

O produto será considerado aceito quando:

1. O visitante conseguir entender a proposta da AlugaGames na landing page.
2. O visitante conseguir acessar `/produtos` e encontrar produtos com busca/filtros.
3. O visitante conseguir abrir uma página individual de produto.
4. O visitante conseguir adicionar produtos à lista de produtos.
5. O visitante conseguir enviar a lista de produtos para o WhatsApp.
6. O visitante conseguir enviar uma mensagem de WhatsApp a partir de um produto específico.
7. O admin conseguir fazer login.
8. O admin conseguir criar, editar, desativar e excluir produtos.
9. O admin conseguir associar produtos a categorias e tags.
10. O admin conseguir adicionar imagens a produtos.
11. O admin conseguir gerenciar fotos da página de fotografia.
12. O admin conseguir escolher produtos em destaque da landing page.
13. O admin conseguir editar depoimentos, FAQs e logos de clientes.
14. O admin conseguir alterar o número principal de WhatsApp.
15. O site funcionar bem em desktop e mobile.
16. O admin não ser acessível sem autenticação.
17. Nenhuma funcionalidade de checkout, pagamento ou login de cliente existir no site público.
18. As páginas indexáveis terem metadados básicos.
19. O código seguir a arquitetura definida nos documentos técnicos.
20. O escopo implementado estar alinhado a este documento.

---

# Riscos de escopo

## 1. CMS avançado demais

O maior risco é tentar criar um editor visual livre para a landing page.

Mitigação:

- Usar blocos fixos e editáveis.
- Não permitir criação livre de layouts no primeiro ciclo.
- Priorizar campos objetivos e fáceis de testar.

## 2. Upload de mídia

Upload de imagens pode gerar risco de segurança e atrasos técnicos.

Mitigação:

- Começar com tipos de arquivo limitados.
- Validar tamanho e formato.
- Usar uma estratégia simples e segura de armazenamento.
- Tratar upload de vídeo como URL externa inicialmente.

## 3. Carrinho virar e-commerce

A lista de produtos pode ser confundida com carrinho de compra se a linguagem ou a UI forem mal escolhidas.

Mitigação:

- Não ter preço.
- Não ter checkout.
- Não ter pagamento.
- Não salvar pedido.
- Nomear publicamente como “lista de produtos” quando for melhor para evitar confusão.

## 4. Páginas institucionais editáveis

Tornar páginas institucionais editáveis fica fora do MVP.

Mitigação:

- Manter Representante e Por que Contratar estáticas na primeira versão.
- Exigir nova task/ADR para qualquer CMS institucional futuro.
- Se necessário, entregar páginas com conteúdo estático e registrar pendência.

---

# Ordem recomendada de desenvolvimento

Para desenvolvimento ágil com IA, a ordem recomendada é:

1. Definir arquitetura, banco e entidades principais.
2. Criar autenticação do admin.
3. Criar CRUD de produtos, categorias e tags.
4. Criar upload de imagens para produtos.
5. Criar página pública de produtos.
6. Criar página individual de produto.
7. Criar lista de produtos para WhatsApp.
8. Criar gestão de landing page.
9. Criar landing page pública consumindo dados reais.
10. Criar página de fotografia e gestão de álbuns/fotos.
11. Criar páginas institucionais.
12. Criar configurações gerais.
13. Criar dashboard administrativo.
14. Revisar responsividade, SEO, segurança e performance.

---

# Decisões que devem ser respeitadas

- O site será voltado principalmente para empresas planejando eventos.
- O visual deve ser premium, profissional e confiável.
- O orçamento sempre irá para WhatsApp.
- Não haverá checkout ou pagamento.
- Produtos não terão preço público.
- Produtos serão centralizados em uma única página `/produtos`.
- Categorias e tags serão usadas como filtros, não como páginas públicas separadas obrigatórias.
- O admin será usado por apenas um dono.
- A landing page será editável por blocos controlados.
- A página de fotografia será uma galeria de registros da AlugaGames.
- Trabalhe Conosco será apenas um link de WhatsApp no rodapé.

---

# Decisões pendentes para documentos posteriores

Estas decisões não bloqueiam este documento, mas devem ser detalhadas nos próximos arquivos:

- Layout final da landing page.
- Nome final dos itens de navegação.
- Modelo exato dos blocos editáveis da landing page.
- Estratégia de armazenamento de imagens.
- Limites de tamanho e formato de upload.
- Modelo de banco de dados.
- Arquitetura de pastas.
- Design system.
- Regras de segurança do admin.
- Mensagens finais de WhatsApp por contexto.
- Conteúdo final das páginas Representante AlugaGames e Por que Contratar.
