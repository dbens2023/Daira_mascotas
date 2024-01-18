const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id_roll: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_roll",
      autoIncrement: false
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "nombre",
      autoIncrement: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "date",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "roll",
    comment: "",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public',
    indexes: []
  };
  const RollModel = sequelize.define("roll_model", attributes, options);
  RollModel.associate = function (models) {
    RollModel.hasMany(models.users_model, {
      foreignKey: 'id_roll'
    });
  };
  return RollModel;
};