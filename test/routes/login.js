const UsuarioFakeBuilder = require('../builders/UsuarioFakeBuilder');

describe('Route: login', function() {
  const { Usuario } = app.config.db.models;
  let usuario = undefined;

  beforeEach(async function() {
    await Usuario.destroy({where: {}});
    usuario = await Usuario.create(new UsuarioFakeBuilder().getUm().build());
  });

  describe('POST /api/v1/login', function() {
    describe('status 201', function() {
      it('deve retornar status 201 ao tentar logar com dados corretos', function(done) {
        request.post('/api/v1/login')
          .expect(204)
          .send({email: usuario.email, senha: '123456'})
          .end(function(err, res) {
            expect(res.header).to.have.any.key('x-access-token');
            done(err);
          });
      });
    });
    describe('status 401', function() {
      it('deve retornar status 401 ao tentar logar com dados inválidos', function(done) {
        request.post('/api/v1/login')
          .expect(401)
          .send({email: 'email@invalido.com', senha: '000000'})
          .end(function(err, res) {
            done(err);
          });
      });
    });
    
  });

});
