module.exports = app => {
  const { receitaDao } = app.daos;

  const controller = {
    lista: async (req, res) => {
      try {
        const receitas = await receitaDao.buscaPaginada(req.query);
        res.json(receitas);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    salva: async (req, res, next) => {
      const novaReceita = _criaReceita(req.body);
      try {
        const receita = await receitaDao.salva(novaReceita);
        res.set('Content-Type', 'application/json');
        res.location(`/api/v1/receitas/${receita.id}`);
        res.sendStatus(201);
      } catch(err) {
        next(err);
      }
    },
    buscaPorId: async (req, res) => {
      try {
        const receita = await receitaDao.buscaPorId(req.params.id);
        
        if(!receita) 
          res.sendStatus(404);
        else 
          res.json(receita);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    edita: async (req, res) => {
      const receitaEditada = _criaReceita(req.body);
      try {
        await receitaDao.edita(receitaEditada, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        next(err);
      }
    },
    remove: async (req, res) => {
      try {
        await receitaDao.remove(req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
  };

  const _criaReceita = body => {
    const { descricao, data, valor, origens_receitas_id, tipos_receitas_id } = body;
    
    const receita = {};
    Object.assign(receita, { descricao, data, valor, origens_receitas_id, tipos_receitas_id });

    return receita;
  };

  return controller;
};
