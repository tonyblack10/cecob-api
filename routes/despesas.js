const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { despesasController } = app.controllers;

  app.route('/api/v1/despesas')
    .all(tokenUtil.validaToken)
    .post(despesasController.salva)
    .get(despesasController.lista);

  app.route('/api/v1/despesas/:id')
    .all(tokenUtil.validaToken)
    .get(despesasController.buscaPorId)
    .put(despesasController.edita)
    .delete(despesasController.remove);
};
