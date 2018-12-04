module.exports = app => {
  const { despesaDao } = app.daos;

  const controller = {
    lista: async (req, res) => {
      try {
        const despesas = await despesaDao.buscaPaginada(req.query);
        res.json(despesas);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    salva: async (req, res, next) => {
      const novaDespesa = _criaDespesa(req.body);
      try {
        const despesa = await despesaDao.salva(novaDespesa);
        res.set('Content-Type', 'application/json');
        res.location(`/api/v1/despesas/${despesa.id}`);
        res.sendStatus(201);
      } catch(err) {
        next(err);
      }
    },
    buscaPorId: async (req, res) => {
      try {
        const despesa = await despesaDao.buscaPorId(req.params.id);
        
        if(!despesa) 
          res.sendStatus(404);
        else 
          res.json(despesa);
      } catch(err) {
        res.status(500).json(err);
      }
    },
    edita: async (req, res) => {
      const novaDespesa = _criaDespesa(req.body);
      try {
        await despesaDao.edita(novaDespesa, req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        next(err);
      }
    },
    remove: async (req, res) => {
      try {
        await despesaDao.remove(req.params.id);
        res.set('Content-Type', 'application/json');
        res.sendStatus(204);
      } catch(err) {
        res.status(500).json(err);
      }
    },
  };

  const _criaDespesa = body => {
    const { descricao, valor, dataDaCompetencia, dataDeVencimento, dataDePagamento, desconto, 
      multa, credores_id, tipos_despesas_id } = body;
    
    const despesa = {};
    Object.assign(despesa, { descricao, valor, dataDaCompetencia, dataDeVencimento, credores_id, tipos_despesas_id });
    if(dataDePagamento) {
      Object.assign(despesa, { dataDePagamento, desconto, multa });
    }

    return despesa;
  };

  return controller;
};
