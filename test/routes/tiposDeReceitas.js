const faker = require('faker')
  , TokenFakeBuilder = require('../builders/TokenFakeBuilder');

describe('Route: tipos-receitas', function() {
  const { TipoDeReceita } = app.config.db.models;
  const token = new TokenFakeBuilder().getTokenDeAdmin().build();
  let tiposDeReceitas = undefined;

  beforeEach(async function() {
    await TipoDeReceita.destroy({where: {}});
    await TipoDeReceita.bulkCreate([
      {descricao: faker.lorem.sentences(1)}, 
      {descricao: faker.lorem.sentences(1)}, 
      {descricao: faker.lorem.sentences(1)}
    ]);
    tiposDeReceitas = await TipoDeReceita.findAll({});
  });

  describe('GET /api/v1/tipos-receitas', function() {
    describe('status 200', function() {
      it('deve retornar a lista de tipos de receitas', function(done) {
        request.get('/api/v1/tipos-receitas')
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
  describe('POST /api/v1/tipos-receitas', function() {
    describe('status 201', function() {
      it('deve criar um novo tipo de receita', function(done) {
        request.post('/api/v1/tipos-receitas')
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
      it('deve retornar status 400 ao tentar cadastrar tipo de receita com dados inválidos', function(done) {
        request.post('/api/v1/tipos-receitas')
          .set('Authorization', `Bearer ${token}`)
          .send({descricao: 'xyz'})
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('PUT /api/v1/tipos-receitas/:id', function() {
    describe('status 204', function() {
      it('deve editar um tipo de receita pelo id', function(done) {
        const tipoDeReceita = tiposDeReceitas[0].dataValues;
        request.put(`/api/v1/tipos-receitas/${tipoDeReceita.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({descricao: 'Tipo de Receita Editado'})
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/tipos-receitas/:id', function() {
    describe('status 200', function() {
      it('deve retornar uma tipo de receita pelo id', function(done) {
        const tipoDeReceita = tiposDeReceitas[0].dataValues;
        request.get(`/api/v1/tipos-receitas/${tipoDeReceita.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.descricao).to.eql(tipoDeReceita.descricao);
            done(err);
          });
      });
    });
    describe('status 404', function() {
      it('deve retornar status code 404 se buscar um tipo de receita com id inexistente', function(done) {
        request.get(`/api/v1/tipos-receitas/0`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('DELETE /api/v1/tipos-receitas/:id', function() {
    describe('status 204', () => {
      it('deve remover um tipo de receita pelo id', function(done) {
        const tipoDeReceita = tiposDeReceitas[0].dataValues;
        request.delete(`/api/v1/tipos-receitas/${tipoDeReceita.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
});
