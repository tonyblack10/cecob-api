const tokenUtil = require('../utils/tokenUtil');

module.exports = app => {
  const { usuarioDao } = app.daos;

  return {
    listaTodos: async (req, res) => {
      try {
        const { query } = req.query;
        const usuarios = await usuarioDao.busca(query);
        res.json(usuarios);
      } catch(err) {
        console.log(err);
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
      const usuarioLogado = tokenUtil.getUsuarioLogado(req);
      if(usuarioLogado.id == req.params.id) {
        res.status(400).json({msg: 'O usuário logado não pode alterar seu próprio status.'});
        return;
      }
      try {
        await usuarioDao.editaStatus(status, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    remove: async (req, res) => {
      const usuarioLogado = tokenUtil.getUsuarioLogado(req);
      if(usuarioLogado.id == req.params.id) {
        res.status(400).json({msg: 'O usuário logado não pode exluir se exluir.'});
        return;
      }
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
