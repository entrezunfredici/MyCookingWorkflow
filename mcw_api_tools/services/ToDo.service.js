const { Todos } = require("../models/index");

class TodoService {

    async findAll() {
        const todoList = await Todos.findAll();
        return todoList;
    }

    async findOne(todoId) {
        const todo = await Todos.findByPk(todoId);
        return todo;
    }

    async create(data) {
        return await Todos.create(data);
    }

    async update(todoId, data) {
        await Todos.update(data, {
            where: { id: todoId }
        });
        return this.findOne(todoId);
    }

    async delete(todoId) {
        return await Todos.destroy({
            where: { id: todoId }
        });
    }
}

module.exports = new TodoService();
