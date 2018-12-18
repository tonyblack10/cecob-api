module.exports = (sequelize, DataType) => {

  const Receita = sequelize.define('Receita', {
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
    data: {
      type: DataType.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    valor: {
      type: DataType.DECIMAL(8,2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        min: 1
      }
    }
  }, 
  {
    timestamps: false,
    tableName: 'receitas'
  });

  Receita.associate = models => {
    Receita.belongsTo(models.OrigemDaReceita, {foreignKey: {name: 'origens_receitas_id', allowNull: false}});
    Receita.belongsTo(models.TipoDeReceita, {foreignKey: {name: 'tipos_receitas_id', allowNull: false}});
  };

  return Receita;
};
