module.exports = (sequelize, DataType) => {

  const OrigemDaReceita = sequelize.define('OrigemDaReceita', {
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
    tableName: 'origens_receitas',
    timestamps: false
  });

  return OrigemDaReceita;
};
