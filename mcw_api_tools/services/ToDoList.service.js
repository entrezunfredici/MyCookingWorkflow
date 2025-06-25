const { TodoLists } = require("../models/index");

class TodoListService {
    async findAll() {
        return TodoLists.findAll();
    }

    async findOne(id) {
        return await TodoLists.findByPk(id);
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
