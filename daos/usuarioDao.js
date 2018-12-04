module.exports = app => {
  const { Usuario } = app.config.db.models;

  return {
    buscaTodos: id => {
      return Usuario.findAll({
        where: { id: {$ne: id} },
        attributes: ['id', 'nome', 'permissao', 'email', 'status'],
        order: [['nome', 'ASC']]
      });
    },
    salva: usuario => {
      return Usuario.create(usuario);
    },
    buscaPorId: id => {
      return Usuario.findOne({where: {id}, attributes: [
        'id', 'nome', 'permissao', 'email', 'status'
      ]});
    },
    buscaPorEmail: email => {
      return Usuario.findOne({where: {email}, attributes: [
        'id', 'nome', 'permissao', 'email', 'status', 'senha'
      ]});
    },
    edita: (usuario, id) => {
      usuario.id = id;
      return Usuario.update(usuario, {where: {id}});
    },
    editaStatus: (status, id) => {
      return Usuario.update({status}, {where: {id}});
    },
    remove: id => {
      return Usuario.destroy({where: {id}});
    }
  };
};
