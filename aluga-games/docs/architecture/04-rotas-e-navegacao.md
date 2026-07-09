# 04 — Rotas e Navegação

## 1. Objetivo do documento

Este documento define a estrutura de rotas, navegação, agrupamento de páginas e regras de acesso do novo site da AlugaGames.

O sistema será composto por duas áreas principais:

1. **Site público**: páginas acessíveis para visitantes, com foco em apresentação institucional, produtos, fotografia/cases e conversão para WhatsApp.
2. **Portal administrativo**: área protegida por login Clerk, usada apenas pelo dono para gerenciar produtos, LP, fotografias, depoimentos, FAQs, logos, configurações e conteúdos editáveis.

A estrutura deve ser simples, clara e compatível com Next.js App Router.

---

## 2. Princípios de navegação

A navegação deve seguir estes princípios:

- O visitante deve conseguir chegar rapidamente aos produtos.
- O fluxo principal deve levar o visitante do produto para o WhatsApp.
- A lista de produtos selecionados é secundária e serve apenas para montar uma mensagem de WhatsApp.
- O site não deve parecer um e-commerce tradicional.
- Não haverá checkout, pagamento, conta de cliente ou pedido fechado pelo site.
- O admin deve ser separado visualmente e estruturalmente do site público.
- Todo acesso ao admin deve exigir autenticação.
- Toda ação administrativa deve validar autorização no servidor.

---

## 3. Estrutura geral no App Router

A estrutura base recomendada é:

```txt
/src/app
  /(site)
    layout.tsx
    page.tsx
    produtos
      page.tsx
      [slug]
        page.tsx
    fotografia
      page.tsx
      [slug]
        page.tsx
    representante-alugagames
      page.tsx
    por-que-contratar
      page.tsx

  /(admin)
    admin
      layout.tsx
      page.tsx
      produtos
        page.tsx
        novo
          page.tsx
        [id]
          editar
            page.tsx
      categorias
        page.tsx
      tags
        page.tsx
      landing-page
        page.tsx
      fotografia
        page.tsx
        novo
          page.tsx
        [id]
          editar
            page.tsx
      depoimentos
        page.tsx
      faq
        page.tsx
      logos-clientes
        page.tsx
      configuracoes
        page.tsx

  /api
    upload
      route.ts
    whatsapp-clicks
      route.ts
```

Observação: os nomes das pastas de rota podem ser ajustados durante a implementação, mas a separação entre `(site)`, `(admin)` e `/api` deve ser mantida.

---

## 4. Rotas públicas

### 4.1 `/`

Página principal do site.

Deve funcionar como landing page institucional e comercial.

Seções previstas:

- Hero principal.
- Galeria/banner com imagens principais.
- Logos de empresas/clientes.
- Seção de diferenciais.
- Produtos ou atrações em destaque.
- Blocos de soluções específicas, como decoração, realidade virtual, infláveis, eventos corporativos etc.
- Como funciona.
- Depoimentos.
- FAQ.
- CTA final para WhatsApp.
- Rodapé.

Conteúdo editável pelo admin:

- Imagens principais.
- Textos dos blocos editáveis.
- Produtos em destaque.
- Depoimentos.
- Perguntas frequentes.
- Logos de empresas/clientes.
- Visibilidade de blocos da LP.
- Configurações principais de CTA.

Regra importante:

A LP será editável por blocos controlados. O admin não poderá criar qualquer layout livremente como em um page builder genérico.

---

### 4.2 `/produtos`

Página única de catálogo.

Substitui a divisão atual do site em páginas separadas como infláveis, lista de jogos, máquinas etc.

Todos os itens serão tratados como produtos.

A página deve permitir:

- Buscar produto por nome.
- Filtrar por categoria.
- Filtrar por tags.
- Filtrar por indicação de evento.
- Filtrar por tipo de público.
- Filtrar por disponibilidade.
- Filtrar por produto em destaque.
- Acessar a página individual do produto.
- Adicionar produto à lista simples para WhatsApp.
- Ir direto para WhatsApp a partir de um produto.

Filtros previstos:

```txt
- Busca por nome
- Categoria
- Tags
- Indicação de evento
- Disponível / indisponível
- Produto em destaque
- Público infantil
- Público adulto
- Evento corporativo
- Escola
- Condomínio
```

Não haverá filtro por preço, porque os produtos não exibem preço público.

A página deve priorizar a clareza visual e evitar parecer uma loja virtual tradicional.

---

### 4.3 `/produtos/[slug]`

Página individual de produto.

Deve apresentar o produto com mais profundidade e servir como um dos principais pontos de conversão para WhatsApp.

Deve conter:

- Galeria de imagens.
- Vídeo, quando houver.
- Nome do produto.
- Descrição completa.
- Categorias.
- Tags.
- Indicação de eventos.
- Informações técnicas opcionais.
- Produtos relacionados.
- Botão principal para WhatsApp.
- Botão secundário para adicionar à lista de produtos.

Mensagem de WhatsApp sugerida:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse neste produto: [NOME_DO_PRODUTO]. Pode me passar mais informações?
```

Informações técnicas opcionais:

```txt
- Idade recomendada
- Quantidade de participantes
- Energia necessária
- Duração recomendada
- Inclui monitor
- Indicado para ambiente interno/externo
```

Não devem existir:

- Botão de comprar.
- Checkout.
- Pagamento.
- Login de cliente.
- Avaliações de compra.

---

### 4.4 `/fotografia`

Página de fotografia/cases visuais.

A fotografia existe para mostrar registros reais da AlugaGames, seus produtos em eventos e a estrutura entregue.

Esta página deve exibir álbuns/eventos cadastrados pelo admin.

O visitante deve poder:

- Ver álbuns de eventos.
- Filtrar álbuns por tipo de evento.
- Pesquisar por nome do evento.
- Abrir um álbum para ver suas fotos.

Cada álbum deve possuir:

- Nome do evento.
- Tipo de evento.
- Data opcional.
- Cidade opcional.
- Fotos.

A página de fotografia não é um serviço separado de fotografia. Ela é uma vitrine visual dos eventos e produtos da AlugaGames.

---

### 4.5 `/fotografia/[slug]`

Página individual de álbum/evento.

Deve conter:

- Nome do evento.
- Tipo de evento.
- Data, quando cadastrada.
- Cidade, quando cadastrada.
- Galeria de fotos.
- CTA para WhatsApp.

Mensagem de WhatsApp sugerida:

```txt
Olá, vim pelo site da AlugaGames e vi as fotos do evento [NOME_DO_EVENTO]. Gostaria de saber mais sobre as atrações para o meu evento.
```

---

### 4.6 `/representante-alugagames`

Página institucional estática.

Deve ser uma releitura visual da página atual de representante AlugaGames.

Regras:

- Conteúdo fixo no código para a primeira versão.
- Não precisa ser editável pelo admin.
- Não deve ter formulário próprio.
- Pode ter CTA para WhatsApp, se fizer sentido no design.

---

### 4.7 `/por-que-contratar`

Página institucional estática.

Deve ser uma releitura visual da página atual de “Por que contratar”.

Regras:

- Conteúdo fixo no código para a primeira versão.
- Não precisa ser editável pelo admin.
- Deve ter design mais premium e profissional.
- Deve reforçar confiança, estrutura, experiência, variedade e qualidade da AlugaGames.

---

### 4.8 Trabalhe conosco

Não será uma página própria na primeira versão.

No footer, haverá um link “Trabalhe conosco” que leva diretamente ao WhatsApp com mensagem estática.

Mensagem sugerida:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse em trabalhar com vocês.
```

---

## 5. Rotas administrativas

Todas as rotas administrativas devem ficar abaixo de `/admin`.

Todas as páginas `/admin/*` devem exigir login Clerk.

Além da proteção visual da rota, todas as actions administrativas devem validar o usuário no servidor.

---

### 5.1 `/admin`

Dashboard principal do dono.

Deve exibir estatísticas simples:

- Total de produtos.
- Produtos ativos.
- Produtos indisponíveis.
- Produtos em destaque.
- Total de fotos.
- Total de álbuns/eventos.
- Total de categorias.
- Total de tags.
- Total de depoimentos.
- Total de FAQs.
- Total de logos/clientes.
- Cliques em WhatsApp, quando essa medição estiver implementada.

Também pode exibir atalhos para:

- Criar produto.
- Editar LP.
- Criar álbum de fotografia.
- Editar configurações do WhatsApp.

---

### 5.2 `/admin/produtos`

Tela de listagem e gestão de produtos.

Deve permitir:

- Listar produtos em ordem alfabética.
- Buscar por nome.
- Filtrar por categoria.
- Filtrar por tags.
- Filtrar por status.
- Ver se o produto está ativo, indisponível ou em destaque.
- Acessar criação de produto.
- Acessar edição de produto.
- Desativar produto.
- Excluir produto, se permitido pela regra de negócio.

O produto deve poder ser desativado sem ser excluído.

---

### 5.3 `/admin/produtos/novo`

Tela de criação de produto.

Campos esperados:

- Nome.
- Slug.
- Descrição curta.
- Descrição completa.
- Categorias.
- Tags.
- Indicações de evento.
- Informações técnicas.
- Status.
- Destaque.
- Disponibilidade.
- Vídeo por URL externa.
- SEO title.
- SEO description.
- Imagens.

Regras:

- O slug deve ser único.
- O nome é obrigatório.
- Pelo menos uma categoria deve ser permitida, mas pode não ser obrigatória se a regra de negócio definir assim.
- Imagens devem ser validadas e enviadas para object storage.
- O produto não deve ter preço público.

---

### 5.4 `/admin/produtos/[id]/editar`

Tela de edição de produto.

Deve permitir editar os mesmos campos da criação.

Também deve permitir:

- Adicionar imagens.
- Remover imagens.
- Alterar imagem principal.
- Alterar status.
- Marcar/desmarcar destaque.
- Marcar como indisponível.
- Atualizar SEO.

---

### 5.5 `/admin/categorias`

Tela de gestão de categorias.

Deve permitir:

- Criar categoria.
- Editar categoria.
- Desativar categoria.
- Excluir categoria quando seguro.
- Definir nome e slug.

Categorias serão usadas como filtro na página `/produtos` e na organização interna do admin.

Um produto pode pertencer a mais de uma categoria.

---

### 5.6 `/admin/tags`

Tela de gestão de tags.

Deve permitir:

- Criar tag.
- Editar tag.
- Desativar tag.
- Excluir tag quando seguro.

Tags serão usadas para pesquisa, filtros e organização flexível dos produtos.

Exemplos:

```txt
festa infantil
corporativo
realidade virtual
inflável
escola
condomínio
adulto
premium
mais procurado
```

---

### 5.7 `/admin/landing-page`

Tela de edição da LP.

Deve permitir editar blocos controlados, não criar páginas livres.

Blocos previstos:

- Hero principal.
- Galeria/banner de imagens principais.
- Logos de clientes.
- Diferenciais.
- Produtos em destaque.
- Blocos de soluções específicas.
- Como funciona.
- Depoimentos.
- FAQ.
- CTA final.

O admin deve poder:

- Editar textos.
- Trocar imagens.
- Selecionar produtos destacados.
- Selecionar depoimentos exibidos.
- Selecionar FAQs exibidas.
- Mostrar/ocultar blocos.
- Alterar ordem de blocos quando a implementação permitir.

A edição deve ser simples e segura. Não deve permitir HTML livre sem sanitização.

---

### 5.8 `/admin/fotografia`

Tela de gestão de álbuns de fotografia.

Deve permitir:

- Listar álbuns.
- Buscar álbuns.
- Filtrar por tipo de evento.
- Criar álbum.
- Editar álbum.
- Desativar álbum.
- Excluir álbum quando seguro.

---

### 5.9 `/admin/fotografia/novo`

Tela de criação de álbum.

Campos:

- Nome do evento.
- Slug.
- Tipo de evento.
- Data opcional.
- Cidade opcional.
- Fotos.
- Status ativo/inativo.

---

### 5.10 `/admin/fotografia/[id]/editar`

Tela de edição de álbum.

Deve permitir:

- Editar dados do álbum.
- Adicionar fotos.
- Remover fotos.
- Alterar ordem das fotos, se implementado.
- Ativar/desativar álbum.

---

### 5.11 `/admin/depoimentos`

Tela de gestão de depoimentos.

Deve permitir:

- Criar depoimento.
- Editar depoimento.
- Desativar depoimento.
- Excluir depoimento quando seguro.
- Marcar depoimentos que aparecem na LP.

Campos sugeridos:

- Nome da pessoa ou empresa.
- Cargo/descrição opcional.
- Texto do depoimento.
- Imagem opcional.
- Status ativo/inativo.

---

### 5.12 `/admin/faq`

Tela de gestão de perguntas frequentes.

Deve permitir:

- Criar pergunta.
- Editar pergunta.
- Desativar pergunta.
- Excluir pergunta quando seguro.
- Marcar perguntas que aparecem na LP.

Campos:

- Pergunta.
- Resposta.
- Status ativo/inativo.

---

### 5.13 `/admin/logos-clientes`

Tela de gestão de logos de clientes/empresas.

Deve permitir:

- Cadastrar logo.
- Editar nome da empresa.
- Remover logo.
- Ativar/desativar logo.
- Definir link opcional, se necessário.

Logos poderão aparecer na LP como prova social.

---

### 5.14 `/admin/configuracoes`

Tela de configurações globais do site.

Deve permitir editar:

- Número principal do WhatsApp.
- Mensagem padrão de WhatsApp.
- Mensagem de produto.
- Mensagem da lista de produtos.
- Mensagem de trabalhe conosco.
- Instagram.
- Telefone.
- E-mail.
- Endereço/região textual.
- SEO padrão do site.

Essas configurações devem ser usadas pelo site público e pelas mensagens automáticas de WhatsApp.

---

## 6. Rotas de API e handlers

### 6.1 `/api/uploads/presign`

Endpoint para upload de imagens.

Deve ser protegido.

Regras:

- Apenas admin autenticado pode enviar arquivos.
- Aceitar apenas imagens.
- Validar extensão.
- Validar MIME type.
- Validar tamanho máximo.
- Enviar arquivo para object storage.
- Retornar URL pública ou identificador utilizável.
- Nunca salvar arquivo de upload dentro do repositório.

---

### 6.2 `/api/whatsapp-clicks`

Endpoint opcional para registrar cliques no WhatsApp.

Pode ser implementado como P2.

Eventos possíveis:

```txt
- whatsapp_general_click
- whatsapp_product_click
- whatsapp_product_list_click
- whatsapp_footer_work_click
- whatsapp_photography_click
```

Regra importante:

O registro de clique não deve bloquear a abertura do WhatsApp. Se falhar, o usuário ainda deve ser enviado ao WhatsApp normalmente.

---

## 7. Navegação principal do site público

Menu principal sugerido:

```txt
- Início
- Produtos
- Fotografia
- Por que contratar
- Representante AlugaGames
- WhatsApp
```

No header também pode existir um botão ou ícone da lista de produtos selecionados.

A lista não deve ser apresentada como carrinho de compra tradicional.

Nomes possíveis:

```txt
- Lista
- Minha lista
- Produtos selecionados
```

Evitar nomes como:

```txt
- Carrinho
- Checkout
- Comprar
- Finalizar compra
```

---

## 8. Footer do site público

O footer deve conter:

- Logo AlugaGames.
- Breve descrição institucional.
- Link para WhatsApp.
- Link para Instagram.
- E-mail.
- Telefone, se houver.
- Link para Produtos.
- Link para Fotografia.
- Link para Por que contratar.
- Link para Representante AlugaGames.
- Link “Trabalhe conosco” direto para WhatsApp.

O link “Trabalhe conosco” deve abrir o WhatsApp com mensagem estática.

---

## 9. Lista simples de produtos selecionados

A lista deve ser uma funcionalidade do client, preferencialmente com `localStorage`.

Ela não deve ser persistida no banco.

Ela deve permitir:

- Adicionar produto.
- Remover produto.
- Alterar quantidade.
- Abrir drawer lateral.
- Enviar lista para WhatsApp.

Mensagem sugerida:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse nos seguintes produtos:

- [PRODUTO_1] x [QUANTIDADE]
- [PRODUTO_2] x [QUANTIDADE]
- [PRODUTO_3] x [QUANTIDADE]

Pode me passar mais informações?
```

Essa lista não deve:

- Criar pedido.
- Criar conta de cliente.
- Salvar orçamento no banco.
- Solicitar pagamento.
- Gerar checkout.

---

## 10. Regras de autenticação e acesso

### Site público

Acesso livre.

Rotas públicas:

```txt
/
/produtos
/produtos/[slug]
/fotografia
/fotografia/[slug]
/representante-alugagames
/por-que-contratar
```

### Admin

Acesso restrito.

Rotas protegidas:

```txt
/admin
/admin/*
```

Regras:

- O visitante não autenticado deve ser redirecionado para login Clerk.
- Após login, deve voltar para a área admin.
- Apenas o dono deve conseguir acessar.
- Se houver usuários Clerk adicionais no projeto, eles não devem acessar o admin automaticamente.
- As Server Actions devem verificar a identidade autorizada no servidor.

---

## 11. Tratamento de páginas não encontradas

### Produto não encontrado

Se `/produtos/[slug]` não existir ou estiver inativo:

- Exibir página 404.
- Não mostrar dados incompletos.
- Não redirecionar automaticamente para WhatsApp.

### Álbum não encontrado

Se `/fotografia/[slug]` não existir ou estiver inativo:

- Exibir página 404.

### Conteúdo administrativo não encontrado

Se uma tela de edição tentar abrir um registro inexistente:

- Exibir mensagem clara no admin.
- Permitir voltar para listagem.

---

## 12. SEO e indexação

Rotas que devem ser indexadas:

```txt
/
/produtos
/produtos/[slug]
/fotografia
/fotografia/[slug]
/representante-alugagames
/por-que-contratar
```

Rotas que não devem ser indexadas:

```txt
/admin
/admin/*
/api/*
```

Cada produto deve ter:

- Title SEO.
- Description SEO.
- Slug amigável.
- Imagem principal.

Cada álbum pode ter:

- Title SEO derivado do nome do evento.
- Description SEO derivada do tipo de evento/cidade.

---

## 13. Estados de tela obrigatórios

Páginas públicas e administrativas devem tratar:

- Loading.
- Empty state.
- Erro.
- Sucesso.
- Registro não encontrado.

Exemplos:

### Página de produtos vazia

Mensagem sugerida:

```txt
Nenhum produto encontrado com os filtros selecionados.
```

### Admin sem produtos cadastrados

Mensagem sugerida:

```txt
Nenhum produto cadastrado ainda. Cadastre o primeiro produto para começar a montar o catálogo.
```

---

## 14. Responsividade

Todas as rotas públicas devem ser mobile-first.

A navegação mobile deve ser simples:

- Menu recolhido.
- Botão de WhatsApp sempre acessível.
- Lista de produtos selecionados acessível.
- Cards de produto legíveis.
- Filtros não devem ocupar toda a tela de forma confusa.

O admin também deve ser responsivo, mas a prioridade é boa experiência em desktop/notebook, já que o dono provavelmente gerenciará conteúdo em tela maior.

---

## 15. Critérios de aceite

Este documento estará implementado corretamente quando:

- As rotas públicas estiverem separadas das rotas administrativas.
- Todas as rotas `/admin/*` exigirem Clerk.
- O site público tiver navegação clara para produtos, fotografia e WhatsApp.
- A página `/produtos` concentrar todos os produtos.
- Não existirem páginas públicas separadas por categoria como rota principal.
- A página individual de produto tiver CTA direto para WhatsApp.
- A lista de produtos selecionados existir apenas como apoio para WhatsApp.
- Não existir checkout, pagamento, login de cliente ou pedido persistido.
- A LP tiver rota única em `/`.
- Fotografia funcionar por álbuns/eventos.
- As páginas institucionais definidas estiverem presentes.
- Admin tiver rotas claras para produtos, categorias, tags, LP, fotografia, depoimentos, FAQ, logos e configurações.
