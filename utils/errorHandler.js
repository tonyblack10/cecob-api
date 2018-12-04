const SEQUELIZE_ERRORS = ['SequelizeValidationError', 'SequelizeUniqueConstraintError', 'SequelizeDatabaseError'];

module.exports = (err, req, res, next) => {
  const debug = process.env.DEBUG === 'true' ? true : false;

  if(SEQUELIZE_ERRORS.includes(err.name)) {
    const errors = err.errors.map(e => {
      return { message: e.message, path: e.path };
    });
    res.status(400).json({ message: 'Validation Errors', errors });
  } else {
    if(debug) console.log(err);
    res.status(500).json(err);
  } 

  next();
};
