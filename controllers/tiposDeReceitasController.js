module.exports = app => {
  const { tipoDeReceitaDao } = app.daos;

  const controller = {
    listaTodos: async (req, res) => {
      try {
        const tiposDeReceitas = await tipoDeReceitaDao.buscaTodos();
        res.json(tiposDeReceitas);
      } catch(err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    salva: async (req, res, next) => {
      const { descricao } = req.body;
      try {
        const tipoDeReceita = await tipoDeReceitaDao.salva({descricao});
        res.set('Content-Type', 'application/json');
        res.location(`/api/v1/tipos-receitas/${tipoDeReceita.id}`);
        res.status(201).json(tipoDeReceita);
      } catch(err) {
        next(err);
      }
    },
    buscaPorId: async (req, res) => {
      try {
        const tipoDeReceita = await tipoDeReceitaDao.buscaPorId(req.params.id);
        res.set('Content-Type', 'application/json');
        if(!tipoDeReceita) res.sendStatus(404); 
        else res.json(tipoDeReceita);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    edita: async (req, res) => {
      const { descricao } = req.body;
      try {
        await tipoDeReceitaDao.edita({descricao}, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    remove: async (req, res) => {
      try {
        await tipoDeReceitaDao.remove(req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    }
  };

  return controller;
};
