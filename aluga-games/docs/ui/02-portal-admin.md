# 02 — Portal Admin

## 1. Objetivo do portal

O portal admin é a área privada usada pelo dono da AlugaGames para gerenciar o conteúdo do site público sem depender de alterações manuais no código.

O admin deve permitir que o dono atualize produtos, categorias, tags, imagens, álbuns de fotografia, blocos da landing page, depoimentos, FAQs, logos de clientes e configurações principais do site, principalmente o número e as mensagens de WhatsApp.

O portal não é uma área para clientes, não é um CRM completo, não é um sistema de pedidos e não é um painel multiusuário avançado. O foco é gestão simples, segura e confiável do conteúdo público.

---

## 2. Princípios do admin

O portal deve seguir estes princípios:

- ser simples o suficiente para o dono usar sozinho;
- priorizar segurança em toda ação administrativa;
- evitar fluxos longos e complexos;
- permitir editar o site sem quebrar o layout público;
- proteger todas as rotas administrativas com Clerk;
- validar todas as ações no servidor;
- manter logs das alterações mais importantes;
- não expor dados internos ou mensagens técnicas para o usuário;
- não permitir que o admin crie layouts livres que possam quebrar a landing page.

O admin deve ser funcional, organizado e confiável antes de ser visualmente sofisticado.

---

## 3. Usuário do portal

No produto atual, existe apenas um usuário administrativo: o dono da AlugaGames.

Não haverá, nesta versão:

- cadastro aberto de usuários;
- convite de equipe;
- múltiplos papéis;
- permissões por módulo;
- área de cliente;
- login de cliente.

A autenticação será feita com Clerk, mas a autorização real deve depender de uma allowlist server-side de usuários autorizados.

A aplicação deve usar uma função central, como `requireAdmin()`, antes de qualquer ação sensível.

---

## 4. Rotas do admin

As rotas administrativas devem ficar dentro do grupo `(admin)` do App Router.

Estrutura sugerida:

```txt
/src/app/(admin)
  /admin
    page.tsx

    /produtos
      page.tsx
      /novo
        page.tsx
      /[id]
        /editar
          page.tsx

    /categorias
      page.tsx

    /tags
      page.tsx

    /landing-page
      page.tsx
      /blocos
        page.tsx
      /hero
        page.tsx
      /produtos-destaque
        page.tsx
      /depoimentos
        page.tsx
      /faq
        page.tsx
      /logos
        page.tsx

    /fotografia
      page.tsx
      /novo
        page.tsx
      /[id]
        /editar
          page.tsx

    /midias
      page.tsx

    /configuracoes
      page.tsx
```

A rota `/admin/login` pode ser usada caso o fluxo do Clerk exija uma página dedicada de login.

---

## 5. Layout do portal

O portal admin deve ter um layout simples:

- sidebar lateral no desktop;
- menu superior ou drawer no mobile;
- área principal com título da página;
- breadcrumbs simples quando fizer sentido;
- cards de resumo no dashboard;
- tabelas para listagens;
- formulários claros para criação e edição;
- mensagens de sucesso e erro visíveis;
- botões destrutivos com confirmação.

Visualmente, o admin pode usar a mesma identidade do site público, mas com menos preocupação estética. O importante é clareza operacional.

### Navegação principal

Menus esperados:

```txt
Dashboard
Produtos
Categorias
Tags
Landing Page
Fotografia
Depoimentos
FAQ
Logos / Clientes
Mídias
Configurações
```

Caso o menu fique grande demais, `Depoimentos`, `FAQ` e `Logos / Clientes` podem ficar dentro de `Landing Page`.

---

## 6. Dashboard

A página `/admin` deve funcionar como visão geral do sistema.

Estatísticas esperadas:

- total de produtos;
- produtos ativos;
- produtos indisponíveis;
- produtos em destaque;
- total de categorias;
- total de tags;
- total de álbuns de fotografia;
- total de fotos;
- total de depoimentos;
- total de FAQs;
- total de logos/clientes;
- cliques em WhatsApp, caso o tracking esteja implementado.

O dashboard não precisa ser um analytics avançado. Ele deve apenas ajudar o dono a entender rapidamente se o conteúdo principal está cadastrado e ativo.

### Atalhos úteis

O dashboard deve ter atalhos para:

- criar novo produto;
- editar landing page;
- adicionar álbum de fotografia;
- editar WhatsApp;
- ver site público.

---

## 7. Gestão de produtos

A área de produtos é uma das partes mais importantes do admin.

### Listagem

A tela `/admin/produtos` deve permitir:

- listar todos os produtos;
- buscar por nome;
- filtrar por categoria;
- filtrar por tag;
- filtrar por status;
- filtrar por destaque;
- visualizar imagem de capa;
- visualizar se o produto está ativo ou indisponível;
- acessar edição;
- criar novo produto;
- desativar produto;
- excluir produto, se permitido, sempre com confirmação.

### Campos do produto

Um produto deve ter, no mínimo:

- nome;
- slug;
- descrição curta;
- descrição completa;
- categoria principal;
- categorias secundárias, se aplicável;
- tags;
- indicações de evento;
- status;
- ativo/inativo;
- destaque na landing page;
- imagens;
- vídeo por URL externa, opcional;
- informações técnicas opcionais;
- SEO title;
- SEO description.

### Status do produto

Status esperados:

```txt
ativo
inativo
indisponivel
```

Produto `ativo` aparece no site público.

Produto `inativo` não aparece no site público.

Produto `indisponivel` pode aparecer no site, mas deve indicar indisponibilidade e não incentivar o envio direto para WhatsApp sem contexto.

### Produtos em destaque

O admin deve conseguir marcar produtos como destaque para aparecerem na landing page.

A ordenação geral dos produtos será alfabética, conforme definido nas regras do produto. Caso seja necessário ordenar os destaques manualmente no futuro, isso deve ser tratado como evolução.

---

## 8. Gestão de categorias

Categorias servem para organizar os produtos e alimentar filtros da página `/produtos`.

A tela `/admin/categorias` deve permitir:

- criar categoria;
- editar categoria;
- ativar/desativar categoria;
- excluir categoria somente se não houver produtos dependentes ou com realocação segura;
- definir nome;
- definir slug;
- definir descrição curta;
- definir imagem opcional;
- definir SEO básico, se houver página pública de categoria no futuro.

Mesmo sem páginas separadas como no site atual, categorias continuam existindo para organização e filtros.

---

## 9. Gestão de tags

Tags ajudam na pesquisa e nos filtros.

Exemplos:

```txt
corporativo
festa infantil
escola
condominio
adulto
crianca
premium
realidade virtual
inflavel
decoracao
mais procurado
```

A tela `/admin/tags` deve permitir:

- criar tag;
- editar tag;
- excluir tag com segurança;
- visualizar quantos produtos usam cada tag.

Tags são editáveis pelo admin.

---

## 10. Gestão da landing page

A landing page deve ser editável por blocos controlados.

O admin não deve poder criar qualquer layout livre do zero. Ele deve editar conteúdo dentro de blocos previamente planejados pelo sistema.

Essa decisão protege o design, evita bugs visuais e torna o sistema viável no prazo.

### Blocos esperados

A LP deve conter blocos como:

- Hero principal;
- logos de empresas/clientes;
- seção de diferenciais;
- produtos/atrações em destaque;
- blocos de soluções/eventos corporativos;
- como funciona;
- depoimento principal;
- galeria ou banner de evento;
- FAQ;
- CTA final;
- rodapé.

### O admin pode editar

O admin deve conseguir editar:

- títulos;
- subtítulos;
- descrições;
- imagens;
- textos dos botões;
- links dos botões;
- produtos em destaque;
- depoimentos exibidos;
- perguntas frequentes;
- logos de clientes;
- visibilidade dos blocos;
- ordem dos blocos, se implementado de forma segura.

### O admin não pode editar livremente

O admin não deve poder:

- inserir JavaScript;
- inserir HTML arbitrário;
- alterar estrutura visual crítica;
- criar componentes livres;
- subir scripts;
- quebrar o layout com campos sem limite.

Todos os campos de texto devem ter limite de tamanho.

---

## 11. Gestão de fotografia

A página de fotografia existe para mostrar registros da AlugaGames, eventos realizados e produtos em uso.

Ela não é um serviço separado, não tem checkout e não deve parecer uma página de venda de fotografia.

### Álbuns

O admin deve subir fotos organizadas por álbuns/eventos.

Cada álbum deve ter:

- nome do evento;
- tipo de evento;
- data opcional;
- cidade opcional;
- descrição opcional;
- imagem de capa;
- fotos;
- status ativo/inativo;
- SEO básico, se houver página individual do álbum.

### Fotos

Cada foto deve ter:

- arquivo/imagem;
- alt text opcional ou gerado com base no álbum;
- ordem dentro do álbum;
- status ativo/inativo.

A página pública deve permitir busca/filtro por tipo de evento.

---

## 12. Gestão de depoimentos

Depoimentos podem aparecer na landing page.

A área de depoimentos deve permitir:

- criar depoimento;
- editar depoimento;
- ativar/desativar depoimento;
- definir nome do cliente ou empresa;
- definir cargo/segmento opcional;
- definir texto do depoimento;
- definir imagem opcional;
- marcar como destaque.

Depoimentos devem ter limite de texto para não quebrar o layout.

---

## 13. Gestão de FAQ

O FAQ deve alimentar a seção de dúvidas frequentes da landing page.

A área de FAQ deve permitir:

- criar pergunta;
- editar pergunta;
- ativar/desativar pergunta;
- definir resposta;
- ordenar perguntas, se implementado;
- limitar tamanho de pergunta e resposta.

As respostas não devem aceitar HTML livre.

---

## 14. Gestão de logos/clientes

A seção de logos serve como prova social.

A área de logos deve permitir:

- subir logo;
- editar nome da empresa;
- definir alt text;
- ativar/desativar logo;
- remover logo;
- ordenar logos, se implementado.

Logos devem ser imagens seguras e otimizadas.

---

## 15. Configurações do site

A tela `/admin/configuracoes` deve permitir editar informações globais.

Campos esperados:

- número principal de WhatsApp;
- mensagem padrão de WhatsApp;
- mensagem para produto individual;
- mensagem para lista de produtos;
- mensagem para trabalhe conosco;
- e-mail de contato;
- telefone, se houver;
- Instagram;
- LinkedIn;
- endereço/cidade de atendimento;
- texto curto do rodapé;
- SEO title padrão;
- SEO description padrão.

Alterações em configurações devem gerar log administrativo.

---

## 16. Mídias e upload

Uploads devem seguir o documento `06-upload-e-midias.md`.

Regras principais:

- apenas admin autenticado e autorizado pode fazer upload;
- tipos permitidos: `jpg`, `jpeg`, `png`, `webp`;
- tamanho máximo definido pelo sistema;
- arquivo deve ir para object storage, preferencialmente Railway Buckets;
- não salvar imagens dentro do repositório;
- não confiar no nome original do arquivo;
- validar extensão e MIME type;
- registrar metadados no banco;
- permitir alt text quando a mídia aparecer no site público.

---

## 17. Segurança no admin

Toda tela administrativa deve respeitar os documentos:

- `07-autenticacao-e-autorizacao.md`;
- `08-seguranca.md`;
- `01-politicas-de-desenvolvimento-seguro-com-ia.md`.

Regras obrigatórias:

- proteger `/admin` com Clerk;
- usar allowlist de dono autorizado;
- chamar `requireAdmin()` em toda Server Action sensível;
- validar input no servidor com schema;
- nunca confiar no client;
- não expor stack trace;
- registrar ações administrativas importantes;
- confirmar exclusões;
- preferir desativar em vez de excluir definitivamente;
- não aceitar HTML/JS arbitrário em campos editáveis.

---

## 18. Padrões de formulário

Todos os formulários administrativos devem ter:

- labels claros;
- validação client-side para usabilidade;
- validação server-side obrigatória;
- mensagens de erro específicas;
- estado de loading;
- feedback de sucesso;
- proteção contra envio duplo;
- confirmação em ações destrutivas;
- campos obrigatórios marcados;
- limites de caracteres quando necessário.

A validação client-side melhora experiência, mas nunca substitui a validação no servidor.

---

## 19. Padrões de tabela/listagem

Listagens administrativas devem ter:

- busca;
- filtros relevantes;
- paginação ou limite de resultados, se necessário;
- estado vazio;
- estado de erro;
- ações claras;
- link para edição;
- status visual do item;
- confirmação para desativar/excluir.

Exemplo de estado vazio:

> Nenhum produto cadastrado ainda. Crie o primeiro produto para começar a montar o catálogo do site.

---

## 20. Estados obrigatórios de interface

Toda tela administrativa deve tratar:

- carregando;
- vazio;
- erro;
- sucesso;
- sem permissão;
- confirmação de exclusão;
- upload em andamento;
- falha de upload.

Não deve existir tela que simplesmente quebre ou fique em branco.

---

## 21. Linguagem do admin

A linguagem do admin deve ser direta e operacional.

Usar termos como:

```txt
Produto
Categoria
Tag
Landing Page
Fotografia
Álbum
Depoimento
FAQ
Logo
Configurações
Ativo
Inativo
Indisponível
Destacado
Salvar alterações
Publicar no site
Ocultar do site
```

Evitar termos confusos para o dono, como:

```txt
Entity
Record
Payload
Mutation
CMS node
Collection type
```

---

## 22. O que não deve existir no admin

O portal admin não deve implementar:

- pedidos;
- pagamentos;
- checkout;
- notas fiscais;
- controle financeiro;
- usuários clientes;
- área de cliente;
- recuperação de pedido/lista de loja;
- cupons;
- parcelamento;
- estoque complexo;
- agenda de disponibilidade;
- CRM completo;
- editor visual livre estilo page builder;
- permissões avançadas multiusuário;
- upload de vídeo direto.

Vídeos devem ser cadastrados por URL externa, quando necessário.

---

## 23. Critérios de aceite

O portal admin estará aceitável quando:

- o dono conseguir acessar `/admin` após login no Clerk;
- usuário não autorizado não conseguir acessar o admin;
- produtos puderem ser criados, editados, desativados e exibidos no site;
- categorias e tags puderem ser gerenciadas;
- imagens puderem ser enviadas com segurança;
- a landing page puder ser atualizada por blocos controlados;
- produtos em destaque puderem ser escolhidos;
- álbuns de fotografia puderem ser criados e exibidos;
- depoimentos, FAQs e logos puderem ser editados;
- WhatsApp e mensagens principais puderem ser configurados;
- ações sensíveis validarem autorização no servidor;
- erros forem tratados sem expor informações internas;
- o layout admin funcionar no desktop e no mobile;
- o site público refletir as alterações feitas no admin.

---

## 24. Prioridade de implementação

### P0 — Essencial

- Login com Clerk;
- proteção de `/admin`;
- Dashboard básico;
- CRUD de produtos;
- CRUD de categorias;
- CRUD de tags;
- upload de imagens;
- edição de configurações do WhatsApp;
- escolha de produtos em destaque;
- edição básica dos blocos principais da landing page.

### P1 — Importante

- fotografia com álbuns;
- depoimentos;
- FAQ;
- logos de clientes;
- estatísticas completas no dashboard;
- tracking simples de cliques no WhatsApp.

### P2 — Polimento

- reordenação visual de blocos da LP;
- reordenação manual de logos, FAQs e fotos;
- melhorias de preview;
- filtros avançados nas tabelas;
- logs administrativos visíveis no painel;
- preview antes de publicar.

---

## 25. Regra final para IA

Ao implementar qualquer parte do admin, a IA deve seguir esta regra:

> Nenhuma ação administrativa pode depender apenas de proteção visual no frontend. Toda criação, edição, exclusão, upload ou alteração de configuração deve validar autenticação, autorização e input no servidor.

O admin deve ser simples, mas não pode ser inseguro.
