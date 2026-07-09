<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Clean Code para agentes

- Use nomes específicos, consistentes e fáceis de buscar com `rg`.
- Evite nomes genéricos como `data`, `result`, `item`, `handler`, `manager`, `service`, `payload`, `response`, `temp` e `obj`.
- Em `src/domain/features`, use uma feature por arquivo e nomeie o arquivo pela ação: `retrieve-public-landing-page-content.ts`, `list-public-products.ts`, `record-admin-audit-log.ts`.
- Padronize verbos de feature: use `retrieve` para leitura de item/fluxo, `list` para coleções, `record` para auditoria/eventos, `build` para montagem pura e `insert/update/delete` para mutações persistentes.
- Não nomeie arquivos de feature apenas pela entidade, como `products.ts`, `landing-page.ts` ou `whatsapp.ts`.
- Nomeie factories de feature com `setup*Feature`, nunca `create*Feature`.
- Instancie repositories, features e controllers somente em `src/main/factories`.
- Controllers devem receber dependências por injeção e organizar fluxo; não devem instanciar repositories ou features.
- Arquivos de repository ficam agrupados por entidade/domínio, como `drizzle-product-repository.ts`; não crie um arquivo por método de contrato.
- Cada método de repository deve executar uma única ação objetiva de banco e não deve chamar outros repositories.
- Se uma consulta precisar compor vários repositories ou várias ações para montar retorno final, isso é feature, não repository.
- Mantenha funções pequenas, com uma responsabilidade e um nível de abstração.
- Prefira objetos tipados quando uma função precisar de vários argumentos.
- Evite boolean flags que mudam o comportamento de uma função.
- Mantenha arquivos importantes abaixo de 500 linhas; prefira 200 a 300 quando fizer sentido.
- Escreva comentários que expliquem o porquê, regra de negócio, fallback, segurança ou limitação técnica.
- Não escreva comentários óbvios, código comentado antigo ou histórico que pertence ao Git.
- Use comentário de topo em arquivos importantes para explicar o papel do arquivo.
- Use JSDoc em funções exportadas, helpers importantes e pontos de entrada.
- Declare tipos de entrada e saída em funções importantes.
- Evite `any`, casts desnecessários e tipos genéricos demais.
- Extraia constantes para valores mágicos que representem regra ou decisão do sistema.
- Encapsule condicionais complexas em funções com nomes positivos e claros.
- Prefira guard clauses e early return a aninhamento profundo.
- Remova código morto, imports não usados e duplicação real.
- Use `import type` para imports usados apenas como tipo.
- Mantenha testes em `__tests__`; não misture arquivos `.test.ts` ou `.spec.ts` dentro de `src`.
- Testes de features e controllers ficam em `__tests__/domain` e `__tests__/controllers`.
- Testes de repositories ficam em `__tests__/infra/repositories` e devem ser integração real com banco.
- Para rodar integração de repositories, suba Postgres com Docker Compose e use `RUN_REPOSITORY_INTEGRATION_TESTS=1`; se 5432 estiver ocupada, use `POSTGRES_PORT=5433 docker compose up -d postgres` e ajuste `DATABASE_URL`.
- Não ignore erros capturados nem promises rejeitadas; registre contexto seguro ou propague.
- Não deixe `console.log` solto em produção.
- Rode os comandos reais do projeto antes de concluir: `bun run lint`, `bun run typecheck` e `bun run build`.
- Não crie abstrações, managers, providers ou factories fora de `src/main/factories` sem ganho claro.
