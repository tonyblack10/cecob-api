const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {

  const { usuariosController } = app.controllers;

  /**
   * @apiDefine UsuarioPayload
   * @apiSuccess {Number} id ID do usuário
   * @apiSuccess {String} nome Nome do usuário
   * @apiSuccess {String} email E-mail do usuário
   * @apiSuccess {String} permissao Papel do usuário no sistema
  */
  app.route('/api/v1/usuarios')
    .all(tokenUtil.validaToken, tokenUtil.temPermissao('ADMIN'))
    /**
     * @api {post} /api/v1/usuarios Salva um usuário
     * @apiVersion 1.0.0
     * @apiName salvaUsuario
     * @apiGroup Usuarios
     * 
     * @apiHeader {String} Content-Type Formato de dado enviado
     * @apiHeader {String} Accept Formato de dado esperado
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {
     *    "Content-Type": "application/json",
     *    "Accept": "application/json",
     *    "Authorization": "Bearer xyz.abc.123.hgf"
     *  }
     * 
     * @apiParam {String} nome Nome completo
     * @apiParam {String} email E-mail (será utilizado para realizar login)
     * @apiParam {String} senha Senha do usuário
     * @apiParam {String} permissao Papel do usuário no sistema
     * @apiParamExample {json} Entrada
     *  {
     *    "nome": "Fulano da Silva",
     *    "email": "fulano@email.com",
     *    "senha": "123456",
     *    "permissao": "SECRETARIA"
     *  }
     * 
     * @apiSuccessExample {json} Created
     *  HTTP/1.1 201 Created
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Forbidden
     *  HTTP/1.1 403 Forbidden
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .post(usuariosController.salva)
    /**
     * @api {get} /api/v1/usuarios Busca todos os usuários
     * @apiVersion 1.0.0
     * @apiName buscaTodosOsUsuarios
     * @apiGroup Usuarios
     * 
     * @apiHeader {String} Content-Type Formato de dado enviado
     * @apiHeader {String} Accept Formato de dado esperado
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {
     *    "Content-Type": "application/json",
     *    "Accept": "application/json",
     *    "Authorization": "Bearer xyz.abc.123.hgf"
     *  }
     * 
     * @apiUse UsuarioPayload
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     *  [
     *    {
     *      "id": "1",
     *      "nome": "Beltrano dos Santos",
     *      "email": "beltrano@email.com",
     *      "permissao": "ADMIN"
     *    },
     *    {
     *      "id": "2",
     *      "nome": "Fulano da Silva",
     *      "email": "fulano@email.com",
     *      "permissao": "SECRETARIA"
     *    }
     *  ]
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Forbidden
     *  HTTP/1.1 403 Forbidden
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(usuariosController.listaTodos);

  app.route('/api/v1/usuarios/:id')
    .all(tokenUtil.validaToken, tokenUtil.temPermissao('ADMIN'))
    /**
     * @api {get} /api/v1/usuarios Busca um usuário pelo ID
     * @apiVersion 1.0.0
     * @apiName buscaUsuarioPeloId
     * @apiGroup Usuarios
     * 
     * @apiHeader {String} Content-Type Formato de dado enviado
     * @apiHeader {String} Accept Formato de dado esperado
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {
     *    "Content-Type": "application/json",
     *    "Accept": "application/json",
     *    "Authorization": "Bearer xyz.abc.123.hgf"
     *  }
     * 
     * @apiParam {Number} id ID da despesa
     * 
     * @apiUse UsuarioPayload
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     *  {
     *    "id": "2",
     *    "nome": "Fulano da Silva",
     *    "email": "fulano@email.com",
     *    "permissao": "SECRETARIA"
     *  }
     * @apiErrorExample {json} Not Found
     *  HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(usuariosController.buscaPorId)
    /**
     * @api {put} /api/v1/usuarios Edita um usuário
     * @apiVersion 1.0.0
     * @apiName editaUsuario
     * @apiGroup Usuario
     * 
     * @apiHeader {String} Content-Type Formato de dado enviado
     * @apiHeader {String} Accept Formato de dado esperado
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {
     *    "Content-Type": "application/json",
     *    "Accept": "application/json",
     *    "Authorization": "Bearer xyz.abc.123.hgf"
     *  }
     * 
     * @apiParam {String} nome Nome completo
     * @apiParam {String} email E-mail (será utilizado para realizar login)
     * @apiParam {String} senha Senha do usuário
     * @apiParam {String} permissao Papel do usuário no sistema
     * @apiParamExample {json} Entrada
     *  {
     *    "nome": "Fulano da Silva",
     *    "email": "fulano@email.com",
     *    "permissao": "SECRETARIA"
     *  }
     * 
     * @apiSuccessExample {json} Created
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Forbidden
     *  HTTP/1.1 403 Forbidden
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
    */
    .put(usuariosController.edita)
    /**
     * @api {delete} /api/v1/usuarios/:id Remove um usuário
     * @apiVersion 1.0.0
     * @apiName removeUsuario
     * @apiGroup Usuarios
     * 
     * @apiHeader {String} Content-Type Formato de dado enviado
     * @apiHeader {String} Accept Formato de dado esperado
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {
     *    "Content-Type": "application/json",
     *    "Accept": "application/json",
     *    "Authorization": "Bearer xyz.abc.123.hgf"
     *  }
     * 
     * @apiParam {Number} id ID do usuário
     * 
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
    */
    .delete(usuariosController.remove);

  app.patch('/api/v1/usuarios/:id/altera-status', 
    tokenUtil.validaToken, tokenUtil.temPermissao('ADMIN'), 
    usuariosController.alteraStatus);

  app.get('/api/v1/usuarios/exists/:email', usuariosController.verificaSeUsuarioExiste);
};
