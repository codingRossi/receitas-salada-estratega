# ADRs - AlugaGames

Este diretório registra as decisões arquiteturais mais importantes do projeto.

ADR significa **Architecture Decision Record**. Cada ADR explica:

- qual decisão foi tomada;
- por que ela foi tomada;
- quais alternativas foram consideradas;
- quais consequências a decisão gera;
- como a IA/Codex deve respeitar essa decisão durante o desenvolvimento.

## Regras de uso

1. Antes de implementar uma task, a IA deve ler os ADRs relacionados.
2. A IA não pode contrariar um ADR aceito sem criar uma proposta de novo ADR.
3. Mudanças grandes de arquitetura devem gerar novo ADR.
4. ADRs aceitos têm prioridade sobre sugestões livres da IA.
5. Em caso de conflito entre task e ADR, a IA deve pausar e reportar o conflito.

## Lista de ADRs

- ADR-001 - Usar Next.js App Router
- ADR-002 - Manter site público e admin no mesmo projeto
- ADR-003 - Usar Clerk para autenticação do admin
- ADR-004 - Usar Drizzle com PostgreSQL
- ADR-005 - Usar Railway Buckets para mídias
- ADR-006 - Não criar e-commerce, checkout ou pagamento
- ADR-007 - Usar WhatsApp como conversão principal
- ADR-008 - LP editável por blocos controlados
- ADR-009 - Lista de produtos no client sem persistência no banco
- ADR-010 - Páginas institucionais estáticas inicialmente
- ADR-011 - Usar Server Actions para mutações e Route Handlers para upload/tracking
- ADR-012 - Desenvolvimento seguro com IA e security gates
- ADR-013 - Separar Controller, Feature e Repository
