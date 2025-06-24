const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    return instance.define('Diets', {
        dietId: {
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
        tableName: 'Diets',
        timestamps: true,
    })
}
