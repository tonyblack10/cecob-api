const bodyParser = require('body-parser')
  , cors = require('cors')
  , logger = require('morgan')
  , compression = require('compression')
  , helmet = require('helmet');

const tipoDeLog = process.env.NODE_ENV != 'production' ? 'dev' : '';

module.exports = app => {
  register(
    cors({
      exposedHeaders: 'x-access-token',
      allowedHeaders: '*'
    }),
    helmet(),
    compression(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
  )(app);

  if(process.env.NODE_ENV !== 'test')
    app.use(logger(tipoDeLog));
};

const register = (...middlewares) => app => 
  middlewares.forEach(middleware =>
    app.use(middleware));
