const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { origensDasReceitasController } = app.controllers;

  app.route('/api/v1/origens-receitas')
    .all(tokenUtil.validaToken)
    .post(origensDasReceitasController.salva)
    .get(origensDasReceitasController.listaTodos);

  app.route('/api/v1/origens-receitas/:id')
    .all(tokenUtil.validaToken)
    .get(origensDasReceitasController.buscaPorId)
    .put(origensDasReceitasController.edita)
    .delete(origensDasReceitasController.remove);
};
