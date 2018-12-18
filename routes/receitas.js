const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { receitasController } = app.controllers;

  app.route('/api/v1/receitas')
    .all(tokenUtil.validaToken)
    .post(receitasController.salva)
    .get(receitasController.lista);

  app.route('/api/v1/receitas/:id')
    .all(tokenUtil.validaToken)
    .get(receitasController.buscaPorId)
    .put(receitasController.edita)
    .delete(receitasController.remove);
};
