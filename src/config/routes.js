'use strict';

module.exports = app => {
  /* ============= REGISTRO ============= */
  /*
    ROTA RESPONSÁVEL POR CRIAR UM USUÁRIO
  */
  app.post('/register', app.src.controller.user.store);

  /* ============= LOGIN ============= */
  /*
    ROTA RESPONSÁVEL POR VALIDAR O USUÁRIO
    E RETORNAR UM TOKEN (JWT) PARA AS ROTAS
    QUE PRECISAM DE AUTENTICAÇÃO
  */
  app.post('/login', app.src.controller.auth.store);

  /* ============= LISTA E ADIÇÃO DE CARTÕES ============= */
  /*
    ROTA RESPONSÁVEL POR LISTAR E ADICIONAR OS
    CARTÕES DE USUÁRIO LOGADO NA APLICAÇÃO
  */
  app
    .route('/credit-card')
    .all(app.src.config.passport.authenticate())
    .get(app.src.controller.creditCard.index)
    .post(app.src.controller.creditCard.store);

  /* ============= CARTÃO CRUD ============= */
  /*
    ROTA RESPONSÁVEL POR MANIPULAR UM CARTÃO
    ESPECÍFICO DO USUÁRIO LOGADO NA APLICAÇÃO
  */
  app
    .route('/credit-card/:id')
    .all(app.src.config.passport.authenticate())
    .get(app.src.controller.creditCard.show)
    .put(app.src.controller.creditCard.update)
    .delete(app.src.controller.creditCard.remove);

  /* ============= LISTA E ADIÇÃO DE TRANSAÇÕES ============= */
  /*
    ROTA RESPONSÁVEL POR LISTAR TRANSAÇÕES DE UM CARTÃO ESPECÍFICO
  */
  app
    .route('/transaction/credit-card/:id')
    .all(app.src.config.passport.authenticate())
    .get(app.src.controller.transaction.index)
    .post(app.src.controller.transaction.store);

  /* ============= TRANSAÇÃO CRUD ============= */
  /*
    ROTA RESPONSÁVEL POR ADICIONAR E MANIPULAR
    UMA TRANSAÇÃO ESPECÍFICA DE UM CARTÃO
  */
  app
    .route('/transaction/:id')
    .all(app.src.config.passport.authenticate())
    .get(app.src.controller.transaction.show)
    .put(app.src.controller.transaction.update)
    .delete(app.src.controller.transaction.remove);

  // #region HANDLE ERROR
  app.use(function(err, req, res, next) {
    res.status(500).json('Algo deu errado');
  });

  app.get('*', function(req, res) {
    res.status(404).json('URL não encontrado');
  });
  // #endregion
};
