module.exports = app => {
  const { tipoDeDespesaDao } = app.daos;

  const controller = {
    listaTodos: async (req, res) => {
      try {
        const tiposDeDespesas = await tipoDeDespesaDao.buscaTodos();
        res.json(tiposDeDespesas);
      } catch(err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    salva: async (req, res, next) => {
      const { descricao } = req.body;
      try {
        const tipoDeDespesa = await tipoDeDespesaDao.salva({descricao});
        res.location(`/api/v1/tipos-despesas/${tipoDeDespesa.id}`);
        res.sendStatus(201);
      } catch(err) {
        next(err);
      }
    },
    buscaPorId: async (req, res) => {
      try {
        const tipoDeDespesa = await tipoDeDespesaDao.buscaPorId(req.params.id);
        
        if(!tipoDeDespesa) res.sendStatus(404); 
        else res.json(tipoDeDespesa);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    edita: async (req, res) => {
      const { descricao } = req.body;
      try {
        await tipoDeDespesaDao.edita({descricao}, req.params.id);
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    remove: async (req, res) => {
      try {
        await tipoDeDespesaDao.remove(req.params.id);
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    }
  };

  return controller;
};
