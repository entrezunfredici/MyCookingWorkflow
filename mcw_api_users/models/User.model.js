const { DataTypes } = require('sequelize');

module.exports = (instance) => {
  const Users = instance.define(
    'Users',
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'roleId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      validEmailCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hasValidatedEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'Users',
      timestamps: true,
    }
  );

  Users.associate = (models) => {
    Users.belongsTo(models.Roles, {
      foreignKey: 'roleId',
      as: 'Roles',
    });

    Users.hasMany(models.UserBlacklistedFoods, {
      foreignKey: 'userId',
      as: 'UserBlacklistedFoods',
    });

    Users.hasMany(models.UserDiets, {
      foreignKey: 'userId',
      as: 'UserDiets',
    });
  };

  return Users;
}
