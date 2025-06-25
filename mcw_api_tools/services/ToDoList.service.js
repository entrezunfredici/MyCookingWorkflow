const { TodoLists } = require("../models/index");

class TodoListService {
    async findAll() {
        const result = await TodoLists.findAll();
        return result;
    }

    async findOne(id) {
        const todoList = await TodoLists.findByPk(id);
        return todoList;
    }

    async create(data) {
        return await TodoLists.create(data);
    }

    async update(id, data) {
        await TodoLists.update(data, {
            where: { id }
        });
        return this.findOne(id);
    }

    async delete(id) {
        return await TodoLists.destroy({
            where: { id }
        });
    }
}

module.exports = new TodoListService();
