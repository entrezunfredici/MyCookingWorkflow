const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserBlacklistedFoods = sequelize.define('UserBlacklistedFoods', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'userId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        blacklistedFoodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'BlacklistedFoods',
                key: 'blacklistedFoodId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        tableName: 'UserBlacklistedFoods',
        timestamps: true,
    });
    // Associations
    UserBlacklistedFoods.associate = (models) => {
        UserBlacklistedFoods.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'Users',
        });
        UserBlacklistedFoods.belongsTo(models.BlacklistedFoods, {
            foreignKey: 'blacklistedFoodId',
            as: 'BlacklistedFoods',
        });
    };

    return UserBlacklistedFoods;
}