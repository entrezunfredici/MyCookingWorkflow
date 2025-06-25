const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    const BlacklistedFoods = instance.define('BlacklistedFoods', {
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

    BlacklistedFoods.associate = (models) => {
        BlacklistedFoods.hasMany(models.UserBlacklistedFoods, {
            foreignKey: 'blacklistedFoodId',
            as: 'UserBlacklistedFoods',
        });
    }

    return BlacklistedFoods;
}
