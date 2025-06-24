const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserBlacklistedFood = sequelize.define('UserBlacklistedFood', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        blacklistedFoodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'BlacklistedFood',
                key: 'blacklistedFoodId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        tableName: 'UserBlacklistedFood',
        timestamps: true,
    });
    // Associations
    UserBlacklistedFood.associate = (models) => {
        UserBlacklistedFood.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        UserBlacklistedFood.belongsTo(models.BlacklistedFood, {
            foreignKey: 'blacklistedFoodId',
            as: 'blacklistedFood',
        });
    };

    return UserBlacklistedFood;
}