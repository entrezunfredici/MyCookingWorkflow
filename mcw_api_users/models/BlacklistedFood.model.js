const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    return instance.define('BlacklistedFoods', {
        blacklistedFoodId: {
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
        tableName: 'BlacklistedFoods',
        timestamps: true,
    })
}
