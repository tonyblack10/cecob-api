const moment = require('moment');

module.exports = (sequelize, DataType) => {

  const Despesa = sequelize.define('Despesa', {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataType.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 200]
      }
    },
    dataDaCompetencia: {
      type: DataType.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      },
      field: 'data_competencia'
    },
    dataDeVencimento: {
      type: DataType.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
        ehMenorQueDataDeCompetencia(value) {
          if(!value || !this.dataDaCompetencia) return;

          if(moment(value).isBefore(moment(this.dataDaCompetencia))) 
            throw new Error('A data de vencimento não pode ser menor do que a data de competência');
        }
      },
      field: 'data_vencimento'
    },
    valor: {
      type: DataType.DECIMAL(8,2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        min: 1
      }
    },
    dataDePagamento: {
      type: DataType.DATEONLY,
      validate: {
        notEmpty: true,
        isDate: true,
        ehMaiorQueDataDeCompetencia(value) {
          if(!value || !this.dataDaCompetencia) return;

          if(moment(value).isBefore(moment(this.dataDaCompetencia)))
            throw new Error('A data de pagamento não pode ser menor do que a data de competência');
        }
      },
      field: 'data_pagamento'
    },
    desconto: {
      type: DataType.DECIMAL(8,2),
      validate: {
        notEmpty: true,
        min: 0,
        ehMaiorDoQueOValorTotal(value) {
          if(!value) return;

          if(value > this.valor) 
            throw new Error('O valor do desconto não pode ser maior do que o valor da despesa');
        }
      },
      defaultValue: 0.0
    },
    multa: {
      type: DataType.DECIMAL(8,2),
      validate: {
        notEmpty: true,
        min: 0
      },
      defaultValue: 0.0
    }
  }, 
  {
    timestamps: false,
    tableName: 'despesas'
  });

  Despesa.associate = models => {
    Despesa.belongsTo(models.Credor, {foreignKey: {name: 'credores_id', allowNull: false}});
    Despesa.belongsTo(models.TipoDeDespesa, {foreignKey: {name: 'tipos_despesas_id', allowNull: false}});
  };

  return Despesa;
};
