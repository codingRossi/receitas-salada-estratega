# ADR-013 - Separar Controller, Feature e Repository

## Status

Aceito.

## Contexto

O projeto começou a ganhar consultas públicas e administrativas com Drizzle. A implementação da landing page pública mostrou um risco arquitetural: um repository grande pode acabar buscando várias fontes, aplicando fallback, normalizando dados e montando o DTO final da tela.

Isso mistura responsabilidades e dificulta manutenção, testes e evolução.

## Decisão

O fluxo padrão do projeto será:

```txt
frontend
  -> controller / action / route handler
    -> feature
      -> repositories pequenos
        -> db
```

Para casos extremamente simples e isolados, pode existir:

```txt
frontend
  -> feature simples
    -> repository pequeno
      -> db
```

A exceção só é aceitável quando a ação não tiver fluxo complexo, múltiplas etapas, resposta HTTP/frontend especial, autenticação/autorização relevante ou tratamento final de erro que mereça controller/action.

## Repositories

Repositories devem ser pequenos e objetivos.

Eles devem:

- executar apenas uma ação de banco por método;
- encapsular consultas Drizzle/SQL;
- aplicar filtros básicos de banco, como `isActive`, `deletedAt`, `status`, `limit` e `orderBy`;
- retornar dados crus ou quase crus vindos do banco.

Eles não devem:

- controlar fluxo da aplicação;
- montar resposta final para tela/frontend;
- tratar erro de negócio;
- aplicar regra de exibição;
- aplicar fallback de conteúdo;
- transformar dados complexos para DTO final;
- normalizar URL para uso de tela;
- chamar várias consultas diferentes e montar uma feature inteira.

Erro de banco pode subir para a feature ou controller/action.

## Features

Features representam ações de negócio ou operações relevantes.

Elas podem:

- chamar um ou mais repositories;
- processar dados;
- transformar rows em entidades ou DTOs;
- normalizar dados;
- aplicar fallback;
- tratar erros esperados;
- validar regras da operação;
- montar objetos de resposta usados pelo controller.

Features não devem virar endpoints nem controllers grandes.

## Helpers

Helpers são funções puras de apoio.

Eles podem:

- mapear estruturas simples;
- filtrar listas;
- formatar valores simples;
- normalizar strings ou URLs quando não houver decisão de negócio complexa.

Eles não devem:

- importar dependências;
- acessar banco, storage ou APIs externas;
- conhecer controllers ou repositories;
- executar processamento de negócio relevante;
- esconder fluxo de aplicação.

## Controllers, Actions e Route Handlers

Controllers, Server Actions e Route Handlers são a fronteira principal com o frontend.

Eles devem:

- receber input do frontend;
- validar/parsing de entrada quando aplicável;
- chamar a feature correta;
- decidir o fluxo principal da operação;
- tratar erro final;
- retornar resposta padronizada para o frontend;
- respeitar autenticação/autorização quando aplicável.

Eles não devem conter Drizzle, SQL direto ou montagem detalhada de DTO que pertence à feature.

## Aplicação prática de SOLID

- **SRP:** repository cuida de banco, feature cuida da operação, controller/action cuida da fronteira.
- **OCP:** adicionar novos blocos, filtros ou fontes de dados deve exigir métodos pequenos e composição na feature, não mexer em um método gigante misturado.
- **ISP:** contratos devem ser pequenos por contexto; não criar interfaces enormes obrigando implementações a carregar métodos que não usam.
- **DIP:** features dependem de contratos de repository quando houver acesso a banco; infra implementa esses contratos.
- **LSP:** implementações devem respeitar exatamente os retornos e efeitos previstos nos contratos.

## Consequências

- Repositories ficam mais fáceis de revisar e testar.
- Features concentram transformação e fallback de forma explícita.
- Pages e componentes deixam de conhecer repositories concretos.
- Pode haver mais arquivos pequenos, mas com responsabilidade mais clara.
- Não serão criadas factories, managers ou providers sem necessidade.

## Critérios de aceite

- Drizzle aparece em runtime apenas em `/src/infra/repositories` ou scripts internos de banco.
- Frontend conversa com controller, Server Action ou Route Handler, salvo exceção simples e isolada.
- Repositories não montam DTO final de tela.
- Features podem montar DTOs, normalizar dados e aplicar fallback.
- Controllers/actions tratam a resposta final ao frontend.

> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em arquitetura, manutenção, testes e escopo.
