const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TodoSteps = sequelize.define('TodoSteps', {
        todoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Todos',
                key: 'todoId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        stepId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Steps',
                key: 'stepId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        tableName: 'TodoSteps',
        timestamps: true,
    });
    // Associations
    TodoSteps.associate = (models) => {
        TodoSteps.belongsTo(models.Todos, {
            foreignKey: 'todoId',
            as: 'Todos',
        });
        TodoSteps.belongsTo(models.Steps, {
            foreignKey: 'stepId',
            as: 'Steps',
        });
    };

    return TodoSteps;
}