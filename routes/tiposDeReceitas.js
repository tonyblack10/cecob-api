const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { tiposDeReceitasController } = app.controllers;

  /**
   * @apiDefine TipoDeReceitaPayload
   * @apiSuccess {Number} id ID do tipo de receita.
   * @apiSuccess {String} descricao Descrição do tipo de receita.
   */
  app.route('/api/v1/tipos-receitas')
    .all(tokenUtil.validaToken)
    /**
     * * @api {post} /api/v1/tipos-receitas Salva um tipo de receita
     * @apiVersion 1.0.0
     * @apiName salvaTipoDeReceita
     * @apiGroup TiposDeReceitas
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
     * @apiParam {String} descricao Descrição tipo de receita
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Tipo de Receita Teste"
     *  }
     * 
     * @apiSuccessExample {json} Created
     *  HTTP/1.1 201 Created
     *  {
     *    "id": "1",
     *    "descricao": "Tipo de Receita Teste"
     *  }
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .post(tiposDeReceitasController.salva)
    /**
     * @api {get} /api/v1/tipos-receitas Lista os tipos de receitas
     * @apiVersion 1.0.0
     * @apiName listaTiposDeReceitas
     * @apiGroup TiposDeReceitas
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
     * @apiParam {Number} id ID do tipo de receita
     * @apiParam {String} descricao Descrição tipo de receita
     * @apiParamExample {json} Entrada
     *  [
     *    {
     *      "id": "1"
     *      "descricao": "Tipo de receita 01"
     *    },
     *    {
     *      "id": "2"
     *      "descricao": "Tipo de receita 02"
     *    }
     *  ]
     * 
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 200 No Content
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(tiposDeReceitasController.listaTodos);

  app.route('/api/v1/tipos-receitas/:id')
    .all(tokenUtil.validaToken)
    /**
     * @api {get} /api/v1/tipos-receitas/:id Busca tipo de receita pelo ID
     * @apiVersion 1.0.0
     * @apiName buscaTipoDeReceitaPeloId
     * @apiGroup TiposDeReceitas
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
     * @apiParam {Number} id ID do tipo de receita
     * 
    *  @apiUse TipoDeReceitaPayload
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     * {
     *  "id": "1",
     *  "descricao": "Tipo de Receita Teste"
     * }
     * @apiErrorExample {json} Not Found
     *  HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(tiposDeReceitasController.buscaPorId)
    /**
     * @api {put} /api/v1/tipos-receitas/:id Edita um tipo de receita
     * @apiVersion 1.0.0
     * @apiName editaTipoDeReceita
     * @apiGroup TiposDeReceitas
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
     * @apiParam {Number} id ID do tipo de receita
     * @apiParam {String} descricao Descrição tipo de receita
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Tipo de receita editada"
     *  }
     * 
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .put(tiposDeReceitasController.edita)
    /**
     * @api {delete} /api/v1/tipos-receitas/:id Remove um tipo de receita pelo ID
     * @apiVersion 0.1.0
     * @apiName removeTipoDeReceita
     * @apiGroup TiposDeReceitas
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
     * @apiParam {Number} id ID do tipo de receita
     * 
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .delete(tiposDeReceitasController.remove);
};
