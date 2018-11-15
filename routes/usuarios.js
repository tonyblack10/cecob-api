const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {

  const { usuariosController } = app.controllers;

  app.route('/api/v1/usuarios')
    .all(tokenUtil.validaToken, tokenUtil.temPermissao('ADMIN'))
    .post(usuariosController.salva)
    .get(usuariosController.listaTodos);

  app.route('/api/v1/usuarios/:id')
    .all(tokenUtil.validaToken, tokenUtil.temPermissao('ADMIN'))
    .get(usuariosController.buscaPorId)
    .put(usuariosController.edita)
    .delete(usuariosController.remove);

  app.patch('/api/v1/usuarios/:id/altera-status', 
    tokenUtil.validaToken, tokenUtil.temPermissao('ADMIN'), 
    usuariosController.alteraStatus);

  app.get('/api/v1/usuarios/exists/:email', usuariosController.verificaSeUsuarioExiste);
};
