const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { credoresController } = app.controllers;

  app.route('/api/v1/credores')
    .all(tokenUtil.validaToken)
    .post(credoresController.salva)
    .get(credoresController.listaTodos);

  app.route('/api/v1/credores/:id')
    .all(tokenUtil.validaToken)
    .get(credoresController.buscaPorId)
    .put(credoresController.edita)
    .delete(credoresController.remove);
};
