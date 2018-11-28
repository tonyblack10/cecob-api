module.exports = app => {
  const { TipoDeDespesa } = app.config.db.models;

  return {
    buscaTodos: () => {
      return TipoDeDespesa.findAll({ order: [['descricao', 'ASC']] });
    },
    salva: tipoDeDespesa => {
      return TipoDeDespesa.create(tipoDeDespesa);
    },
    buscaPorId: id => {
      return TipoDeDespesa.findOne({where: {id}});
    },
    edita: (tipoDeDespesa, id) => {
      return TipoDeDespesa.update(tipoDeDespesa, {where: {id}});
    },
    remove: id => {
      return TipoDeDespesa.destroy({where: {id}});
    }
  };
};
