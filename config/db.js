const Sequelize = require('sequelize')
  , fs = require('fs')
  , path = require('path')
  , operatorsAliases = require('./sequelize-operators-alias');

let database = undefined;

module.exports = () => {
  if(!database) {
    const sequelize = new Sequelize(
      process.env.DB_NOME,
      process.env.DB_USUARIO,
      process.env.DB_SENHA,
      {
        dialect: 'postgres',
        operatorsAliases,
        host: process.env.DB_HOST,
        port: process.env.DB_PORTA,
        logging: false,
        define: {
          charset: 'utf8',
          dialectOptions: {
            collate: 'utf8_general_ci'
          },
          timestamps: true
        }
      }
    );
    database = {
      sequelize,
      Sequelize,
      models: {}
    };

    let dir = path.join(__dirname, '../models');

    fs.readdirSync(dir).forEach(file => {
      let modelDir = path.join(dir, file);
      let model = sequelize.import(modelDir);
      database.models[model.name] = model;
    });

    Object.keys(database.models)
      .forEach(key => {
        if(database.models[key].associate)
          database.models[key].associate(database.models);
      });
  }

  return database;
};
