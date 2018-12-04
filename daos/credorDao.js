module.exports = app => {
  const { Credor } = app.config.db.models;

  return {
    buscaTodos: () => {
      return Credor.findAll({ order: [['descricao', 'ASC']] });
    },
    salva: credor => {
      return Credor.create(credor);
    },
    buscaPorId: id => {
      return Credor.findOne({where: {id}});
    },
    edita: (credor, id) => {
      return Credor.update(credor, {where: {id}});
    },
    remove: id => {
      return Credor.destroy({where: {id}});
    }
  };
};
