module.exports = app => {
  const { TipoDeReceita } = app.config.db.models;

  return {
    buscaTodos: () => {
      return TipoDeReceita.findAll({ order: [['descricao', 'ASC']] });
    },
    salva: tipoDeReceita => {
      return TipoDeReceita.create(tipoDeReceita);
    },
    buscaPorId: id => {
      return TipoDeReceita.findOne({where: {id}});
    },
    edita: (tipoDeReceita, id) => {
      return TipoDeReceita.update(tipoDeReceita, {where: {id}});
    },
    remove: id => {
      return TipoDeReceita.destroy({where: {id}});
    }
  };
};
