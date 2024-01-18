const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    id_roll: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_roll",
      autoIncrement: false,
      references: {
        key: "id_roll",
        model: "roll_model"
      }
    },
    email: {
      type: DataTypes.CHAR(500),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "email",
      autoIncrement: false
    },
    password: {
      type: DataTypes.CHAR(300),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "password",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "users",
    comment: "",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public',
    indexes: []
  };
  const UsersModel = sequelize.define("users_model", attributes, options);
  UsersModel.associate = function (models) {
    UsersModel.belongsTo(models.roll_model, {
      foreignKey: 'id_roll'
    });
  }
  return UsersModel;
};