const realizaPaginacao = (Model, opcoes = {}, numeroDaPagina = 0) => {
  const offset = numeroDaPagina * process.env.QTD_POR_PAGINA;
  opcoes.limit = process.env.QTD_POR_PAGINA;
  opcoes.offset = offset;
  const pagina = {};
  return Model.findAll(opcoes)
    .then(resultado => {
      const where = opcoes.where || {};
      pagina.conteudo = resultado;
      return Model.count({where})
    })
    .then(totalDeElementos => {
      pagina.totalDeElementos = totalDeElementos;
      pagina.totalDePaginas = Math.ceil(totalDeElementos / process.env.QTD_POR_PAGINA);
      pagina.paginaAtual = numeroDaPagina;
      return pagina;
    });
};

module.exports = { realizaPaginacao };
