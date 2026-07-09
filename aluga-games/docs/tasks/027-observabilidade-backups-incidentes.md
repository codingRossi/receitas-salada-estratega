# Task 027 - Observabilidade, backups e resposta a incidentes

Prioridade: P1  
Dependências: Task 026  
Área: Operação, segurança, manutenção

## Documentos obrigatórios para leitura antes de executar

Leia, no mínimo:

- `/docs/README.md`
- `/docs/adr/README.md`
- `/docs/product/00-visao-do-produto.md`
- `/docs/product/02-escopo-do-produto.md`
- `/docs/product/03-regras-de-negocio.md`
- `/docs/product/04-user-stories.md`
- `/docs/architecture/00-stack-e-decisoes.md`
- `/docs/architecture/01-arquitetura-de-pastas.md`
- `/docs/architecture/03-banco-de-dados.md`
- `/docs/architecture/05-contratos-de-actions-e-apis.md`
- `/docs/architecture/07-autenticacao-e-autorizacao.md`
- `/docs/architecture/08-seguranca.md`
- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `/docs/quality/01-definition-of-done.md`
- `/docs/quality/02-checklist-review-ai.md`

Leia também qualquer documento específico citado nesta task.


Documentos específicos:

- `/docs/security/01-politicas-de-desenvolvimento-seguro-com-ia.md`
- `/docs/quality/01-definition-of-done.md`

## Objetivo

Criar uma base mínima para operar o sistema com segurança após o deploy, incluindo logs, backups e resposta a incidentes.

## Escopo

Documentar e/ou implementar:

- como verificar logs de produção;
- como identificar erro de upload;
- como identificar erro de auth/admin;
- como exportar ou restaurar banco, conforme suporte do ambiente;
- política simples de backup;
- checklist de resposta a incidente;
- procedimento para revogar acesso do admin;
- procedimento para trocar secrets;
- procedimento para bloquear temporariamente upload;
- procedimento para rollback.

## Fora do escopo

- Não criar sistema enterprise de observabilidade.
- Não implementar SIEM.
- Não armazenar logs sensíveis de visitantes.
- Não coletar dados pessoais desnecessários.

## Requisitos mínimos

- Ter um arquivo documentando operação em produção.
- Ter clareza de onde ficam logs, envs, banco e storage.
- Ter procedimento para backup/restore ou pelo menos export manual.
- Ter checklist em caso de suspeita de invasão.

## Regras inegociáveis para IA

- Não implemente funcionalidades fora do escopo desta task.
- Não remova validações, autenticação ou autorização para “fazer funcionar”.
- Não exponha secrets, tokens, variáveis sensíveis ou stack traces.
- Não crie checkout, pagamento online, pedido fechado no site, área de cliente ou favorito.
- Toda mutação administrativa deve validar autenticação e autorização no servidor.
- Toda entrada do usuário deve ser validada no servidor com schema claro.
- Qualquer alteração de arquitetura precisa ser registrada ou justificada no relatório da task.
- Se encontrar risco P0 de segurança, pare a implementação funcional e registre o bloqueio.


## Critérios de aceite

- Existe documentação operacional.
- Existe checklist de incidente.
- Existe procedimento para trocar secrets.
- Existe procedimento para revogar acesso do dono antigo ou usuário indevido.
- Existe plano mínimo de backup.

## Testes mínimos

- Simular necessidade de troca de env.
- Verificar logs de produção.
- Confirmar como fazer backup/export.
- Confirmar como fazer rollback.

## Relatório obrigatório ao finalizar

Crie ou atualize um relatório em `/docs/tasks/reports/027-relatorio.md` contendo:

- resumo do que foi feito;
- arquivos criados/alterados;
- decisões técnicas tomadas;
- comandos executados;
- resultado de lint, typecheck, build e testes disponíveis;
- riscos encontrados;
- pendências;
- evidência de que os critérios de aceite foram verificados.
