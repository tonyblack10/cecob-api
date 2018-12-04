module.exports = (sequelize, DataType) => {

  const TipoDeDespesa = sequelize.define('TipoDeDespesa', {
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
        len: [5,200]
      }
    },
  }, {
    tableName: 'tipos_despesas',
    timestamps: false
  });

  return TipoDeDespesa;
};
