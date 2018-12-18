module.exports = (sequelize, DataType) => {

  const TipoDeReceita = sequelize.define('TipoDeReceita', {
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
    tableName: 'tipos_receitas',
    timestamps: false
  });

  return TipoDeReceita;
};
