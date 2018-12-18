const paginadorUtil = require('../utils/paginadorUtil');

module.exports = app => {
  const { Receita } = app.config.db.models;
  const { OrigemDaReceita } = app.config.db.models;
  const { TipoDeReceita } = app.config.db.models;

  return {
    buscaPaginada: query => {
      const numeroDaPagina = query.pagina || 0;
      const filtroReceita = {};
      const opcoes = {
        where: filtroReceita,
        include: [{model: OrigemDaReceita}, {model: TipoDeReceita}], 
        order: [['data', 'DESC']]
      };
      return paginadorUtil.realizaPaginacao(Receita, opcoes, numeroDaPagina);
    },
    salva: receita => {
      return Receita.create(receita);
    },
    buscaPorId: id => {
      return Receita.findOne({where: {id}});
    },
    edita: (receita, id) => {
      return Receita.update(receita, {where: {id}});
    },
    remove: id => {
      return Receita.destroy({where: {id}});
    }
  };
};
