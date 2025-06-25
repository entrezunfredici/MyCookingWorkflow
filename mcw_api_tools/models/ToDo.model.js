const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    const Todos = instance.define('Todos', {
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
        datetime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        todoListId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TodoLists',
                key: 'todoListId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        tableName: 'Todos',
        timestamps: true,
    })

    Todos.associate = (models) => {
        Todos.belongsTo(models.TodoLists, {
            foreignKey: 'todoListId',
            as: 'TodoLists',
        });
    };

    return Todos;
}
