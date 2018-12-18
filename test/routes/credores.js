const faker = require('faker')
  , TokenFakeBuilder = require('../builders/TokenFakeBuilder');

describe('Route: credores', function() {
  const { Credor } = app.config.db.models;
  const token = new TokenFakeBuilder().getTokenDeAdmin().build();
  let credores = undefined;

  beforeEach(async function() {
    await Credor.destroy({where: {}});
    await Credor.bulkCreate([
      {descricao: faker.lorem.sentences(1)}, 
      {descricao: faker.lorem.sentences(1)}, 
      {descricao: faker.lorem.sentences(1)}
    ]);
    credores = await Credor.findAll({});
  });

  describe('GET /api/v1/credores', function() {
    describe('status 200', function() {
      it('deve retornar a lista de credores', function(done) {
        request.get('/api/v1/credores')
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
  describe('POST /api/v1/credores', function() {
    describe('status 201', function() {
      it('deve criar um novo credor', function(done) {
        request.post('/api/v1/credores')
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
      it('deve retornar status 400 ao tentar cadastrar um credor com descrição inválida', function(done) {
        request.post('/api/v1/credores')
          .set('Authorization', `Bearer ${token}`)
          .send({descricao: 'xyz'})
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('PUT /api/v1/credores/:id', function() {
    describe('status 204', function() {
      it('deve editar um credor pelo id', function(done) {
        const credor = credores[0].dataValues;
        request.put(`/api/v1/credores/${credor.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({descricao: 'Credor Editado'})
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/credores/:id', function() {
    describe('status 200', function() {
      it('deve retornar um credor pelo id', function(done) {
        const credor = credores[0].dataValues;
        request.get(`/api/v1/credores/${credor.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.descricao).to.eql(credor.descricao);
            done(err);
          });
      });
    });
    describe('status 404', function() {
      it('deve retornar status code 404 se buscar um credor com id inexistente', function(done) {
        request.get(`/api/v1/credores/0`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('DELETE /api/v1/credores/:id', function() {
    describe('status 204', function() {
      it('deve remover um credor pelo id', function(done) {
        const credor = credores[0].dataValues;
        request.delete(`/api/v1/credores/${credor.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
});
