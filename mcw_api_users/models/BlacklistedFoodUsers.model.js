const { DatatTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserBlacklistedFood = sequelize.define('UserBlacklistedFood', {
        userId: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        blacklistedFoodId: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'BlacklistedFood',
                key: 'blacklistedFoodId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        updatedAt: {
            type: DatatTypes.DATE,
            allowNull: false,
            defaultValue: DatatTypes.NOW,
        },
        createdAt: {
            type: DatatTypes.DATE,
            allowNull: false,
            defaultValue: DatatTypes.NOW,
        },
    }, {
        tableName: 'userBlacklistedFood',
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
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
}