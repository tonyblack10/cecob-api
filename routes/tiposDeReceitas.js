const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { tiposDeReceitasController } = app.controllers;

  app.route('/api/v1/tipos-receitas')
    .all(tokenUtil.validaToken)
    .post(tiposDeReceitasController.salva)
    .get(tiposDeReceitasController.listaTodos);

  app.route('/api/v1/tipos-receitas/:id')
    .all(tokenUtil.validaToken)
    .get(tiposDeReceitasController.buscaPorId)
    .put(tiposDeReceitasController.edita)
    .delete(tiposDeReceitasController.remove);
};
