class DespesaFiltroBuilder {
  
  constructor() {
    this._filtro = {};
  }

  doCredor(credorId) {
    if(credorId) {
      this._filtro.credores_id = { $eq: credorId };
    }

    return this;
  }

  doTipo(tipoId) {
    if(tipoId) {
      this._filtro.tipos_despesas_id = { $eq: tipoId };
    }

    return this;
  }

  comVencimentoEntre(dataDeInicio = '', dataFim = '') {
    if(dataDeInicio && dataFim) {
      this._filtro.dataDeVencimento = { 
        $between: [dataDeInicio, dataFim]
      };
    }

    return this;
  }

  comStatusPagamento(status) {
    if(status != undefined) {
      status = 'true' ? true : false;
      if(status)
        this._filtro.dataDePagamento = { $ne:  null};
      else
        this._filtro.dataDePagamento = { $eq:  null};
    }

    return this;
  }

  comDescricao(descricao) {
    if(descricao != undefined) {
      this._filtro.descricao = {
        $iLike: descricao
      };
    }
  }

  build() {
    return this._filtro;
  }

}

module.exports = DespesaFiltroBuilder;
