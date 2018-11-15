require('dotenv').config();

const express = require('express')
  , consign = require('consign');

const app = express();
const porta = process.env.SERVIDOR_PORTA;

consign({locale: 'pt-br', verbose: process.env.DEBUG})
  .include('config')
  .then('daos')
  .then('controllers')
  .then('routes')
  .into(app);

app.config.db.sequelize.sync().done(() => {
  app.listen(porta, () => {
    console.log(`Servidor escutando na porta: ${porta}`);
  });
});

module.exports = app;
