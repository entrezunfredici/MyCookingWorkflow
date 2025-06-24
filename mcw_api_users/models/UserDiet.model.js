const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserDiets = sequelize.define(
        'UserDiets',
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'userId',
                },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            },
            dietId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Diets',
                    key: 'dietId',
                },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            },
        },
        {
            tableName: 'userDiets',
            timestamps: true,
        }
    );

    // Associations
    UserDiets.associate = (models) => {
        UserDiets.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'users',
        });
        UserDiets.belongsTo(models.Diets, {
            foreignKey: 'dietId',
            as: 'diets',
        });
    };

    return UserDiets;
}
