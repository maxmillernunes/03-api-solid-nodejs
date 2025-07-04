# APP

GymPass style app

## RFs (Requisitos funcionais, (Funcionalidade))

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário;
- [x] Deve ser possível obter o numero de check-ins realizado pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (ate 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negocio, (Caminhos que cada requisito pode tomar))

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-in no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais, (Requisitos que não partem do cliente, requisitos técnicos (Tecnologias, banco de dados, etc)))

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisão esta persistido em banco de dados PostgreSQL;
- [x] Todas as listas de dados precisam estar paginados com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
