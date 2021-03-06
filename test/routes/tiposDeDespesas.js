const faker = require('faker')
  , TokenFakeBuilder = require('../builders/TokenFakeBuilder');

describe('Route: tipos-despesas', function() {
  const { TipoDeDespesa, Despesa } = app.config.db.models;
  const token = new TokenFakeBuilder().getTokenDeAdmin().build();
  let tiposDeDespesas = undefined;

  beforeEach(async function() {
    await Despesa.destroy({where: {}});
    await TipoDeDespesa.destroy({where: {}});
    await TipoDeDespesa.bulkCreate([
      {descricao: faker.lorem.sentences(2)}, 
      {descricao: faker.lorem.sentences(2)}, 
      {descricao: faker.lorem.sentences(2)}
    ]);
    tiposDeDespesas = await TipoDeDespesa.findAll({});
  });

  describe('GET /api/v1/tipos-despesas', function() {
    describe('status 200', function() {
      it('deve retornar a lista de tipos de despesas', function(done) {
        request.get('/api/v1/tipos-despesas')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).that.is.a('array');
            expect(res.body).to.have.length(3);
            done(err);
          });
      });
    });
  });
  describe('POST /api/v1/tipos-despesas', function() {
    describe('status 201', function() {
      it('deve criar um novo tipo de despesa', function(done) {
        request.post('/api/v1/tipos-despesas')
          .set('Authorization', `Bearer ${token}`)
          .send({descricao: faker.lorem.sentences(1)})
          .expect(201)
          .end(function(err, res) {
            expect(res.header).to.have.any.key('location');
            done(err);
          });
      });
    });
    describe('status 400', function() {
      it('deve retornar status 400 ao tentar cadastrar tipo de despesa com descrição inválida', function(done) {
        request.post('/api/v1/tipos-despesas')
          .set('Authorization', `Bearer ${token}`)
          .send({descricao: 'xyz'})
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('PUT /api/v1/tipos-despesas/:id', function() {
    describe('status 204', function() {
      it('deve editar um tipo de despesa pelo id', function(done) {
        const tipoDeDespesa = tiposDeDespesas[0].dataValues;
        request.put(`/api/v1/tipos-despesas/${tipoDeDespesa.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({descricao: 'Tipo de Despesa Editado'})
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/tipos-despesas/:id', function() {
    describe('status 200', function() {
      it('deve retornar uma tipo de despesa pelo id', function(done) {
        const tipoDeDespesa = tiposDeDespesas[0].dataValues;
        request.get(`/api/v1/tipos-despesas/${tipoDeDespesa.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.descricao).to.eql(tipoDeDespesa.descricao);
            done(err);
          });
      });
    });
    describe('status 404', function() {
      it('deve retornar status code 404 se buscar um tipo de despesa com id inexistente', function(done) {
        request.get(`/api/v1/tipos-despesas/0`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('DELETE /api/v1/tipos-despesas/:id', function() {
    describe('status 204', function() {
      it('deve remover um tipo de despesa pelo id', function(done) {
        const tipoDeDespesa = tiposDeDespesas[0].dataValues;
        request.delete(`/api/v1/tipos-despesas/${tipoDeDespesa.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
});
