# ADR-003 - Usar Clerk para autenticação do admin

## Status

Aceito.

## Contexto

O portal administrativo será usado apenas pelo dono da AlugaGames.

Como o sistema será desenvolvido quase 100% com IA, criar autenticação própria com email, senha, sessão, recuperação e proteção de rota aumentaria o risco de falhas graves de segurança.

## Decisão

Usaremos **Clerk** para autenticação do portal administrativo.

Além disso, o sistema usará uma allowlist de usuários autorizados por variável de ambiente:

```txt
CLERK_ADMIN_USER_IDS
```

A autenticação do Clerk não substitui autorização interna. Toda operação sensível deve validar se o usuário autenticado está na allowlist.

## Alternativas consideradas

1. Criar autenticação própria com email e senha.
2. Usar Supabase Auth.
3. Usar Clerk.
4. Não ter login no admin.

## Motivo da escolha

Clerk reduz o risco de implementação insegura de login e sessão. Como haverá apenas um usuário administrativo, o controle por allowlist é simples, objetivo e seguro para o escopo.

## Consequências

- O projeto passa a depender do Clerk.
- O dono precisa ter conta configurada corretamente.
- A variável `CLERK_ADMIN_USER_IDS` precisa estar correta no ambiente de produção.
- Toda Server Action e Route Handler administrativo precisa chamar `requireAdmin()`.
- A IA não deve criar tabela própria de usuários/senhas para o admin.

## Regras de implementação

- Criar helper centralizado `requireAdmin()`.
- Usar middleware para proteger `/admin`.
- Validar autorização no servidor, não apenas na UI.
- Não confiar apenas na existência de sessão.
- Não permitir cadastro público de admins.
- Não implementar multiusuário ou RBAC no escopo atual.
- Nunca salvar senha própria no banco.

## Critérios de aceite

- Usuário deslogado não acessa `/admin`.
- Usuário logado, mas fora da allowlist, não executa ações administrativas.
- Server Actions sensíveis chamam `requireAdmin()`.
- Uploads administrativos chamam `requireAdmin()`.
- Não existe autenticação caseira paralela ao Clerk.


> Regra para IA: este ADR é uma decisão aceita. Não altere a direção técnica sem criar uma proposta de novo ADR e explicar impacto em segurança, prazo, arquitetura e escopo.
