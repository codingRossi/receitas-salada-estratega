# 04 - User Stories

## 1. Objetivo do documento

Este documento descreve os fluxos, histórias de usuário e critérios de aceite do novo site da AlugaGames.

O objetivo é transformar a visão do produto e as regras de negócio em comportamentos claros para orientar o desenvolvimento com IA, mantendo o escopo controlado, código limpo e entregas pequenas.

Este documento deve ser lido antes da criação das tasks técnicas e antes da implementação das telas públicas, do portal administrativo e dos fluxos de WhatsApp.

---

## 2. Premissas principais

- O site será institucional, premium e profissional.
- O objetivo principal é levar o visitante a conversar com a AlugaGames pelo WhatsApp.
- O fluxo mais valorizado é: visitante encontra um produto, acessa sua página e chama no WhatsApp.
- Também existirá uma lista simples de produtos para WhatsApp, permitindo que o visitante envie vários produtos em uma única mensagem.
- A lista não representa compra, reserva, pedido fechado, checkout ou orçamento formal dentro do sistema.
- Não haverá carrinho de compra tradicional.
- Não haverá checkout.
- Não haverá pagamento online.
- Não haverá login de cliente.
- Não haverá área do cliente.
- O portal administrativo será usado apenas pelo dono do sistema.
- O dono deve conseguir manipular o conteúdo principal do site pelo painel.

---

## 3. Atores do sistema

## 3.1 Visitante

Pessoa que acessa o site público da AlugaGames para conhecer a empresa, ver produtos, ver fotos de eventos e entrar em contato pelo WhatsApp.

Pode ser:

- Responsável por evento corporativo.
- Empresa planejando uma ação ou evento.
- Pessoa buscando atrações para festa, aniversário ou confraternização.
- Pessoa buscando ideias para montar uma experiência de entretenimento.

## 3.2 Dono/Admin

Pessoa responsável por gerenciar o conteúdo do site.

No produto inicial, existe apenas um usuário administrativo. Não há múltiplos usuários, permissões avançadas ou papéis diferentes.

O dono/admin pode:

- Fazer login no painel.
- Gerenciar produtos.
- Gerenciar categorias.
- Gerenciar tags.
- Gerenciar imagens e vídeos dos produtos.
- Gerenciar a landing page.
- Gerenciar álbuns da página de fotografia.
- Gerenciar depoimentos.
- Gerenciar FAQ.
- Gerenciar logos/clientes.
- Configurar WhatsApp e dados do site.
- Visualizar estatísticas simples.

---

## 4. Jornada principal do visitante

## 4.1 Jornada valorizada

A jornada mais importante do site é:

1. Visitante acessa a landing page.
2. Visitante entende rapidamente o que a AlugaGames oferece.
3. Visitante acessa a página de produtos.
4. Visitante filtra ou pesquisa produtos.
5. Visitante abre a página de um produto.
6. Visitante vê imagens, vídeo, descrição e informações técnicas.
7. Visitante clica em WhatsApp com uma mensagem automática sobre aquele produto.

## 4.2 Jornada alternativa com lista

A jornada secundária é:

1. Visitante acessa a página de produtos.
2. Visitante adiciona produtos a uma lista.
3. Visitante altera quantidades quando necessário.
4. Visitante remove produtos se desejar.
5. Visitante envia a lista pelo WhatsApp.
6. O WhatsApp abre com uma mensagem pronta listando os produtos selecionados.

## 4.3 Jornada de prova social

Outra jornada importante é:

1. Visitante acessa a landing page.
2. Visitante vê logos, depoimentos e fotos de eventos.
3. Visitante acessa a página de fotografia.
4. Visitante filtra álbuns por tipo de evento.
5. Visitante ganha confiança na empresa.
6. Visitante chama no WhatsApp.

---

## 5. Nomenclatura da lista de produtos

A funcionalidade de selecionar vários produtos não deve ser tratada como carrinho de compra no comportamento do sistema.

Nomes recomendados na interface:

- Lista
- Minha lista
- Lista para WhatsApp
- Produtos selecionados

Evitar nomes que indiquem compra formal:

- Carrinho
- Checkout
- Pedido
- Finalizar compra
- Pagar

A lista existe apenas para facilitar o envio de vários produtos em uma mensagem de WhatsApp.

---

# 6. User Stories - Site Público

## US-PUB-001 - Visualizar landing page

**Como** visitante,  
**quero** acessar uma landing page profissional da AlugaGames,  
**para** entender rapidamente que a empresa oferece locação de brinquedos, games e atrações para eventos.

**Prioridade:** P0

**Critérios de aceite:**

- A landing page deve comunicar claramente a proposta: “Locação de brinquedos, games e atrações para eventos”.
- A página deve ter visual premium/profissional.
- A página deve ter CTA para WhatsApp.
- A página deve ter acesso para produtos.
- A página deve ter acesso para fotografia, representante e por que contratar.
- A página deve funcionar corretamente no desktop e mobile.

---

## US-PUB-002 - Ver produtos em destaque na landing page

**Como** visitante,  
**quero** ver produtos ou atrações em destaque na landing page,  
**para** conhecer rapidamente algumas opções oferecidas pela AlugaGames.

**Prioridade:** P0

**Critérios de aceite:**

- A landing page deve exibir produtos definidos como destaque pelo admin.
- Cada produto destacado deve exibir imagem, nome e CTA.
- Ao clicar no produto, o visitante deve ser levado para a página individual do produto.
- Produtos inativos não devem aparecer.
- Produtos indisponíveis podem aparecer apenas se o admin permitir ou se a regra de exibição permitir status indisponível.

---

## US-PUB-003 - Acessar página única de produtos

**Como** visitante,  
**quero** acessar uma página única com todos os produtos,  
**para** encontrar atrações sem precisar navegar por várias páginas separadas.

**Prioridade:** P0

**Critérios de aceite:**

- Deve existir uma página `/produtos`.
- Todos os produtos ativos devem aparecer nessa página.
- Não devem existir páginas separadas por tipo como estrutura principal de navegação.
- Produtos devem poder ser filtrados e pesquisados.
- A página deve ser responsiva.

---

## US-PUB-004 - Pesquisar produtos por nome

**Como** visitante,  
**quero** pesquisar produtos pelo nome,  
**para** encontrar rapidamente uma atração específica.

**Prioridade:** P0

**Critérios de aceite:**

- Deve existir um campo de busca na página de produtos.
- A busca deve filtrar produtos por nome.
- A busca deve funcionar sem recarregar a página inteira, quando tecnicamente viável.
- Quando não houver resultado, a tela deve mostrar uma mensagem amigável.

---

## US-PUB-005 - Filtrar produtos

**Como** visitante,  
**quero** filtrar produtos por características relevantes,  
**para** encontrar opções adequadas ao meu evento.

**Prioridade:** P0

**Filtros previstos:**

- Categoria.
- Tags.
- Indicação de evento.
- Produto disponível/indisponível.
- Produto em destaque.
- Tipo de público: infantil, adulto, corporativo, escolar e condomínio.

**Critérios de aceite:**

- O visitante deve conseguir combinar filtros.
- A listagem deve atualizar conforme os filtros selecionados.
- Deve existir forma clara de limpar filtros.
- Filtros sem resultados devem apresentar uma mensagem amigável.
- Não haverá filtro por preço no produto inicial.
- Não haverá filtro por espaço necessário.
- Não haverá filtro por número de jogadores.

---

## US-PUB-006 - Visualizar card de produto

**Como** visitante,  
**quero** visualizar cards claros dos produtos,  
**para** comparar opções antes de acessar uma página individual.

**Prioridade:** P0

**Critérios de aceite:**

- Cada card deve exibir imagem principal.
- Cada card deve exibir nome do produto.
- Cada card pode exibir descrição curta.
- Cada card deve ter CTA para ver detalhes.
- Cada card deve permitir adicionar o produto à lista, quando a lista estiver disponível.
- O card não deve exibir preço, pois o site não trabalhará com preço fixo público.

---

## US-PUB-007 - Acessar página individual de produto

**Como** visitante,  
**quero** abrir a página individual de um produto,  
**para** ver informações completas antes de chamar a empresa no WhatsApp.

**Prioridade:** P0

**Critérios de aceite:**

- Cada produto ativo deve ter uma página própria.
- A página deve ter URL amigável baseada em slug.
- A página deve exibir galeria de imagens.
- A página deve exibir vídeo, quando cadastrado.
- A página deve exibir descrição completa.
- A página deve exibir categorias e tags.
- A página deve exibir indicação de tipos de evento.
- A página deve exibir informações técnicas opcionais.
- A página deve ter botão para WhatsApp com mensagem automática do produto.
- A página deve ter botão para adicionar o produto à lista.
- A página pode exibir produtos relacionados.

---

## US-PUB-008 - Ver informações técnicas do produto

**Como** visitante,  
**quero** ver informações técnicas do produto,  
**para** entender se ele faz sentido para o meu evento.

**Prioridade:** P1

**Informações possíveis:**

- Idade recomendada.
- Indicação de público.
- Tipo de evento recomendado.
- Ambiente interno/externo.
- Necessidade de energia.
- Se inclui monitor.
- Observações importantes.

**Critérios de aceite:**

- Informações técnicas devem ser opcionais.
- Campos vazios não devem aparecer na página pública.
- O admin deve conseguir editar essas informações.
- Não haverá campo obrigatório de espaço necessário.
- Não haverá campo obrigatório de número de jogadores.

---

## US-PUB-009 - Chamar no WhatsApp a partir de produto

**Como** visitante,  
**quero** clicar em um botão de WhatsApp na página do produto,  
**para** falar com a AlugaGames sobre aquela atração específica.

**Prioridade:** P0

**Critérios de aceite:**

- O botão deve abrir o WhatsApp com o número configurado no admin.
- A mensagem deve incluir o nome do produto.
- A mensagem deve indicar que o visitante veio pelo site.
- O fluxo deve funcionar no desktop e mobile.
- O clique deve ser registrado se a funcionalidade de métricas estiver ativa.

**Mensagem sugerida:**

```txt
Olá, vim pelo site da AlugaGames e tenho interesse neste produto: [NOME_DO_PRODUTO]. Pode me passar mais informações?
```

---

## US-PUB-010 - Adicionar produto à lista

**Como** visitante,  
**quero** adicionar produtos a uma lista,  
**para** enviar vários produtos em uma única mensagem de WhatsApp.

**Prioridade:** P0

**Critérios de aceite:**

- Deve existir botão para adicionar produto à lista.
- O produto não deve ser duplicado se já estiver na lista.
- Se o produto já estiver na lista, a interface deve indicar isso.
- A lista deve ser acessível pelo header e/ou por um botão fixo.
- A lista deve abrir em drawer lateral ou componente equivalente.
- A lista deve persistir durante a navegação do visitante no site.
- A lista não exige login.

---

## US-PUB-011 - Alterar quantidade na lista

**Como** visitante,  
**quero** alterar a quantidade de produtos na minha lista,  
**para** informar que desejo mais de uma unidade de determinada atração.

**Prioridade:** P1

**Critérios de aceite:**

- A lista deve permitir aumentar quantidade.
- A lista deve permitir diminuir quantidade.
- Quantidade mínima deve ser 1.
- Quantidades inválidas não devem ser aceitas.
- A quantidade deve aparecer na mensagem enviada ao WhatsApp.

---

## US-PUB-012 - Remover produto da lista

**Como** visitante,  
**quero** remover produtos da lista,  
**para** enviar apenas os itens que realmente me interessam.

**Prioridade:** P0

**Critérios de aceite:**

- Cada item da lista deve ter ação de remover.
- A interface deve atualizar a lista imediatamente.
- Se a lista ficar vazia, deve aparecer uma mensagem amigável.

---

## US-PUB-013 - Enviar lista pelo WhatsApp

**Como** visitante,  
**quero** enviar minha lista de produtos pelo WhatsApp,  
**para** conversar com a AlugaGames sobre as atrações selecionadas.

**Prioridade:** P0

**Critérios de aceite:**

- O botão deve abrir o WhatsApp com a mensagem pronta.
- A mensagem deve listar todos os produtos selecionados.
- A mensagem deve incluir quantidades, quando houver mais de uma unidade.
- A mensagem deve ser clara e humana.
- O fluxo não deve criar pedido, compra, pagamento ou reserva no sistema.
- O clique deve ser registrado se a funcionalidade de métricas estiver ativa.

**Mensagem sugerida:**

```txt
Olá, vim pelo site da AlugaGames e tenho interesse nestes produtos:

- [PRODUTO_1] - quantidade: [QTD]
- [PRODUTO_2] - quantidade: [QTD]
- [PRODUTO_3] - quantidade: [QTD]

Pode me passar mais informações?
```

---

## US-PUB-014 - Visualizar página de fotografia

**Como** visitante,  
**quero** acessar uma página com fotos de eventos realizados,  
**para** ver exemplos reais da atuação da AlugaGames.

**Prioridade:** P1

**Critérios de aceite:**

- Deve existir uma página de fotografia.
- A página deve exibir álbuns de eventos.
- Cada álbum deve ter nome do evento.
- Cada álbum deve ter tipo de evento.
- Cada álbum pode ter data.
- Cada álbum pode ter cidade.
- Cada álbum deve ter fotos.
- A fotografia existe como registro/prova visual da AlugaGames, não como serviço separado.

---

## US-PUB-015 - Filtrar álbuns de fotografia

**Como** visitante,  
**quero** filtrar álbuns por tipo de evento,  
**para** encontrar exemplos parecidos com o evento que estou planejando.

**Prioridade:** P1

**Critérios de aceite:**

- A página de fotografia deve permitir busca ou filtro por tipo de evento.
- O filtro deve atualizar os álbuns exibidos.
- Quando não houver resultados, deve aparecer uma mensagem amigável.

---

## US-PUB-016 - Visualizar página Representante AlugaGames

**Como** visitante,  
**quero** acessar a página de Representante AlugaGames,  
**para** conhecer a proposta institucional existente.

**Prioridade:** P1

**Critérios de aceite:**

- A página deve existir.
- O conteúdo será baseado na página atual.
- O conteúdo será estático no produto inicial.
- O design deve ser modernizado.
- Não haverá edição dessa página pelo admin no produto inicial.

---

## US-PUB-017 - Visualizar página Por que contratar

**Como** visitante,  
**quero** acessar a página Por que contratar,  
**para** entender os diferenciais da AlugaGames.

**Prioridade:** P1

**Critérios de aceite:**

- A página deve existir.
- O conteúdo será baseado na página atual.
- O conteúdo será estático no produto inicial.
- O design deve ser modernizado.
- Não haverá edição dessa página pelo admin no produto inicial.

---

## US-PUB-018 - Acessar Trabalhe Conosco pelo footer

**Como** visitante,  
**quero** clicar em Trabalhe Conosco no rodapé,  
**para** falar com a AlugaGames pelo WhatsApp sobre oportunidades.

**Prioridade:** P1

**Critérios de aceite:**

- O footer deve ter link “Trabalhe Conosco”.
- O clique deve abrir WhatsApp.
- A mensagem deve ser estática e direcionada para esse tema.
- Não haverá página específica de Trabalhe Conosco.
- Não haverá formulário de candidatura.
- Não haverá armazenamento de currículo.

**Mensagem sugerida:**

```txt
Olá, vim pelo site da AlugaGames e tenho interesse em trabalhar com vocês. Pode me passar mais informações?
```

---

# 7. User Stories - Landing Page Editável

## US-LP-001 - Admin edita hero principal

**Como** dono/admin,  
**quero** editar o hero principal da landing page,  
**para** controlar a primeira impressão do site.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder editar título.
- O admin deve poder editar subtítulo.
- O admin deve poder editar imagem principal ou galeria principal.
- O admin deve poder editar texto do CTA.
- O admin deve poder controlar se o bloco aparece ou não.

---

## US-LP-002 - Admin gerencia galeria principal da landing page

**Como** dono/admin,  
**quero** gerenciar imagens grandes exibidas na landing page,  
**para** mostrar eventos, produtos e momentos fortes da marca.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder adicionar imagens.
- O admin deve poder remover imagens.
- O admin deve poder editar texto alternativo.
- O bloco deve poder funcionar como galeria/carrossel.
- Imagens inativas não devem aparecer no site público.

---

## US-LP-003 - Admin escolhe produtos mais procurados

**Como** dono/admin,  
**quero** escolher produtos mais procurados para aparecer na landing page,  
**para** destacar atrações importantes para conversão.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder marcar produtos como destaque.
- A landing page deve exibir os produtos destacados.
- Produtos inativos não devem aparecer.
- Produtos destacados devem levar para a página individual do produto.

---

## US-LP-004 - Admin gerencia blocos de soluções/eventos corporativos

**Como** dono/admin,  
**quero** editar blocos que apresentam soluções e tipos de eventos,  
**para** mostrar diferentes formas de contratação da AlugaGames.

**Prioridade:** P1

**Exemplos de blocos:**

- Eventos corporativos.
- Decoração para festa e aniversário.
- Realidade virtual.
- Infláveis.
- Games e máquinas.

**Critérios de aceite:**

- O admin deve poder editar título do bloco.
- O admin deve poder editar descrição.
- O admin deve poder editar imagem.
- O admin deve poder controlar se o bloco aparece ou não.
- Os blocos não precisam gerar páginas separadas próprias.

---

## US-LP-005 - Admin gerencia depoimentos

**Como** dono/admin,  
**quero** cadastrar e editar depoimentos,  
**para** aumentar a confiança dos visitantes.

**Prioridade:** P1

**Critérios de aceite:**

- O admin deve poder criar depoimento.
- O admin deve poder editar depoimento.
- O admin deve poder desativar depoimento.
- Depoimentos ativos devem aparecer na landing page.
- Cada depoimento pode ter nome, texto, cargo/empresa e imagem opcional.

---

## US-LP-006 - Admin gerencia logos/clientes

**Como** dono/admin,  
**quero** cadastrar logos de clientes ou empresas atendidas,  
**para** mostrar prova social na landing page.

**Prioridade:** P1

**Critérios de aceite:**

- O admin deve poder adicionar logo.
- O admin deve poder remover/desativar logo.
- O admin deve poder editar nome e texto alternativo.
- Logos ativos devem aparecer na landing page.

---

## US-LP-007 - Admin gerencia FAQ

**Como** dono/admin,  
**quero** gerenciar perguntas frequentes,  
**para** responder dúvidas comuns antes do contato pelo WhatsApp.

**Prioridade:** P1

**Critérios de aceite:**

- O admin deve poder criar pergunta e resposta.
- O admin deve poder editar pergunta e resposta.
- O admin deve poder desativar itens.
- Perguntas ativas devem aparecer na landing page.

---

## US-LP-008 - Admin oculta ou exibe blocos da landing page

**Como** dono/admin,  
**quero** ocultar ou exibir blocos da landing page,  
**para** ajustar o site sem depender de código.

**Prioridade:** P1

**Critérios de aceite:**

- Blocos editáveis devem ter status ativo/inativo.
- Blocos inativos não devem aparecer no site público.
- O admin deve conseguir alterar esse status pelo painel.

---

# 8. User Stories - Portal Admin

## US-ADM-001 - Login administrativo

**Como** dono/admin,  
**quero** acessar o portal administrativo com login,  
**para** gerenciar o conteúdo do site com segurança.

**Prioridade:** P0

**Critérios de aceite:**

- Deve existir tela de login.
- Apenas usuário autenticado pode acessar `/admin`.
- Rotas administrativas devem ser protegidas.
- Usuário não autenticado deve ser redirecionado para login.
- O sistema terá apenas um usuário administrativo no produto inicial.

---

## US-ADM-002 - Visualizar dashboard

**Como** dono/admin,  
**quero** visualizar um dashboard simples,  
**para** entender o estado geral do site.

**Prioridade:** P1

**Estatísticas previstas:**

- Total de produtos.
- Produtos ativos.
- Produtos indisponíveis.
- Produtos em destaque.
- Total de fotos.
- Total de álbuns/eventos.
- Total de categorias.
- Total de depoimentos.
- Total de FAQs.
- Cliques em WhatsApp geral.
- Cliques em WhatsApp de produto.
- Cliques em WhatsApp da lista.

**Critérios de aceite:**

- Dashboard deve carregar estatísticas reais do banco.
- Caso não haja dados, deve exibir zero, não erro.
- O dashboard não precisa ter gráficos complexos no produto inicial.

---

## US-ADM-003 - Gerenciar produtos

**Como** dono/admin,  
**quero** criar, editar, desativar e excluir produtos,  
**para** manter o catálogo público atualizado.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder criar produto.
- O admin deve poder editar produto.
- O admin deve poder desativar produto.
- O admin deve poder excluir produto, com confirmação.
- Produtos desativados não devem aparecer no site público.
- A listagem do admin deve mostrar produtos em ordem alfabética.

---

## US-ADM-004 - Editar conteúdo do produto

**Como** dono/admin,  
**quero** editar as informações completas de um produto,  
**para** controlar como ele aparece no site público.

**Prioridade:** P0

**Campos previstos:**

- Nome.
- Slug.
- Descrição curta.
- Descrição completa.
- Status ativo/inativo/indisponível.
- Categorias.
- Tags.
- Indicações de evento.
- Tipo de público.
- Imagens.
- Vídeo.
- Informações técnicas opcionais.
- SEO title.
- SEO description.
- Produto em destaque.

**Critérios de aceite:**

- Campos obrigatórios devem ser validados.
- Slug deve ser único.
- Produto sem imagem deve ter fallback visual.
- Campos vazios opcionais não devem quebrar a página pública.

---

## US-ADM-005 - Gerenciar imagens e vídeos de produto

**Como** dono/admin,  
**quero** adicionar imagens e vídeo aos produtos,  
**para** apresentar melhor cada atração no site.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder adicionar múltiplas imagens ao produto.
- O admin deve poder remover imagens.
- O admin deve poder definir imagem principal.
- O admin deve poder editar texto alternativo.
- O admin deve poder informar vídeo do produto, quando houver.
- Arquivos devem seguir regras de upload e segurança.

---

## US-ADM-006 - Gerenciar categorias

**Como** dono/admin,  
**quero** criar, editar e remover categorias,  
**para** organizar os produtos e alimentar os filtros da página de produtos.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder criar categoria.
- O admin deve poder editar categoria.
- O admin deve poder desativar categoria.
- Categoria pode ser usada como filtro.
- Um produto pode pertencer a mais de uma categoria.

---

## US-ADM-007 - Gerenciar tags

**Como** dono/admin,  
**quero** criar, editar e remover tags,  
**para** melhorar busca, filtros e organização dos produtos.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder criar tag.
- O admin deve poder editar tag.
- O admin deve poder desativar tag.
- Tags devem poder ser associadas a produtos.
- Um produto pode ter várias tags.

---

## US-ADM-008 - Gerenciar álbuns de fotografia

**Como** dono/admin,  
**quero** criar e editar álbuns de fotografia,  
**para** mostrar registros de eventos realizados pela AlugaGames.

**Prioridade:** P1

**Campos do álbum:**

- Nome do evento.
- Tipo de evento.
- Data opcional.
- Cidade opcional.
- Fotos.
- Status ativo/inativo.

**Critérios de aceite:**

- O admin deve poder criar álbum.
- O admin deve poder editar álbum.
- O admin deve poder desativar álbum.
- O admin deve poder adicionar várias fotos ao álbum.
- O admin deve poder remover fotos do álbum.
- Álbuns ativos devem aparecer na página de fotografia.

---

## US-ADM-009 - Gerenciar configuração do WhatsApp

**Como** dono/admin,  
**quero** editar o número de WhatsApp do site,  
**para** controlar para onde os visitantes são direcionados.

**Prioridade:** P0

**Critérios de aceite:**

- O admin deve poder editar o número principal de WhatsApp.
- O mesmo número será usado para produtos, lista, fotografia, institucional e trabalhe conosco.
- O sistema deve validar o formato do número.
- Alterações devem refletir nos botões do site público.

---

## US-ADM-010 - Gerenciar mensagens padrão do WhatsApp

**Como** dono/admin,  
**quero** editar mensagens padrão de WhatsApp,  
**para** adequar o tom de contato conforme a página de origem.

**Prioridade:** P1

**Mensagens previstas:**

- Mensagem geral.
- Mensagem de produto.
- Mensagem da lista.
- Mensagem de fotografia.
- Mensagem de representante.
- Mensagem de trabalhe conosco.

**Critérios de aceite:**

- O admin deve conseguir editar mensagens pelo painel.
- O sistema deve preservar variáveis necessárias, como nome do produto e lista de produtos.
- Se a mensagem estiver vazia, o sistema deve usar uma mensagem padrão segura.

---

## US-ADM-011 - Gerenciar configurações gerais do site

**Como** dono/admin,  
**quero** editar configurações gerais do site,  
**para** manter dados institucionais atualizados.

**Prioridade:** P1

**Configurações possíveis:**

- Nome da empresa.
- WhatsApp.
- E-mail.
- Telefone.
- Instagram.
- Endereço ou região de atendimento.
- SEO padrão do site.

**Critérios de aceite:**

- Dados editados devem aparecer no site público.
- Campos obrigatórios devem ser validados.
- Campos vazios opcionais não devem quebrar o layout.

---

# 9. User Stories - Métricas

## US-MET-001 - Registrar clique em WhatsApp geral

**Como** dono/admin,  
**quero** registrar cliques em botões gerais de WhatsApp,  
**para** ter uma noção básica de interesse gerado pelo site.

**Prioridade:** P2

**Critérios de aceite:**

- O sistema deve registrar data e origem do clique.
- O clique não deve impedir ou atrasar a abertura do WhatsApp.
- O dashboard deve conseguir exibir total de cliques.

---

## US-MET-002 - Registrar clique em WhatsApp de produto

**Como** dono/admin,  
**quero** registrar cliques em WhatsApp vindos de produtos,  
**para** entender quais atrações geram mais interesse.

**Prioridade:** P2

**Critérios de aceite:**

- O sistema deve registrar produto relacionado.
- O sistema deve registrar data do clique.
- O sistema deve diferenciar clique de produto e clique geral.
- O dashboard pode exibir ranking simples de produtos mais clicados.

---

## US-MET-003 - Registrar envio da lista pelo WhatsApp

**Como** dono/admin,  
**quero** registrar quando uma lista de produtos é enviada pelo WhatsApp,  
**para** entender o uso da funcionalidade de lista.

**Prioridade:** P2

**Critérios de aceite:**

- O sistema deve registrar data do clique.
- O sistema deve registrar quantidade de produtos na lista.
- O sistema pode registrar nomes ou IDs dos produtos selecionados.
- O registro não deve criar pedido, reserva ou compra.

---

# 10. Priorização geral

## P0 - Obrigatório

- Visitante visualiza landing page.
- Visitante vê produtos em destaque.
- Visitante acessa página única de produtos.
- Visitante pesquisa produtos.
- Visitante filtra produtos.
- Visitante abre página individual de produto.
- Visitante chama no WhatsApp a partir de produto.
- Visitante adiciona produto à lista.
- Visitante remove produto da lista.
- Visitante envia lista pelo WhatsApp.
- Dono faz login.
- Dono gerencia produtos.
- Dono gerencia categorias.
- Dono gerencia tags.
- Dono gerencia imagens e vídeos dos produtos.
- Dono edita hero/galeria principal da landing page.
- Dono escolhe produtos em destaque.
- Dono configura número de WhatsApp.

## P1 - Importante

- Visitante vê informações técnicas do produto.
- Visitante acessa fotografia.
- Visitante filtra álbuns de fotografia.
- Visitante acessa Representante AlugaGames.
- Visitante acessa Por que contratar.
- Visitante acessa Trabalhe Conosco pelo footer.
- Dono gerencia blocos de soluções da LP.
- Dono gerencia depoimentos.
- Dono gerencia logos/clientes.
- Dono gerencia FAQ.
- Dono oculta/exibe blocos da LP.
- Dono gerencia álbuns de fotografia.
- Dono edita mensagens padrão do WhatsApp.
- Dono edita configurações gerais do site.
- Dono visualiza dashboard simples.

## P2 - Polimento

- Registrar clique em WhatsApp geral.
- Registrar clique em WhatsApp de produto.
- Registrar envio da lista pelo WhatsApp.
- Ranking simples de produtos mais clicados.
- Produtos relacionados na página individual.
- SEO avançado por produto.
- Reordenação visual mais avançada de blocos da landing page.

---

# 11. Fora do escopo

Os seguintes itens não fazem parte do produto:

- Checkout.
- Pagamento online.
- Finalização de compra.
- Pedido fechado dentro do sistema.
- Reserva de data.
- Agenda de disponibilidade.
- Login de cliente.
- Área do cliente.
- Lista de favoritos.
- Marketplace.
- Multiusuário administrativo.
- Permissões avançadas por papel.
- Múltiplos números de WhatsApp por área.
- Formulário de orçamento interno.
- Armazenamento de currículo.
- Página própria de Trabalhe Conosco.
- Páginas separadas por tipo de produto como estrutura principal.

---

# 12. Observações para desenvolvimento com IA

- Cada user story deve virar uma ou mais tasks pequenas.
- Nenhuma task deve implementar várias áreas grandes ao mesmo tempo.
- Fluxos P0 devem ser implementados antes dos P1 e P2.
- A funcionalidade de lista deve ser simples e não deve evoluir para checkout.
- O WhatsApp é o destino final dos fluxos comerciais.
- O admin deve priorizar clareza e facilidade de uso acima de flexibilidade extrema.
- A landing page deve ser editável por blocos controlados, não como page builder livre.
- Páginas institucionais estáticas devem ser bonitas, mas não precisam de edição pelo admin no produto inicial.
