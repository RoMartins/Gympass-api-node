# APP

GymPass style app.

## RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar.
- [] Deve ser possivel se autenticar.
- [] Deve ser possível obter o perfil de um usuário logado.
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [] Deve ser possível o usuário obter seu histórico de check-ins.
- [] Deve ser possível o usuário buscar academias próximas.
- [] Deve ser possível buscar academia pelo nome.
- [] Deve ser possível o usuário realizar checki-in em uma escola.
- [] Deve ser possível validar o check-in de um uuário.
- [] Deve ser possível cadastrar uma academia.


## Rns (Regra de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [] o usuário não pode fazer 2 check-ins no mesmo dia.
- [] o usuário não pode fazer check-in e não estivr perto(100m) da academia.
- [] o checkin só pode ser validado até 20 minutos após criado.
- [] o checkin só pode ser validado por administradores.
- [] a academia só pode ser cadastrada por administradores

## RNFS (Requisitos não-funcionais)

- [] A senha do usuário precisa criptorafada.
- [] Os dados serão persistidos em um banco PostgreSQL
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página.
- [] o usuário deve ser identificado por um JWT (JsonWebToken)