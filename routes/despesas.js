const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { despesasController } = app.controllers;

  app.route('/api/v1/despesas')
    .all(tokenUtil.validaToken)
    /**
     * @api {post} /api/v1/despesas Salva uma nova despesa
     * @apiVersion 0.1.0
     * @apiName salvaDeDespesa
     * @apiGroup Despesas
     * 
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer xyz.abc.123.hgf"}
     * 
     * @apiParam {String} descricao Descrição da despesa
     * @apiParam {String} dataDaCompetencia Data que a despesa foi gerada
     * @apiParam {String} dataDeVencimento Data de vencimento da despesa
     * @apiParam {Number} valor Valor da despesa
     * @apiParam {String} dataDePagamento Data que a despesa foi paga
     * @apiParam {Number} desconto Desconto aplicado à despesa
     * @apiParam {Number} multa Multa aplicada à despesa
     * @apiParam {Number} credores_id ID do credor
     * @apiParam {Number} tipos_despesas_id ID do tipo de despesa
     * @apiParamExample {json} Entrada
     *  {
     *    "descricao": "IPTU de 2018",
     *    "dataDaCompetencia": "2018-11-01",
     *    "dataDeVencimento": "2018-11-10",
     *    "valor": "310.5",
     *    "dataDePagamento": "2018-11-05",
     *    "desconto": "2.13",
     *    "multa": "0.0",
     *    "credores_id": "1",
     *    "tipos_despesas_id": "1"
     *  }
     * 
     * @apiSuccessExample {json} Created
     *  HTTP/1.1 201 Created
     * @apiHeader (Response Headers) {String} location Path da despesa criada.
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .post(despesasController.salva)
    /**
     * @api {get} /api/v1/despesas?pagina=0 Lista as despesas
     * @apiVersion 0.1.0
     * @apiName listaDespesas
     * @apiGroup Despesas
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
     * @apiParam (query param) {Number} pagina Número da página dos resultados
     * @apiParam (query param) {String} dataVencimentoDe Filtro de despesa por intervalo de data de vencimento (inicio)
     * @apiParam (query param) {String} dataVencimentoAte Filtro de despesa por intervalo de data de vencimento (término)
     * @apiParam (query param) {Boolean} statusPagamento Filtro por status de pagamento da despesa
     * @apiParam (query param) {Number} credorId Filtro por credor
     * @apiParam (query param) {Number} tipoId Filtro por tipo de despesa
     * 
     * @apiSuccess {Number} id ID da despesa
     * @apiSuccess {String} descricao Descrição da despesa
     * @apiSuccess {String} dataDaCompetencia Data que a despesa foi gerada
     * @apiSuccess {String} dataDeVencimento Data de vencimento da despesa
     * @apiSuccess {Number} valor Valor da despesa
     * @apiSuccess {String} dataDePagamento Data que a despesa foi paga
     * @apiSuccess {Number} desconto Desconto aplicado à despesa
     * @apiSuccess {Number} multa Multa aplicada à despesa
     * @apiSuccess {Object} Credor Credor da despesa
     * @apiSuccess {Number} Credor.id ID do credor
     * @apiSuccess {String} Credor.descricao Descrição do credor
     * @apiSuccess {Object} TipoDeDespesa Tipo da despesa
     * @apiSuccess {Number} TipoDeDespesa.id ID do tipo de despesa
     * @apiSuccess {String} TipoDeDespesa.descricao Descrição do tipo de despesa
     * 
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     *  {
     *    "totalDeElementos": "2",
     *    "totalDePaginas": "1",
     *    "pagina": "0",
     *    "conteudo": [
     *      {
     *        "id": "1",
     *        "descricao": "IPTU de 2018",
     *        "dataDaCompetencia": "2018-11-01",
     *        "dataDeVencimento": "2018-11-10",
     *        "valor": "310.5",
     *        "dataDePagamento": "2018-11-05",
     *        "desconto": "2.13",
     *        "multa": "0.0",
     *        "Credor": {
     *          "id": "10",
     *          "descricao": "Prefeitura"
     *        },
     *        "TipoDeDespesa": {
     *          "id": "15",
     *          "descricao": "Moradia"
     *        }
     *      },
     *      {
     *        "id": "2",
     *        "descricao": "Lavagem do carro",
     *        "dataDaCompetencia": "2018-10-13",
     *        "dataDeVencimento": "2018-10-13",
     *        "valor": "20",
     *        "Credor": {
     *          "id": "10",
     *          "descricao": "Lava Rápido"
     *        },
     *        "TipoDeDespesa": {
     *          "id": "15",
     *          "descricao": "Gerais"
     *        }
     *      },
     *    ]
     *  }
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(despesasController.lista);

  app.route('/api/v1/despesas/:id')
    .all(tokenUtil.validaToken)
    /**
     * @api {get} /api/v1/despesas Busca uma despesa pelo ID
     * @apiVersion 0.1.0
     * @apiName buscaDespesaPeloId
     * @apiGroup Despesas
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
     * @apiSuccess {Number} id ID da despesa
     * @apiSuccess {String} descricao Descrição da despesa
     * @apiSuccess {String} dataDaCompetencia Data que a despesa foi gerada
     * @apiSuccess {String} dataDeVencimento Data de vencimento da despesa
     * @apiSuccess {Number} valor Valor da despesa
     * @apiSuccess {String} dataDePagamento Data que a despesa foi paga
     * @apiSuccess {Number} desconto Desconto aplicado à despesa
     * @apiSuccess {Number} multa Multa aplicada à despesa
     * @apiSuccess {Object} Credor Credor da despesa
     * @apiSuccess {Number} Credor.id ID do credor
     * @apiSuccess {String} Credor.descricao Descrição do credor
     * @apiSuccess {Object} TipoDeDespesa Tipo da despesa
     * @apiSuccess {Number} TipoDeDespesa.id ID do tipo de despesa
     * @apiSuccess {String} TipoDeDespesa.descricao Descrição do tipo de despesa
     * @apiSuccessExample {json} Payload
     *  HTTP/1.1 200 OK
     *  {
     *    "id": "1",
     *    "descricao": "IPTU de 2018",
     *    "dataDaCompetencia": "2018-11-01",
     *    "dataDeVencimento": "2018-11-10",
     *    "valor": "310.5",
     *    "dataDePagamento": "2018-11-05",
     *    "desconto": "2.13",
     *    "multa": "0.0",
     *    "Credor": {
     *      "id": "10",
     *      "descricao": "Prefeitura"
     *    },
     *    "TipoDeDespesa": {
     *      "id": "15",
     *      "descricao": "Moradia"
     *    }
     *  }
     * @apiErrorExample {json} Not Found
     *  HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .get(despesasController.buscaPorId)
    .put(despesasController.edita)
    /**
     * @api {delete} /api/v1/despesas/:id Remove uma despesa
     * @apiVersion 0.1.0
     * @apiName removeDespesa
     * @apiGroup Despesas
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
     * @apiSuccessExample {json} No Content
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Unauthorized
     *  HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Internal Server Error
     *  HTTP/1.1 500 Internal Server Error
     */
    .delete(despesasController.remove);
};
