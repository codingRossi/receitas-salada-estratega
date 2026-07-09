# 03 - Regras de Negócio

## Projeto

Refatoração do site da **AlugaGames** para uma nova versão institucional, premium, gerenciável e voltada para conversão por WhatsApp.

Este documento define as regras de negócio que devem orientar a implementação do sistema. Ele deve ser lido antes da criação de entidades, banco de dados, rotas, telas públicas, portal administrativo e integrações com WhatsApp.

Documentos relacionados:

- `/docs/product/00-visao-do-produto.md`
- `/docs/product/02-escopo-do-produto.md`

---

# 1. Princípios gerais do produto

## 1.1 O sistema não é um e-commerce tradicional

O site da AlugaGames não deve funcionar como uma loja virtual comum.

O sistema não terá:

- Checkout.
- Pagamento online.
- PIX dentro do site.
- Parcelamento dentro do site.
- Pedido fechado pelo site.
- Área de cliente.
- Login de cliente.
- Cadastro público.
- Favoritos.
- Marketplace.
- Outros negócios além da AlugaGames.

A única funcionalidade de seleção múltipla será a **lista de produtos**, que serve apenas para montar uma mensagem de WhatsApp com produtos selecionados.

## 1.2 O objetivo principal é gerar conversa comercial

Todo o fluxo público deve conduzir o visitante para uma conversa de orçamento no WhatsApp.

O site deve ajudar o visitante a:

1. Entender o que a AlugaGames oferece.
2. Ver produtos, atrações e experiências.
3. Montar interesse por um ou mais produtos.
4. Enviar uma mensagem clara para o WhatsApp.

O site não precisa capturar lead por formulário antes de abrir o WhatsApp.

## 1.3 O produto vende solução, não apenas item isolado

A comunicação deve tratar a AlugaGames como fornecedora de **soluções completas para eventos**, não apenas como uma lista de brinquedos ou equipamentos.

Mesmo quando o visitante acessa um produto individual, a experiência deve reforçar:

- Atendimento consultivo.
- Montagem e suporte.
- Experiência em eventos.
- Segurança.
- Estrutura profissional.
- Capacidade de transformar eventos em experiências.

## 1.4 O público principal é corporativo

O público prioritário são empresas planejando eventos em São Paulo/SP.

O site também pode atender festas, escolas, condomínios e outros públicos, mas a linguagem principal deve favorecer eventos corporativos, ativações de marca, confraternizações, convenções, feiras e ações presenciais.

## 1.5 O visual deve evitar aparência de loja genérica

O site deve ter aparência institucional, premium e profissional.

A experiência visual deve se aproximar mais de uma empresa especializada em eventos do que de um catálogo comum de loja.

---

# 2. Perfis de usuário

## 2.1 Visitante público

Pessoa que acessa o site para conhecer a AlugaGames, ver produtos, avaliar possibilidades e entrar em contato pelo WhatsApp.

O visitante público pode:

- Acessar a landing page.
- Acessar a página de produtos.
- Buscar e filtrar produtos.
- Abrir páginas individuais de produto.
- Adicionar produtos à lista de produtos.
- Enviar produtos para o WhatsApp.
- Acessar a página de fotografia.
- Acessar páginas institucionais públicas.

O visitante público não pode:

- Fazer login.
- Criar conta.
- Fechar pedido.
- Pagar pelo site.
- Ver área administrativa.
- Alterar qualquer conteúdo do site.

## 2.2 Administrador / dono

Usuário único responsável por gerenciar o conteúdo do site.

O administrador pode:

- Fazer login no portal admin.
- Gerenciar produtos.
- Gerenciar categorias.
- Gerenciar tags.
- Gerenciar fotos e álbuns da página de fotografia.
- Gerenciar conteúdos editáveis da landing page.
- Gerenciar depoimentos.
- Gerenciar FAQs.
- Gerenciar logos de clientes.
- Gerenciar configurações globais.
- Alterar o número principal de WhatsApp.
- Ver estatísticas básicas do dashboard.

O sistema não terá múltiplos perfis administrativos nesta versão.

---

# 3. Regras de navegação pública

## 3.1 Páginas públicas principais

O site público deve conter, no mínimo:

- Landing page principal: `/`
- Página única de produtos: `/produtos`
- Página individual de produto: `/produtos/[slug]`
- Página de fotografia: `/fotografia`
- Página Representante AlugaGames.
- Página Por que Contratar.
- Rodapé com link Trabalhe Conosco para WhatsApp.

## 3.2 Produtos centralizados

Não devem existir páginas públicas separadas por categoria, como:

- `/inflaveis`
- `/maquinas`
- `/lista-de-jogos`
- `/realidade-virtual`

Tudo deve ser tratado como produto dentro da página `/produtos`.

Categorias e tags podem gerar filtros, atalhos ou links com parâmetros, por exemplo:

- `/produtos?categoria=inflaveis`
- `/produtos?tag=evento-corporativo`

Mas essas categorias não devem virar páginas públicas independentes obrigatórias.

## 3.3 Links de navegação

Os links do menu e do rodapé devem priorizar clareza comercial.

Exemplos aceitáveis:

- Produtos ou Atrações → `/produtos`
- Fotografia ou Cases → `/fotografia`
- Como funciona → seção da landing page.
- Por que contratar → página institucional.
- Representante AlugaGames → página institucional.
- Solicitar proposta → WhatsApp.

---

# 4. Regras de produtos

## 4.1 Definição de produto

Produto é qualquer atração, brinquedo, game, máquina, experiência, serviço de locação ou item ofertado pela AlugaGames dentro do catálogo público.

Exemplos:

- Máquina de boxe.
- Simulador de corrida.
- Air hockey.
- Arcade.
- Realidade virtual.
- Inflável.
- Decoração temática.
- Atração para evento corporativo.

## 4.2 Campos principais de produto

Um produto deve possuir, no mínimo:

- Nome.
- Slug único.
- Descrição curta.
- Descrição completa.
- Status de publicação.
- Status de disponibilidade.
- Uma ou mais categorias.
- Imagem de capa para exibição pública.

Campos recomendados:

- Galeria de imagens.
- Vídeos por URL externa.
- Tags.
- Informações técnicas.
- Destaque na landing page.
- Título SEO.
- Descrição SEO.

## 4.3 Regras de nome

O nome do produto deve ser obrigatório.

O nome deve ser usado para:

- Exibição no card.
- Exibição na página individual.
- Busca interna.
- Mensagem automática do WhatsApp.
- Geração inicial do slug, quando o admin não informar manualmente.

## 4.4 Regras de slug

Cada produto deve ter um slug único.

O slug deve:

- Ser usado na URL pública do produto.
- Ser editável pelo admin.
- Ser gerado automaticamente a partir do nome quando não for informado.
- Usar letras minúsculas.
- Não conter espaços.
- Não conter acentos.
- Não conter caracteres especiais desnecessários.

Exemplo:

- Nome: `Máquina de Boxe`
- Slug: `maquina-de-boxe`

Se o slug for alterado após publicação, o sistema deve evitar quebrar a navegação. Quando a implementação de redirecionamento não existir, a alteração de slug deve ser tratada com cuidado no admin.

## 4.5 Regras de descrição

A descrição curta deve explicar rapidamente o valor do produto.

A descrição completa deve detalhar uso, contexto, benefícios e observações relevantes para eventos.

As descrições não devem ser tratadas como texto de checkout ou venda direta. A comunicação deve conduzir para solicitação de proposta.

## 4.6 Regras de preço

Produtos não terão preço público.

O site não deve exibir:

- Preço fixo.
- Preço promocional.
- Parcelamento.
- PIX.
- Carrinho com total.
- Subtotal.
- Frete.
- Botão de comprar.

O CTA deve ser orientado para proposta, por exemplo:

- `Solicitar proposta`
- `Adicionar à lista de produtos`
- `Falar com especialista`

O termo `sob consulta` não deve ser o foco principal da interface. A experiência deve usar linguagem mais consultiva, como solicitação de proposta.

## 4.7 Status de publicação do produto

O produto deve ter controle de publicação.

Estados recomendados:

### Rascunho

Produto ainda incompleto.

- Não aparece no site público.
- Pode ser editado no admin.
- Útil para produtos ainda em cadastro.

### Publicado

Produto aprovado para aparecer no site público.

- Aparece na página de produtos.
- Pode ter página individual.
- Pode ser indexado pelo Google, se estiver disponível para indexação.

### Inativo

Produto não deve aparecer publicamente.

- Não aparece na página de produtos.
- Não deve aparecer na landing page.
- Não deve ser adicionado à lista de produtos.
- Sua URL pública deve retornar página não encontrada, redirecionamento adequado ou mensagem controlada, conforme decisão técnica posterior.

## 4.8 Status de disponibilidade do produto

Além da publicação, o produto deve ter status de disponibilidade.

Estados recomendados:

### Disponível

Produto pode ser exibido normalmente e adicionado à lista de produtos.

### Indisponível

Produto pode continuar aparecendo no site, mas o status deve ser claro.

Produto indisponível:

- Pode aparecer na listagem pública se estiver publicado.
- Deve exibir aviso de indisponibilidade.
- Não deve ser adicionado à lista de produtos como item disponível.
- Pode ter CTA alternativo para WhatsApp, com mensagem pedindo informações ou alternativas.

Exemplo de mensagem:

> Olá, vim pelo site da AlugaGames e vi que o produto Máquina de Boxe está indisponível. Gostaria de saber se existe previsão ou alguma alternativa para meu evento.

## 4.9 Produto em destaque

Um produto pode ser marcado como destaque pelo admin.

Produtos em destaque podem aparecer na landing page em seções como:

- Produtos mais procurados.
- Atrações em destaque.
- Atrações que elevam o evento.

Regras:

- Apenas produtos publicados devem aparecer como destaque no site público.
- Se um produto destacado for inativado, ele deve deixar de aparecer automaticamente na landing page.
- Se um produto destacado estiver indisponível, a interface deve indicar o status claramente ou ocultá-lo da seção, conforme decisão de UI.

## 4.10 Ordenação de produtos

A listagem geral de produtos deve seguir ordenação alfabética por padrão.

Produtos da landing page são exceção: eles são escolhidos manualmente pelo admin como destaque.

## 4.11 Produto relacionado

Produtos relacionados são desejáveis, mas não essenciais.

Quando existirem, devem ser definidos preferencialmente por:

- Categorias em comum.
- Tags em comum.
- Seleção manual do admin, se houver suporte.

Produtos inativos não devem aparecer como relacionados.

## 4.12 Exclusão de produto

A exclusão de produto deve exigir confirmação no admin.

Sempre que possível, a regra preferencial é desativar o produto em vez de removê-lo definitivamente.

Se a exclusão definitiva for permitida, o sistema deve garantir que imagens, relações com categorias, tags e destaques não gerem erro no site público.

---

# 5. Regras de categorias

## 5.1 Definição de categoria

Categoria é uma forma principal de organizar produtos e alimentar filtros na página `/produtos`.

Exemplos:

- Games.
- Infláveis.
- Realidade virtual.
- Máquinas.
- Decoração.
- Eventos corporativos.
- Festa infantil.

## 5.2 Categoria não cria página pública obrigatória

Categorias não devem criar páginas públicas separadas obrigatórias.

A função principal da categoria é:

- Organizar produtos no admin.
- Alimentar filtros públicos.
- Ajudar na busca.
- Ajudar em blocos editoriais da landing page.

## 5.3 Produto com múltiplas categorias

Um produto pode pertencer a mais de uma categoria.

Exemplo:

- Simulador de corrida pode pertencer a `Games`, `Eventos corporativos` e `Experiências interativas`.

## 5.4 Campos de categoria

Uma categoria deve possuir:

- Nome.
- Slug único.
- Status ativo/inativo.

Campos opcionais:

- Descrição.
- Imagem.
- Ícone.
- Texto SEO, caso futuramente categorias ganhem páginas indexáveis.

## 5.5 Exclusão de categoria

Uma categoria associada a produtos não deve ser excluída sem tratamento.

Regras recomendadas:

- Se a categoria tiver produtos associados, bloquear exclusão ou exigir remoção das associações antes.
- Permitir desativação como alternativa segura.
- Categorias inativas não devem aparecer como filtro público.
- Produtos não devem quebrar se uma categoria for desativada.

---

# 6. Regras de tags

## 6.1 Definição de tag

Tag é uma marcação flexível usada para melhorar busca, filtros e organização de produtos.

Exemplos:

- Evento corporativo.
- Festa infantil.
- Escola.
- Condomínio.
- Mais procurado.
- Realidade virtual.
- Inflável.
- Experiência interativa.
- Para adultos.
- Para crianças.

## 6.2 Diferença entre categoria e tag

Categoria é uma classificação principal.

Tag é uma classificação auxiliar, mais flexível e voltada para contexto, público, uso ou característica.

Exemplo:

- Categoria: `Realidade virtual`.
- Tags: `Evento corporativo`, `Tecnologia`, `Experiência imersiva`.

## 6.3 Produto com múltiplas tags

Um produto pode ter várias tags.

Tags devem ser editáveis pelo admin.

## 6.4 Tags nos filtros

Tags podem aparecer como filtros na página de produtos.

A interface deve evitar excesso de filtros visíveis ao mesmo tempo. Se houver muitas tags, a UI deve priorizar busca, agrupamento ou exibição controlada.

## 6.5 Exclusão de tag

Uma tag associada a produtos não deve quebrar a exibição pública.

Regras recomendadas:

- Permitir remoção da tag dos produtos antes de excluir.
- Ou permitir exclusão com remoção automática das associações.
- Não permitir que produto público dependa de uma tag inexistente.

---

# 7. Regras de busca e filtros em produtos

## 7.1 Busca por texto

A página `/produtos` deve permitir busca por texto.

A busca deve considerar, no mínimo:

- Nome do produto.
- Descrição curta.
- Categorias.
- Tags.

Se possível, também pode considerar descrição completa.

## 7.2 Filtros principais

Filtros esperados:

- Categoria.
- Tags.
- Tipo de evento ou público, quando representado por tags ou categorias.
- Disponibilidade.
- Produto em destaque ou mais procurado, se houver.

Filtros que não são prioridade:

- Preço.
- Espaço necessário.
- Número de jogadores.

## 7.3 Combinação de filtros

Quando houver múltiplos filtros, a regra recomendada é:

- Filtros de grupos diferentes se acumulam.
- Múltiplas opções dentro do mesmo grupo podem funcionar como `OU`.
- Grupos diferentes funcionam como `E`.

Exemplo:

- Categoria: `Games` OU `Realidade virtual`.
- Tag: `Evento corporativo`.

Resultado esperado:

- Produtos que sejam de Games ou Realidade Virtual, e também estejam marcados para Evento Corporativo.

## 7.4 Estado vazio

Se nenhum produto corresponder à busca ou filtros, o site deve mostrar uma mensagem amigável e CTA para WhatsApp.

Exemplo:

> Não encontramos uma atração com esses filtros. Fale com a AlugaGames para receber uma sugestão personalizada.

---

# 8. Regras da página individual de produto

## 8.1 Finalidade da página

A página individual de produto deve servir para:

- Apresentar melhor o produto.
- Mostrar imagens e vídeos.
- Explicar benefícios e uso em eventos.
- Reforçar confiança.
- Gerar contato via WhatsApp.
- Ajudar SEO.

## 8.2 Conteúdo obrigatório na página

A página deve exibir:

- Nome do produto.
- Imagem de capa ou galeria.
- Descrição curta.
- Descrição completa.
- Categorias e/ou tags relevantes.
- Informações técnicas, quando cadastradas.
- Status de disponibilidade.
- CTA para WhatsApp.
- Botão para adicionar à lista de produtos, quando disponível.

## 8.3 Galeria de produto

Um produto pode ter múltiplas imagens.

Regras:

- Uma imagem deve ser definida como capa.
- Se nenhuma capa for definida, a primeira imagem ativa pode ser usada como capa.
- Imagens inativas não devem aparecer publicamente.
- O produto publicado deve ter pelo menos uma imagem pública adequada.

## 8.4 Vídeos

Produtos podem ter vídeos.

Para reduzir complexidade, vídeos devem ser cadastrados por URL externa.

Exemplos:

- YouTube.
- Vimeo.
- Link direto aprovado.

Upload direto de vídeo pesado não é regra obrigatória desta versão.

## 8.5 Informações técnicas

Informações técnicas devem ser flexíveis.

A estrutura recomendada é uma lista de pares:

- Título.
- Valor.

Exemplos:

- `Indicado para`: eventos corporativos, festas e ativações.
- `Uso`: ambiente interno ou externo coberto.
- `Energia`: verificar necessidade com equipe.
- `Operação`: pode incluir monitor.
- `Idade recomendada`: conforme atração.

Não é obrigatório ter campos rígidos para espaço necessário ou número de jogadores nesta versão.

## 8.6 Produto indisponível na página individual

Se o produto estiver indisponível, a página deve deixar isso claro.

O botão de adicionar à lista de produtos deve ser desativado ou substituído por CTA de contato.

O botão de WhatsApp pode continuar disponível com mensagem contextual, pedindo previsão ou alternativa.

---

# 9. Regras da lista de produtos

## 9.1 Finalidade

A lista de produtos permite que o visitante selecione um ou mais produtos e envie tudo para o WhatsApp em uma única mensagem.

Ela não é carrinho de compra.

## 9.2 Nomenclatura

Internamente, a funcionalidade não deve ser chamada de `carrinho`. Usar nomes como `selected-products`, `product-selection` ou `quote-list`.

Na interface pública, a nomenclatura preferencial é:

- `Lista de produtos`
- `Itens para orçamento`
- `Solicitar proposta`

Evitar termos que gerem expectativa de compra online, como:

- Comprar.
- Finalizar compra.
- Checkout.
- Pagar.
- Total.

## 9.3 Adição de produtos

A lista deve permitir adicionar produtos publicados e disponíveis.

Regras:

- Produto inativo não pode ser adicionado.
- Produto indisponível não deve ser adicionado como item disponível.
- O mesmo produto não precisa ser adicionado várias vezes.
- Se o visitante tentar adicionar um produto já presente, o sistema deve apenas informar que ele já está na lista ou manter uma única entrada.

## 9.4 Remoção de produtos

O visitante deve conseguir remover produtos da lista.

A lista também deve permitir limpar todos os itens, se a UI comportar.

## 9.5 Persistência da lista

A lista de produtos pode ser salva localmente no navegador do visitante.

Não é necessário salvar no banco de dados.

A lista não deve gerar pedido, lead, cadastro ou histórico administrativo nesta versão.

## 9.6 Exibição da lista

A lista deve exibir:

- Quantidade de produtos selecionados.
- Nome dos produtos.
- Imagem pequena ou resumo, se viável.
- Botão para remover item.
- Botão para enviar para WhatsApp.

A lista não deve exibir:

- Preço.
- Total.
- Subtotal.
- Frete.
- Desconto.
- Formas de pagamento.

## 9.7 Mensagem de WhatsApp da lista

Ao enviar a lista para WhatsApp, a mensagem deve incluir os nomes dos produtos selecionados.

Exemplo:

> Olá, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para os seguintes produtos: Máquina de Boxe, Simulador de Corrida e Air Hockey.

Se possível, a mensagem também pode incluir links das páginas dos produtos.

## 9.8 Lista vazia

Se a lista estiver vazia, o botão de enviar orçamento da lista deve estar desativado ou conduzir para uma mensagem geral.

Mensagem sugerida:

> Sua lista de produtos ainda está vazia. Adicione produtos ou fale com a AlugaGames para receber uma sugestão personalizada.

---

# 10. Regras de WhatsApp

## 10.1 WhatsApp principal

O sistema deve ter um único número principal de WhatsApp.

Esse número deve ser configurável pelo admin.

Não haverá números diferentes por tipo de serviço nesta versão.

## 10.2 Formato do número

O número deve ser armazenado em formato consistente, preferencialmente com código do país e DDD.

Exemplo:

- `5511999999999`

A interface do admin pode exibir o número de forma mais amigável, mas a geração do link deve usar formato compatível com WhatsApp.

## 10.3 CTA sem formulário obrigatório

O visitante não deve ser obrigado a preencher formulário antes de abrir o WhatsApp.

## 10.4 Mensagens por contexto

A mensagem deve variar conforme a origem do clique.

### CTA geral da landing page

> Olá, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para meu evento.

### Produto específico

> Olá, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para o produto: [nome do produto].

### Lista de produtos

> Olá, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para os seguintes produtos: [lista de produtos].

### Página de fotografia

> Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre as atrações mostradas na área de fotografia.

### Trabalhe Conosco

> Olá, vim pelo site da AlugaGames e gostaria de falar sobre trabalhar com vocês.

### Produto indisponível

> Olá, vim pelo site da AlugaGames e vi o produto [nome do produto]. Gostaria de saber se existe previsão de disponibilidade ou alguma alternativa para meu evento.

## 10.5 Configuração ausente

O sistema deve evitar publicar uma experiência quebrada caso o WhatsApp não esteja configurado.

Regra recomendada:

- No admin, exibir alerta se o WhatsApp principal estiver ausente.
- No site público, esconder ou desabilitar CTAs de WhatsApp apenas se não houver número configurado.
- O ideal é exigir WhatsApp configurado como configuração obrigatória antes de considerar o site pronto.

---

# 11. Regras da landing page

## 11.1 Finalidade

A landing page deve apresentar a AlugaGames, gerar confiança e conduzir para WhatsApp.

Ela deve equilibrar:

- Impacto visual.
- Clareza sobre o serviço.
- Produtos em destaque.
- Prova social.
- Diferenciais.
- Processo de contratação.
- Perguntas frequentes.
- CTA forte.

## 11.2 CMS modular controlado

A landing page deve ser editável por blocos controlados.

O sistema não deve ser um page builder livre.

O admin pode editar textos, imagens, itens, status e relações já previstas pelo design.

O admin não precisa conseguir:

- Criar qualquer layout do zero.
- Arrastar seções livremente como um construtor visual avançado.
- Escrever código.
- Definir estilos complexos.

## 11.3 Blocos esperados da landing page

Blocos previstos:

- Hero principal.
- Galeria/carrossel principal.
- Logos de clientes.
- Diferenciais.
- Produtos em destaque.
- Blocos de soluções/tipos de produto.
- Como funciona.
- Depoimentos.
- Dúvidas frequentes.
- CTA final.
- Rodapé.

## 11.4 Hero principal

O hero deve conter:

- Título principal.
- Subtítulo.
- Imagem, produto ou galeria visual em destaque.
- CTA principal para WhatsApp.
- CTA secundário, se houver.

O admin deve conseguir alterar imagens principais do hero.

Quando houver carrossel/galeria, apenas imagens ativas devem aparecer.

## 11.5 Produtos em destaque

Produtos destacados na landing page devem ser escolhidos pelo admin.

Regras:

- Apenas produtos publicados podem aparecer.
- Produtos inativos devem ser removidos automaticamente da exibição pública.
- Produtos indisponíveis devem exibir status ou ser ocultados, conforme decisão de UI.
- O card de destaque não deve exibir preço.

## 11.6 Blocos de soluções ou tipos de produto

A landing page pode ter blocos editoriais para destacar temas específicos.

Exemplos:

- Eventos corporativos.
- Decoração para festa e aniversário.
- Realidade virtual.
- Infláveis.
- Games.
- Experiências interativas.

Esses blocos podem apontar para filtros da página `/produtos`, mas não devem obrigatoriamente criar páginas próprias.

## 11.7 Depoimentos

Depoimentos exibidos na landing page devem ser gerenciáveis pelo admin.

Campos recomendados:

- Nome do cliente ou empresa.
- Cargo ou segmento, se houver.
- Texto do depoimento.
- Imagem opcional.
- Status ativo/inativo.

Apenas depoimentos ativos devem aparecer publicamente.

## 11.8 FAQs

Perguntas frequentes devem ser gerenciáveis pelo admin.

Campos:

- Pergunta.
- Resposta.
- Status ativo/inativo.

Apenas FAQs ativas devem aparecer publicamente.

## 11.9 Logos de clientes

Logos de clientes devem ser gerenciáveis pelo admin.

Campos recomendados:

- Nome da empresa.
- Logo.
- Status ativo/inativo.

Apenas logos ativos devem aparecer publicamente.

## 11.10 Rodapé

O rodapé deve usar dados globais do admin sempre que possível.

Deve conter:

- Logo.
- Texto institucional breve.
- Links principais.
- Dados de contato.
- Redes sociais.
- Link Trabalhe Conosco para WhatsApp.

---

# 12. Regras da página de fotografia

## 12.1 Finalidade

A página de fotografia existe para mostrar registros visuais da AlugaGames.

Ela não vende fotografia como serviço separado.

A função da página é gerar confiança, mostrar produtos montados, eventos reais, ativações e experiências realizadas.

## 12.2 Organização por álbum ou evento

As fotos devem poder ser organizadas por álbum, evento ou grupo.

Exemplos:

- Evento corporativo.
- Festa infantil.
- Ativação de marca.
- Confraternização.
- Escola.
- Condomínio.

## 12.3 Filtros na fotografia

O visitante deve conseguir pesquisar ou filtrar fotos por evento, álbum ou tipo de ocasião.

## 12.4 Campos de foto

Cada foto não precisa ter título ou descrição pública individual.

Campos recomendados:

- Imagem.
- Álbum/evento associado.
- Status ativo/inativo.
- Ordem dentro do álbum, se necessário.
- Alt text ou texto alternativo técnico, quando possível.

## 12.5 Campos de álbum

Um álbum/evento deve ter:

- Nome.
- Slug ou identificador.
- Status ativo/inativo.

Campos opcionais:

- Imagem de capa.
- Data do evento.
- Tipo de evento.

## 12.6 Exibição pública

A página pública deve exibir apenas:

- Álbuns ativos.
- Fotos ativas.

Se um álbum não tiver fotos ativas, ele não deve gerar erro público.

## 12.7 Administração da fotografia

O admin deve conseguir:

- Criar álbum/evento.
- Editar álbum/evento.
- Ativar/desativar álbum.
- Excluir álbum, respeitando regras de segurança.
- Adicionar fotos.
- Remover fotos.
- Ativar/desativar fotos.

---

# 13. Regras das páginas institucionais

## 13.1 Representante AlugaGames

A página Representante AlugaGames será baseada na página atual, com design atualizado.

Regras:

- A página é institucional.
- Não precisa ter formulário próprio.
- Deve usar o estilo visual do novo site.
- Deve ter CTA para WhatsApp ou contato, quando fizer sentido.
- O conteúdo é estático no MVP.
- Não deve ter edição pelo admin no produto inicial.
- Não deve ser implementada como page builder livre.

## 13.2 Por que Contratar

A página Por que Contratar será baseada na página atual, com design atualizado.

Deve explicar diferenciais como:

- Experiência em eventos.
- Variedade de atrações.
- Atendimento consultivo.
- Estrutura profissional.
- Segurança.
- Montagem.
- Suporte.
- Soluções completas para empresas.

Regras:

- O conteúdo é estático no MVP.
- Não deve ter edição pelo admin no produto inicial.
- Não deve depender de page builder livre.

## 13.3 Trabalhe Conosco

Não haverá página completa de Trabalhe Conosco.

O link Trabalhe Conosco deve existir no rodapé e abrir o WhatsApp com mensagem estática.

Não haverá:

- Formulário de candidatura.
- Upload de currículo.
- Banco de currículos.
- Gestão de vagas.

---

# 14. Regras do portal administrativo

## 14.1 Acesso

O portal administrativo deve ser acessível apenas por login.

Rotas `/admin` não devem ser acessíveis por visitante público.

## 14.2 Usuário único

O sistema terá apenas um usuário administrativo nesta versão.

Não haverá:

- Cadastro público.
- Convite de usuários.
- Múltiplos papéis.
- Permissões por equipe.

## 14.3 Dashboard

O dashboard deve exibir estatísticas básicas.

Indicadores recomendados:

- Total de produtos cadastrados.
- Total de produtos publicados.
- Total de produtos inativos.
- Total de produtos indisponíveis.
- Total de categorias.
- Total de tags.
- Total de fotos na galeria.
- Total de depoimentos.
- Total de FAQs.

## 14.4 Ações destrutivas

Toda ação destrutiva deve exigir confirmação.

Exemplos:

- Excluir produto.
- Excluir categoria.
- Excluir tag.
- Excluir álbum.
- Remover imagem.
- Remover FAQ.
- Remover depoimento.

Sempre que possível, o sistema deve preferir desativar em vez de excluir definitivamente.

## 14.5 Validação no servidor

Toda alteração feita pelo admin deve ser validada no servidor.

O sistema não deve confiar apenas na validação do front-end.

Isso vale para:

- Produtos.
- Categorias.
- Tags.
- Uploads.
- Landing page.
- Configurações.
- WhatsApp.
- SEO.

## 14.6 Estados de interface no admin

As telas administrativas devem tratar:

- Loading.
- Sucesso.
- Erro.
- Estado vazio.
- Confirmação de exclusão.
- Campos obrigatórios.
- Feedback após salvar.

---

# 15. Regras de configurações globais

## 15.1 Configurações obrigatórias

O sistema deve ter configurações globais para:

- Número principal de WhatsApp.
- E-mail de contato.
- Telefone, se houver.
- Região principal de atendimento.
- Instagram.
- LinkedIn, se houver.
- Título SEO padrão.
- Descrição SEO padrão.

## 15.2 Uso das configurações

As configurações globais devem alimentar:

- CTAs de WhatsApp.
- Rodapé.
- Links sociais.
- Metadados padrão.
- Mensagens automáticas.

## 15.3 Fallbacks

O site não deve quebrar se uma configuração opcional estiver vazia.

Configurações obrigatórias, como WhatsApp principal, devem gerar alerta no admin se estiverem ausentes.

---

# 16. Regras de SEO

## 16.1 Páginas indexáveis

Devem ser indexáveis:

- Landing page.
- Página de produtos.
- Páginas individuais de produto.
- Página de fotografia.
- Página Representante AlugaGames.
- Página Por que Contratar.

## 16.2 Páginas não indexáveis

Não devem ser indexáveis:

- Login admin.
- Dashboard admin.
- Rotas internas do admin.
- Rotas de API.
- Páginas de erro internas.

## 16.3 SEO de produto

Cada produto deve permitir edição de:

- Slug.
- Título SEO.
- Descrição SEO.

Fallbacks:

- Se título SEO estiver vazio, usar nome do produto.
- Se descrição SEO estiver vazia, usar descrição curta.

## 16.4 Produto inativo e SEO

Produto inativo não deve continuar indexável como página pública normal.

Produto indisponível, se publicado, pode continuar indexável, desde que a página comunique o status corretamente.

## 16.5 Conteúdo duplicado

O sistema deve evitar criar múltiplas páginas públicas diferentes para o mesmo conjunto de produtos.

Filtros de categoria e tag podem existir como parâmetros, mas não devem criar automaticamente dezenas de páginas indexáveis sem decisão de SEO específica.

---

# 17. Regras de mídia

## 17.1 Tipos de mídia

O sistema deve lidar principalmente com imagens.

Imagens serão usadas em:

- Produtos.
- Landing page.
- Galeria de fotografia.
- Logos de clientes.
- Depoimentos, se necessário.
- Páginas institucionais estáticas, quando houver imagens versionadas no projeto.

Vídeos devem ser tratados preferencialmente como URL externa.

## 17.2 Upload de imagens

Apenas o admin autenticado pode fazer upload de imagens.

As regras técnicas detalhadas de upload serão definidas em documento específico, mas a regra de negócio assume:

- Upload restrito ao admin.
- Tipos de imagem limitados.
- Tamanho máximo controlado.
- Imagens públicas otimizadas para carregamento rápido.

## 17.3 Imagem de capa

Produtos e álbuns podem ter imagem de capa.

Se nenhuma capa for definida, o sistema pode usar a primeira imagem ativa.

## 17.4 Remoção de imagens

Remover uma imagem não deve quebrar a página pública.

Se a imagem removida era capa, o sistema deve exigir nova capa ou escolher outra imagem ativa automaticamente, conforme implementação.

---

# 18. Regras de conteúdo ativo/inativo

## 18.1 Conteúdo ativo

Apenas conteúdo ativo deve aparecer publicamente.

Isso se aplica a:

- Produtos.
- Categorias.
- Tags, quando usadas em filtros.
- Fotos.
- Álbuns.
- Depoimentos.
- FAQs.
- Logos de clientes.
- Blocos da landing page.

## 18.2 Conteúdo inativo

Conteúdo inativo deve continuar visível no admin, mas não deve aparecer no site público.

## 18.3 Conteúdo incompleto

Conteúdo incompleto não deve quebrar o site público.

Regra recomendada:

- No admin, sinalizar conteúdo incompleto.
- No público, ocultar conteúdos que não tenham dados mínimos para exibição.

Exemplo:

- Produto sem imagem de capa não deveria ser publicado sem aviso.
- FAQ sem resposta não deve aparecer.
- Logo sem imagem não deve aparecer.
- Depoimento sem texto não deve aparecer.

---

# 19. Regras de textos e tom de comunicação

## 19.1 Tom principal

O tom do site deve ser:

- Profissional.
- Claro.
- Confiável.
- Consultivo.
- Premium.
- Voltado para eventos.

## 19.2 Evitar linguagem de loja comum

Evitar termos como:

- Comprar agora.
- Adicionar ao carrinho de compra.
- Finalizar compra.
- Pagar.
- Frete.
- Promoção.
- Parcelamento.

Preferir termos como:

- Solicitar proposta.
- Falar com especialista.
- Adicionar à lista de produtos.
- Conhecer atração.
- Ver detalhes.
- Planejar meu evento.

## 19.3 Mensagem comercial central

A mensagem principal do site deve se alinhar à promessa:

> Locação de brinquedos, games e atrações para eventos.

Sempre que possível, reforçar a ideia de solução completa, evento bem organizado e experiência profissional.

---

# 20. Regras de aceite de negócio

Uma funcionalidade só deve ser considerada correta quando respeitar estas regras:

1. Não cria fluxo de compra online.
2. Não exige login de cliente.
3. Não exibe preço público de produto.
4. Conduz o visitante para WhatsApp quando há intenção comercial.
5. Mostra apenas conteúdo ativo no site público.
6. Protege rotas administrativas.
7. Permite que o dono gerencie os conteúdos principais sem código.
8. Mantém produtos centralizados em `/produtos`.
9. Usa categorias e tags como filtros, não como páginas separadas obrigatórias.
10. Usa lista de produtos apenas como preparação da mensagem de WhatsApp.
11. Permite produto com múltiplas categorias e múltiplas tags.
12. Permite produto com múltiplas imagens e vídeos por URL.
13. Permite marcar produto como indisponível.
14. Permite destacar produtos na landing page.
15. Mantém landing page como CMS modular controlado, não page builder livre.
16. Mantém página de fotografia como galeria de registros da AlugaGames.
17. Mantém Trabalhe Conosco como link para WhatsApp no rodapé.
18. Usa WhatsApp principal configurável.
19. Mantém páginas públicas importantes indexáveis.
20. Mantém admin e rotas internas fora de indexação.

---

# 21. Decisões que devem ser respeitadas pela IA

Ao implementar qualquer parte do sistema, a IA deve respeitar estas decisões:

- O site é institucional com catálogo, não e-commerce.
- O orçamento sempre vai para WhatsApp.
- O visitante não cria conta.
- O admin é usado por apenas um dono.
- Produtos não exibem preço.
- Produtos são centralizados na página `/produtos`.
- Categorias e tags existem para organização e filtros.
- A lista de produtos não salva pedido no banco.
- A landing page é editável por blocos controlados.
- O portal admin deve ser simples, seguro e objetivo.
- O design deve transmitir profissionalismo e confiança.
- Conteúdo público deve ser filtrado por status ativo/publicado.
- A prioridade é conversão para WhatsApp e facilidade de gestão.

---

# 22. Pendências para documentos técnicos

Este documento define regras de negócio, mas não define detalhes técnicos finais de implementação.

Os seguintes pontos devem ser detalhados em documentos posteriores:

- Modelo de banco de dados.
- Arquitetura de pastas.
- Contratos de server actions e route handlers.
- Regras técnicas de upload.
- Estratégia de autenticação.
- Design system.
- Estrutura final dos blocos da landing page.
- Mensagens finais de WhatsApp.
- Estratégia de sitemap e robots.txt.
- Estratégia de armazenamento de mídia.
- Critérios de teste por funcionalidade.
