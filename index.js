require('dotenv').config();

const express = require('express')
  , consign = require('consign')
  , errorHandler = require('./utils/errorHandler');

const app = express();
const porta = process.env.SERVIDOR_PORTA;
const debug = eval(process.env.DEBUG);

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
