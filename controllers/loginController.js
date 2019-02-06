const jwt = require('jsonwebtoken');

module.exports = app => {
  const { usuarioDao } = app.daos;
  const { Usuario } = app.config.db.models;

  return {
    login: async (req, res) => {
      const { email, senha } = req.body;
      if(email && senha) {
        try {
          const usuario = await usuarioDao.buscaPorEmail(email);
          if(!usuario || !usuario.status) {
            res.sendStatus(401);
            return;
          }
          const senhaValida = await Usuario.ehSenhaValida(usuario.senha, senha);
          if(!senhaValida) {
            res.sendStatus(401);
          } else {
            const payload = { 
              id: usuario.id,
              nome: usuario.nome,
              email: usuario.email, 
              permissao: usuario.permissao
            };
            const options = { expiresIn: '1d' };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);

            res.set('Content-Type', 'application/json');
            res.set('x-access-token', token);
            res.sendStatus(200);
          }
        } catch (err) {
          console.log(err);
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(401);
      }
    }
  }
};
