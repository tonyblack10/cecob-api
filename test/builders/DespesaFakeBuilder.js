const faker = require('faker')
  , moment = require('moment');

class DespesaFakeBuilder {

  constructor() {
    this._despesas = [];
    this._despesa = {};
  }

  criaUma(credorId, tipoDeDespesaId, paga = false) {
    this._despesa = this._geraUmaDespesa(credorId, tipoDeDespesaId,);
    if(paga) {
      Object.assign(this._despesa, this._geraDadosDePagamento());
    }
    return this;
  }

  criaMuitas(credorId, tipoDeDespesaId, paga = false, quantidade = 5) {
    for(let i = 0; i < quantidade; i++) {
      this._despesas.push(this._geraUmaDespesa(credorId, tipoDeDespesaId, paga));
    }
    return this;
  }

  _geraUmaDespesa(credorId, tipoDeDespesaId) {
    return {
      descricao: faker.lorem.sentence(2),
      dataDaCompetencia: moment(faker.date.past()).format('YYYY-MM-DD'),
      dataDeVencimento: moment(faker.date.future()).format('YYYY-MM-DD'),
      valor: faker.random.number({min: 20, max: 250, precision: 2}),
      'credores_id': credorId,
      'tipos_despesas_id': tipoDeDespesaId
    };
  }

  _geraDadosDePagamento() {
    return {
      dataDePagamento: moment(faker.date.future()).format('YYYY-MM-DD'),
      desconto: faker.random.number({min: 2, max: 3, precision: 2}),
    };
  }

  build() {
    return this._despesa;
  }

  buildAll() {
    return this._despesas;
  }

}

module.exports = DespesaFakeBuilder;
