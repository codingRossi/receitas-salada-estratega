# Documentação do Projeto — AlugaGames

Este diretório contém a documentação usada para guiar o desenvolvimento do novo site da AlugaGames com apoio de IA.

O projeto será um site institucional premium com catálogo de produtos, lista simples de produtos para envio via WhatsApp e portal administrativo protegido para o dono gerenciar conteúdos, produtos, imagens, álbuns, depoimentos, FAQ, logos e configurações do site.

O sistema não é um e-commerce tradicional. Não haverá checkout, pagamento online, login de cliente, pedidos fechados pelo site, favoritos ou área do cliente. A conversão principal acontece pelo WhatsApp.

---

## 1. Como usar esta documentação

Antes de implementar qualquer tarefa, a IA deve ler os documentos relevantes e respeitar o escopo definido.

Nenhuma implementação deve começar apenas com base em uma mensagem solta. A IA deve sempre consultar os documentos de produto, arquitetura, segurança, UI e qualidade.

Fluxo obrigatório para cada task:

1. Ler a task específica em `/docs/tasks`.
2. Ler `/docs/adr/README.md` e os ADRs relacionados.
3. Ler os documentos de contexto indicados pela task.
4. Fazer um plano técnico curto antes de implementar.
5. Implementar somente o que está no escopo da task.
6. Validar segurança, autorização, inputs, erros e estados de UI.
7. Rodar lint, typecheck, build e testes disponíveis.
8. Atualizar a documentação se alguma decisão mudar.
9. Finalizar com o checklist definido em `/docs/quality/01-definition-of-done.md`.

Ordem de precedência quando houver conflito:

1. ADRs aceitos em `/docs/adr`;
2. decisões inegociáveis em `/docs/README.md`;
3. documentos de segurança em `/docs/security`;
4. arquitetura específica em `/docs/architecture`;
5. produto/UI/tasks.

---

## 2. Ordem recomendada de leitura pela IA

Para qualquer task geral:

```txt
/docs/product/00-visao-do-produto.md
/docs/product/02-escopo-do-produto.md
/docs/product/03-regras-de-negocio.md
/docs/adr/README.md
/docs/architecture/00-stack-e-decisoes.md
/docs/architecture/01-arquitetura-de-pastas.md
/docs/architecture/08-seguranca.md
/docs/security/00-threat-model.md
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
/docs/quality/01-definition-of-done.md
/docs/quality/02-checklist-review-ai.md
```

Para tasks de site público, também ler:

```txt
/docs/ui/00-design-system.md
/docs/ui/01-site-publico.md
/docs/ui/03-seo-performance-acessibilidade.md
```

Para tasks de admin, também ler:

```txt
/docs/ui/02-portal-admin.md
/docs/architecture/05-contratos-de-actions-e-apis.md
/docs/architecture/07-autenticacao-e-autorizacao.md
```

Para tasks de upload ou imagens, também ler:

```txt
/docs/architecture/06-upload-e-midias.md
/docs/architecture/08-seguranca.md
/docs/quality/00-estrategia-de-testes.md
```

Para tasks de banco de dados, também ler:

```txt
/docs/architecture/02-modelo-de-dominio.md
/docs/architecture/03-banco-de-dados.md
```

---

## 3. Mapa dos documentos

### Produto

```txt
/docs/product/00-visao-do-produto.md
/docs/product/01-auditoria-site-atual.md
/docs/product/02-escopo-do-produto.md
/docs/product/03-regras-de-negocio.md
/docs/product/04-user-stories.md
/docs/product/05-mapa-de-conteudo-cms.md
```

Esses documentos definem o que será construído, o que será removido do site atual, quais regras o sistema deve seguir e quais fluxos existem para visitante e administrador.

### Arquitetura

```txt
/docs/architecture/00-stack-e-decisoes.md
/docs/architecture/01-arquitetura-de-pastas.md
/docs/architecture/02-modelo-de-dominio.md
/docs/architecture/03-banco-de-dados.md
/docs/architecture/04-rotas-e-navegacao.md
/docs/architecture/05-contratos-de-actions-e-apis.md
/docs/architecture/06-upload-e-midias.md
/docs/architecture/07-autenticacao-e-autorizacao.md
/docs/architecture/08-seguranca.md
/docs/architecture/09-env-deploy-railway.md
/docs/architecture/10-observabilidade-e-backup.md
```

Esses documentos definem stack, organização do projeto, domínio, banco, rotas, actions, APIs, upload, autenticação, autorização e políticas de cyber security.

### UI

```txt
/docs/ui/00-design-system.md
/docs/ui/01-site-publico.md
/docs/ui/02-portal-admin.md
/docs/ui/03-seo-performance-acessibilidade.md
```

Esses documentos definem a direção visual, o comportamento do site público, o portal admin, SEO, performance e acessibilidade.

### Qualidade

```txt
/docs/quality/00-estrategia-de-testes.md
/docs/quality/01-definition-of-done.md
/docs/quality/02-checklist-review-ai.md
```

Esses documentos definem testes, critérios de conclusão e checklist obrigatório para revisar código produzido por IA.

### Tasks

```txt
/docs/tasks
```

As tasks devem quebrar a implementação em ciclos pequenos. A IA deve executar uma task por vez.

### ADRs

```txt
/docs/adr/README.md
/docs/adr/ADR-*.md
```

ADRs aceitos são decisões oficiais e prevalecem sobre documentos narrativos quando houver conflito.

---

## 4. Stack definida

A stack base do projeto é:

```txt
Next.js App Router
TypeScript
Drizzle ORM
PostgreSQL
Clerk para autenticação do admin
Tailwind CSS
shadcn/ui, se já estiver no projeto ou for adotado
Zod para validação
Railway para deploy
Railway Buckets ou storage S3-compatible para imagens
```

A arquitetura deve ser simples, mas limpa. O projeto não deve virar DDD complexo demais para o prazo, mas também não deve colocar regras de negócio diretamente dentro de `page.tsx` ou componentes visuais.

Estrutura geral esperada:

```txt
/src
  /app
  /features
  /components
  /server
  /lib
```

---

## 5. Regras inegociáveis do produto

O sistema deve seguir estas regras:

1. O site é institucional e consultivo, não e-commerce tradicional.
2. A conversão principal é WhatsApp.
3. Produtos não exibem preço público.
4. Não existe checkout.
5. Não existe pagamento online.
6. Não existe login de cliente.
7. Não existe área do cliente.
8. Não existe pedido persistido no banco.
9. Não existe favorito.
10. A lista de produtos é apenas uma lista local para montar mensagem de WhatsApp.
11. O admin é usado apenas pelo dono.
12. O admin deve ser protegido por Clerk.
13. O admin deve validar autorização no servidor em toda mutação.
14. O dono deve conseguir gerenciar produtos, categorias, tags, LP, fotografia, depoimentos, FAQ, logos e WhatsApp.
15. A LP deve ser editável por blocos controlados, não por um page builder livre.

---

## 6. Regras inegociáveis de segurança

O sistema será desenvolvido com forte apoio de IA. Por isso, segurança não pode ser tratada como etapa final.

Toda task deve obedecer:

1. Nenhuma rota `/admin` pode ser acessada sem autenticação.
2. Nenhuma Server Action administrativa pode executar sem `requireAdmin()` ou equivalente.
3. Nenhum Route Handler sensível pode executar sem autenticação e autorização.
4. Toda entrada do usuário deve ser validada no servidor com schema confiável.
5. Validação apenas no client não é suficiente.
6. Upload deve aceitar somente imagens permitidas.
7. Upload deve validar tipo, tamanho, extensão e MIME type.
8. Arquivos devem ser salvos em storage externo, não dentro do repositório.
9. Conteúdo editável não pode permitir XSS.
10. Secrets nunca podem aparecer no frontend, logs, commits ou respostas da IA.
11. Erros internos não podem expor stack trace para usuários.
12. A IA não pode remover autenticação, validação ou testes para fazer o build passar.
13. Toda ação administrativa relevante deve gerar auditoria.
14. Toda task com P0 de segurança é considerada reprovada.

A política detalhada está em:

```txt
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
```

---

## 7. Regras de UI

O visual deve seguir a referência aprovada pelo cliente:

- premium;
- profissional;
- corporativo;
- claro;
- limpo;
- com verde como cor principal de ação;
- com cards bem espaçados;
- com seções fortes de prova social;
- com CTA claro para WhatsApp;
- sem aparência de loja virtual genérica.

A LP deve valorizar soluções completas para eventos, não apenas produtos soltos.

A página de produtos deve permitir busca e filtros, mas sem parecer uma vitrine de e-commerce com preço e compra.

---

## 8. Regra para mudanças de escopo

Se durante a implementação a IA perceber que precisa mudar uma decisão de produto, arquitetura, banco, UI ou segurança, ela não deve simplesmente alterar o código.

Ela deve:

1. explicar a mudança necessária;
2. indicar quais documentos seriam impactados;
3. aguardar aprovação humana quando a mudança for relevante;
4. atualizar a documentação antes ou junto da implementação.

Mudanças relevantes incluem:

- trocar stack;
- criar tabelas novas não previstas;
- mudar autenticação;
- mudar fluxo de WhatsApp;
- transformar lista local em pedido persistido;
- adicionar checkout;
- permitir upload de vídeo;
- adicionar múltiplos usuários admin;
- criar permissões avançadas;
- mudar estrutura de rotas;
- tornar páginas estáticas editáveis sem decisão prévia.

---

## 9. Prompt padrão para implementar task com IA

Use este prompt para cada task:

```md
Leia primeiro os documentos abaixo:

- /docs/README.md
- /docs/adr/README.md
- /docs/product/00-visao-do-produto.md
- /docs/product/02-escopo-do-produto.md
- /docs/product/03-regras-de-negocio.md
- /docs/architecture/00-stack-e-decisoes.md
- /docs/architecture/01-arquitetura-de-pastas.md
- /docs/architecture/08-seguranca.md
- /docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
- /docs/quality/01-definition-of-done.md
- /docs/quality/02-checklist-review-ai.md
- /docs/tasks/NOME-DA-TASK.md

Implemente somente a task indicada.

Regras:
- Não implemente funcionalidades fora do escopo.
- Não altere arquitetura sem justificar.
- Não coloque regra de negócio dentro de componentes React.
- Valide dados no servidor.
- Proteja mutações administrativas com autenticação e autorização.
- Não confie em validação apenas no client.
- Não remova segurança para resolver erro de build.
- Trate loading, erro, vazio e sucesso quando houver UI.
- Rode lint, typecheck, build e testes disponíveis.
- Atualize documentação se necessário.

Ao final, responda com:
1. resumo do que foi feito;
2. arquivos alterados;
3. decisões tomadas;
4. validações de segurança realizadas;
5. testes executados;
6. pendências;
7. confirmação da Definition of Done.
```

---

## 10. Prompt padrão para revisar task com IA

Use este prompt após a implementação:

```md
Revise a implementação da última task com foco máximo em segurança, escopo e código limpo.

Leia:

- /docs/README.md
- /docs/architecture/08-seguranca.md
- /docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
- /docs/quality/01-definition-of-done.md
- /docs/quality/02-checklist-review-ai.md

Verifique:
- se a task foi cumprida exatamente;
- se algo fora do escopo foi adicionado;
- se há falha de autenticação;
- se há falha de autorização;
- se há validação apenas no client;
- se há risco de XSS;
- se há upload inseguro;
- se há vazamento de secrets;
- se há regra de negócio em componente visual;
- se há código duplicado ou complexo demais;
- se lint, typecheck, build e testes passam.

Classifique os problemas como P0, P1 ou P2.

Qualquer P0 reprova a task.
```

---

## 11. Ordem recomendada de implementação

A ordem canônica de desenvolvimento está em:

```txt
/docs/tasks/README.md
```

Não manter uma segunda sequência divergente neste README.

---

## 12. Critério final de sucesso

O produto é considerado bem-sucedido quando:

1. o visitante entende rapidamente o que a AlugaGames oferece;
2. o visitante consegue encontrar produtos usando busca e filtros;
3. o visitante consegue ir facilmente para o WhatsApp;
4. o visitante consegue selecionar produtos e enviar uma lista via WhatsApp;
5. o site transmite imagem premium e profissional;
6. o dono consegue gerenciar o conteúdo principal sem depender de código;
7. o admin é seguro;
8. os uploads são seguros;
9. o sistema não expõe dados sensíveis;
10. o código permanece simples, organizado e fácil de evoluir.
