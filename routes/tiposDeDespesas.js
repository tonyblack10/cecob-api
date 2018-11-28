const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { tiposDeDespesasController } = app.controllers;

  app.route('/api/v1/tipos-despesas')
    .all(tokenUtil.validaToken)
    .post(tiposDeDespesasController.salva)
    .get(tiposDeDespesasController.listaTodos);

  app.route('/api/v1/tipos-despesas/:id')
    .all(tokenUtil.validaToken)
    .get(tiposDeDespesasController.buscaPorId)
    .put(tiposDeDespesasController.edita)
    .delete(tiposDeDespesasController.remove);
};
