# 01 — Auditoria do Site Atual

## 1. Objetivo deste documento

Este documento registra a leitura estratégica do site atual da AlugaGames e define o que deve ser mantido, removido ou reinterpretado na nova versão do sistema.

O objetivo não é copiar o site atual. O objetivo é entender o que já existe, preservar o que tem valor para o negócio e corrigir os pontos que atrapalham a experiência, a conversão e a gestão pelo dono.

A nova versão deve transformar o site em uma presença institucional premium, com catálogo de produtos/atrações e fluxo comercial direcionado para WhatsApp.

---

## 2. Diagnóstico geral

O site atual funciona visual e estruturalmente como uma loja virtual tradicional, com elementos como favoritos, carrinho, conta, botão de comprar, preços, descontos, PIX e parcelamento.

Esse modelo não representa bem o novo objetivo do projeto, porque a AlugaGames trabalha com locação de atrações, games, brinquedos e soluções completas para eventos. O fluxo comercial real depende de conversa, data, local, transporte, montagem, técnico/monitor e combinação de produtos.

Por isso, a nova versão não deve ser tratada como e-commerce. Ela deve ser tratada como:

> Site institucional premium + catálogo filtrável + lista simples de produtos + conversão para WhatsApp.

---

## 3. Elementos identificados no site atual

### 3.1 Navegação atual

O site atual possui navegação com páginas e áreas como:

- AlugaGames
- Autorama Profissional AlugaGames
- Fotos AlugaGames
- Infláveis
- Lista de Jogos
- Máquinas
- Representante AlugaGames
- Porque Contratar?
- Trabalhe Conosco
- Quem Somos
- Orçamento
- Outros Negócios

Também existem elementos de loja, como:

- Conta
- Favoritos
- Carrinho
- Busca

### 3.2 Outros negócios

O site atual também apresenta uma área de “Outros Negócios”, com itens de outro contexto comercial, como Aloha Impors, promoção, bonés, games, eletrônicos, moda, perfumes, variedades e relógios.

Essa área deve ser removida da nova versão, porque enfraquece o posicionamento da AlugaGames e mistura negócios diferentes dentro de um site que deve ser focado em locação para eventos.

### 3.3 Estrutura atual de produtos

O site atual exibe produtos separados por seções/categorias, como:

- Eventos Corporativos
- Realidade Virtual, PC Gamer e Sensores de Movimento
- Decoração para Festas de Aniversário e Eventos Corporativos
- Festas de Aniversário
- Infláveis

Os cards de produto atualmente exibem informações com lógica de e-commerce, como:

- Preço
- Preço no PIX
- Parcelamento
- Desconto
- Status “Esgotado”
- Quantidade de vendidos
- Botão “Comprar”
- Descrições longas e repetitivas dentro do card

Na nova versão, os produtos devem continuar existindo, mas o modo de apresentação deve mudar.

---

## 4. Decisões de reaproveitamento

## 4.1 O que deve ser mantido

Devem ser mantidos como conceitos de negócio:

- Marca AlugaGames.
- Foco em locação de brinquedos, games e atrações para eventos.
- Produtos/atrações existentes.
- Kits e soluções para eventos corporativos e festas.
- Área de fotografia/registros de eventos.
- Página Representante AlugaGames.
- Página Por que Contratar.
- Página Quem Somos fica fora do MVP, salvo nova decisão explícita.
- CTA para contato comercial.
- Conteúdos visuais de eventos reais, quando tiverem qualidade suficiente.
- Prova social, como clientes, depoimentos e registros de eventos.

---

## 4.2 O que deve ser removido

Devem ser removidos da nova versão:

- Login ou conta de cliente.
- Favoritos.
- Checkout.
- Pagamento online.
- PIX.
- Parcelamento.
- Botão “Comprar”.
- Fluxo de compra fechado no site.
- Orçamento via Asana/Form externo.
- Outros negócios que não pertencem à AlugaGames.
- Menu com excesso de páginas/categorias separadas.
- Preços nos cards e nas páginas de produto.
- Descontos promocionais exibidos como loja.
- Métricas de “vendidos”, caso não sejam dados reais e atualizados.

---

## 4.3 O que deve ser reinterpretado

### Páginas separadas de categoria

Antes:

- Uma página para infláveis.
- Uma página para lista de jogos.
- Uma página para máquinas.
- Uma página para autorama.

Depois:

- Uma única página `/produtos` com todos os produtos.
- Filtros por categoria, tags, tipo de evento, público e disponibilidade.
- Produto individual em `/produtos/[slug]`.

### Carrinho

Antes:

- Carrinho com expectativa de compra.

Depois:

- Lista simples de produtos para envio ao WhatsApp.
- Não é carrinho de compra.
- Não gera pedido.
- Não calcula valor.
- Não exige login.
- Não fecha orçamento.

O nome exibido ao usuário deve evitar parecer e-commerce. Sugestões:

- “Lista de produtos”
- “Minha seleção”
- “Enviar lista no WhatsApp”

### Orçamento

Antes:

- Link para formulário externo.

Depois:

- WhatsApp como canal principal.
- Botões com mensagens automáticas de acordo com o contexto.
- Produto individual deve abrir WhatsApp com mensagem citando o produto.
- Lista de produtos deve abrir WhatsApp com mensagem contendo todos os itens selecionados.

### Fotos AlugaGames

Antes:

- Página de fotos.

Depois:

- Página de fotografia/registros de eventos.
- Organizada em álbuns.
- Cada álbum pode ter nome, tipo de evento, data opcional, cidade opcional e fotos.
- A página deve funcionar como prova visual da qualidade dos eventos.

### Trabalhe Conosco

Antes:

- Página própria.

Depois:

- Link no footer levando direto ao WhatsApp com mensagem estática.
- Não haverá formulário de candidatura no site.
- Não haverá armazenamento de currículos.

---

## 5. Problemas do site atual que a nova versão deve corrigir

### 5.1 Posicionamento confuso

O site atual passa sensação de loja virtual, mas a operação da AlugaGames depende de orçamento personalizado para eventos.

A nova versão deve deixar claro que a empresa oferece locação de atrações e soluções completas para eventos, não venda direta de produtos.

### 5.2 Excesso de elementos de e-commerce

Preços, descontos, PIX, parcelas, botão comprar, carrinho e favoritos criam expectativa de compra online.

A nova versão deve trocar essa lógica por CTA de conversa:

- “Falar no WhatsApp”
- “Quero este produto”
- “Enviar lista no WhatsApp”
- “Montar meu evento”

### 5.3 Navegação fragmentada

A separação atual por várias páginas de categoria aumenta a complexidade e dificulta a busca.

A nova versão deve centralizar a experiência em uma página única de produtos, com filtros claros.

### 5.4 Mistura com outros negócios

A presença de outros negócios dentro do site reduz a força da marca AlugaGames.

A nova versão deve conter apenas AlugaGames.

### 5.5 Cards de produto poluídos

Os cards atuais carregam muita informação comercial e repetitiva.

Na nova versão, os cards devem ser mais limpos:

- Imagem
- Nome
- Categoria/tags principais
- Indicação de evento ou público
- Status, se indisponível
- Botões de ação simples

A descrição longa deve ficar na página individual do produto.

### 5.6 Conteúdo difícil de gerenciar

O dono precisa conseguir manipular o site sem depender de código para tarefas operacionais.

A nova versão deve ter portal administrativo para controlar:

- Produtos
- Categorias
- Tags
- Imagens dos produtos
- Produtos em destaque
- Conteúdo editável da landing page
- Depoimentos
- FAQs
- Logos/clientes
- Álbuns de fotografia
- Número do WhatsApp
- Redes sociais/configurações básicas

---

## 6. Nova estrutura desejada do site público

A nova versão deve priorizar uma navegação mais simples.

### Páginas principais

- `/` — Landing page institucional.
- `/produtos` — Página única com todos os produtos e filtros.
- `/produtos/[slug]` — Página individual de produto.
- `/fotografia` — Galeria de álbuns/eventos.
- `/representante-alugagames` — Página estática baseada na atual.
- `/por-que-contratar` — Página estática baseada na atual, com novo design.
- `/quem-somos` — Fora do MVP. Criar apenas se houver nova decisão de escopo.

### Links especiais

- Trabalhe conosco: link no footer para WhatsApp.
- WhatsApp geral: botão fixo ou CTA recorrente.
- Lista de produtos: drawer ou área lateral para enviar seleção ao WhatsApp.

---

## 7. Nova estrutura desejada do portal administrativo

O portal administrativo será utilizado apenas pelo dono do sistema.

### Menus esperados

- Dashboard
- Produtos
- Categorias
- Tags
- Landing Page
- Fotografia
- Depoimentos
- FAQ
- Logos/clientes
- Configurações do site
- Configuração do WhatsApp

### O dono deve conseguir

- Criar produto.
- Editar produto.
- Desativar produto.
- Marcar produto como indisponível.
- Gerenciar imagens do produto.
- Adicionar vídeo ao produto.
- Definir produtos em destaque.
- Criar, editar e remover categorias.
- Criar, editar e remover tags.
- Editar blocos controlados da landing page.
- Ocultar ou exibir blocos da landing page.
- Gerenciar álbuns de fotografia.
- Gerenciar depoimentos.
- Gerenciar perguntas frequentes.
- Gerenciar logos/clientes.
- Alterar número do WhatsApp.
- Alterar redes sociais e dados básicos do site.
- Visualizar estatísticas simples.

---

## 8. Direção visual da nova versão

A nova versão deve seguir uma direção mais premium, profissional e moderna.

A referência visual aprovada pelo cliente indica:

- Fundo claro.
- Uso de verde associado à marca.
- Layout limpo.
- Tipografia forte.
- Elementos arredondados.
- Cards bem definidos.
- Seções amplas.
- Foco em eventos corporativos e soluções completas.
- Imagens grandes e bem posicionadas.
- Prova social com logos, depoimentos e registros visuais.

O design não deve parecer uma loja genérica. Deve parecer uma empresa especializada em experiências para eventos.

---

## 9. Tabela de decisão por elemento atual

| Elemento atual | Decisão na nova versão | Observação |
|---|---|---|
| Produtos | Manter | Todos entram no catálogo único. |
| Categorias separadas no menu | Reinterpretar | Viram filtros na página `/produtos`. |
| Página Infláveis | Remover como página isolada | Categoria/filtro dentro de produtos. |
| Página Lista de Jogos | Remover como página isolada | Categoria/filtro dentro de produtos. |
| Página Máquinas | Remover como página isolada | Categoria/filtro dentro de produtos. |
| Autorama | Reinterpretar | Produto, categoria ou destaque. |
| Fotos AlugaGames | Manter e melhorar | Vira página de fotografia com álbuns. |
| Representante AlugaGames | Manter | Página estática com novo design. |
| Por que Contratar | Manter | Página estática com novo design. |
| Trabalhe Conosco | Simplificar | Link no footer para WhatsApp. |
| Quem Somos | Fora do MVP | Criar apenas com nova decisão de escopo. |
| Orçamento externo | Remover | Substituir por WhatsApp. |
| Carrinho | Reinterpretar | Lista simples para WhatsApp. |
| Favoritos | Remover | Não faz parte do fluxo. |
| Conta de cliente | Remover | Não haverá login de cliente. |
| Checkout | Remover | Não haverá compra online. |
| Preços | Remover | Produto será solicitado via WhatsApp. |
| PIX/parcelamento | Remover | Não faz sentido sem checkout. |
| Outros negócios | Remover | Site será exclusivo da AlugaGames. |

---

## 10. Critérios de sucesso da reformulação

A reformulação será considerada bem sucedida quando:

- O site comunicar claramente que a AlugaGames oferece locação de brinquedos, games e atrações para eventos.
- O visitante conseguir encontrar produtos com facilidade.
- O visitante conseguir acessar o WhatsApp rapidamente a partir da LP, da página de produtos e da página individual de produto.
- O visitante conseguir montar uma lista simples de produtos e enviar pelo WhatsApp.
- O dono conseguir gerenciar produtos, imagens, categorias, tags, LP, fotografia, depoimentos, FAQ e logos/clientes pelo admin.
- O site não parecer uma loja genérica.
- O site não exibir fluxos de compra, pagamento, favoritos ou login de cliente.
- O design transmitir uma imagem mais profissional e premium.
- O sistema for simples o suficiente para ser entregue com qualidade dentro do prazo.

---

## 11. Observação de escopo

A edição da landing page deve ser avançada o suficiente para o dono manipular o conteúdo relevante, mas não deve ser um page builder totalmente livre.

A abordagem recomendada é usar blocos modulares controlados:

- Hero
- Galeria/banner principal
- Logos/clientes
- Produtos mais procurados
- Blocos de soluções/eventos
- Como funciona
- Depoimentos
- FAQ
- CTA final

Cada bloco pode ter campos editáveis, imagens, status ativo/inativo e alguns vínculos com produtos ou mídias.

Essa decisão protege o prazo, mantém o design consistente e evita complexidade excessiva no admin.
