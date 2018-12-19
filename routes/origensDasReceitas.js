const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { origensDasReceitasController } = app.controllers;

  /**
   * @apiDefine OrigemDaReceitaPayload
   * @apiSuccess {Number} id ID da origem da receita.
   * @apiSuccess {String} descricao Descrição da origem da receita.
   */
  app.route('/api/v1/origens-receitas')
    .all(tokenUtil.validaToken)
    /**
     * @api {post} /api/v1/origens-receitas Salva uma origem de receita
     * @apiVersion 1.0.0
     * @apiName salvaOrigemDeReceita
     * @apiGroup OrigensDeReceitas
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
     * @apiParam {String} descricao Descrição da origem da receita.
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Origem de Receita Teste"
     *  }
     * 
     * @apiSuccessExample {json} Created
     *  HTTP/1.1 201 Created
     *  {
     *    "id": "1",
     *    "descricao": "Origem de Receita Teste"
     *  }
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .post(origensDasReceitasController.salva)
    /**
     * @api {get} /api/v1/origens-receitas Busca todos as origens de receitas
     * @apiVersion 1.0.0
     * @apiName buscaTodasAsOrigensDeReceitas
     * @apiGroup OrigensDeReceitas
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
     * @apiUse OrigemDaReceitaPayload
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     *  [
     *    {
     *      "id": "1",
     *      "descricao": "Origem de Receita Teste"
     *    },
     *    {
     *      "id": "2",
     *      "descricao": "Origem de Receita Teste 2"
     *    }
     *  ]
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(origensDasReceitasController.listaTodos);

  app.route('/api/v1/origens-receitas/:id')
    .all(tokenUtil.validaToken)
    /**
     * @api {get} /api/v1/origens-receitas/:id Busca origem de receita pelo ID
     * @apiVersion 1.0.0
     * @apiName buscaOrigemDeReceitaPeloId
     * @apiGroup OrigensDeReceitas
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
     * @apiParam {Number} id ID da origem da receita
     * 
    *  @apiUse OrigemDaReceitaPayload
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     * {
     *  "id": "1",
     *  "descricao": "Origem da Receita Teste"
     * }
     * @apiErrorExample {json} Not Found
     *  HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(origensDasReceitasController.buscaPorId)
    /**
     * @api {put} /api/v1/origens-receitas/:id Edita uma origem de receita
     * @apiVersion 1.0.0
     * @apiName editaOrigemDeReceita
     * @apiGroup OrigensDeReceitas
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
     * @apiParam {Number} id ID da origem da receita
     * @apiParam {String} descricao Descrição da origem da receita
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Origem da receita editada"
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
    .put(origensDasReceitasController.edita)
    /**
     * @api {delete} /api/v1/origens-receitas/:id Remove uma origem de receita pelo ID
     * @apiVersion 1.0.0
     * @apiName removeOrigemDeReceita
     * @apiGroup OrigensDeReceitas
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
     * @apiParam {Number} id ID da origem de receita
     * 
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .delete(origensDasReceitasController.remove);
};
