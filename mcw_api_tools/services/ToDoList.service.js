const { TodoLists } = require("../models/index");

class TodoListService {
    async findAll(userId) {
        return TodoLists.findAll({ where: { userId } });
    }

    async findOne(id, userId) {
        return await TodoLists.findOne({ where: { todoListId: id, userId } });
    }

    async create(data) {
        return await TodoLists.create(data);
    }

    async update(id, data, userId) {
        await TodoLists.update(data, {
            where: { todoListId: id, userId }
        });
        return this.findOne(id, userId);
    }

    async delete(id, userId) {
        return await TodoLists.destroy({
            where: { todoListId: id, userId }
        });
    }
}

module.exports = new TodoListService();
