const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    return instance.define('Steps', {
        stepId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    }, {
        tableName: 'Steps',
        timestamps: true,
    })
}
