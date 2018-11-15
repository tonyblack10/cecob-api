module.exports = app => {

  const { loginController } = app.controllers;

  app.post('/api/v1/login', loginController.login)
};
