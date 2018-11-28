const path = require('path');
const errorHandler = require('./utils/errorHandler');

if(process.env.NODE_ENV !== 'test')
  require('dotenv').config();
else 
  require('dotenv').config({
    path: path.join(__dirname, './test/.env')
  });

const express = require('express')
  , consign = require('consign');

const app = express();
const porta = process.env.SERVIDOR_PORTA;
const debug = process.env.DEBUG === 'true' ? true : false;

consign({locale: 'pt-br', verbose: debug})
  .include('config')
  .then('daos')
  .then('controllers')
  .then('routes')
  .into(app);

app.use(errorHandler);

app.config.db.sequelize.sync().done(() => {
  app.listen(porta, () => {
    if(debug) console.log(`Servidor escutando na porta: ${porta}`);
  });
});

module.exports = app;
