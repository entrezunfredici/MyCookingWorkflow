const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    const Steps = instance.define('Steps', {
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
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        completed : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: 'Steps',
        timestamps: true,
    })

    Steps.associate = (models) => {
        Steps.hasMany(models.TodoSteps, {
            foreignKey: 'stepId',
            as: 'TodoSteps',
        });
    }

    return Steps;
}
