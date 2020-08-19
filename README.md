## Desafio Cartão de Crédito

### Projeto construído com:

```bash
Node.Js / Express / MongoDB
```

### Configuração e instalação

1) Clone ou baixe este repositório
```
$ git clone https://github.com/souzajr/credit_card
```
2) Instalação usando npm / yarn
```bash
$ npm install / yarn install
```
3) Iniciando e acessando o projeto após a instalação
```bash
$ npm start / yarn start
```
```bash
Acesse http://localhost:3000
```

-----------------

## O projeto

Esse projeto foi desenvolvido com o objetivo de demonstrar meus conhecimentos na área de backend e não deve ser utilizado em aplicações reais ou em produção.

-----------------

## Rotas
O sistema utiliza autenticação com JWT, por isso é necessário realizar um cadastro e, em rotas protegidas, utilizar o token no header (Authorization) da requisição.<br/>
Utilize JSON como Content-Type do header para enviar e receber informações.

### Cadastrando um novo usuário
Rota: http://localhost:3000/register<br/>
Método: POST</br>
Exemplo de corpo da requisição<br/>
```json
{
  "email": "fulano@teste.com"
}
```
Resposta esperada<br/>
```json
{
  "_id": "5f3d9e56ba50c619e83589de",
  "email": "fulano@teste.com",
  "createdAt": "2020-08-19T21:49:10.491Z",
  "updatedAt": "2020-08-19T21:49:10.491Z",
  "__v": 0
}
```
-----------------
### Logando na aplicação e obtendo o token JWT
Rota: http://localhost:3000/login<br/>
Método: POST</br>
Exemplo de corpo da requisição<br/>
```json
{
  "email": "fulano@teste.com"
}
```
Resposta esperada<br/>
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVmM2Q4NTkzYjc0ODYyMjk1MDRiOGEzNSIsImlhdCI6MTU5Nzg3Mzg2OSwiZXhwIjoxNTk3OTYwMjY5fQ.afUpmtSygWTuTQRSnWZXMK3VaVjuGFscp3wxcMWJckQ"
}
```
-----------------
### Adicionando um cartão de crédito para o usuário logado
Rota: http://localhost:3000/credit-card<br/>
Método: POST</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{
  "number": "4111111111111111",
  "cvv": "123",
  "validation": "12/22",
  "name": "Roberto Souza"
}
```
Resposta esperada<br/>
```json
{
  "transactionHistory": [],
  "_id": "5f3d934be86fa04614f3041c",
  "number": "4111111111111111",
  "cvv": "123",
  "validation": "12/22",
  "name": "Roberto Souza",
  "status": "active",
  "owner": "5f3d8593b7486229504b8a35",
  "createdAt": "2020-08-19T21:02:03.285Z",
  "updatedAt": "2020-08-19T21:02:03.285Z",
  "__v": 0
}
```
-----------------
### Listando todos os cartões de crédito do usuário logado
Rota: http://localhost:3000/credit-card<br/>
Método: GET</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{}
```
Resposta esperada<br/>
```json
[
  {
    "transactionHistory": [],
    "_id": "5f3d934be86fa04614f3041c",
    "number": "4111111111111111",
    "cvv": "123",
    "validation": "12/22",
    "name": "Roberto Souza",
    "status": "pending",
    "owner": {
        "_id": "5f3d8593b7486229504b8a35",
        "email": "teste@teste.com",
        "createdAt": "2020-08-19T20:03:31.862Z",
        "updatedAt": "2020-08-19T20:03:31.862Z",
        "__v": 0
    },
    "createdAt": "2020-08-19T21:02:03.285Z",
    "updatedAt": "2020-08-19T21:02:30.752Z",
    "__v": 0
  }
]
```
-----------------
### Obtendo um cartão de crédito (ID) específico do usuário logado
Rota: http://localhost:3000/credit-card/{id}<br/>
Método: GET</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{}
```
Resposta esperada<br/>
```json
{
  "transactionHistory": [],
  "_id": "5f3d934be86fa04614f3041c",
  "number": "4111111111111111",
  "cvv": "123",
  "validation": "12/22",
  "name": "Roberto Souza",
  "status": "active",
  "owner": {
      "_id": "5f3d8593b7486229504b8a35",
      "email": "teste@teste.com",
      "createdAt": "2020-08-19T20:03:31.862Z",
      "updatedAt": "2020-08-19T20:03:31.862Z",
      "__v": 0
  },
  "createdAt": "2020-08-19T21:02:03.285Z",
  "updatedAt": "2020-08-19T21:02:30.752Z",
  "__v": 0
}
```
-----------------
### Alterando um cartão de crédito (ID) específico do usuário logado
Rota: http://localhost:3000/credit-card/{id}<br/>
Método: PUT</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{
  "number": "4111111111111111",
  "cvv": "123",
  "validation": "12/22",
  "name": "Roberto Souza",
  "status": "pending"
}
```
Resposta esperada<br/>
```json
{
  "transactionHistory": [],
  "_id": "5f3d934be86fa04614f3041c",
  "number": "4111111111111111",
  "cvv": "123",
  "validation": "12/22",
  "name": "Roberto Souza",
  "status": "pending",
  "owner": {
      "_id": "5f3d8593b7486229504b8a35",
      "email": "teste@teste.com",
      "createdAt": "2020-08-19T20:03:31.862Z",
      "updatedAt": "2020-08-19T20:03:31.862Z",
      "__v": 0
  },
  "createdAt": "2020-08-19T21:02:03.285Z",
  "updatedAt": "2020-08-19T21:02:30.752Z",
  "__v": 0
}
```
-----------------
### Removendo um cartão de crédito (ID) específico do usuário logado
Rota: http://localhost:3000/credit-card/{id}<br/>
Método: DELETE</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{}
```
Resposta esperada<br/>
```json
{}
```
-----------------
### Listando todas as transações de um cartão de crédito (ID) específico do usuário logado
Rota: http://localhost:3000/transaction/credit-card/{id}<br/>
Método: GET</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{}
```
Resposta esperada<br/>
```json
[
  {
    "_id": "5f3d97c929fbb103cc20b01b",
    "amount": 10,
    "currency": "BRL",
    "status": "paid",
    "createdAt": "2020-08-19T21:21:13.924Z",
    "updatedAt": "2020-08-19T21:21:13.924Z",
    "__v": 0
  },
  {
    "_id": "5f3d99c3f15678006ca0e954",
    "amount": 15,
    "currency": "BRL",
    "status": "paid",
    "createdAt": "2020-08-19T21:29:39.387Z",
    "updatedAt": "2020-08-19T21:29:39.387Z",
    "__v": 0
  }
]
```
-----------------
### Adicionando uma transação em um cartão de crédito (ID) específico do usuário logado
Rota: http://localhost:3000/transaction/credit-card/{id}<br/>
Método: POST</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{
  "amount": 15,
  "currency": "BRL"
}
```
Resposta esperada<br/>
```json
{
  "_id": "5f3d99c3f15678006ca0e954",
  "amount": 15,
  "currency": "BRL",
  "status": "paid",
  "createdAt": "2020-08-19T21:29:39.387Z",
  "updatedAt": "2020-08-19T21:29:39.387Z",
  "__v": 0
}
```
-----------------
### Alterando uma transação (ID) específica do usuário logado
Rota: http://localhost:3000/transaction/{id}<br/>
Método: PUT</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{
  "amount": 5,
  "currency": "BRL",
  "status": "paid"
}
```
Resposta esperada<br/>
```json
{
  "_id": "5f3d99c3f15678006ca0e954",
  "amount": 5,
  "currency": "BRL",
  "status": "paid",
  "createdAt": "2020-08-19T21:29:39.387Z",
  "updatedAt": "2020-08-19T21:33:27.597Z",
  "__v": 0
}
```
-----------------
### Removendo uma transação (ID) específica do usuário logado
Rota: http://localhost:3000/transaction/{id}<br/>
Método: DELETE</br>
Rota protegida, utilize o token JWT no header da requisição<br/>
Exemplo de corpo da requisição<br/>
```json
{}
```
Resposta esperada<br/>
```json
{}
```
-----------------
