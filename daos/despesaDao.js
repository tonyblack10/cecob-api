const DespesaFiltroBuilder = require('../filtros-builder/DespesaFiltroBuilder');
const paginadorUtil = require('../utils/paginadorUtil');

module.exports = app => {
  const { Despesa } = app.config.db.models;
  const { Credor } = app.config.db.models;
  const { TipoDeDespesa } = app.config.db.models;

  return {
    buscaPaginada: query => {
      const numeroDaPagina = query.pagina || 0;
      const filtroDespesa = _montaFiltro(query);
      const opcoes = {
        where: filtroDespesa,
        include: [{model: Credor}, {model: TipoDeDespesa}], 
        order: [['dataDeVencimento', 'DESC']]
      };
      return paginadorUtil.realizaPaginacao(Despesa, opcoes, numeroDaPagina);
    },
    salva: despesa => {
      return Despesa.create(despesa);
    },
    buscaPorId: id => {
      return Despesa.findOne({where: {id}});
    },
    edita: (despesa, id) => {
      return Despesa.update(despesa, {where: {id}});
    },
    remove: id => {
      return Despesa.destroy({where: {id}});
    }
  };
};

const _montaFiltro = dados => {
  return new DespesaFiltroBuilder()
    .comVencimentoEntre(dados.dataVencimentoDe, dados.dataVencimentoAte)
    .comStatusPagamento(dados.statusPagamento)
    .doCredor(dados.credorId)
    .doTipo(dados.tipo)
    .build();
}
