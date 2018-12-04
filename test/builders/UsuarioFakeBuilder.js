const faker = require('faker');

class UsuarioFakeBuilder {

  constructor() {
    this._usuarios = [];
    this._usuario = {};
  }

  getUm() {
    this._usuario = this._geraUsuario();
    return this;
  }

  getMuitos(quantidade = 3) {
    for(let i = 0; i < quantidade; i++) {
      this._usuarios.push(this._geraUsuario());
    }
    return this;
  }

  _geraUsuario() {
    return {
      nome: faker.name.firstName()+' '+faker.name.lastName(), 
      permissao: 'SECRETARIA', email: faker.internet.email(), senha: '123456' 
    };
  }

  build() {
    return this._usuario;
  }

  buildAll() {
    return this._usuarios;
  }

}

module.exports = UsuarioFakeBuilder;
