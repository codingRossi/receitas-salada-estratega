# 01 - Políticas de Desenvolvimento Seguro com IA

## 1. Objetivo

Este documento define as políticas obrigatórias de desenvolvimento seguro para o sistema da AlugaGames.

O projeto será desenvolvido com forte apoio de IA, portanto a segurança não pode depender apenas de "confiança no código gerado". Toda entrega deve passar por regras explícitas, validação server-side, revisão de segurança e critérios objetivos de aceite.

Este documento deve ser lido antes de qualquer task que altere:

- autenticação;
- autorização;
- rotas do admin;
- Server Actions;
- Route Handlers;
- banco de dados;
- upload de arquivos;
- conteúdo editável pelo admin;
- variáveis de ambiente;
- integração com Clerk;
- integração com Railway Buckets;
- lógica de WhatsApp;
- tracking de cliques.

## 2. Princípios obrigatórios

### 2.1. Segurança não é etapa final

Segurança deve existir desde o planejamento da task.

Toda task precisa responder:

1. Esta task cria, altera ou remove algum dado?
2. Esta task expõe dado para o client?
3. Esta task depende de autenticação?
4. Esta task depende de autorização?
5. Esta task aceita input do usuário?
6. Esta task faz upload, delete ou leitura de arquivos?
7. Esta task altera conteúdo público do site?
8. Esta task pode causar XSS, vazamento de dado ou alteração indevida?

Se qualquer resposta for "sim", a task precisa ter seção de segurança.

### 2.2. Deny by default

Nada administrativo deve ser acessível por padrão.

A regra é:

- público só pode ler conteúdo ativo e publicado;
- admin precisa estar autenticado;
- admin precisa estar autorizado na allowlist;
- toda mutação deve validar permissão no servidor;
- nunca confiar apenas na interface.

### 2.3. Autenticação não é autorização

Clerk confirma quem está logado.

O sistema precisa confirmar se esse usuário logado é o dono autorizado.

Portanto:

- login via Clerk é obrigatório para acessar `/admin`;
- allowlist de admin é obrigatória;
- `requireAdmin()` é obrigatório em toda Server Action administrativa;
- `requireAdmin()` é obrigatório em todo Route Handler sensível;
- nenhum `userId`, `email` ou `role` vindo do client pode ser usado como prova de autorização.

### 2.4. Server Actions são tratadas como endpoints públicos

Toda Server Action deve ser considerada chamável por requisição direta.

Não é permitido assumir que uma Server Action está segura apenas porque ela é usada por um botão dentro do admin.

Toda Server Action administrativa deve seguir esta ordem:

1. verificar autenticação;
2. verificar autorização com `requireAdmin()`;
3. validar input com schema server-side;
4. executar regra de negócio;
5. gravar auditoria quando alterar estado;
6. retornar erro genérico e seguro quando falhar;
7. revalidar rotas afetadas quando necessário.

### 2.5. Todo input é hostil até ser validado

Entradas vindas de formulários, URL, query params, localStorage, headers, arquivos, actions ou APIs devem ser consideradas não confiáveis.

Regra obrigatória:

- validar com Zod ou schema equivalente no servidor;
- normalizar strings antes de salvar;
- limitar tamanho de campos;
- validar formatos de URL;
- validar slugs;
- validar enums;
- validar arrays e limites de quantidade;
- rejeitar campos extras quando possível.

### 2.6. Conteúdo editável pelo admin também é input não confiável

Mesmo que apenas o dono use o painel, textos, títulos, descrições, FAQs, depoimentos, nomes de produtos e legendas devem ser tratados como conteúdo não confiável.

Regra obrigatória:

- não usar `dangerouslySetInnerHTML` no MVP;
- não aceitar HTML livre no admin;
- renderizar textos como texto comum;
- se Markdown for adicionado no futuro, sanitizar antes de renderizar;
- URLs externas precisam ser validadas;
- vídeos externos precisam ser limitados a provedores permitidos.

## 3. Padrão de desenvolvimento com IA

### 3.1. Toda task precisa ter escopo fechado

A IA não deve receber pedidos como:

> Faça o admin inteiro.

A IA deve receber tasks pequenas, com:

- objetivo;
- arquivos de documentação a ler;
- escopo;
- fora do escopo;
- riscos de segurança;
- critérios de aceite;
- checklist de teste.

### 3.2. Nenhuma implementação deve começar sem plano técnico

Antes de escrever código, a IA deve responder:

1. Quais arquivos pretende alterar?
2. Qual fluxo será implementado?
3. Quais inputs serão validados?
4. Quais Server Actions ou Route Handlers serão criados?
5. Onde `requireAdmin()` será usado?
6. Quais riscos de segurança existem?
7. Como a feature será testada?

Só depois disso a implementação deve começar.

### 3.3. A IA não pode alterar decisões de segurança sem autorização

A IA não pode, por conta própria:

- remover `requireAdmin()`;
- relaxar validações;
- permitir upload de tipos novos;
- tornar bucket público sem validação;
- expor variável secreta no client;
- substituir Clerk por autenticação improvisada;
- criar tabela própria de senha;
- criar endpoint público de mutação;
- remover auditoria;
- usar `dangerouslySetInnerHTML`;
- desativar lint, typecheck ou testes;
- usar `// @ts-ignore` para contornar erro de segurança.

### 3.4. Toda entrega da IA deve ter revisão adversarial

Depois de implementar uma task, rode uma segunda revisão com prompt adversarial:

```md
Revise esta implementação como um auditor de segurança ofensivo.
Procure formas de:
- acessar o admin sem permissão;
- chamar Server Actions diretamente;
- burlar validação;
- fazer upload malicioso;
- causar XSS;
- vazar secrets;
- alterar dados sem autorização;
- quebrar isolamento entre site público e admin;
- causar perda de dados.

Liste vulnerabilidades reais ou potenciais.
Não elogie o código.
Não sugira melhorias cosméticas.
Foquue apenas em segurança, dados e estabilidade.
```

Nenhuma task sensível deve ser considerada finalizada sem essa revisão.

## 4. Políticas de autenticação e autorização

### 4.1. Clerk

O sistema usará Clerk para autenticação do admin.

Regras:

- `/admin/login` é pública;
- todo o restante de `/admin` exige login;
- o middleware deve proteger explicitamente as rotas administrativas;
- o layout do admin também deve validar autenticação;
- Server Actions e Route Handlers não podem depender apenas do middleware;
- `requireAdmin()` deve validar o `userId` do Clerk contra `CLERK_ADMIN_USER_IDS`.

### 4.2. Allowlist do dono

Como o produto terá apenas um dono, a política é allowlist.

Variável recomendada:

```txt
CLERK_ADMIN_USER_IDS=user_xxx,user_yyy
```

Regra:

- usuário autenticado, mas fora da allowlist, não é admin;
- usuário fora da allowlist não pode ler painel;
- usuário fora da allowlist não pode criar, editar, deletar ou subir arquivos;
- falhas de autorização devem retornar erro seguro.

### 4.3. Função obrigatória `requireAdmin()`

Deve existir um helper centralizado.

Exemplo conceitual:

```ts
export async function requireAdmin() {
  const { userId } = await auth()

  if (!userId) {
    throw new UnauthorizedError()
  }

  if (!isAllowedAdmin(userId)) {
    throw new ForbiddenError()
  }

  return { userId }
}
```

Regra:

- não duplicar lógica de admin em vários arquivos;
- não aceitar admin vindo do client;
- não usar email como única prova de autorização se o `userId` está disponível;
- não salvar role local sem necessidade no MVP.

## 5. Políticas para Server Actions

### 5.1. Estrutura obrigatória

Toda Server Action administrativa deve seguir este padrão:

```ts
export async function actionName(input: unknown): Promise<ActionResult> {
  const admin = await requireAdmin()

  const parsed = schema.safeParse(input)
  if (!parsed.success) {
    return validationError(parsed.error)
  }

  try {
    const result = await useCase(parsed.data, admin)
    await recordAdminAuditLog(...)
    revalidatePath(...)
    return success(result)
  } catch (error) {
    return safeServerError(error)
  }
}
```

### 5.2. Proibições

Server Actions administrativas não podem:

- receber `userId` do client;
- receber `isAdmin` do client;
- receber `role` do client;
- confiar em IDs sem checar existência no banco;
- fazer mutation sem validação;
- retornar stack trace;
- retornar dados internos sensíveis;
- fazer upload sem validação de arquivo;
- permitir exclusão destrutiva sem confirmação de regra.

### 5.3. Validação obrigatória

Cada action precisa validar:

- tipos;
- campos obrigatórios;
- tamanho máximo de strings;
- formato de slug;
- enums;
- arrays;
- IDs;
- URLs;
- limites de quantidade;
- campos opcionais.

## 6. Políticas para Route Handlers

### 6.1. Quando usar Route Handlers

Route Handlers só devem ser usados para:

- upload de arquivos;
- tracking de cliques públicos no WhatsApp;
- webhooks, se existirem no futuro;
- endpoints que precisem de HTTP explícito.

Não criar API REST completa para o admin se Server Actions resolverem o caso.

### 6.2. Route Handlers administrativos

Todo Route Handler administrativo deve:

- chamar `requireAdmin()`;
- validar método HTTP;
- validar body;
- validar tamanho do payload;
- retornar erros seguros;
- aplicar rate limit quando fizer sentido;
- registrar auditoria se alterar dados.

### 6.3. Route Handlers públicos

Route Handlers públicos, como tracking de clique no WhatsApp, devem:

- aceitar payload mínimo;
- validar tudo com schema;
- nunca aceitar dados sensíveis;
- nunca retornar dados administrativos;
- aplicar rate limit;
- ignorar ou truncar campos suspeitos;
- não permitir escrita arbitrária no banco.

## 7. Políticas de upload e mídias

### 7.1. Storage

As imagens devem ficar em object storage, preferencialmente Railway Buckets, e não no filesystem da aplicação.

Motivos:

- deploys podem recriar filesystem;
- storage local dificulta escala;
- object storage é mais adequado para imagens persistentes;
- credenciais e permissões podem ser isoladas.

### 7.2. Tipos permitidos

Permitidos:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

Proibidos no MVP:

- `.svg`
- `.html`
- `.js`
- `.pdf`
- `.zip`
- `.exe`
- `.php`
- `.xml`
- vídeos enviados diretamente;
- qualquer arquivo fora da lista permitida.

Vídeos de produto devem ser URL externa validada, não upload.

### 7.3. Validação obrigatória de arquivo

Todo upload deve validar:

- usuário admin com `requireAdmin()`;
- tamanho máximo;
- extensão;
- MIME type;
- assinatura real do arquivo/magic bytes quando possível;
- quantidade máxima de arquivos por operação;
- nome final gerado pelo servidor;
- pasta/prefixo de destino controlado pelo servidor.

### 7.4. Nome de arquivo

Nunca usar o nome original como nome final.

O nome final deve ser gerado pelo servidor, por exemplo:

```txt
products/{productId}/{uuid}.webp
photography/{albumId}/{uuid}.webp
landing-page/{blockId}/{uuid}.webp
logos/{uuid}.webp
```

### 7.5. Imagens públicas

Antes de uma imagem ser exibida publicamente:

- o upload precisa ter sido validado;
- a imagem precisa estar associada a uma entidade permitida;
- o registro no banco precisa conter alt text quando aplicável;
- a imagem não pode depender de path informado pelo client.

### 7.6. Exclusão de mídias

Ao remover imagem pelo admin:

- remover ou marcar como inativa no banco;
- remover objeto do bucket quando seguro;
- registrar auditoria;
- não aceitar path arbitrário vindo do client.

## 8. Políticas de banco de dados

### 8.1. Drizzle

O banco usará Drizzle com PostgreSQL.

Regras:

- queries devem usar Drizzle/query builder;
- evitar SQL raw;
- se SQL raw for necessário, justificar no código e na task;
- nunca interpolar input em SQL manual;
- toda migration deve ser revisada;
- migrations destrutivas precisam de plano de backup.

### 8.2. Integridade

O banco deve ter:

- slugs únicos onde necessário;
- foreign keys;
- timestamps;
- status ativo/inativo;
- índices em campos de filtro;
- auditoria para ações administrativas importantes.

### 8.3. Soft delete

Para produtos, categorias, tags, LP, álbuns e fotos, preferir desativar/inativar em vez de excluir fisicamente quando isso evitar perda acidental.

Exclusão física pode existir para imagens, mas precisa ser protegida.

## 9. Políticas contra XSS e conteúdo malicioso

### 9.1. HTML livre proibido no MVP

O admin não deve cadastrar HTML livre.

Campos como descrição, FAQ, depoimento, título e subtítulo devem ser texto puro.

### 9.2. `dangerouslySetInnerHTML` proibido

Não usar `dangerouslySetInnerHTML`.

Exceção futura só pode existir se:

- houver sanitização robusta;
- houver justificativa documentada;
- houver testes de XSS;
- houver revisão de segurança.

### 9.3. URLs externas

URLs externas precisam:

- começar com `https://`;
- pertencer a domínios permitidos quando possível;
- não aceitar `javascript:`;
- não aceitar `data:`;
- não aceitar URLs malformadas.

### 9.4. Conteúdo renderizado no site público

O site público deve renderizar apenas:

- produtos ativos;
- categorias ativas;
- tags ativas;
- imagens ativas;
- blocos publicados;
- FAQs ativas;
- depoimentos ativos;
- logos ativos.

## 10. Políticas para lista de produtos e WhatsApp

### 10.1. Lista de produtos no client

A lista de produtos selecionados pelo visitante fica no client/localStorage.

Ela não é pedido, não é orçamento persistido e não é fonte confiável.

Regras:

- validar IDs antes de montar mensagem;
- não confiar em nome/preço vindo do localStorage;
- buscar dados atuais dos produtos quando necessário;
- limitar quantidade de itens;
- permitir remover itens;
- permitir alterar quantidade;
- não salvar dados pessoais.

### 10.2. Mensagem de WhatsApp

A mensagem deve ser montada com dados seguros.

Regras:

- encode correto da mensagem;
- não inserir HTML;
- não inserir scripts;
- não permitir URL arbitrária;
- número de WhatsApp vem de configuração validada;
- mensagem varia por contexto: produto, lista, trabalhe conosco, institucional.

### 10.3. Tracking de cliques

Se houver tracking de cliques:

- registrar somente dados mínimos;
- não coletar dados pessoais sem necessidade;
- aplicar rate limit;
- validar tipo de clique;
- não usar tracking como dado financeiro ou confirmação de orçamento.

## 11. Políticas de variáveis de ambiente e secrets

### 11.1. Secrets nunca vão para o client

Somente variáveis com prefixo público apropriado podem ser usadas no client.

Proibido expor:

- chave secreta do Clerk;
- credenciais do banco;
- credenciais do Railway Bucket;
- tokens internos;
- URLs privadas;
- chaves de assinatura.

### 11.2. Validação de env

O projeto deve ter validação centralizada de variáveis de ambiente.

Exemplo de arquivo:

```txt
/src/server/env.ts
```

Toda variável obrigatória deve ser validada no boot/build.

### 11.3. Ambientes separados

Devem existir ambientes separados para:

- desenvolvimento;
- preview/staging;
- produção.

Nunca usar segredo de produção em ambiente local compartilhado com IA.

### 11.4. Vazamento de segredo

Se uma chave for exposta:

1. rotacionar imediatamente;
2. remover do histórico quando possível;
3. revisar logs;
4. revisar uso indevido;
5. atualizar `.env.example` sem valores reais.

## 12. Políticas de dependências

### 12.1. Instalação de pacotes

A IA não pode instalar pacotes aleatórios sem justificar.

Todo pacote novo precisa responder:

1. Por que é necessário?
2. É mantido?
3. Tem alternativa nativa?
4. Executa código no servidor?
5. Afeta autenticação, upload, markdown, sanitização ou banco?
6. Aumenta superfície de ataque?

### 12.2. Auditoria

Antes de deploy:

- rodar auditoria de dependências;
- revisar dependências novas;
- remover pacotes não usados;
- manter lockfile versionado.

### 12.3. Pacotes sensíveis

Pacotes de upload, sanitização, auth, markdown, storage, crypto e validação precisam de revisão mais cuidadosa.

## 13. Políticas de logs, erros e auditoria

### 13.1. Erros para usuário

O usuário deve receber mensagens genéricas.

Exemplo:

```txt
Não foi possível concluir esta ação.
```

Não retornar:

- stack trace;
- query SQL;
- caminho interno do servidor;
- valores de env;
- tokens;
- detalhes de credenciais.

### 13.2. Logs internos

Logs internos podem conter contexto técnico, mas não devem conter secrets.

Nunca logar:

- senha;
- token;
- cookie;
- secret key;
- credenciais do bucket;
- conteúdo completo de headers sensíveis.

### 13.3. Auditoria administrativa

Ações administrativas importantes devem gerar audit log:

- criar produto;
- editar produto;
- desativar produto;
- excluir produto;
- subir imagem;
- remover imagem;
- editar LP;
- editar WhatsApp;
- editar FAQ;
- editar depoimento;
- editar logos;
- editar fotografia.

Audit log deve conter:

- ator Clerk user ID;
- ação;
- entidade;
- ID da entidade;
- timestamp;
- metadados mínimos.

## 14. Políticas de cabeçalhos e segurança HTTP

O sistema deve configurar headers de segurança quando possível.

Recomendados:

- `Content-Security-Policy`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `Strict-Transport-Security` em produção HTTPS;
- proteção contra embedding indevido quando aplicável.

A CSP deve ser compatível com:

- Next.js;
- Clerk;
- Railway Buckets ou domínio de imagens;
- fontes e imagens realmente usadas.

Não configurar CSP quebrando o site sem testar.

## 15. Políticas de testes de segurança

### 15.1. Testes obrigatórios por feature sensível

Toda feature sensível precisa testar:

- usuário deslogado não acessa;
- usuário logado fora da allowlist não acessa;
- input inválido é rejeitado;
- input extra é ignorado ou rejeitado;
- erro não vaza stack trace;
- action direta não burla permissão;
- conteúdo inativo não aparece no site público.

### 15.2. Testes específicos de upload

Testar:

- upload sem login;
- upload com usuário não admin;
- extensão proibida;
- MIME inválido;
- arquivo acima do limite;
- arquivo renomeado malicioso;
- tentativa de path traversal;
- exclusão de arquivo que não pertence à entidade.

### 15.3. Testes específicos de XSS

Testar inputs como:

```txt
<script>alert(1)</script>
<img src=x onerror=alert(1)>
javascript:alert(1)
data:text/html,<script>alert(1)</script>
```

Resultado esperado:

- texto aparece escapado ou é rejeitado;
- script não executa;
- URL perigosa é rejeitada;
- nenhum HTML é renderizado livremente.

### 15.4. Testes específicos de admin

Testar:

- acessar `/admin` deslogado;
- acessar `/admin` logado como usuário fora da allowlist;
- chamar Server Action manualmente sem permissão;
- tentar editar produto inexistente;
- tentar deletar imagem por path arbitrário;
- tentar alterar número de WhatsApp com formato inválido.

## 16. Política de deploy seguro

Antes de deploy em produção:

1. build passa;
2. lint passa;
3. typecheck passa;
4. migrations revisadas;
5. envs de produção conferidas;
6. Clerk configurado com domínio correto;
7. allowlist do dono configurada;
8. bucket configurado;
9. upload testado;
10. login admin testado;
11. actions administrativas testadas;
12. site público testado;
13. headers básicos conferidos;
14. secrets não aparecem no bundle client;
15. rollback planejado.

## 17. Política de backup e recuperação

### 17.1. Banco

Antes de migrations destrutivas:

- fazer backup;
- confirmar restore possível;
- testar migration em ambiente não produtivo.

### 17.2. Imagens

Imagens importantes devem estar em object storage persistente.

Não depender de arquivos locais dentro do container/deploy.

### 17.3. Restauração

O projeto precisa ter instruções mínimas para:

- restaurar banco;
- restaurar variáveis de ambiente;
- reconectar Clerk;
- reconectar bucket;
- invalidar sessão suspeita;
- rotacionar credenciais.

## 18. Política de resposta a incidente

Se houver suspeita de invasão:

1. tirar admin do ar temporariamente, se necessário;
2. revogar sessões no Clerk;
3. remover usuário suspeito da allowlist;
4. rotacionar secrets;
5. rotacionar credenciais do bucket;
6. revisar audit logs;
7. revisar logs de deploy;
8. revisar alterações recentes;
9. restaurar backup limpo, se necessário;
10. corrigir causa raiz antes de reabrir.

## 19. Definition of Done de segurança

Uma task sensível só está pronta se:

- seguiu os docs de produto e arquitetura;
- `requireAdmin()` foi usado onde necessário;
- inputs foram validados no servidor;
- erros são seguros;
- upload foi validado quando aplicável;
- não há HTML livre;
- não há secrets no client;
- não há endpoint administrativo público;
- não há mutation sem auditoria quando aplicável;
- lint passou;
- typecheck passou;
- build passou;
- testes manuais de segurança foram executados;
- a revisão adversarial foi feita;
- pendências de segurança foram resolvidas ou documentadas como bloqueio.

## 20. Prompt padrão para implementar task com segurança

Use este prompt ao pedir implementação para a IA:

```md
Leia antes:
- /docs/product/00-visao-do-produto.md
- /docs/product/02-escopo-do-produto.md
- /docs/product/03-regras-de-negocio.md
- /docs/product/04-user-stories.md
- /docs/architecture/01-arquitetura-de-pastas.md
- /docs/architecture/07-autenticacao-e-autorizacao.md
- /docs/architecture/08-seguranca.md
- /docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
- a task específica em /docs/tasks

Implemente somente a task indicada.

Antes de codar, entregue um plano técnico com:
1. arquivos que pretende alterar;
2. fluxo da feature;
3. inputs que serão validados;
4. Server Actions/Route Handlers envolvidos;
5. onde será usado requireAdmin();
6. riscos de segurança;
7. testes que serão feitos.

Regras obrigatórias:
- não implemente fora do escopo;
- não remova validações;
- não remova autenticação/autorização;
- não exponha secrets;
- não use dangerouslySetInnerHTML;
- não crie upload inseguro;
- não crie mutation pública;
- valide tudo no servidor;
- registre auditoria para alterações administrativas;
- rode lint, typecheck e build ao final.

No final, responda:
- arquivos alterados;
- decisões tomadas;
- riscos restantes;
- testes realizados;
- checklist de segurança da task.
```

## 21. Prompt padrão para revisão de segurança

Use este prompt depois de cada implementação sensível:

```md
Faça uma revisão de segurança adversarial da implementação atual.

Contexto:
- Projeto Next.js App Router;
- Admin com Clerk;
- apenas dono autorizado por allowlist;
- Server Actions para mutações;
- Drizzle/PostgreSQL;
- Railway Buckets para imagens;
- site público com conteúdo editável pelo admin.

Procure especificamente:
1. rota admin exposta;
2. Server Action sem requireAdmin();
3. Route Handler sem autorização;
4. validação client-side sem validação server-side;
5. input que pode causar XSS;
6. upload malicioso;
7. path traversal;
8. secret exposto no client;
9. SQL injection;
10. erro vazando stack trace;
11. dados inativos aparecendo no site público;
12. localStorage usado como fonte confiável;
13. falta de auditoria;
14. dependência insegura;
15. quebra de regra de negócio.

Não faça elogios.
Liste apenas achados, severidade, impacto e correção recomendada.
Classifique cada achado como:
- Bloqueante;
- Alto;
- Médio;
- Baixo;
- Observação.
```

## 22. Bloqueios automáticos

A task deve ser bloqueada se qualquer item abaixo ocorrer:

- admin acessível sem login;
- usuário fora da allowlist consegue acessar admin;
- Server Action administrativa sem `requireAdmin()`;
- upload sem validação de tipo/tamanho;
- HTML livre renderizado no site público;
- secret no bundle client;
- mutation pública não intencional;
- erro com stack trace visível ao usuário;
- SQL raw com input interpolado;
- ação administrativa sem validação server-side;
- IA removeu segurança para “resolver rápido”.

## 23. Referências técnicas usadas como base

- OWASP Application Security Verification Standard — base para requisitos de segurança em aplicações web.
- OWASP Cheat Sheet Series — boas práticas práticas para desenvolvimento seguro.
- OWASP File Upload Cheat Sheet — base das regras de upload.
- OWASP Unrestricted File Upload — riscos de upload irrestrito.
- NIST SP 800-218 SSDF — práticas de desenvolvimento seguro no ciclo de software.
- Next.js App Router / Server Actions — modelo de mutações no servidor.
- Next.js Data Security Guide — validação de input, autenticação, autorização e data access layer.
- Clerk Next.js Proxy — proteção explícita de rotas em projetos Next.js 16.
- Railway Buckets — object storage S3-compatible para arquivos persistentes.
