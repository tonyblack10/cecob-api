module.exports = (sequelize, DataType) => {

  const Credor = sequelize.define('Credor', {
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
    tableName: 'credores',
    timestamps: false
  });

  return Credor;
};
