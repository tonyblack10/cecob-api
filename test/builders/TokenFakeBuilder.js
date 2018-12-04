const jwt = require('jsonwebtoken');

class TokenFakeBuilder {

  constructor() {
    this._payload = {};
    this._token = '';
  }

  getTokenDeAdmin() {
    this._payload = {
      id: 1,
      nome: 'Admin Teste',
      email: 'admin@email.com', 
      permissao: 'ADMIN'
    };
    this._token = jwt.sign(this._payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return this;
  }

  getTokenDeSecretaria() {
    this._payload = {
      id: 1,
      nome: 'Secretaria Teste',
      email: 'secretaria@email.com', 
      permissao: 'SECRETARIA'
    };
    this._token = jwt.sign(this._payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return this;
  }

  build() {
    return this._token;
  }

}

module.exports = TokenFakeBuilder;
