const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const UserDiet = sequelize.define(
        "UserDiet",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "User",
                    key: "userId",
                },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            },
            dietId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Diet",
                    key: "dietId",
                },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "userDiet",
            updatedAt: "updatedAt",
            createdAt: "createdAt",
            timestamps: true,
        }
    );

// Associations
    UserDiet.associate = (models) => {
        UserDiet.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
        UserDiet.belongsTo(models.Diet, {
            foreignKey: "dietId",
            as: "diet",
        });
    };
    return UserDiet;
}
