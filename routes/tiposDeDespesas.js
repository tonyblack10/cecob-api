const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { tiposDeDespesasController } = app.controllers;

  /**
   * @apiDefine TipoDeDespesaPayload
   * @apiSuccess {Number} id ID do tipo de despesa.
   * @apiSuccess {String} descricao Descrição do tipo de despesa.
   * 
   */

  app.route('/api/v1/tipos-despesas')
    .all(tokenUtil.validaToken)
    /**
     * @api {post} /api/v1/tipos-despesas Salva um tipo de despesa
     * @apiVersion 0.1.0
     * @apiName salvaTipoDeDespesa
     * @apiGroup TiposDeDespesas
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {String} descricao Descrição do tipo de despesa
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Tipo de Despesa Teste"
     *  }
     * 
     * @apiSuccessExample {json} Created
     *  HTTP/1.1 201 Created
     *  {
     *    "id": "1",
     *    "descricao": "Tipo de Despesa Teste"
     *  }
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .post(tiposDeDespesasController.salva)
    /**
     * @api {get} /api/v1/tipos-despesas Busca todos os tipos de despesas
     * @apiVersion 0.1.0
     * @apiName buscaTodosOsTiposDeDespesas
     * @apiGroup TiposDeDespesas
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiUse TipoDeDespesaPayload
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     *  [
     *    {
     *      "id": "1",
     *      "descricao": "Tipo de Despesa Teste"
     *    },
     *    {
     *      "id": "2",
     *      "descricao": "Tipo de Despesa Teste 2"
     *    }
     *  ]
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(tiposDeDespesasController.listaTodos);

  app.route('/api/v1/tipos-despesas/:id')
    .all(tokenUtil.validaToken)
    /**
     * @api {get} /api/v1/tipos-despesas/:id Busca tipo de despesa pelo ID
     * @apiVersion 0.1.0
     * @apiName buscaTipoDeDespesaPeloId
     * @apiGroup TiposDeDespesas
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {Number} id ID do tipo de despesa
     * 
    *  @apiUse TipoDeDespesaPayload
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     * {
     *  "id": "1",
     *  "descricao": "Tipo de Despesa Teste"
     * }
     * @apiErrorExample {json} Not Found
     *  HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(tiposDeDespesasController.buscaPorId)
    /**
     * @api {put} /api/v1/tipos-despesas/:id Edita um tipo de despesa
     * @apiVersion 0.1.0
     * @apiName editaTipoDeDespesa
     * @apiGroup TiposDeDespesas
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {Number} id ID do tipo de despesa
     * @apiParam {String} descricao Descrição tipo de despesa
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Tipo de despesa editada"
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
    .put(tiposDeDespesasController.edita)
    /**
     * @api {delete} /api/v1/tipos-despesas/:id Remove um tipo de despesa pelo ID
     * @apiVersion 0.1.0
     * @apiName removeTipoDeDespesa
     * @apiGroup TiposDeDespesas
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {Number} id ID do tipo de despesa
     * 
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .delete(tiposDeDespesasController.remove);
};
