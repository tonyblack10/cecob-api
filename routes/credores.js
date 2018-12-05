const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { credoresController } = app.controllers;

  app.route('/api/v1/credores')
    .all(tokenUtil.validaToken)
    /**
     * @api {post} /api/v1/credores Salva um credor
     * @apiVersion 0.1.0
     * @apiName salvaCredor
     * @apiGroup Credores
     * @apiDescription Endpoint utilizado para salvar um novo credor.
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {String} descricao Nome do credor
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Credor de Teste"
     *  }
     * 
     * @apiSuccessExample {json} Created
     *  HTTP/1.1 201 Created
     *  {
     *    "id": "1",
     *    "descricao": "Credor de Teste"
     *  }
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .post(credoresController.salva)
    /**
     * @api {get} /api/v1/credores Busca todos os credores
     * @apiVersion 0.1.0
     * @apiName buscaTodosOsCredores
     * @apiGroup Credores
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiSuccess {Number} id ID do credor.
     * @apiSuccess {String} descricao Nome do credor.
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     *  [
     *    {
     *      "id": "1",
     *      "descricao": "Credor de Teste"
     *    },
     *    {
     *      "id": "2",
     *      "descricao": "Credor de Teste 2"
     *    }
     *  ]
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(credoresController.listaTodos);

  app.route('/api/v1/credores/:id')
    .all(tokenUtil.validaToken)
    /**
     * @api {get} /api/v1/credores/:id Busca credor pelo ID
     * @apiVersion 0.1.0
     * @apiName buscaCredorPeloId
     * @apiGroup Credores
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {Number} id ID do credor
     * 
     * @apiSuccess {Number} id ID do credor.
     * @apiSuccess {String} descricao Nome do credor.
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     * {
     *  "id": "1",
     *  "descricao": "Credor de Teste"
     * }
     * @apiErrorExample {json} Not Found
     *  HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(credoresController.buscaPorId)
    /**
     * @api {put} /api/v1/credores/:id Edita um credor
     * @apiVersion 0.1.0
     * @apiName editaCredor
     * @apiGroup Credores
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {Number} id ID do credor
     * @apiParam {String} descricao Nome do credor
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "Credor editado"
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
    .put(credoresController.edita)
    /**
     * @api {delete} /api/v1/credores/:id Remove um credor pelo ID
     * @apiVersion 0.1.0
     * @apiName removeCredor
     * @apiGroup Credores
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {Number} id ID do credor
     * 
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .delete(credoresController.remove);
};
