module.exports = app => {
  const { OrigemDaReceita } = app.config.db.models;

  return {
    buscaTodos: () => {
      return OrigemDaReceita.findAll({ order: [['descricao', 'ASC']] });
    },
    salva: origemDaReceita => {
      return OrigemDaReceita.create(origemDaReceita);
    },
    buscaPorId: id => {
      return OrigemDaReceita.findOne({where: {id}});
    },
    edita: (origemDaReceita, id) => {
      return OrigemDaReceita.update(origemDaReceita, {where: {id}});
    },
    remove: id => {
      return OrigemDaReceita.destroy({where: {id}});
    }
  };
};
