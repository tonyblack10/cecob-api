module.exports = app => {
  const { origemDaReceitaDao } = app.daos;

  const controller = {
    listaTodos: async (req, res) => {
      try {
        const origensDeReceitas = await origemDaReceitaDao.buscaTodos();
        res.json(origensDeReceitas);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    salva: async (req, res, next) => {
      const { descricao } = req.body;
      try {
        const origemDeReceita = await origemDaReceitaDao.salva({descricao});
        res.set('Content-Type', 'application/json');
        res.location(`/api/v1/origens-receitas/${origemDeReceita.id}`);
        res.status(201).json(origemDeReceita);
      } catch(err) {
        next(err);
      }
    },
    buscaPorId: async (req, res) => {
      try {
        const origemDeReceita = await origemDaReceitaDao.buscaPorId(req.params.id);
        
        if(!origemDeReceita) res.sendStatus(404); 
        else res.json(origemDeReceita);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    edita: async (req, res) => {
      const { descricao } = req.body;
      try {
        await origemDaReceitaDao.edita({descricao}, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    remove: async (req, res) => {
      try {
        await origemDaReceitaDao.remove(req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    }
  };

  return controller;
};
