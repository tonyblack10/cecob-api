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
          if(Usuario.ehSenhaValida(usuario.senha, senha)) {
            const payload = { 
              id: usuario.id,
              nome: usuario.nome,
              email: usuario.email, 
              permissao: usuario.permissao
            };
            const options = { expiresIn: '1d' };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);

            res.set('x-access-token', token);
            res.json({success: true}).status(200);
          } else {
            res.sendStatus(401);
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