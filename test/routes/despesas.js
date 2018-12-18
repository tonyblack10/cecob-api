const faker = require('faker')
  , moment = require('moment');
const DespesaFakeBuilder = require('../builders/DespesaFakeBuilder');
const TokenFakeBuilder = require('../builders/TokenFakeBuilder');

describe('Route: despesas', function() {
  const { Despesa, Credor, TipoDeDespesa } = app.config.db.models;
  const token = new TokenFakeBuilder().getTokenDeAdmin().build();
  let despesas = undefined;
  let credor = undefined;
  let tipoDeDespesa = undefined;

  beforeEach(async function() {
    await Despesa.destroy({where: {}});
    await Credor.destroy({where: {}});
    await TipoDeDespesa.destroy({where: {}});

    await Credor.create({descricao: faker.lorem.sentences(2)});
    await TipoDeDespesa.create({descricao: faker.lorem.sentences(2)});

    credor = await Credor.findOne({});
    tipoDeDespesa = await TipoDeDespesa.findOne({});

    await Despesa.bulkCreate(
      new DespesaFakeBuilder().criaMuitas(credor.id, tipoDeDespesa.id).buildAll()
      .concat(new DespesaFakeBuilder().criaMuitas(credor.id, tipoDeDespesa.id, true).buildAll())
    );
    despesas = await Despesa.findAll({});
  });

  describe('GET /api/v1/despesas', function() {
    describe('status 200', function() {
      it('deve retornar a lista de despesas', function(done) {
        request.get('/api/v1/despesas')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.have.property('totalDeElementos').that.is.a('number');
            expect(res.body).to.have.property('conteudo').that.is.a('array');
            expect(res.body.conteudo).to.have.length(10);
            done(err);
          });
      });
    });
  });
  describe('POST /api/v1/despesas', function() {
    describe('status 201', function() {
      it('deve criar uma nova despesa sem dados de pagamento', function(done) {
        const novaDespesa = new DespesaFakeBuilder().criaUma(credor.id, tipoDeDespesa.id).build();
        request.post('/api/v1/despesas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaDespesa)
          .expect(201)
          .end(function(err, res) {
            expect(res.header).to.have.any.key('location');
            done(err);
          });
      });
      it('deve criar uma nova despesa com dados de pagamento', function(done) {
        const novaDespesa = new DespesaFakeBuilder().criaUma(credor.id, tipoDeDespesa.id, true).build();
        request.post('/api/v1/despesas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaDespesa)
          .expect(201)
          .end(function(err, res) {
            expect(res.header).to.have.any.key('location');
            done(err);
          });
      });
    });
    describe('status 400', function() {
      it('deve retornar status 400 ao tentar cadastrar despesa com valor negativo', function(done) {
        const novaDespesa = new DespesaFakeBuilder().criaUma(credor.id, tipoDeDespesa.id).build();
        novaDespesa.valor = -2.0;
        request.post('/api/v1/despesas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaDespesa)
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
      it('deve retornar status 400 ao tentar cadastrar despesa com data de pagamento menor que data de competência', function(done) {
        const novaDespesa = new DespesaFakeBuilder().criaUma(credor.id, tipoDeDespesa.id).build();
        novaDespesa.dataDaCompetencia = moment(moment.now()).format('YYYY-MM-DD');
        novaDespesa.dataDePagamento = moment(moment.now()).subtract(2, 'days').format('YYYY-MM-DD');
        request.post('/api/v1/despesas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaDespesa)
          .expect(400)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eql('Validation Errors');
            expect(res.body.errors).to.be.an('array').that.deep.includes({ 
              message: 'A data de pagamento não pode ser menor do que a data de competência',
              path: 'dataDePagamento' 
            });
            done(err);
          });
      });
      it('deve retornar status 400 ao tentar cadastrar despesa com data de vencimento menor que data de competência', function(done) {
        const novaDespesa = new DespesaFakeBuilder().criaUma(credor.id, tipoDeDespesa.id).build();
        novaDespesa.dataDaCompetencia = moment(moment.now()).format('YYYY-MM-DD');
        novaDespesa.dataDeVencimento = moment(moment.now()).subtract(2, 'days').format('YYYY-MM-DD');
        request.post('/api/v1/despesas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaDespesa)
          .expect(400)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eql('Validation Errors');
            expect(res.body.errors).to.be.an('array').that.deep.includes({ 
              message: 'A data de vencimento não pode ser menor do que a data de competência',
              path: 'dataDeVencimento' 
            });
            done(err);
          });
      });
      it('deve retornar status 400 ao tentar cadastrar despesa com desconto maior do que o valor', function(done) {
        const novaDespesa = new DespesaFakeBuilder().criaUma(credor.id, tipoDeDespesa.id, true).build();
        novaDespesa.desconto = novaDespesa.valor + 10;
        request.post('/api/v1/despesas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaDespesa)
          .expect(400)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eql('Validation Errors');
            expect(res.body.errors).to.be.an('array').that.deep.includes({ 
              message: 'O valor do desconto não pode ser maior do que o valor da despesa',
              path: 'desconto' 
            });
            done(err);
          });
      });
    });
  });
  describe('PUT /api/v1/despesas/:id', function() {
    describe('status 204', function() {
      it('deve editar uma despesa pelo id', function(done) {
        const despesa = despesas[0].dataValues;
        const despesaEditada = new DespesaFakeBuilder().criaUma(credor.id, tipoDeDespesa.id).build();
        request.put(`/api/v1/despesas/${despesa.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(despesaEditada)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/despesas/:id', function() {
    describe('status 200', function() {
      it('deve retornar uma despesa pelo id', function(done) {
        const despesa = despesas[0].dataValues;
        request.get(`/api/v1/despesas/${despesa.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.descricao).to.eql(despesa.descricao);
            expect(res.body.dataDaCompetencia).to.eql(despesa.dataDaCompetencia);
            expect(res.body.dataDeVencimento).to.eql(despesa.dataDeVencimento);
            expect(res.body.valor).to.eql(despesa.valor);
            
            done(err);
          });
      });
    });
    describe('status 404', function() {
      it('deve retornar status code 404 se buscar despesa com id inexistente', function(done) {
        request.get(`/api/v1/despesas/0`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('DELETE /api/v1/despesas/:id', function() {
    describe('status 204', () => {
      it('deve remover uma despesa pelo id', function(done) {
        const despesa = despesas[0].dataValues;
        request.delete(`/api/v1/despesas/${despesa.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });

});
