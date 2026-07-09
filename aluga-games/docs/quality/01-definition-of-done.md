# 01 — Definition of Done

## Projeto

AlugaGames — site institucional premium, catálogo de produtos, lista simples para WhatsApp e portal administrativo protegido por Clerk.

Este documento define quando uma task pode ser considerada realmente concluída.

Em um projeto desenvolvido com forte apoio de IA, a Definition of Done é obrigatória. Ela impede que uma funcionalidade seja considerada pronta apenas porque “apareceu na tela” ou porque “o build passou”.

Uma task só está pronta quando atende aos critérios funcionais, técnicos, visuais, de segurança, teste, documentação e revisão definidos neste arquivo.

---

## 1. Regra central

Uma task não está pronta se:

- funciona apenas no cenário feliz;
- depende só de validação no frontend;
- ignora autenticação/autorização;
- cria código fora da arquitetura definida;
- usa mock como se fosse dado real;
- quebra responsividade;
- não trata erro;
- não atualiza documentação impactada;
- não foi revisada com foco em segurança;
- adiciona escopo que não estava na task.

---

## 2. Documentos que devem ser respeitados

Antes de iniciar qualquer task, a IA deve considerar os documentos relevantes em `/docs`.

### Produto

- `/docs/product/00-visao-do-produto.md`
- `/docs/product/01-auditoria-site-atual.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`

### Arquitetura

- `/docs/architecture/00-stack-e-decisoes.md`
- `/docs/architecture/01-arquitetura-de-pastas.md`
- `/docs/architecture/02-modelo-de-dominio.md`
- `/docs/architecture/03-banco-de-dados.md`
- `/docs/architecture/04-rotas-e-navegacao.md`
- `/docs/architecture/05-contratos-de-actions-e-apis.md`
- `/docs/architecture/06-upload-e-midias.md`
- `/docs/architecture/07-autenticacao-e-autorizacao.md`
- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`

### UI

- `/docs/ui/00-design-system.md`
- `/docs/ui/01-site-publico.md`
- `/docs/ui/02-portal-admin.md`
- `/docs/ui/03-seo-performance-acessibilidade.md`

### Qualidade

- `/docs/quality/00-estrategia-de-testes.md`
- `/docs/quality/01-definition-of-done.md`

---

## 3. Critérios gerais para qualquer task

Toda task deve cumprir os pontos abaixo.

### 3.1 Escopo

- A task implementa exatamente o que foi pedido.
- Nenhuma funcionalidade fora do escopo foi adicionada.
- Decisões novas foram documentadas ou justificadas.
- Pendências foram explicitadas no final.
- Nenhum comportamento contradiz as regras de negócio.

### 3.2 Código

- O código segue a estrutura definida em `/docs/architecture/01-arquitetura-de-pastas.md`.
- Páginas em `src/app` não concentram regra de negócio complexa.
- Frontend chama controller, Server Action ou Route Handler quando a operação não for extremamente simples e isolada.
- Regras de negócio ficam nas features correspondentes.
- Features em `src/domain/features` usam uma feature por arquivo, nomeada pela ação.
- Features com setup usam `setup*Feature`, nunca `create*Feature`.
- Repositories, features e controllers concretos são instanciados somente em `src/main/factories`.
- Controllers recebem dependências por injeção e não funcionam como factories.
- Acesso direto ao banco fica em repositories pequenos dentro de `/src/infra/repositories`.
- Repositories não montam DTO final de tela, fallback, normalização visual ou fluxo de aplicação.
- Features podem transformar dados, aplicar fallback e montar DTOs de resposta.
- Validações ficam centralizadas em schemas ou funções reutilizáveis.
- Não há duplicação desnecessária.
- Não há código morto, arquivos temporários ou comentários inúteis.
- Nomes de arquivos, funções e componentes são claros.
- Nomes são específicos, consistentes e fáceis de buscar com `rg`.
- Comentários explicam regra, fallback, decisão técnica ou cuidado de segurança.

### 3.3 TypeScript

- Não usar `any` sem justificativa forte.
- Não desativar TypeScript para “resolver rápido”.
- Tipos de input e output devem estar claros.
- Tipos de retorno das Server Actions devem seguir o padrão definido.
- Tipos de dados do banco, formulários e UI devem ser coerentes.

### 3.4 Dados

- Dados obrigatórios são validados no servidor.
- Dados opcionais são tratados corretamente.
- Erros de validação retornam mensagens compreensíveis.
- Slugs devem ser únicos onde aplicável.
- Registros inativos não aparecem no site público.
- Exclusões destrutivas exigem cuidado e confirmação no admin.

---

## 4. Critérios de segurança obrigatórios

Nenhuma task administrativa ou sensível pode ser considerada pronta se falhar em segurança.

### 4.1 Autenticação

- Toda rota `/admin` exige login via Clerk.
- A tela `/admin/login` é a única rota administrativa pública.
- Usuário não autenticado não acessa páginas administrativas.
- Usuário não autenticado não executa Server Actions administrativas.
- Usuário não autenticado não faz upload.

### 4.2 Autorização

- Toda mutação administrativa chama `requireAdmin()` ou função equivalente.
- A autorização usa allowlist do dono, conforme definido em `/docs/architecture/07-autenticacao-e-autorizacao.md`.
- Não basta esconder botão no frontend.
- Não basta confiar no middleware.
- Toda action sensível valida autorização no servidor.

### 4.3 Server Actions

Toda Server Action administrativa deve:

- validar autenticação;
- validar autorização;
- validar input com Zod ou equivalente;
- retornar erro seguro;
- não expor stack trace;
- registrar auditoria quando alterar dados relevantes;
- revalidar rotas impactadas quando necessário.

### 4.4 Route Handlers

Todo Route Handler sensível deve:

- validar método HTTP;
- validar autenticação/autorização quando necessário;
- validar input;
- controlar tamanho de payload quando aplicável;
- retornar status HTTP adequado;
- não expor detalhes internos.

### 4.5 Upload

Qualquer task envolvendo upload só está pronta se:

- aceita apenas tipos permitidos: `jpg`, `jpeg`, `png`, `webp`;
- valida tamanho máximo;
- valida MIME type;
- valida extensão;
- não confia no nome original do arquivo;
- gera nome seguro;
- salva em storage externo, não dentro do repositório;
- registra metadados no banco;
- permite alt text quando a imagem for exibida publicamente;
- impede upload por usuário não autorizado.

### 4.6 XSS e conteúdo editável

Todo conteúdo editável pelo admin deve ser tratado como potencialmente perigoso.

- Não renderizar HTML arbitrário sem sanitização.
- Preferir texto simples, markdown controlado ou campos estruturados.
- Nunca usar `dangerouslySetInnerHTML` sem justificativa e sanitização.
- URLs externas devem ser validadas.
- Campos de texto devem escapar conteúdo por padrão.

### 4.7 Secrets e ambiente

- Nenhum secret pode estar hardcoded.
- Nenhum token pode ser commitado.
- Variáveis obrigatórias devem ser validadas no boot da aplicação.
- Erros de env devem ser claros para o desenvolvedor, mas não para o visitante.

---

## 5. Critérios para site público

Uma task do site público só está pronta se:

- segue o design system definido;
- é responsiva no mobile, tablet e desktop;
- tem estados de loading, vazio e erro quando aplicável;
- não exibe produtos inativos;
- não exibe conteúdo desativado;
- usa CTAs claros para WhatsApp;
- não usa linguagem de e-commerce tradicional;
- não mostra checkout, pagamento, parcelas ou compra;
- mantém o tom premium/profissional.

### 5.1 Landing page

Tasks da LP devem garantir:

- hero visualmente forte;
- CTA principal para WhatsApp ou produtos;
- blocos editáveis conforme escopo;
- produtos destacados definidos pelo admin;
- imagens carregadas de forma otimizada;
- depoimentos e FAQ com fallback quando vazios;
- logos/clientes somente quando ativos;
- blocos ocultos pelo admin não aparecem no público.

### 5.2 Página de produtos

Tasks da página `/produtos` devem garantir:

- lista única de produtos;
- busca por nome;
- filtros por categoria;
- filtros por tags;
- filtros por indicação de evento;
- filtro por status quando aplicável;
- cards sem preço público;
- produto indisponível identificado visualmente;
- botão para ver detalhes;
- botão ou ação para adicionar à lista simples;
- botão para WhatsApp direto quando aplicável.

### 5.3 Página individual de produto

Tasks da página `/produtos/[slug]` devem garantir:

- slug válido;
- 404 para produto inexistente ou inativo;
- galeria de imagens;
- vídeo externo quando cadastrado;
- descrição completa;
- categorias e tags quando existirem;
- indicações de uso;
- informações técnicas opcionais;
- produtos relacionados quando existirem;
- CTA direto para WhatsApp com mensagem do produto;
- CTA para adicionar à lista simples.

### 5.4 Lista simples de produtos

A lista simples não é carrinho de compra.

Ela só está pronta se:

- fica no client/localStorage;
- permite adicionar produto;
- permite remover produto;
- permite alterar quantidade;
- gera mensagem de WhatsApp com os produtos selecionados;
- não exige login;
- não cria pedido no banco;
- não tem checkout;
- não tem pagamento;
- não parece e-commerce tradicional.

### 5.5 Fotografia

Tasks da fotografia devem garantir:

- galeria organizada por álbuns/eventos;
- filtros por tipo de evento;
- álbum com nome, tipo, data opcional, cidade opcional e fotos;
- imagens otimizadas;
- página ou visualização individual do álbum;
- fotografia tratada como prova visual dos eventos/produtos da AlugaGames.

---

## 6. Critérios para portal administrativo

Uma task do admin só está pronta se:

- exige autenticação com Clerk;
- valida autorização do dono no servidor;
- tem formulários com validação client-side e server-side;
- exibe erros de forma compreensível;
- exibe confirmação para exclusão/desativação;
- registra auditoria em ações relevantes;
- não permite mutação por usuário não autorizado;
- não depende apenas de proteção visual.

### 6.1 Produtos

CRUD de produtos só está pronto se permite:

- criar produto;
- editar produto;
- desativar produto;
- marcar como indisponível;
- definir destaque;
- associar categorias;
- associar tags;
- editar descrição curta e completa;
- editar indicações de evento;
- editar informações técnicas;
- cadastrar URL de vídeo externo;
- gerenciar imagens;
- configurar SEO title e SEO description.

### 6.2 Categorias e tags

Tasks de categorias e tags só estão prontas se:

- permitem criar, editar e desativar;
- validam slug único;
- impedem quebra de relações existentes;
- não exibem categorias/tags inativas como opção pública;
- permitem uso em filtros.

### 6.3 Landing page editável

Tasks da LP no admin só estão prontas se:

- os blocos editáveis são controlados;
- o admin pode editar textos, imagens e CTAs definidos;
- o admin pode ocultar/exibir blocos quando previsto;
- o admin pode definir produtos destacados;
- o admin pode gerenciar logos, depoimentos e FAQ;
- não existe page builder livre fora do escopo.

### 6.4 Fotografia no admin

Tasks de fotografia só estão prontas se:

- o admin cria álbuns;
- o admin edita nome, tipo, data opcional e cidade opcional;
- o admin adiciona e remove fotos;
- fotos removidas deixam de aparecer no público;
- somente imagens válidas são aceitas.

### 6.5 Configurações do site

Tasks de configurações só estão prontas se:

- WhatsApp principal é editável;
- mensagens padrão são editáveis quando previsto;
- redes sociais são editáveis;
- alterações impactam o site público;
- inputs são validados no servidor.

---

## 7. Critérios de banco de dados

Uma task envolvendo banco só está pronta se:

- segue `/docs/architecture/03-banco-de-dados.md`;
- migration foi criada corretamente;
- nomes de tabelas e colunas são consistentes;
- relações foram representadas corretamente;
- constraints importantes foram definidas;
- índices necessários foram criados;
- dados sensíveis não são armazenados sem necessidade;
- features públicas filtram registros inativos;
- features administrativas mostram registros conforme necessário.

### 7.1 Drizzle

Tasks com Drizzle devem garantir:

- schema organizado;
- relações claras;
- tipos inferidos corretamente;
- consultas de banco em repositories pequenos e server-side;
- nenhum acesso ao banco em Client Component;
- nenhum acesso direto ao banco em page, componente, controller ou feature;
- validação antes de insert/update.

---

## 8. Critérios de SEO

Uma task pública só está pronta se considerar SEO quando aplicável.

- Página pública tem title e description adequados.
- Produto individual tem metadata própria.
- Slugs são amigáveis.
- Rotas admin são `noindex`.
- Páginas inexistentes retornam 404.
- Conteúdo principal é renderizável sem depender totalmente do client.
- Imagens importantes possuem alt text.
- Mudanças relevantes consideram sitemap e robots.

---

## 9. Critérios de performance

Uma task só está pronta se:

- não adiciona dependência pesada sem necessidade;
- usa imagens otimizadas;
- evita carregar dados desnecessários;
- evita Client Components quando Server Components resolvem;
- não cria re-renderizações óbvias e desnecessárias;
- paginação ou filtros são considerados quando a lista pode crescer;
- vídeos externos não bloqueiam carregamento inicial;
- admin pode ser menos otimizado que site público, mas não pode ser lento de forma grave.

---

## 10. Critérios de acessibilidade

Uma task de UI só está pronta se:

- botões são semanticamente botões;
- links são semanticamente links;
- inputs têm labels;
- erros de formulário são legíveis;
- componentes interativos funcionam por teclado quando aplicável;
- imagens públicas têm alt adequado;
- carrosséis/drawers/modais não prendem o usuário;
- contraste é adequado;
- layout não depende apenas de cor para transmitir informação.

---

## 11. Critérios de responsividade

Uma task de UI só está pronta se foi pensada para:

- mobile;
- tablet;
- desktop.

Deve ser verificado:

- header mobile;
- menu;
- cards de produtos;
- filtros;
- drawer/lista simples;
- formulários do admin;
- tabelas do admin;
- galerias de imagem;
- CTAs de WhatsApp.

---

## 12. Critérios de testes

Uma task só está pronta se os testes relevantes foram criados, atualizados ou justificados.

Todos os testes automatizados do sistema devem ficar em `__tests__`. Não misture `.test.ts` ou `.spec.ts` dentro de `src`.

### 12.1 Testes unitários

Aplicar para:

- helpers de WhatsApp;
- schemas de validação;
- regras de slug;
- filtros;
- formatação de mensagens;
- regras da lista simples.

### 12.2 Testes de integração

Aplicar para:

- Server Actions;
- consultas com Drizzle;
- criação/edição de produtos;
- filtros de produtos;
- upload, quando possível;
- autorização, quando possível.

### 12.3 E2E ou testes manuais guiados

Aplicar para:

- fluxo visitante → produto → WhatsApp;
- fluxo visitante → lista simples → WhatsApp;
- login admin;
- criar produto;
- editar produto;
- desativar produto;
- cadastrar imagem;
- editar LP;
- publicar álbum de fotografia.

### 12.4 Segurança

Sempre testar:

- acesso a `/admin` sem login;
- Server Action administrativa sem autorização;
- upload sem login;
- upload com tipo inválido;
- edição por usuário fora da allowlist;
- dados maliciosos em campos editáveis.

---

## 13. Critérios de documentação

Uma task só está pronta se:

- documentação impactada foi atualizada;
- decisões relevantes foram registradas;
- mudanças de arquitetura foram justificadas;
- mudanças de domínio foram refletidas nos docs;
- novas rotas foram adicionadas ao documento de rotas;
- novas tabelas foram adicionadas ao documento de banco;
- novas regras de negócio foram documentadas.

Quando uma task altera arquitetura de forma relevante, criar ou atualizar um ADR.

---

## 14. Critérios de revisão com IA

Após implementar uma task, a IA deve responder com:

- resumo do que foi feito;
- arquivos alterados;
- decisões tomadas;
- como testar manualmente;
- comandos executados;
- resultado de lint/build/test;
- riscos ou pendências;
- confirmação de segurança.

### 14.1 Perguntas obrigatórias de revisão

A IA deve revisar:

1. A task foi cumprida exatamente?
2. Alguma funcionalidade fora do escopo foi adicionada?
3. Alguma validação ficou só no frontend?
4. Toda mutação administrativa valida `requireAdmin()`?
5. Alguma rota admin ficou sem proteção?
6. Algum upload ficou inseguro?
7. Algum conteúdo editável pode gerar XSS?
8. Algum secret foi exposto?
9. Algum dado inativo aparece no site público?
10. A UI segue o design system?
11. A feature funciona no mobile?
12. A documentação impactada foi atualizada?

---

## 15. Comandos mínimos antes de concluir task

Antes de declarar a task pronta, executar os comandos disponíveis no projeto.

Exemplo, ajustar conforme package manager do repo:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Se algum comando não existir, a IA deve informar:

- qual comando tentou rodar;
- por que não rodou;
- se precisa criar esse script em outra task.

Não é permitido dizer que passou em lint/build/test sem executar.

---

## 16. Estados obrigatórios de UI

Toda interface que depende de dados deve considerar:

- estado carregando;
- estado vazio;
- estado de erro;
- estado de sucesso, quando aplicável.

Exemplos:

- Página de produtos sem produtos ativos.
- Categoria sem produtos.
- Galeria sem álbuns.
- Admin sem depoimentos cadastrados.
- Upload falhando.
- Produto salvo com sucesso.
- Produto desativado com sucesso.

---

## 17. Critérios de deploy

Uma task que será entregue para produção só está pronta se:

- build passa;
- envs obrigatórias estão configuradas;
- migrations foram aplicadas ou documentadas;
- storage está configurado;
- Clerk está configurado;
- domínio e redirects foram considerados quando aplicável;
- rotas admin estão protegidas;
- logs básicos funcionam;
- site público não expõe erros internos.

---

## 18. O que nunca pode ser feito para “terminar rápido”

É proibido:

- remover autenticação para facilitar teste;
- remover autorização;
- comentar validações;
- aceitar qualquer arquivo no upload;
- salvar imagem localmente em produção;
- expor stack trace para usuário;
- usar `any` para esconder erro de tipo sem justificativa;
- desativar lint;
- desativar build errors;
- ignorar falha de teste;
- criar checkout, pagamento ou login de cliente;
- transformar lista simples em carrinho persistente;
- criar page builder livre fora do escopo;
- adicionar biblioteca pesada sem necessidade.

---

## 19. Template de conclusão de task

Ao finalizar uma task, a IA deve responder no formato:

```md
## Resumo

Implementei ...

## Arquivos alterados

- `arquivo`: motivo
- `arquivo`: motivo

## Como testar manualmente

1. ...
2. ...
3. ...

## Comandos executados

- `npm run lint`: passou/falhou
- `npm run typecheck`: passou/falhou
- `npm run test`: passou/falhou
- `npm run build`: passou/falhou

## Segurança

- Autenticação validada: sim/não/não aplicável
- Autorização server-side validada: sim/não/não aplicável
- Input validado no servidor: sim/não/não aplicável
- Upload seguro: sim/não/não aplicável
- XSS considerado: sim/não/não aplicável

## Documentação

- Docs atualizados: sim/não
- Quais docs: ...

## Pendências

- ...
```

---

## 20. Checklist final rápido

Antes de marcar qualquer task como concluída:

```txt
[ ] Escopo cumprido sem adicionar coisa extra
[ ] Código na arquitetura correta
[ ] TypeScript sem gambiarra
[ ] Input validado no servidor
[ ] Autenticação/autorização quando necessário
[ ] Upload seguro quando necessário
[ ] Sem XSS óbvio em conteúdo editável
[ ] Estados de erro/loading/vazio tratados
[ ] Mobile considerado
[ ] SEO considerado quando público
[ ] Testes criados/atualizados/justificados
[ ] Lint executado
[ ] Typecheck executado
[ ] Build executado
[ ] Docs atualizados quando necessário
[ ] Riscos e pendências informados
```

---

## 21. Decisão final

A Definition of Done deste projeto prioriza:

1. segurança;
2. funcionamento real;
3. facilidade de gestão pelo dono;
4. conversão para WhatsApp;
5. qualidade visual;
6. código limpo;
7. documentação atualizada.

A IA pode acelerar o desenvolvimento, mas não pode reduzir o padrão de segurança e qualidade.
