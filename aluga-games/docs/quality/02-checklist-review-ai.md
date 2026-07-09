# 02 - Checklist de Revisão com IA

## Objetivo

Este documento define o checklist obrigatório para revisar qualquer implementação feita com IA no projeto AlugaGames.

O sistema será desenvolvido majoritariamente com apoio de IA. Por isso, nenhuma task deve ser considerada pronta apenas porque o código foi gerado, compilou ou parece funcionar visualmente.

A revisão deve verificar:

- aderência ao escopo;
- segurança;
- autorização;
- validação server-side;
- arquitetura;
- qualidade de código;
- testes;
- UX;
- SEO;
- performance;
- acessibilidade;
- riscos de produção.

Este checklist deve ser usado depois de cada task e antes de qualquer deploy.

---

## Documentos que a IA deve ler antes da revisão

Antes de revisar uma implementação, a IA deve ler, no mínimo:

```txt
/docs/product/00-visao-do-produto.md
/docs/product/02-escopo-do-produto.md
/docs/product/03-regras-de-negocio.md
/docs/architecture/01-arquitetura-de-pastas.md
/docs/architecture/03-banco-de-dados.md
/docs/architecture/05-contratos-de-actions-e-apis.md
/docs/architecture/07-autenticacao-e-autorizacao.md
/docs/architecture/08-seguranca.md
/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
/docs/quality/00-estrategia-de-testes.md
/docs/quality/01-definition-of-done.md
/docs/tasks/<task-atual>.md
```

Se a task envolver interface pública, também deve ler:

```txt
/docs/ui/00-design-system.md
/docs/ui/01-site-publico.md
/docs/ui/03-seo-performance-acessibilidade.md
```

Se a task envolver painel administrativo, também deve ler:

```txt
/docs/ui/02-portal-admin.md
```

---

## Regra central da revisão

A IA revisora deve procurar problemas, não confirmar expectativas.

A revisão deve assumir que:

- o código pode estar inseguro;
- a implementação pode ter fugido do escopo;
- a IA implementadora pode ter criado atalhos;
- validações podem ter sido feitas apenas no client;
- rotas administrativas podem estar visualmente protegidas, mas vulneráveis no servidor;
- uploads podem aceitar arquivos perigosos;
- conteúdos editáveis podem gerar XSS;
- alterações aparentemente pequenas podem quebrar arquitetura.

A revisão não deve aprovar uma task com problemas críticos de segurança.

---

## Classificação de problemas

Toda revisão deve classificar problemas em três níveis.

### P0 - Crítico

Impede aprovação da task.

Exemplos:

- rota admin acessível sem autenticação;
- Server Action sensível sem `requireAdmin()`;
- Route Handler sensível sem autorização;
- upload aceitando arquivo não permitido;
- validação apenas no frontend;
- conteúdo editável renderizado de forma insegura;
- segredo exposto no client;
- alteração fora do escopo que cria risco;
- exclusão destrutiva sem confirmação;
- falha que impede build ou funcionamento principal.

### P1 - Importante

Deve ser corrigido antes da próxima grande etapa.

Exemplos:

- código duplicado relevante;
- tratamento de erro fraco;
- UX ruim em estado de loading/erro;
- ausência de teste importante;
- documentação não atualizada;
- performance claramente piorada;
- função muito grande ou com responsabilidades misturadas.

### P2 - Melhoria

Pode virar backlog de polimento.

Exemplos:

- copy poderia ser melhor;
- componente pode ser mais reutilizável;
- microinteração ausente;
- organização visual pode melhorar;
- oportunidade de refatoração sem risco imediato.

---

## Resultado esperado da revisão

Toda revisão deve terminar com um dos status:

```txt
APROVADO
APROVADO COM RESSALVAS
REPROVADO
```

Use:

- `APROVADO` quando não houver P0 nem P1 relevante.
- `APROVADO COM RESSALVAS` quando houver apenas P2 ou P1 pequeno e controlado.
- `REPROVADO` quando houver qualquer P0.

---

# Checklist Geral

## 1. Escopo

Verificar:

- [ ] A task foi implementada exatamente como descrita.
- [ ] Nenhuma funcionalidade fora do escopo foi adicionada.
- [ ] Nenhuma regra de negócio foi inventada.
- [ ] Nenhuma página, tabela, rota ou fluxo extra foi criado sem necessidade.
- [ ] O sistema continua seguindo a decisão de não ser e-commerce tradicional.
- [ ] Não foi criado checkout.
- [ ] Arquivos de repository continuam agrupados por entidade/domínio, não por método.
- [ ] Cada método de repository executa uma única ação objetiva de banco.
- [ ] Nenhum repository chama outro repository para montar uma feature.
- [ ] Composição entre várias queries/repositories está em feature, controller ou action.
- [ ] Testes automatizados ficam em `__tests__`, não misturados dentro de `src`.
- [ ] Não foi criado pagamento online.
- [ ] Não foi criada área de cliente.
- [ ] Não foi criado login para visitante.
- [ ] Não foi criado pedido persistido no banco.
- [ ] Não foi criada lista de favoritos.

Perguntas obrigatórias:

```txt
A implementação resolve a task ou tenta resolver várias coisas ao mesmo tempo?
Existe algo novo que não estava pedido?
Alguma regra dos docs foi contrariada?
```

---

## 2. Arquitetura

Verificar:

- [ ] Rotas estão dentro de `/src/app`.
- [ ] Funcionalidades estão em `/src/domain/features` quando aplicável.
- [ ] Features usam uma feature por arquivo e nome por ação, como `retrieve-*`, `list-*`, `record-*`, `build-*`, `insert-*`, `update-*` ou `delete-*`.
- [ ] Nenhuma feature foi nomeada apenas pela entidade.
- [ ] Factories de feature usam `setup*Feature`, não `create*Feature`.
- [ ] Repositories, features e controllers concretos são instanciados apenas em `src/main/factories`.
- [ ] Controllers recebem dependências por injeção e não instanciam repositories ou features.
- [ ] Entidades compartilhadas estão em `/src/domain/entities`.
- [ ] Contratos de persistência/integração estão em `/src/domain/contracts`.
- [ ] Acesso direto ao banco em runtime está em `/src/infra/repositories`.
- [ ] Frontend chama controller, Server Action ou Route Handler, salvo feature simples e isolada.
- [ ] Repositories são pequenos e não montam DTO final de tela.
- [ ] Features concentram transformação, normalização, fallback e montagem de DTO quando aplicável.
- [ ] Componentes reutilizáveis estão em `/src/components`.
- [ ] Código de servidor está em `/src/server` quando aplicável.
- [ ] Regra de negócio não foi colocada diretamente em `page.tsx`.
- [ ] Componentes React não contêm lógica de banco.
- [ ] Features e mutações usam contratos/repositórios quando acessam banco.
- [ ] Helpers de WhatsApp estão centralizados.
- [ ] Validações foram extraídas e reaproveitadas.
- [ ] Não há arquivos grandes demais com responsabilidades misturadas.

Perguntas obrigatórias:

```txt
Esta implementação seria fácil de manter depois?
A próxima IA conseguiria entender onde alterar algo?
O código segue a arquitetura definida em /docs/architecture/01-arquitetura-de-pastas.md?
```

---

## 3. TypeScript e qualidade de código

Verificar:

- [ ] Não há `any` desnecessário.
- [ ] Não há `// @ts-ignore` ou `// @ts-expect-error` sem justificativa forte.
- [ ] Tipos de input e output estão claros.
- [ ] Funções têm responsabilidade única.
- [ ] Nomes de variáveis e funções são explícitos.
- [ ] Nomes são específicos, consistentes e fáceis de encontrar com `rg`.
- [ ] Funções longas foram quebradas em funções menores com uma responsabilidade.
- [ ] Condições complexas foram extraídas para helpers com nomes claros.
- [ ] Valores mágicos que representam regra foram extraídos para constantes nomeadas.
- [ ] Imports apenas de tipos usam `import type`.
- [ ] Não há código morto.
- [ ] Não há logs de debug permanentes.
- [ ] Não há comentários enganosos.
- [ ] Comentários explicam regra, fallback, limitação técnica ou cuidado de segurança, não o óbvio.
- [ ] Arquivos importantes têm comentário de topo curto quando isso ajuda agentes futuros.
- [ ] Funções exportadas ou pontos importantes têm JSDoc quando o contrato não é óbvio.
- [ ] Não há mock permanente em fluxo real.
- [ ] Estados de erro foram tratados.

Comandos esperados, adaptando ao projeto:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Se algum comando não existir, a IA deve registrar isso na revisão.

---

# Checklist de Segurança

## 4. Autenticação

Verificar:

- [ ] Admin usa Clerk.
- [ ] `/admin` está protegido por middleware/layout/guard adequado.
- [ ] `/admin/login` é a única rota admin pública.
- [ ] Usuário não autenticado não acessa dashboard.
- [ ] Usuário não autenticado não acessa páginas internas do admin.
- [ ] Estado visual do frontend não é usado como única proteção.

Perguntas obrigatórias:

```txt
Alguém sem login conseguiria acessar essa rota?
Alguém conseguiria chamar a action diretamente por POST?
```

---

## 5. Autorização

Verificar:

- [ ] Existe allowlist para o dono autorizado.
- [ ] `requireAdmin()` ou equivalente é chamado em toda mutação sensível.
- [ ] Server Actions administrativas verificam autorização no servidor.
- [ ] Route Handlers sensíveis verificam autorização no servidor.
- [ ] Upload verifica autorização no servidor.
- [ ] O sistema não confia apenas no Clerk visual/client-side.
- [ ] O `clerkUserId` do ator é registrado em logs administrativos quando aplicável.

Nenhuma destas ações pode existir sem autorização server-side:

```txt
- criar produto
- editar produto
- desativar produto
- excluir produto
- criar categoria
- editar categoria
- excluir categoria
- criar tag
- editar tag
- excluir tag
- editar landing page
- subir imagem
- remover imagem
- editar fotografia
- editar depoimentos
- editar FAQ
- editar logos
- editar configurações do site
- editar WhatsApp
```

---

## 6. Server Actions

Verificar:

- [ ] Recebem dados como não confiáveis.
- [ ] Validam input com Zod ou schema equivalente.
- [ ] Chamam `requireAdmin()` em mutações administrativas.
- [ ] Não expõem stack trace para o usuário.
- [ ] Retornam `ActionResult` ou padrão consistente.
- [ ] Chamam `revalidatePath()` quando necessário.
- [ ] Registram auditoria quando alteram dados importantes.
- [ ] Não recebem campos sensíveis controlados pelo client sem validação.
- [ ] Não permitem alteração de IDs arbitrários sem checagem.

Perguntas obrigatórias:

```txt
Esta action pode ser chamada diretamente por alguém malicioso?
Se sim, ela ainda está segura?
```

---

## 7. Route Handlers

Verificar:

- [ ] Só existem quando realmente necessários.
- [ ] Upload está em Route Handler ou fluxo server-side seguro.
- [ ] Tracking de clique no WhatsApp não recebe dados perigosos.
- [ ] Toda rota sensível valida método HTTP.
- [ ] Toda rota sensível valida autenticação/autorização.
- [ ] Toda rota valida input.
- [ ] Erros não vazam detalhes internos.
- [ ] Rate limit ou proteção equivalente é considerada para endpoints públicos.

---

## 8. Validação de dados

Verificar:

- [ ] Validação acontece no servidor.
- [ ] Validação do client é apenas melhoria de UX.
- [ ] Campos obrigatórios são verificados.
- [ ] Strings têm limite de tamanho.
- [ ] Slugs são normalizados.
- [ ] IDs são validados.
- [ ] URLs são validadas.
- [ ] URLs de vídeo aceitam apenas provedores permitidos, se aplicável.
- [ ] Campos booleanos não são confiados cegamente.
- [ ] Arrays têm tamanho máximo.
- [ ] Textos editáveis têm limite e tratamento seguro.

---

## 9. Banco de dados

Verificar:

- [ ] Drizzle é usado de forma consistente.
- [ ] Não há SQL raw inseguro.
- [ ] Se houver SQL raw, ele é parametrizado.
- [ ] Relações seguem o modelo definido em `/docs/architecture/03-banco-de-dados.md`.
- [ ] Não foram criadas tabelas fora do escopo.
- [ ] Não foi criada tabela de pedidos.
- [ ] Não foi criada tabela de pagamentos.
- [ ] Não foi criada tabela de clientes visitantes.
- [ ] Não foi criada tabela de favoritos.
- [ ] Migrations são claras e reversíveis quando aplicável.
- [ ] Campos de auditoria existem quando necessário.
- [ ] Exclusões destrutivas são evitadas quando desativação resolve.

---

## 10. Upload e mídias

Verificar:

- [ ] Upload exige admin autorizado.
- [ ] Arquivo tem tamanho máximo.
- [ ] Extensão é validada.
- [ ] MIME type é validado.
- [ ] Apenas `jpg`, `jpeg`, `png`, `webp` são aceitos.
- [ ] Nome original do arquivo não é usado diretamente.
- [ ] Nome final é gerado pelo sistema.
- [ ] Arquivo não é salvo dentro do repositório.
- [ ] Arquivo é salvo em object storage.
- [ ] URL pública é armazenada no banco.
- [ ] Imagem tem `altText` quando usada no site público.
- [ ] Remoção de imagem remove ou marca corretamente no banco.
- [ ] Upload de vídeo não foi implementado como arquivo.
- [ ] Vídeo entra apenas como URL externa, quando aplicável.

Perguntas obrigatórias:

```txt
Um atacante conseguiria subir HTML, SVG, JS, PHP, EXE ou arquivo disfarçado?
Um arquivo grande conseguiria derrubar o servidor?
O sistema confia no nome original do arquivo?
```

---

## 11. XSS e conteúdo editável

Verificar:

- [ ] Conteúdo vindo do admin é tratado como não confiável.
- [ ] Não há `dangerouslySetInnerHTML` sem sanitização explícita.
- [ ] Markdown/HTML livre não foi criado sem necessidade.
- [ ] Textos editáveis são renderizados como texto seguro.
- [ ] URLs de imagem são validadas.
- [ ] URLs de vídeo são validadas.
- [ ] Links externos usam `rel="noopener noreferrer"` quando abrem nova aba.
- [ ] Inputs de FAQ, depoimentos, títulos e descrições têm limites.

Pergunta obrigatória:

```txt
Se o admin colar um script em um campo editável, ele executa no site público?
```

---

## 12. Secrets e variáveis de ambiente

Verificar:

- [ ] Nenhum secret aparece no código.
- [ ] Nenhum secret aparece no frontend.
- [ ] Variáveis públicas usam prefixo público apenas quando realmente podem ser públicas.
- [ ] Variáveis privadas ficam apenas no servidor.
- [ ] Existe validação de envs obrigatórias.
- [ ] `.env` não é commitado.
- [ ] Logs não imprimem secrets.

---

## 13. LocalStorage e lista de produtos

Verificar:

- [ ] LocalStorage guarda apenas IDs, nomes ou dados não sensíveis.
- [ ] A lista não é tratada como pedido real.
- [ ] A lista não cria orçamento no banco.
- [ ] O usuário pode remover itens.
- [ ] O usuário pode alterar quantidade.
- [ ] A mensagem do WhatsApp é montada de forma segura.
- [ ] Dados vindos do localStorage não são usados para ações sensíveis.

---

## 14. WhatsApp

Verificar:

- [ ] Número do WhatsApp vem de configuração validada.
- [ ] Mensagens são montadas com encoding correto.
- [ ] Nome do produto é tratado como texto.
- [ ] Lista de produtos não permite injeção de URL maliciosa.
- [ ] Botões indicam claramente que o usuário será levado ao WhatsApp.
- [ ] Cliques podem ser registrados sem salvar dados pessoais sensíveis.

---

# Checklist de Produto

## 15. Produtos

Verificar:

- [ ] Produto tem nome.
- [ ] Produto tem slug único.
- [ ] Produto pode ter múltiplas categorias.
- [ ] Produto pode ter tags.
- [ ] Produto pode ter múltiplas imagens.
- [ ] Produto pode ter vídeo por URL.
- [ ] Produto pode ser ativo/inativo/indisponível.
- [ ] Produto pode aparecer como destaque.
- [ ] Produto não exibe preço público.
- [ ] Produto tem informações técnicas opcionais.
- [ ] Produto tem SEO title e SEO description quando aplicável.
- [ ] Produto inativo não aparece no site público.
- [ ] Produto indisponível aparece com estado claro, se a regra permitir.

---

## 16. Categorias e tags

Verificar:

- [ ] Admin pode criar categorias.
- [ ] Admin pode editar categorias.
- [ ] Admin pode desativar categorias.
- [ ] Produtos podem pertencer a mais de uma categoria.
- [ ] Tags ajudam busca e filtro.
- [ ] Categorias e tags não criam páginas públicas separadas obrigatórias.
- [ ] Página `/produtos` continua sendo a central de catálogo.

---

## 17. Landing page editável

Verificar:

- [ ] LP segue blocos controlados.
- [ ] Não virou page builder livre complexo.
- [ ] Admin pode editar hero.
- [ ] Admin pode editar imagens principais.
- [ ] Admin pode escolher produtos em destaque.
- [ ] Admin pode editar depoimentos.
- [ ] Admin pode editar FAQs.
- [ ] Admin pode editar logos/clientes.
- [ ] Admin pode ocultar/exibir blocos quando previsto.
- [ ] Campos editáveis são seguros contra XSS.
- [ ] Alterações da LP revalidam páginas públicas necessárias.

---

## 18. Fotografia

Verificar:

- [ ] Fotografia é galeria de registros da AlugaGames.
- [ ] Admin cria álbuns/eventos.
- [ ] Álbum tem nome.
- [ ] Álbum pode ter tipo de evento.
- [ ] Álbum pode ter data opcional.
- [ ] Álbum pode ter cidade opcional.
- [ ] Álbum tem múltiplas fotos.
- [ ] Fotos têm upload seguro.
- [ ] Página pública permite ver/filtrar álbuns.
- [ ] Fotografia não virou serviço separado com checkout/orçamento próprio.

---

## 19. Páginas institucionais

Verificar:

- [ ] Representante AlugaGames é página estática.
- [ ] Por que contratar é página estática.
- [ ] Trabalhe conosco é link no footer para WhatsApp.
- [ ] Não foi criado formulário de currículo.
- [ ] Não foi criado armazenamento de currículo.
- [ ] Conteúdo institucional segue visual premium.

---

# Checklist de UI, UX, SEO e Performance

## 20. UI pública

Verificar:

- [ ] Interface segue o estilo premium/profissional da referência visual.
- [ ] Fundo claro/off-white predomina.
- [ ] Verde AlugaGames é usado como cor de ação.
- [ ] CTAs são claros e fortes.
- [ ] O site não parece loja virtual genérica.
- [ ] Não há linguagem de compra, checkout ou pagamento.
- [ ] Cards são limpos.
- [ ] Layout funciona em mobile.
- [ ] Header é claro.
- [ ] Footer tem contatos e links úteis.

---

## 21. Portal admin

Verificar:

- [ ] Interface é simples para o dono usar.
- [ ] Formulários têm labels claros.
- [ ] Erros aparecem perto dos campos.
- [ ] Ações destrutivas têm confirmação.
- [ ] Estados de loading existem.
- [ ] Estados vazios existem.
- [ ] Estados de erro existem.
- [ ] Feedback de sucesso existe.
- [ ] Admin não precisa entender termos técnicos.

---

## 22. SEO

Verificar:

- [ ] Páginas públicas têm metadata.
- [ ] Produtos individuais podem ser indexados.
- [ ] `/admin` não indexa.
- [ ] Slugs são amigáveis.
- [ ] Imagens têm alt text.
- [ ] Sitemap é considerado.
- [ ] Robots não bloqueia páginas públicas importantes.
- [ ] Títulos e descrições não são duplicados desnecessariamente.

---

## 23. Performance

Verificar:

- [ ] Imagens usam otimização adequada.
- [ ] Imagens têm tamanho definido quando possível.
- [ ] Carrosséis não carregam dezenas de imagens pesadas de uma vez.
- [ ] Vídeos externos usam embed leve ou lazy loading.
- [ ] Páginas públicas não dependem de JavaScript desnecessário.
- [ ] Componentes client-side são usados apenas quando necessário.
- [ ] Admin pode ser mais dinâmico, mas site público deve ser rápido.

---

## 24. Acessibilidade

Verificar:

- [ ] Botões têm nomes acessíveis.
- [ ] Links são identificáveis.
- [ ] Modais/drawers podem ser usados por teclado.
- [ ] FAQ usa estrutura acessível.
- [ ] Contraste é suficiente.
- [ ] Imagens importantes têm alt.
- [ ] Imagens decorativas usam alt vazio quando adequado.
- [ ] Formulários têm labels.
- [ ] Foco visível não foi removido.

---

# Checklist de Testes

## 25. Testes automatizados

Verificar se foram criados/atualizados quando aplicável:

- [ ] Testes de schema/validação.
- [ ] Testes de helpers de WhatsApp.
- [ ] Testes de filtros de produtos.
- [ ] Testes de lista de produtos/localStorage.
- [ ] Testes de permissões/admin.
- [ ] Testes de upload.
- [ ] Testes de features/repositories críticos.

---

## 26. Testes manuais mínimos

Toda task relevante deve registrar testes manuais executados.

Exemplos:

```txt
- Acessar site público no desktop.
- Acessar site público no mobile.
- Filtrar produtos.
- Abrir produto individual.
- Enviar produto para WhatsApp.
- Adicionar produtos à lista.
- Alterar quantidade na lista.
- Remover produto da lista.
- Enviar lista para WhatsApp.
- Tentar acessar /admin sem login.
- Logar como admin autorizado.
- Criar produto.
- Editar produto.
- Desativar produto.
- Subir imagem válida.
- Tentar subir arquivo inválido.
```

---

## 27. Testes de segurança manuais

Sempre que a task envolver admin, actions, API ou upload, testar:

```txt
- Acessar rota admin deslogado.
- Chamar action/route handler sem autenticação.
- Chamar action/route handler com usuário não autorizado.
- Enviar payload inválido.
- Enviar payload com campos extras.
- Enviar texto com <script>alert(1)</script>.
- Tentar upload de .svg, .html, .js ou arquivo grande.
- Confirmar que erro não mostra stack trace.
```

---

# Formato obrigatório de resposta da revisão

A IA revisora deve responder neste formato:

```md
# Revisão da Task <número/nome>

## Status

APROVADO | APROVADO COM RESSALVAS | REPROVADO

## Resumo

Breve resumo do que foi revisado.

## Arquivos revisados

- arquivo 1
- arquivo 2
- arquivo 3

## Pontos aprovados

- ...

## Problemas P0

- [ ] Descrição do problema
  - Arquivo:
  - Risco:
  - Correção recomendada:

## Problemas P1

- [ ] Descrição do problema
  - Arquivo:
  - Risco:
  - Correção recomendada:

## Problemas P2

- [ ] Descrição do problema
  - Arquivo:
  - Sugestão:

## Segurança

- Autenticação:
- Autorização:
- Validação server-side:
- Upload:
- XSS:
- Secrets:
- Logs:

## Testes executados

- Comando 1: resultado
- Comando 2: resultado
- Teste manual 1: resultado

## Riscos restantes

- ...

## Decisão final

Explicar por que a task foi aprovada ou reprovada.
```

---

# Prompts prontos para revisão

## Prompt de revisão geral de task

```txt
Leia os documentos relevantes em /docs, especialmente:

- /docs/product/02-escopo-do-produto.md
- /docs/product/03-regras-de-negocio.md
- /docs/architecture/01-arquitetura-de-pastas.md
- /docs/architecture/05-contratos-de-actions-e-apis.md
- /docs/architecture/08-seguranca.md
- /docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
- /docs/quality/01-definition-of-done.md
- /docs/quality/02-checklist-review-ai.md
- /docs/tasks/<task-atual>.md

Revise a implementação da task atual.

Não implemente nada agora.
Primeiro, analise o diff e identifique problemas.
Classifique cada problema como P0, P1 ou P2.
Dê atenção máxima a segurança, autorização, validação server-side, upload, XSS e escopo.

Responda usando exatamente o formato obrigatório de revisão definido em /docs/quality/02-checklist-review-ai.md.
```

---

## Prompt de revisão de segurança

```txt
Faça uma revisão de segurança da implementação atual.

Considere que o sistema será atacado por alguém tentando:

- acessar /admin sem login;
- chamar Server Actions diretamente;
- chamar Route Handlers diretamente;
- burlar a allowlist do dono;
- subir arquivo malicioso;
- injetar script em campos editáveis;
- alterar IDs manualmente;
- enviar payloads inválidos;
- descobrir secrets;
- explorar localStorage;
- manipular mensagens de WhatsApp.

Leia:

- /docs/architecture/07-autenticacao-e-autorizacao.md
- /docs/architecture/08-seguranca.md
- /docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
- /docs/quality/02-checklist-review-ai.md

Não corrija ainda.
Liste vulnerabilidades e classifique em P0, P1 ou P2.
Se houver qualquer P0, marque a task como REPROVADA.
```

---

## Prompt de revisão de upload

```txt
Revise especificamente o fluxo de upload de imagens.

Verifique:

- autenticação;
- autorização;
- allowlist do dono;
- tamanho máximo;
- MIME type;
- extensão;
- nome seguro do arquivo;
- uso de object storage;
- bloqueio de SVG/HTML/JS;
- tratamento de erro;
- auditoria;
- uso seguro da URL pública.

Leia:

- /docs/architecture/06-upload-e-midias.md
- /docs/architecture/08-seguranca.md
- /docs/quality/02-checklist-review-ai.md

Classifique problemas em P0, P1 ou P2.
```

---

## Prompt de revisão do portal admin

```txt
Revise o portal admin implementado.

Verifique:

- proteção de rotas com Clerk;
- autorização server-side com allowlist;
- UX para o dono;
- formulários;
- estados de loading, erro, vazio e sucesso;
- ações destrutivas com confirmação;
- validação server-side;
- logs administrativos;
- revalidação das páginas públicas;
- consistência com /docs/ui/02-portal-admin.md.

Não aprove se alguma mutação administrativa não chamar requireAdmin() ou equivalente.
```

---

## Prompt de revisão do site público

```txt
Revise o site público implementado.

Verifique:

- aderência ao design premium/profissional definido em /docs/ui/00-design-system.md;
- clareza dos CTAs para WhatsApp;
- ausência de linguagem de e-commerce tradicional;
- funcionamento mobile;
- SEO básico;
- performance de imagens;
- acessibilidade;
- filtros de produtos;
- página individual de produto;
- lista simples de produtos;
- montagem correta das mensagens de WhatsApp.

Classifique problemas em P0, P1 ou P2.
```

---

## Prompt de red team

```txt
Atue como um revisor de segurança ofensivo, mas sem executar ataques reais externos.

Analise o código local e tente encontrar formas pelas quais um atacante poderia:

- acessar o admin;
- executar uma action sem permissão;
- modificar produtos;
- apagar imagens;
- subir arquivos maliciosos;
- injetar JavaScript no site público;
- vazar secrets;
- causar erro em produção;
- manipular o WhatsApp link;
- explorar falta de validação.

Não altere o código.
Entregue apenas um relatório com achados classificados como P0, P1 e P2.
```

---

## Prompt de revisão antes do deploy

```txt
Faça uma revisão final antes do deploy.

Verifique:

- build;
- lint;
- typecheck;
- testes;
- envs obrigatórias;
- proteção do admin;
- allowlist do dono;
- upload seguro;
- páginas públicas;
- metadata;
- sitemap/robots;
- responsividade;
- WhatsApp;
- erros sem stack trace;
- ausência de secrets no client;
- ausência de funcionalidades fora do escopo.

Use /docs/quality/02-checklist-review-ai.md e marque o deploy como:

- LIBERADO
- LIBERADO COM RISCO CONTROLADO
- BLOQUEADO
```

---

# Anti-padrões que a IA não pode aceitar

A revisão deve reprovar ou apontar com severidade quando encontrar:

```txt
- “Depois adicionamos segurança”
- “Validação só no frontend já basta”
- “A rota está escondida, então está segura”
- “Só o dono sabe a URL”
- “O Clerk já resolve tudo sozinho”
- “Upload aceita qualquer imagem porque é mais simples”
- “dangerouslySetInnerHTML para facilitar”
- “Usar any para resolver rápido”
- “Comentar o teste que falha”
- “Remover validação para passar no build”
- “Criar checkout porque parece útil”
- “Criar tabela de pedidos sem pedido no escopo”
- “Criar usuário visitante sem necessidade”
```

---

# Checklist rápido por tipo de task

## Task de produto

```txt
Escopo
Validação server-side
requireAdmin em mutações
Drizzle seguro
Slug único
Produto ativo/inativo
Sem preço público
Revalidação
Auditoria
Testes
```

## Task de LP

```txt
Blocos controlados
Sem page builder livre
Controller/action como fronteira
Repository pequeno
Fallback na feature
Campos seguros
Upload seguro
XSS
Revalidação
Design premium
Mobile
```

## Task de fotografia

```txt
Álbuns
Fotos múltiplas
Upload seguro
Filtros
Alt text
Admin protegido
Página pública otimizada
```

## Task de WhatsApp/lista

```txt
Sem checkout
Sem pedido no banco
LocalStorage não sensível
Mensagem encodeada
Quantidade/remoção
CTA claro
Tracking opcional seguro
```

## Task de admin

```txt
Clerk
Allowlist
requireAdmin
Formulários
Validação server-side
Confirmação em exclusões
Logs
Estados de UI
```

## Task de upload

```txt
Admin autorizado
Tamanho máximo
MIME type
Extensão
Nome seguro
Object storage
Bloqueio de SVG/HTML/JS
Erro seguro
Auditoria
```

---

# Definição de aprovação segura

Uma implementação só pode ser aprovada quando:

- não há problemas P0;
- escopo foi respeitado;
- autenticação e autorização foram aplicadas corretamente;
- inputs são validados no servidor;
- não há risco óbvio de XSS;
- uploads, se existirem, são restritos e seguros;
- código segue a arquitetura definida;
- comandos principais passam ou falhas são justificadas;
- testes manuais mínimos foram documentados;
- riscos restantes são conhecidos e aceitáveis.

Se houver dúvida razoável sobre segurança, a decisão deve ser `REPROVADO` ou `APROVADO COM RESSALVAS`, nunca `APROVADO`.
