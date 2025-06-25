const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    const TodoLists = instance.define('TodoLists', {
        todoListId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        tableName: 'TodoLists',
        timestamps: true,
    });

    TodoLists.associate = (models) => {
        TodoLists.hasMany(models.Todos, {
            foreignKey: 'todoListId',
            as: 'Todos',
        });
    }

    return TodoLists;
}
