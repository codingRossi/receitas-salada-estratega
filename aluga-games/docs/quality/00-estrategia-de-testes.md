# 00 — Estratégia de Testes

## 1. Objetivo do documento

Este documento define a estratégia de testes do sistema da AlugaGames.

O sistema será desenvolvido com forte apoio de IA, portanto os testes não podem ser tratados como etapa opcional. Eles devem funcionar como uma camada de proteção contra regressões, falhas de segurança, comportamentos inventados pela IA e quebras no fluxo principal do site.

A estratégia de testes deve garantir que:

- o visitante consiga navegar pelo site público;
- o visitante consiga encontrar produtos;
- o visitante consiga abrir produtos individuais;
- o visitante consiga enviar interesse pelo WhatsApp;
- a lista simples de produtos funcione corretamente;
- o dono consiga acessar o admin com segurança;
- o dono consiga criar, editar, desativar e remover conteúdos;
- uploads de mídia funcionem sem abrir riscos de segurança;
- a IA não introduza código inseguro, desorganizado ou fora do escopo.

---

## 2. Princípios gerais

### 2.1 Testar primeiro o que quebra o negócio

A prioridade não é testar tudo igualmente. A prioridade é testar os fluxos que, se quebrarem, prejudicam o negócio.

Fluxos mais críticos:

1. Produto aparecendo corretamente no site público.
2. Botão de WhatsApp montando mensagem correta.
3. Admin protegido contra acesso não autorizado.
4. CRUD de produtos funcionando corretamente.
5. Upload de imagens protegido e funcional.
6. LP carregando com os blocos configurados pelo admin.
7. Página de produtos filtrando e buscando corretamente.

### 2.2 Todo código gerado por IA precisa ser validado

A IA pode gerar código aparentemente correto, mas com falhas sutis de segurança, estado, validação ou arquitetura.

Toda task implementada por IA deve passar por:

- revisão de escopo;
- revisão de segurança;
- revisão de tipos;
- revisão de validação server-side;
- teste manual do fluxo;
- lint;
- build;
- testes automatizados quando aplicável.

### 2.3 Testes não substituem segurança

Testes ajudam a reduzir risco, mas não substituem validação no servidor, autorização, controle de upload e revisão manual.

A implementação deve seguir obrigatoriamente os documentos:

- `/docs/architecture/07-autenticacao-e-autorizacao.md`
- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `/docs/architecture/06-upload-e-midias.md`

---

## 3. Tipos de testes do projeto

O projeto deve usar quatro camadas principais de teste:

1. **Testes unitários**
2. **Testes de integração**
3. **Testes end-to-end**
4. **Testes manuais guiados por checklist**

---

## 4. Testes unitários

Testes unitários devem cobrir regras puras, helpers e validações que não dependem diretamente de navegador, banco real ou serviços externos.

### 4.1 O que deve ter teste unitário

Devem ter teste unitário:

- schemas Zod;
- helpers de WhatsApp;
- normalização de slug;
- validação de arquivos;
- montagem da lista simples de produtos;
- filtros de produtos;
- regras de status de produto;
- helpers de SEO;
- helpers de formatação;
- funções puras de domínio.

### 4.2 Exemplos de casos unitários

#### WhatsApp

Testar se a mensagem de WhatsApp é montada corretamente.

Casos mínimos:

- mensagem geral da LP;
- mensagem de produto individual;
- mensagem com vários produtos selecionados;
- mensagem com quantidade de produto;
- mensagem sem caracteres quebrados;
- encoding correto da URL;
- número de WhatsApp vindo das configurações.

#### Slug

Casos mínimos:

- remover acentos;
- converter para minúsculo;
- substituir espaços por hífen;
- remover caracteres especiais;
- impedir slug vazio;
- impedir duplicidade no fluxo de criação/edição.

#### Filtros de produto

Casos mínimos:

- filtro por busca textual;
- filtro por categoria;
- filtro por tag;
- filtro por indicação de evento;
- filtro por status disponível/indisponível;
- combinação de múltiplos filtros;
- retorno vazio quando nada combina.

#### Lista simples de produtos

Casos mínimos:

- adicionar produto;
- remover produto;
- alterar quantidade;
- impedir quantidade menor que 1;
- limpar lista;
- persistir no localStorage;
- recuperar do localStorage;
- ignorar dados inválidos vindos do localStorage.

---

## 5. Testes de integração

Testes de integração devem validar a comunicação entre camadas do sistema, principalmente Server Actions, banco, validação, autorização e revalidação de rotas.

### 5.1 O que deve ser testado em integração

Devem ser testados:

- criação de produto;
- edição de produto;
- desativação de produto;
- exclusão lógica quando aplicável;
- criação de categoria;
- criação de tag;
- vínculo produto-categoria;
- vínculo produto-tag;
- edição de blocos da LP;
- edição de FAQ;
- edição de depoimentos;
- edição de logos de clientes;
- criação de álbum de fotografia;
- inclusão de fotos em álbum;
- atualização de configurações globais;
- registro de clique no WhatsApp.

### 5.2 Regras obrigatórias para Server Actions

Toda Server Action administrativa deve ser testada ou revisada para garantir que:

- chama `requireAdmin()`;
- valida input com Zod;
- não confia no client;
- trata erros de forma segura;
- não retorna stack trace;
- não vaza dados sensíveis;
- grava log administrativo quando altera conteúdo importante;
- revalida rotas públicas quando necessário.

### 5.3 Casos de erro obrigatórios

Cada action importante deve prever:

- usuário não autenticado;
- usuário autenticado, mas não autorizado;
- dados inválidos;
- entidade inexistente;
- conflito de slug;
- tentativa de alteração indevida;
- erro interno controlado.

---

## 6. Testes end-to-end

Testes end-to-end validam os fluxos reais do usuário no navegador.

A ferramenta recomendada para E2E é **Playwright**.

### 6.1 Fluxos E2E públicos obrigatórios

#### Fluxo 1 — Visitante acessa a LP

O teste deve validar que:

- a home carrega;
- o header aparece;
- o hero aparece;
- há CTA para WhatsApp;
- produtos em destaque aparecem quando cadastrados;
- logos de clientes aparecem quando ativos;
- FAQ aparece quando ativo;
- CTA final aparece;
- footer aparece.

#### Fluxo 2 — Visitante acessa produtos

O teste deve validar que:

- `/produtos` carrega;
- produtos ativos aparecem;
- produtos inativos não aparecem;
- busca por nome funciona;
- filtro por categoria funciona;
- filtro por tag funciona;
- filtro por indicação de evento funciona;
- estado vazio aparece quando nenhum produto é encontrado.

#### Fluxo 3 — Visitante abre produto individual

O teste deve validar que:

- `/produtos/[slug]` carrega;
- nome do produto aparece;
- galeria aparece;
- descrição aparece;
- informações técnicas aparecem quando cadastradas;
- botão de WhatsApp aparece;
- botão de adicionar à lista aparece;
- produtos relacionados aparecem quando houver.

#### Fluxo 4 — Visitante usa a lista simples de produtos

O teste deve validar que:

- visitante adiciona produto à lista;
- lista aparece no drawer;
- visitante altera quantidade;
- visitante remove produto;
- mensagem de WhatsApp contém os produtos selecionados;
- a lista não exige login;
- não existe checkout;
- não existe pagamento;
- não existe criação de pedido no banco.

#### Fluxo 5 — Visitante acessa fotografia

O teste deve validar que:

- `/fotografia` carrega;
- álbuns ativos aparecem;
- filtros funcionam;
- álbum individual abre;
- fotos do álbum aparecem;
- fotos inativas não aparecem.

### 6.2 Fluxos E2E administrativos obrigatórios

#### Fluxo 6 — Admin exige login

O teste deve validar que:

- visitante não autenticado não acessa `/admin`;
- visitante não autenticado é redirecionado para login;
- páginas internas do admin também são protegidas;
- ações administrativas não funcionam sem autenticação.

#### Fluxo 7 — Dono cria produto

O teste deve validar que:

- dono autenticado acessa `/admin/produtos/novo`;
- preenche nome, categoria, descrição e status;
- salva produto;
- produto aparece na listagem admin;
- produto aparece no site público quando ativo;
- produto não aparece quando inativo.

#### Fluxo 8 — Dono edita produto

O teste deve validar que:

- dono edita título, slug, descrição, tags e status;
- alterações aparecem no admin;
- alterações aparecem no site público;
- slug antigo deve redirecionar ou gerar 404 conforme decisão técnica documentada.

#### Fluxo 9 — Dono gerencia LP

O teste deve validar que:

- dono acessa edição da LP;
- altera texto ou imagem de bloco controlado;
- salva;
- home pública reflete alteração;
- bloco pode ser ocultado/exibido quando essa regra existir.

#### Fluxo 10 — Dono gerencia fotografia

O teste deve validar que:

- dono cria álbum;
- adiciona fotos;
- define tipo de evento;
- salva;
- álbum aparece na página pública;
- álbum inativo não aparece.

---

## 7. Testes de segurança

Segurança deve ser testada em toda task que toca admin, upload, banco, autenticação ou conteúdo público editável.

### 7.1 Checklist obrigatório de segurança

Antes de marcar uma task como pronta, verificar:

- rota administrativa está protegida por Clerk;
- action administrativa chama `requireAdmin()`;
- usuário autenticado não autorizado é bloqueado;
- input é validado no servidor;
- HTML arbitrário não é renderizado sem sanitização;
- upload aceita somente tipos permitidos;
- upload valida tamanho máximo;
- upload não usa nome original como caminho final;
- arquivos não são executáveis;
- secrets não aparecem no client;
- erros não expõem stack trace;
- logs não salvam dados sensíveis;
- não há `dangerouslySetInnerHTML` sem justificativa explícita;
- não há consultas SQL manuais inseguras;
- não há `eval`, `Function`, scripts dinâmicos ou execução de input do usuário.

### 7.2 Casos de teste de acesso indevido

Testar ou revisar:

- acessar `/admin` sem login;
- acessar `/admin/produtos` sem login;
- chamar Server Action sem sessão;
- chamar Server Action com usuário Clerk fora da allowlist;
- tentar upload sem sessão;
- tentar upload com arquivo inválido;
- tentar alterar produto com payload malformado;
- tentar inserir script em título, descrição, FAQ e depoimento.

### 7.3 Conteúdo editável e XSS

Todo conteúdo vindo do admin deve ser tratado como dado não confiável.

Regras:

- campos de texto devem ser renderizados como texto comum;
- markdown/HTML livre deve ser evitado;
- se algum editor rich text for usado, precisa de sanitização explícita;
- campos como FAQ, depoimento, descrição e título não devem executar HTML;
- URLs devem ser validadas antes de renderizar links, imagens ou vídeos.

---

## 8. Testes de upload e mídia

Upload é uma área crítica.

### 8.1 Casos obrigatórios

Testar:

- upload de `.jpg` válido;
- upload de `.png` válido;
- upload de `.webp` válido;
- rejeição de `.svg` se não estiver explicitamente permitido;
- rejeição de `.exe`;
- rejeição de `.php`;
- rejeição de arquivo grande demais;
- rejeição de MIME inconsistente;
- nome final gerado pelo sistema;
- URL salva corretamente no banco;
- imagem aparece no site público;
- exclusão/desativação remove a referência correta;
- alt text é editável.

### 8.2 O que não deve acontecer

- salvar imagem dentro do repositório;
- salvar imagem em `/public/uploads` como solução definitiva;
- confiar no nome original do arquivo;
- permitir qualquer tipo de arquivo;
- permitir upload por usuário não autorizado;
- usar URL externa sem validação.

---

## 9. Testes de regressão visual

Como o design é importante, toda mudança em UI deve ser conferida visualmente.

### 9.1 Telas públicas a revisar

- Home desktop;
- Home mobile;
- Página de produtos desktop;
- Página de produtos mobile;
- Página individual de produto desktop;
- Página individual de produto mobile;
- Fotografia desktop;
- Fotografia mobile;
- Footer;
- Drawer/lista simples de produtos.

### 9.2 Telas administrativas a revisar

- Dashboard;
- Listagem de produtos;
- Formulário de produto;
- Edição de LP;
- Edição de fotografia;
- Upload de imagem;
- Configurações de WhatsApp.

### 9.3 Padrão visual esperado

A UI deve seguir o documento:

- `/docs/ui/00-design-system.md`
- `/docs/ui/01-site-publico.md`
- `/docs/ui/02-portal-admin.md`

O site deve parecer:

- premium;
- corporativo;
- limpo;
- moderno;
- confiável;
- orientado a proposta/WhatsApp;
- não e-commerce tradicional.

---

## 10. Testes de SEO

### 10.1 Casos obrigatórios

Validar:

- home tem metadata adequada;
- `/produtos` tem metadata adequada;
- cada produto tem título e descrição SEO;
- produto inativo não é indexado;
- páginas admin usam `noindex`;
- sitemap contém apenas rotas públicas indexáveis;
- robots não libera `/admin`;
- slugs são amigáveis;
- imagens importantes têm alt text;
- página de produto não depende apenas de client-side rendering para conteúdo principal.

---

## 11. Testes de performance

### 11.1 Pontos críticos

Validar:

- home não carrega imagens gigantes sem otimização;
- imagens usam componente adequado de imagem;
- vídeos não carregam automaticamente de forma pesada;
- página de produtos não busca dados desnecessários;
- filtros funcionam sem travar;
- admin não afeta performance do site público;
- scripts de terceiros são mínimos;
- bundle público não contém bibliotecas pesadas do admin.

### 11.2 Critérios mínimos

Antes do deploy:

- `npm run build` deve passar;
- home deve carregar sem erro no console;
- página de produtos deve carregar sem erro no console;
- página de produto deve carregar sem erro no console;
- Lighthouse deve ser usado como revisão manual quando possível.

---

## 12. Testes de acessibilidade

### 12.1 Casos mínimos

Validar:

- navegação por teclado;
- foco visível em botões e links;
- botões com texto acessível;
- imagens com alt text;
- contraste adequado;
- FAQ acessível;
- drawer/lista simples acessível;
- formulários com labels;
- erros de formulário claros;
- página não depende apenas de cor para transmitir informação.

---

## 13. Testes manuais por entrega

Toda task deve terminar com uma seção de evidência manual.

Modelo:

```md
## Evidência de teste manual

- [ ] Rodei `npm run lint`
- [ ] Rodei `npm run build`
- [ ] Testei o fluxo principal no navegador
- [ ] Testei estado de erro
- [ ] Testei comportamento mobile básico
- [ ] Verifiquei que não há erro no console
- [ ] Verifiquei que não há acesso indevido
- [ ] Atualizei documentação impactada

Observações:

- ...
```

---

## 14. Comandos recomendados

Os comandos finais dependem da configuração real do repo, mas o objetivo é ter algo próximo de:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Se algum comando ainda não existir, a task de setup deve criar scripts equivalentes no `package.json`.

Sugestão de scripts:

```json
{
  "scripts": {
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "build": "next build"
  }
}
```

---

## 15. Estratégia por prioridade

### P0 — Testes obrigatórios para o produto funcionar

- Admin protegido.
- Produto CRUD funcionando.
- Produto aparecendo no site público.
- Página de produtos filtrando.
- Página individual funcionando.
- WhatsApp funcionando.
- Lista simples de produtos funcionando.
- Upload básico seguro.
- LP carregando blocos principais.

### P1 — Testes importantes

- Fotografia com álbuns.
- Depoimentos.
- FAQ.
- Logos de clientes.
- Configurações do site.
- Tracking de cliques no WhatsApp.
- SEO por produto.

### P2 — Testes de polimento

- Regressão visual automatizada.
- Testes de acessibilidade mais profundos.
- Performance avançada.
- Testes de edge cases raros.
- Monitoramento pós-deploy.

---

## 16. Regras para prompts enviados à IA

Sempre que pedir para a IA implementar uma task, incluir:

```md
Antes de implementar, leia:

- /docs/quality/00-estrategia-de-testes.md
- /docs/architecture/08-seguranca.md
- /docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md
- A task específica em /docs/tasks

Ao finalizar:

1. Rode lint, typecheck, testes e build quando disponíveis.
2. Liste quais testes foram criados ou atualizados.
3. Liste quais testes manuais foram realizados.
4. Explique riscos restantes.
5. Não marque como pronto se houver falha de segurança conhecida.
```

---

## 17. Prompt de revisão de testes para IA

Usar depois de cada task importante:

```md
Revise a implementação com foco em testes e segurança.

Verifique:

1. O fluxo principal da task está coberto?
2. Os casos de erro estão cobertos?
3. Há validação server-side?
4. Há autorização server-side?
5. Há risco de XSS?
6. Há risco no upload?
7. Há risco de dados sensíveis no client?
8. O código depende de mock permanente?
9. Algum teste importante está faltando?
10. O que precisa ser testado manualmente antes do deploy?

Não implemente novas features. Apenas revise e sugira correções.
```

---

## 18. Critérios de aceite da estratégia de testes

Esta estratégia estará sendo seguida corretamente quando:

- toda task tiver teste manual documentado;
- fluxos críticos tiverem testes automatizados ou checklists explícitos;
- nenhuma action administrativa existir sem `requireAdmin()`;
- nenhum upload existir sem validação de tipo, tamanho e autorização;
- nenhuma página admin indexar no Google;
- conteúdo público editável não executar HTML arbitrário;
- build e lint passarem antes do deploy;
- regressões críticas forem detectadas antes de ir para produção.

---

## 19. O que a IA não deve fazer

A IA não deve:

- remover testes para fazer build passar;
- comentar validações de segurança;
- remover `requireAdmin()`;
- transformar erro de segurança em warning;
- criar bypass de autenticação;
- salvar arquivos localmente como solução definitiva;
- expor secrets no client;
- criar checkout, pagamento ou pedido no banco;
- criar login de cliente;
- criar APIs públicas para mutações administrativas;
- marcar uma task como pronta sem evidência de teste.

---

## 20. Resumo executivo

A estratégia de testes da AlugaGames deve proteger principalmente três coisas:

1. **Conversão:** o visitante precisa chegar facilmente ao WhatsApp.
2. **Gestão:** o dono precisa manipular produtos, LP e conteúdos sem depender de código.
3. **Segurança:** o admin, uploads e mutações precisam ser protegidos, especialmente porque o sistema será desenvolvido com forte uso de IA.

O objetivo não é criar uma suíte de testes perfeita no primeiro dia. O objetivo é impedir que o sistema avance sem validação mínima, especialmente nas áreas que podem gerar prejuízo, invasão ou quebra do fluxo comercial.
