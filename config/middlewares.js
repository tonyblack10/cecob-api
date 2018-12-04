const bodyParser = require('body-parser')
  , cors = require('cors')
  , logger = require('morgan')
  , compression = require('compression')
  , helmet = require('helmet');

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

  if(process.env.NODE_ENV === 'development')
    app.use(logger('dev'));
  else if(process.env.NODE_ENV === 'production')
    app.use(logger());
};

const register = (...middlewares) => app => 
  middlewares.forEach(middleware =>
    app.use(middleware));
