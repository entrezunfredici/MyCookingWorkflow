const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    const Users = instance.define(
        'Users',
        {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            validEmailCode: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            resetPasswordCode: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            hasValidatedEmail: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            lastLogin: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Roles',
                    key: 'roleId',
                },
            },
        },
        {
            tableName: 'Users',
            timestamps: true,
        }
    );

    // Associations
    Users.associate = (models) => {
        Users.belongsTo(models.Roles, {
            foreignKey: 'roleId',
            as: 'Role',
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
};
