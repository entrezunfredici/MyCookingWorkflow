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
            tableName: 'UserDiets',
            timestamps: true,
        }
    );

    // Associations
    UserDiets.associate = (models) => {
        UserDiets.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'Users',
        });
        UserDiets.belongsTo(models.Diets, {
            foreignKey: 'dietId',
            as: 'Diets',
        });
    };

    return UserDiets;
}
