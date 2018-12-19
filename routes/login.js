module.exports = app => {

  const { loginController } = app.controllers;

  /**
   * @api {post} /api/v1/login Realiza login
   * @apiVersion 1.0.0
   * @apiName realizaLogin
   * @apiGroup Login
   * 
   * @apiHeader {String} Content-Type Formato de dado enviado
   * @apiHeader {String} Accept Formato de dado esperado
   * @apiHeaderExample {json} Header
   *  {
   *    "Content-Type": "application/json",
   *    "Accept": "application/json"
   *  }
   * 
   * @apiParam {String} email E-mail do usuário
   * @apiParam {String} senha Senha do usuário
   * @apiParamExample {json} Entrada
   *  {
   *    "email": "usuario@email.com",
   *    "senha": "123456"
   *  }
   * 
   * @apiSuccessExample {json} No Content
   *  HTTP/1.1 204 No Content
   * @apiHeader (Response Headers) {String} x-access-token Bearer token.
   * @apiErrorExample {json} Unauthorized
   *  HTTP/1.1 401 Unauthorized
   * @apiErrorExample {json} Internal Server Error
   *  HTTP/1.1 500 Internal Server Error
   */
  app.post('/api/v1/login', loginController.login)
};
