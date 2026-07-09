# 08 - Segurança

## 1. Objetivo deste documento

Este documento define as regras de segurança obrigatórias para o novo site da AlugaGames.

O sistema terá:

- Site público institucional.
- Catálogo público de produtos.
- Lista simples de produtos para envio ao WhatsApp.
- Portal administrativo protegido por Clerk.
- Upload e gerenciamento de imagens.
- Landing page editável por blocos controlados.
- Galeria de fotografia com álbuns.
- Configurações globais do site.

A segurança deve ser tratada como requisito obrigatório, não como etapa final de polimento.

---

## 2. Princípios gerais

### 2.1. Nunca confiar no cliente

Tudo que vem do navegador deve ser considerado não confiável.

Isso inclui:

- Dados de formulários.
- IDs enviados em Server Actions.
- Arquivos enviados por upload.
- Parâmetros de URL.
- Parâmetros de URL de filtros.
- Conteúdo salvo em localStorage.
- Mensagens montadas para WhatsApp.

Toda validação crítica precisa acontecer no servidor.

---

### 2.2. Autenticação não é autorização

O sistema usará Clerk para autenticação do admin, mas isso não basta.

Além de verificar se existe usuário logado, o sistema deve verificar se esse usuário é realmente o dono autorizado a acessar e modificar o portal.

A autorização deve ser feita por allowlist de IDs do Clerk, usando variável de ambiente:

```txt
CLERK_ADMIN_USER_IDS=clerk_user_id_1,clerk_user_id_2
```

No produto atual, o esperado é existir apenas um dono autorizado.

---

### 2.3. Fail closed

Quando houver dúvida, erro, sessão inválida ou ausência de configuração, o sistema deve bloquear a ação.

Exemplos:

- Se `CLERK_ADMIN_USER_IDS` não estiver configurado, nenhuma mutação administrativa deve funcionar.
- Se o usuário estiver logado no Clerk, mas não estiver na allowlist, deve receber acesso negado.
- Se o arquivo enviado não puder ser validado, o upload deve ser rejeitado.
- Se um ID enviado não existir, a ação deve falhar de forma segura.

---

### 2.4. Menor privilégio possível

O site público deve conseguir apenas ler dados públicos.

O portal admin deve conseguir modificar dados somente após autenticação e autorização.

Nenhuma rota pública deve permitir criação, edição ou exclusão de dados administrativos.

---

## 3. Áreas de risco do sistema

As principais áreas de risco são:

1. Acesso indevido ao portal admin.
2. Server Actions administrativas chamadas diretamente por POST.
3. Upload de arquivos maliciosos.
4. Conteúdo editável gerando XSS.
5. Exclusão ou alteração indevida de produtos.
6. Vazamento de variáveis de ambiente.
7. Exposição de arquivos privados.
8. Erros exibindo stack trace ou detalhes internos.
9. Leituras públicas sem validação ou paginação.
10. Links de WhatsApp montados com dados não tratados.

---

## 4. Autenticação e autorização

### 4.1. Regras obrigatórias

- Todas as rotas `/admin` devem exigir login pelo Clerk.
- Toda Server Action administrativa deve chamar `requireAdmin()`.
- Todo Route Handler sensível deve chamar `requireAdmin()`.
- Middleware de rota não substitui validação dentro das ações do servidor.
- O usuário logado precisa estar na allowlist de administradores.
- Não deve existir área de cliente.
- Não deve existir login público para visitantes.
- Não deve existir tabela própria de senhas.

---

### 4.2. Função obrigatória `requireAdmin()`

Toda operação sensível deve usar uma função centralizada semelhante a:

```ts
await requireAdmin();
```

Essa função deve:

1. Obter o usuário autenticado pelo Clerk.
2. Verificar se existe usuário logado.
3. Verificar se o ID do usuário está em `CLERK_ADMIN_USER_IDS`.
4. Retornar o usuário autorizado ou interromper a execução.
5. Nunca permitir mutação sem usuário autorizado.

---

### 4.3. Ações que exigem admin

Devem exigir `requireAdmin()`:

- Criar produto.
- Editar produto.
- Desativar produto.
- Excluir produto.
- Criar categoria.
- Editar categoria.
- Excluir categoria.
- Criar tag.
- Editar tag.
- Excluir tag.
- Fazer upload de imagem.
- Remover imagem.
- Editar landing page.
- Editar depoimentos.
- Editar FAQ.
- Editar logos/clientes.
- Editar álbuns de fotografia.
- Editar configurações globais do site.
- Alterar número de WhatsApp.

---

## 5. Server Actions

### 5.1. Regra geral

Server Actions administrativas devem ser tratadas como endpoints públicos que podem receber requisições diretas.

Portanto, toda Server Action deve:

- Validar autenticação.
- Validar autorização.
- Validar input com schema.
- Sanitizar dados quando necessário.
- Tratar erros sem vazar detalhes internos.
- Registrar auditoria quando modificar dados.
- Revalidar apenas as rotas necessárias.

---

### 5.2. Padrão de retorno

Toda action deve retornar um padrão previsível:

```ts
type ActionResult<T = unknown> =
  | {
      ok: true;
      data?: T;
      message?: string;
    }
  | {
      ok: false;
      code: string;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
```

Não retornar stack trace, erro bruto do banco ou mensagens internas para o client.

---

### 5.3. O que uma action não deve fazer

Uma Server Action não deve:

- Confiar em ID vindo do client sem verificar no banco.
- Alterar dados sem `requireAdmin()`.
- Aceitar qualquer campo vindo do formulário sem whitelisting.
- Retornar objetos sensíveis completos.
- Usar `any` para contornar validação.
- Fazer update/delete sem checar existência do registro.
- Expor mensagens internas de erro.

---

## 6. Route Handlers

### 6.1. Quando usar

Route Handlers devem ser usados apenas quando fizer sentido ter endpoint HTTP explícito.

Exemplos permitidos:

- Upload de imagem.
- Remoção de mídia.
- Tracking de clique no WhatsApp.
- Webhook futuro, se existir.

---

### 6.2. Route handlers protegidos

Os seguintes endpoints devem exigir admin:

```txt
POST /api/uploads/presign
```

Esses endpoints devem chamar `requireAdmin()`.

Remoção, associação e edição de metadados de mídia devem usar Server Actions administrativas com `requireAdmin()`.

---

### 6.3. Route handlers públicos

O tracking de clique no WhatsApp pode ser público, desde que seja limitado e não aceite dados sensíveis.

Exemplo:

```txt
POST /api/whatsapp-clicks
```

Esse endpoint deve aceitar apenas informações controladas, como:

- Origem do clique.
- ID do produto, quando existir.
- Tipo de página.
- Timestamp gerado no servidor.

Não deve aceitar:

- Nome completo do visitante.
- Telefone do visitante.
- E-mail do visitante.
- Mensagens livres extensas.
- Dados pessoais.

---

## 7. Validação de dados

### 7.1. Regra obrigatória

Toda entrada deve ser validada no servidor com schemas.

Campos não reconhecidos devem ser ignorados ou rejeitados.

---

### 7.2. Produtos

Ao criar ou editar produto, validar:

- Nome obrigatório.
- Slug obrigatório e único.
- Descrição curta com limite de caracteres.
- Descrição completa opcional com limite seguro.
- Categoria existente.
- Tags existentes.
- Status dentro dos valores permitidos.
- URLs de vídeo válidas, quando existirem.
- Campos técnicos opcionais com limites.
- SEO title com limite.
- SEO description com limite.

---

### 7.3. Categorias e tags

Validar:

- Nome obrigatório.
- Slug único.
- Status ativo/inativo.
- Não permitir strings vazias.
- Não permitir valores enormes.

---

### 7.4. Landing page

Validar:

- Tipo de bloco permitido.
- Campos obrigatórios por tipo de bloco.
- IDs de produtos destacados existentes.
- IDs de imagens existentes.
- Ordem numérica válida.
- Bloco ativo/inativo.

Não permitir criação de HTML livre pelo admin.

---

### 7.5. FAQ e depoimentos

Validar:

- Pergunta obrigatória.
- Resposta obrigatória.
- Nome do cliente opcional.
- Texto do depoimento obrigatório.
- Limites máximos de caracteres.
- Status ativo/inativo.

---

## 8. Upload de arquivos

### 8.1. Regras obrigatórias

Uploads devem seguir as regras do documento:

```txt
/docs/architecture/06-upload-e-midias.md
```

Regras mínimas:

- Apenas admin autorizado pode fazer upload.
- Apenas imagens são aceitas.
- Tipos permitidos: `jpg`, `jpeg`, `png`, `webp`.
- Vídeo não deve ser enviado por upload no MVP/produto inicial.
- Vídeo deve ser salvo como URL externa.
- Tamanho máximo por arquivo deve ser definido e aplicado.
- Nome original do arquivo nunca deve ser usado como nome final.
- Arquivo deve ser salvo em object storage, não no repositório.
- URL final deve ser salva no banco.
- Toda imagem precisa ter contexto de uso.

---

### 8.2. Validações do upload

Validar:

- Extensão.
- MIME type.
- Tamanho.
- Presença real do arquivo.
- Contexto do upload.
- Usuário autorizado.

O sistema não deve confiar apenas na extensão do arquivo.

---

### 8.3. Nome dos arquivos

O nome salvo deve ser gerado pelo sistema.

Exemplo:

```txt
products/{productId}/{uuid}.webp
landing-page/{sectionId}/{uuid}.webp
photography/{albumId}/{uuid}.webp
logos/{uuid}.webp
```

Não usar nomes como:

```txt
foto-do-cliente.png
print final 2024.png
../../../arquivo.png
```

---

### 8.4. Remoção de arquivos

Ao remover uma imagem do admin:

1. Remover o vínculo no banco.
2. Remover ou marcar o arquivo como órfão no storage.
3. Registrar auditoria.
4. Revalidar páginas afetadas.

Se a remoção física falhar, não esconder o erro do admin.

---

## 9. Conteúdo editável e XSS

### 9.1. Regra geral

O admin poderá editar textos, imagens, FAQs, depoimentos e blocos da LP.

Mesmo sendo o dono, o sistema não deve permitir HTML livre sem necessidade.

---

### 9.2. Proibido no MVP/produto inicial

Não permitir:

- Campo de HTML customizado.
- Script injetável.
- CSS customizado pelo admin.
- Embed arbitrário sem validação.
- Iframes livres.
- Markdown sem sanitização.

---

### 9.3. Renderização segura

Textos vindos do banco devem ser renderizados como texto normal.

Evitar:

```tsx
<div dangerouslySetInnerHTML={{ __html: content }} />
```

Se algum dia for necessário usar HTML ou Markdown, deve existir uma estratégia explícita de sanitização documentada antes da implementação.

---

## 10. Banco de dados

### 10.1. Regras gerais

- Usar Drizzle somente em repositórios de infraestrutura ou scripts internos de banco.
- Todo acesso direto ao banco em runtime deve ficar em `/src/infra/repositories`.
- Features/actions de domínio devem depender de contratos em `/src/domain/contracts`.
- Evitar SQL manual desnecessário.
- Não concatenar strings para montar SQL.
- Validar dados antes de persistir.
- Usar constraints no banco quando fizer sentido.
- Usar timestamps de criação e atualização.
- Usar soft delete/status inativo quando o dado puder afetar histórico ou relação.

---

### 10.2. Deletes

Preferir desativar em vez de apagar definitivamente quando o registro puder ser usado por páginas, relações ou auditoria.

Exemplos:

- Produtos: preferir `status = 'inactive'`.
- Categorias: preferir `is_active = false`.
- Tags: preferir `is_active = false`.
- Depoimentos: preferir `is_active = false`.
- FAQs: preferir `is_active = false`.

Exclusão definitiva pode existir para imagens, desde que controlada e auditada.

---

### 10.3. Paginação e limites

Listagens administrativas e públicas devem ter limites.

Não retornar todos os registros sem necessidade quando a tabela puder crescer.

Aplicar paginação ou limites em:

- Produtos.
- Álbuns de fotografia.
- Fotos.
- Logs administrativos.
- Eventos de clique.

---

## 11. Variáveis de ambiente

### 11.1. Regras

Variáveis sensíveis nunca devem ser expostas para o client.

Exemplos sensíveis:

- `DATABASE_URL`
- Chaves secretas do Clerk.
- Chaves secretas do storage.
- Tokens internos.
- Segredos de assinatura.

Apenas variáveis explicitamente públicas podem usar prefixo público.

---

### 11.2. Validação de ambiente

O projeto deve ter validação centralizada das variáveis obrigatórias.

Exemplo de arquivo:

```txt
/src/lib/env.ts
```

A aplicação deve falhar cedo quando variável obrigatória estiver ausente.

---

## 12. WhatsApp

### 12.1. Regras gerais

O WhatsApp é o principal canal de conversão do site.

A geração de links deve ser centralizada em:

```txt
/src/domain/features/build-whatsapp-url.ts
/src/domain/features/helpers.ts
```

Não espalhar montagem de URL do WhatsApp por vários componentes.

---

### 12.2. Mensagens

Mensagens devem ser montadas com dados controlados.

Exemplo de mensagem de produto:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse neste produto: [nome do produto].
```

Exemplo de lista:

```txt
Olá, vim pelo site da AlugaGames e tenho interesse nestes produtos:

- Produto A
- Produto B
- Produto C
```

---

### 12.3. Segurança

- Codificar a mensagem com `encodeURIComponent`.
- Não permitir mensagem livre vinda do usuário sem limite.
- Não incluir dados pessoais sem necessidade.
- Validar número do WhatsApp configurado no admin.
- Se o número estiver ausente ou inválido, exibir erro seguro ou fallback controlado.

---

## 13. Lista simples de produtos

### 13.1. Natureza da lista

A lista de produtos não é carrinho de compra.

Ela deve ser tratada como lista local para facilitar o envio ao WhatsApp.

Não deve existir:

- Pedido no banco.
- Checkout.
- Pagamento.
- Conta de cliente.
- Histórico do visitante.
- Reserva de produto.

---

### 13.2. Segurança

A lista pode ficar em localStorage.

Por estar no client, ela não deve ser usada como fonte confiável para regras de negócio críticas.

Antes de montar a mensagem final, o sistema deve usar dados mínimos e seguros:

- ID do produto.
- Nome atual do produto, se necessário buscado novamente.
- Quantidade informada pelo usuário, com limite.

---

## 14. SEO e páginas públicas

### 14.1. Regra geral

SEO title e SEO description podem ser editados pelo admin, mas devem ter limite de tamanho.

Não permitir HTML nesses campos.

---

### 14.2. Slugs

Slugs devem ser:

- Únicos.
- Normalizados.
- Sem espaços.
- Sem caracteres perigosos.
- Gerados a partir do nome quando possível.
- Editáveis com validação.

Mudanças de slug devem ser feitas com cuidado, pois podem quebrar URLs já indexadas.

---

## 15. Logs e auditoria

### 15.1. Quando registrar log

Registrar auditoria para ações administrativas relevantes:

- Login admin bem-sucedido, se viável.
- Criação de produto.
- Edição de produto.
- Desativação de produto.
- Exclusão de produto.
- Upload de imagem.
- Remoção de imagem.
- Edição da LP.
- Edição de configurações globais.
- Alteração do número de WhatsApp.
- Edição de álbuns de fotografia.

---

### 15.2. Dados do log

Um log deve conter:

- ID do usuário Clerk.
- Ação executada.
- Entidade afetada.
- ID da entidade.
- Metadados mínimos.
- Data/hora.

Não salvar dados sensíveis desnecessários no log.

---

## 16. Erros

### 16.1. Erros para o usuário público

O visitante deve ver mensagens simples:

```txt
Não foi possível carregar os produtos agora.
Tente novamente em instantes.
```

Não mostrar:

- Stack trace.
- Nome de tabela.
- Consulta SQL.
- Detalhes de storage.
- Erros internos do Clerk.

---

### 16.2. Erros no admin

O admin pode receber mensagens mais específicas, mas ainda sem detalhes internos sensíveis.

Exemplo correto:

```txt
Não foi possível salvar o produto. Verifique os campos e tente novamente.
```

Exemplo incorreto:

```txt
DrizzleQueryError: duplicate key value violates unique constraint products_slug_idx...
```

---

## 17. Rate limiting e abuso

### 17.1. Pontos que podem precisar de limite

Aplicar proteção contra abuso em:

- Upload de imagens.
- Tracking de cliques no WhatsApp.
- Login/admin, quando possível via Clerk.
- Route Handlers públicos.

---

### 17.2. Tracking de cliques

O tracking de clique no WhatsApp deve ser simples e limitado.

Não deve virar sistema analítico complexo no primeiro momento.

Pode registrar:

- Origem.
- Produto relacionado.
- Página.
- User agent truncado/opcional.
- Timestamp.

Evitar registrar IP completo se não houver necessidade clara.

---

## 18. Dependências

### 18.1. Regras

- Evitar adicionar dependências desnecessárias.
- Preferir bibliotecas conhecidas e mantidas.
- Não instalar pacote para resolver problema simples.
- Conferir se a dependência roda bem com Next.js App Router.
- Não usar bibliotecas abandonadas para autenticação, upload ou sanitização.

---

## 19. Checklist obrigatório por feature

Antes de considerar uma feature pronta, verificar:

```txt
[ ] A rota correta está protegida?
[ ] A Server Action chama requireAdmin() quando necessário?
[ ] O Route Handler chama requireAdmin() quando necessário?
[ ] Inputs são validados no servidor?
[ ] Campos desconhecidos são rejeitados ou ignorados?
[ ] Erros não vazam detalhes internos?
[ ] Operações administrativas geram auditoria?
[ ] Upload valida tipo, tamanho e contexto?
[ ] Conteúdo editável não permite HTML perigoso?
[ ] Não há segredos expostos no client?
[ ] Não há regra crítica baseada apenas em localStorage?
[ ] Build/lint/testes passam?
```

---

## 20. Testes manuais mínimos de segurança

### 20.1. Admin

Testar:

```txt
[ ] Acessar /admin deslogado redireciona para login.
[ ] Usuário logado não autorizado não acessa /admin.
[ ] Usuário autorizado acessa /admin.
[ ] Server Action administrativa falha sem admin.
[ ] Route Handler de upload falha sem admin.
```

---

### 20.2. Produtos

Testar:

```txt
[ ] Criar produto com dados válidos funciona.
[ ] Criar produto sem nome falha.
[ ] Criar produto com slug duplicado falha.
[ ] Editar produto inexistente falha.
[ ] Desativar produto remove da listagem pública.
```

---

### 20.3. Upload

Testar:

```txt
[ ] Upload de jpg válido funciona.
[ ] Upload de png válido funciona.
[ ] Upload de webp válido funciona.
[ ] Upload de arquivo grande falha.
[ ] Upload de pdf falha.
[ ] Upload de exe/js/html falha.
[ ] Upload sem login falha.
```

---

### 20.4. Conteúdo editável

Testar:

```txt
[ ] Texto comum renderiza corretamente.
[ ] Tentativa de inserir script não executa.
[ ] FAQ com conteúdo inválido falha.
[ ] Depoimento muito longo falha.
[ ] SEO title muito longo falha.
```

---

### 20.5. WhatsApp

Testar:

```txt
[ ] Link de produto abre com mensagem correta.
[ ] Link da lista abre com todos os produtos selecionados.
[ ] Caracteres especiais são codificados corretamente.
[ ] Número inválido no admin é rejeitado.
[ ] Clique em WhatsApp não salva dados pessoais desnecessários.
```

---

## 21. O que a IA não deve implementar sem nova decisão

A IA não deve implementar sem aprovação explícita:

- Checkout.
- Pagamento online.
- Área de cliente.
- Login de visitantes.
- Sistema de pedidos.
- Reservas por data.
- Agenda de disponibilidade.
- Upload de vídeos para storage.
- Page builder livre.
- Campo de HTML customizado.
- Multiusuário com permissões.
- Integração com CRM.
- Integração com e-mail marketing.
- Coleta de dados pessoais de visitantes.

---

## 22. Critérios de aceite deste documento

A implementação estará alinhada a este documento quando:

- Todas as rotas admin estiverem protegidas pelo Clerk.
- Todas as mutações admin exigirem `requireAdmin()`.
- Upload estiver restrito a imagens válidas.
- Dados editáveis forem validados no servidor.
- Conteúdos do admin forem renderizados sem HTML perigoso.
- Variáveis sensíveis não forem expostas ao client.
- A lista de produtos não virar checkout.
- A conversão para WhatsApp funcionar sem coletar dados desnecessários.
- Ações administrativas relevantes gerarem logs.
- Erros forem tratados sem vazamento de informações internas.
