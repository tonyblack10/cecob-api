const bodyParser = require('body-parser')
  , cors = require('cors')
  , logger = require('morgan');

const tipoDeLog = process.env.NODE_ENV != 'production' ? 'dev' : '';

module.exports = app => {
  register(
    cors({
      exposedHeaders: 'x-access-token',
      allowedHeaders: '*'
    }),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
    logger(tipoDeLog)
  )(app);
};

const register = (...middlewares) => app => 
  middlewares.forEach(middleware =>
    app.use(middleware));
