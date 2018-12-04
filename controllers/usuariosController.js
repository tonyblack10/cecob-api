module.exports = app => {
  const { usuarioDao } = app.daos;

  return {
    listaTodos: async (req, res) => {
      try {
        const { id } = req.decoded;
        const usuarios = await usuarioDao.buscaTodos(id);
        res.json(usuarios);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    salva: async (req, res, next) => {
      const novoUsuario = { nome, email, senha, permissao } = req.body;
      try {
        const usuario = await usuarioDao.salva(novoUsuario);
        res.location(`/api/v1/usuarios/${usuario.id}`);
        res.set('Content-Type', 'application/json');
        res.sendStatus(201);
      } catch(err) {
        next(err);
      }
    },
    buscaPorId: async (req, res) => {
      try {
        const usuario = await usuarioDao.buscaPorId(req.params.id);
        if(!usuario) 
          res.sendStatus(404);
        else 
          res.json(usuario);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    edita: async (req, res) => {
      const { nome, email, permissao } = req.body;
      try {
        await usuarioDao.edita({nome, email, permissao}, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        next(err);
      }
    },
    alteraStatus: async (req, res) => {
      const { status } = req.body;
      try {
        await usuarioDao.editaStatus(status, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    remove: async (req, res) => {
      try {
        await usuarioDao.remove(req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    verificaSeUsuarioExiste: async (req, res) => {
      const { email } = req.params;
      try {
        const usuario = await usuarioDao.buscaPorEmail(email);
        if(usuario != null)
          res.json({existe: true}).status(200);
        else 
          res.json({existe: false}).status(404);
      } catch(err) {
        res.status(500).json(err);
      }
    }
  };
}