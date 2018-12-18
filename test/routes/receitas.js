const faker = require('faker')
  , moment = require('moment');
const ReceitaFakeBuilder = require('../builders/ReceitaFakeBuilder');
const TokenFakeBuilder = require('../builders/TokenFakeBuilder');

describe('Route: receitas', function() {
  const { Receita, OrigemDaReceita, TipoDeReceita } = app.config.db.models;
  const token = new TokenFakeBuilder().getTokenDeAdmin().build();
  let receitas = undefined;
  let origemDaReceita = undefined;
  let tipoDeReceita = undefined;

  beforeEach(async function() {
    await Receita.destroy({where: {}});
    await OrigemDaReceita.destroy({where: {}});
    await TipoDeReceita.destroy({where: {}});

    await OrigemDaReceita.create({descricao: faker.lorem.sentences(2)});
    await TipoDeReceita.create({descricao: faker.lorem.sentences(2)});

    origemDaReceita = await OrigemDaReceita.findOne({});
    tipoDeReceita = await TipoDeReceita.findOne({});

    await Receita.bulkCreate(
      new ReceitaFakeBuilder().criaMuitas(origemDaReceita.id, tipoDeReceita.id).buildAll()
    );
    receitas = await Receita.findAll({});
  });

  describe('GET /api/v1/receitas', function() {
    describe('status 200', function() {
      it('deve retornar a lista de receitas', function(done) {
        request.get('/api/v1/receitas')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.have.property('totalDeElementos').that.is.a('number');
            expect(res.body).to.have.property('conteudo').that.is.a('array');
            expect(res.body.conteudo).to.have.length(5);
            done(err);
          });
      });
    });
  });
  describe('POST /api/v1/receitas', function() {
    describe('status 201', function() {
      it('deve criar uma nova receita', function(done) {
        const novaReceita = new ReceitaFakeBuilder().criaUma(origemDaReceita.id, tipoDeReceita.id).build();
        request.post('/api/v1/receitas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaReceita)
          .expect(201)
          .end(function(err, res) {
            expect(res.header).to.have.any.key('location');
            done(err);
          });
      });
    });
    describe('status 400', function() {
      it('deve retornar status 400 ao tentar cadastrar uma receita com valor negativo', function(done) {
        const novaReceita = new ReceitaFakeBuilder().criaUma(origemDaReceita.id, tipoDeReceita.id).build();
        novaReceita.valor = -20.0;
        request.post('/api/v1/receitas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaReceita)
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
      it('deve retornar status 400 ao tentar cadastrar uma receita com descrição inválida', function(done) {
        const novaReceita = new ReceitaFakeBuilder().criaUma(origemDaReceita.id, tipoDeReceita.id).build();
        novaReceita.descricao = 'xyz';
        request.post('/api/v1/receitas')
          .set('Authorization', `Bearer ${token}`)
          .send(novaReceita)
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('PUT /api/v1/receitas/:id', function() {
    describe('status 204', function() {
      it('deve editar uma receita pelo id', function(done) {
        const receita = receitas[0].dataValues;
        const receitaEditada = new ReceitaFakeBuilder().criaUma(origemDaReceita.id, tipoDeReceita.id).build();
        request.put(`/api/v1/receitas/${receita.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(receitaEditada)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/receitas/:id', function() {
    describe('status 200', function() {
      it('deve retornar uma receita pelo id', function(done) {
        const receita = receitas[0].dataValues;
        request.get(`/api/v1/receitas/${receita.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.descricao).to.eql(receita.descricao);
            expect(res.body.data).to.eql(receita.data);
            expect(res.body.valor).to.eql(receita.valor);
            
            done(err);
          });
      });
    });
    describe('status 404', function() {
      it('deve retornar status code 404 se buscar uma receita com id inexistente', function(done) {
        request.get(`/api/v1/receitas/0`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('DELETE /api/v1/receitas/:id', function() {
    describe('status 204', () => {
      it('deve remover uma receita pelo id', function(done) {
        const receita = receitas[0].dataValues;
        request.delete(`/api/v1/receitas/${receita.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });

});
