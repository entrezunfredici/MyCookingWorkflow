const { Todos } = require("../models/index");

class TodoService {

    async findAll() {
        return await Todos.findAll();
    }

    async findOne(todoId) {
        return await Todos.findByPk(todoId);
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
