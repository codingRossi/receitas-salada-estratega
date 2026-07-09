# ADR-012 - Desenvolvimento seguro com IA e security gates

## Status

Aceito.

## Contexto

O sistema será desenvolvido quase 100% com apoio de IA. Isso aumenta produtividade, mas também aumenta risco de código inseguro, atalhos, validação apenas no frontend, upload mal protegido, exposição de secrets, autorização fraca e mudanças de arquitetura não revisadas.

## Decisão

O projeto adotará **security gates obrigatórios** para desenvolvimento com IA.

Nenhuma task é considerada pronta se violar segurança básica, mesmo que a funcionalidade pareça funcionar visualmente.

## Alternativas consideradas

1. Desenvolver rápido e revisar segurança apenas no final.
2. Confiar na IA para fazer certo automaticamente.
3. Criar políticas de desenvolvimento seguro e security gates por task.

## Motivo da escolha

Segurança precisa ser requisito de implementação, não correção final. Como haverá admin, upload e banco de dados, falhas simples podem comprometer o sistema.

## Consequências

- Toda task precisa passar por checklist de segurança.
- Qualquer problema P0 bloqueia a task.
- A IA deve reportar riscos e não esconder falhas.
- Revisões de segurança são parte do fluxo.
- Deploy só ocorre após revisão final.

## Regras de implementação

### P0 - Bloqueia imediatamente

- Rota `/admin` acessível sem autenticação.
- Mutação administrativa sem `requireAdmin()`.
- Upload sem validação de tipo/tamanho/autorização.
- Secret exposto no client ou commitado.
- SQL inseguro ou concatenação perigosa.
- HTML livre renderizado sem sanitização.
- Falha que permite alterar conteúdo público sem ser dono.
- Build quebrado ignorado.
- Teste removido para “passar”.

### P1 - Corrigir antes de homologar

- Falta de logs administrativos em ação sensível.
- Erros muito genéricos no admin.
- Falta de estado de loading/erro.
- Falta de validação UX além da server-side.
- Falta de rate limiting quando necessário.

### P2 - Pode virar melhoria

- Polimento visual.
- Microcopy.
- Melhorias de acessibilidade fina.
- Otimizações adicionais.

## Regras para prompts da IA

Toda task enviada para IA deve conter:

```txt
Leia os docs do projeto.
Implemente apenas esta task.
Não remova segurança para simplificar.
Toda mutação admin deve chamar requireAdmin().
Todo input deve ser validado no servidor.
Todo upload deve seguir a política de mídias.
Ao final, rode checklist de segurança e reporte riscos.
```

## Critérios de aceite

- Toda task tem checklist final.
- Nenhum P0 conhecido permanece.
- Admin está protegido.
- Upload está protegido.
- Secrets não são expostos.
- A IA documenta decisões e pendências.
- Revisão red team é feita antes do deploy.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
