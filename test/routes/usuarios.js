const UsuarioFakeBuilder = require('../builders/UsuarioFakeBuilder');
const TokenFakeBuilder = require('../builders/TokenFakeBuilder');

describe('Route: usuarios', () => {
  const { Usuario } = app.config.db.models;
  const tokenDeAdmin = new TokenFakeBuilder().getTokenDeAdmin().build();
  const tokenDeSecretaria = new TokenFakeBuilder().getTokenDeSecretaria().build();
  let usuarios = undefined;

  beforeEach(async function() {
    await Usuario.destroy({where: {}});
    await Usuario.bulkCreate(
      new UsuarioFakeBuilder().getMuitos().buildAll()
    );
    usuarios = await Usuario.findAll({});
  });

  describe('GET /api/v1/usuarios', function() {
    describe('status 200', function() {
      it('deve retornar a lista de usuários', function(done) {
        request.get('/api/v1/usuarios')
          .set('Authorization', `Bearer ${tokenDeAdmin}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(3);
            
            done(err);
          });
      });
    });
    describe('status 403', function() {
      it('deve retornar status 403 ao tentar acessar sem permissão de \'ADMIN\'', function(done) {
        request.get('/api/v1/usuarios')
          .set('Authorization', `Bearer ${tokenDeSecretaria}`)
          .expect(403)
          .end(function(err, res) {            
            done(err);
          });
      });
    });
  });
  describe('POST /api/v1/usuarios', function() {
    describe('status 201', function() {
      it('deve criar um novo usuário', done => {
        const novoUsuario = new UsuarioFakeBuilder().getUm().build();
        request.post('/api/v1/usuarios')
          .set('Authorization', `Bearer ${tokenDeAdmin}`)
          .send(novoUsuario)
          .expect(201)
          .end(function(err, res) {
            expect(res.header).to.have.any.key('location');
            done(err);
          });
      });
    });
    describe('status 400', function() {
      it('deve retornar status 400 ao tentar cadastrar usuário com e-mail repetido', function(done) {
        const usuario = usuarios[0].dataValues;
        request.post('/api/v1/usuarios')
          .set('Authorization', `Bearer ${tokenDeAdmin}`)
          .send(usuario)
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
      it('deve retornar status 400 ao tentar cadastrar usuário com permissão inválida', function(done) {
        const usuario = new UsuarioFakeBuilder().getUm().build();
        usuario.permissao = 'INVALIDA';
        request.post('/api/v1/usuarios')
          .set('Authorization', `Bearer ${tokenDeAdmin}`)
          .send(usuario)
          .expect(400)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/usuarios/:id', function() {
    describe('status 200', function() {
      it('deve retornar um usuário pelo id', function(done) {
        const usuario = usuarios[0].dataValues;
        request.get(`/api/v1/usuarios/${usuario.id}`)
          .set('Authorization', `Bearer ${tokenDeAdmin}`)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.eql(usuario.id);
            expect(res.body.nome).to.eql(usuario.nome);
            
            done(err);
          });
      });
    });
    describe('status 404', function() {
      it('deve retornar status code 404 se buscar usuário com id inexistente', function(done) {
        request.get('/api/v1/usuarios/0')
          .set('Authorization', `Bearer ${tokenDeAdmin}`)
          .expect(404)
          .end(function(err, res) {
            done(err);
          });
      });
    })
  });
  describe('DELETE /api/v1/usuarios/:id', function() {
    describe('status 204', () => {
      it('deve remover um usuário pelo id', function(done) {
        const usuario = usuarios[0].dataValues;
        request.delete(`/api/v1/usuarios/${usuario.id}`)
          .set('Authorization', `Bearer ${tokenDeAdmin}`)
          .expect(204)
          .end(function(err, res) {
            done(err);
          });
      });
    });
  });

});
