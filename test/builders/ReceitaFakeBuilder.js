const faker = require('faker')
  , moment = require('moment');

class ReceitaFakeBuilder {

  constructor() {
    this._receitas = [];
    this._receita = {};
  }

  criaUma(origemDaReceitaId, tipoDeReceitaId) {
    this._receita = this._geraUmaReceita(origemDaReceitaId, tipoDeReceitaId);
    return this;
  }

  criaMuitas(origemDaReceitaId, tipoDeReceitaId, quantidade = 5) {
    for(let i = 0; i < quantidade; i++) {
      this._receitas.push(this._geraUmaReceita(origemDaReceitaId, tipoDeReceitaId));
    }
    return this;
  }

  _geraUmaReceita(origemDaReceitaId, tipoDeReceitaId) {
    return {
      descricao: faker.lorem.sentence(2),
      data: moment(faker.date.recent()).format('YYYY-MM-DD'),
      valor: faker.random.number({min: 20, max: 250, precision: 2}),
      'origens_receitas_id': origemDaReceitaId,
      'tipos_receitas_id': tipoDeReceitaId
    };
  }

  build() {
    return this._receita;
  }

  buildAll() {
    return this._receitas;
  }

}

module.exports = ReceitaFakeBuilder;
