const bcrypt = require('bcrypt');

module.exports = (sequelize, DataType) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 200]
      }
    },
    permissao: {
      type: DataType.ENUM,
      allowNull: false,
      values: ['ADMIN', 'SECRETARIA'], 
      validate: {
        isIn: [['ADMIN', 'SECRETARIA']]
      }
    },
    email: {
      type: DataType.STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
        ehUnico: async function(value, next) {
          if(value) {
            try {
              const usuario = await Usuario.findOne({ where: { email: value }});
              if(usuario && usuario.id !== this.id) {
                next('Este e-mail já existe no banco de dados');
              } else {
                next();
              }
            } catch (err) {
              next(err.message);
            }
          }
        }
      }
    },
    senha: {
      type: DataType.STRING(60),
      allowNull: false,
      validate: {
        len: [6,10]
      }
    },
    status: {
      type: DataType.BOOLEAN,
      defaultValue: true
    }
  }, 
  {
    tableName: 'usuarios'
  });

  Usuario.beforeCreate(usuario => {
    bcrypt.hash(usuario.senha, 10, function(err, hash) {
      usuario.senha = hash;
    });
    // return bcrypt.hash(usuario.senha, 10)
    //   .then(hash => {
    //     usuario.senha = hash;
    //   });
  });

  Usuario.ehSenhaValida = (senhaHash, senhaTexto) => 
    bcrypt.compare(senhaTexto, senhaHash);

  return Usuario;
};
