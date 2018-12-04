module.exports = app => {
  const { credorDao } = app.daos;

  const controller = {
    listaTodos: async (req, res) => {
      try {
        const credores = await credorDao.buscaTodos();
        res.json(credores);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    salva: async (req, res, next) => {
      const { descricao } = req.body;
      try {
        const credor = await credorDao.salva({descricao});
        res.set('Content-Type', 'application/json');
        res.location(`/api/v1/credores/${credor.id}`);
        res.status(201).json(credor);
      } catch(err) {
        next(err);
      }
    },
    buscaPorId: async (req, res) => {
      try {
        const credor = await credorDao.buscaPorId(req.params.id);
        
        if(!credor) res.sendStatus(404); 
        else res.json(credor);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    edita: async (req, res) => {
      const { descricao } = req.body;
      try {
        await credorDao.edita({descricao}, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    remove: async (req, res) => {
      try {
        await credorDao.remove(req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    }
  };

  return controller;
};
