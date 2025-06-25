const { TodoSteps } = require('../models/index');

class TodoStepService {

    async findAll() {
        return await TodoSteps.findAll();
    }

    async findOne(todoId, stepId) {
        return await TodoSteps.findOne({
            where: { todoId, stepId }
        });
    }

    async create(data) {
        return await TodoSteps.create(data);
    }

    async delete(todoId, stepId) {
        return await TodoSteps.destroy({
            where: { todoId, stepId }
        });
    }
}

module.exports = new TodoStepService();
