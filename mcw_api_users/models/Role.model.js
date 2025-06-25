const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    const Roles = instance.define('Roles', {
        roleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        tableName: 'Roles',
        timestamps: true,
    })

    Roles.associate = (models) => {
        Roles.hasMany(models.Users, {
            foreignKey: 'roleId',
            as: 'Users',
        });
    }

    return Roles;
}
