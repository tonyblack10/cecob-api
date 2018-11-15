const jwt = require('jsonwebtoken');

module.exports = {
  validaToken: (req, res, next) => {
    const dados = _extraiTokenDaRequisicao(req)
    let result;
    if (dados) {
      try {
        result = jwt.verify(dados.token, process.env.JWT_SECRET, dados.options);
        req.decoded = result;
        next();
      } catch (err) {
        res.sendStatus(401);
      }
    } else {
      result = { 
        error: `Erro de autenticação. O token é requerido.`,
        status: 401
      };
      res.status(401).send(result);
    }
  },
  temPermissao: (...permissoes) => (req, res, next) => {
    const { permissao } = req.decoded;
    if(!permissao) {
      res.sendStatus(401);
    } else {
      if(!permissoes.includes(permissao)) 
        res.sendStatus(403);
      else 
        next();
    }
  }
};

const _extraiTokenDaRequisicao = req => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return undefined;

  return {
    token: req.headers.authorization.split(' ')[1],
    options: {
      expiresIn: '1d'
    }
  }
}
