const { Steps } = require("../models/index");

class StepService {

    async findAll() {
        return await Steps.findAll();
    }

    async findOne(StepId) {
        return await Steps.findByPk(StepId);
    }

    async create(data) {
        return await Steps.create(data);
    }

    async update(StepId, data) {
        await Steps.update(data, {
            where: { StepId: StepId }
        });
        return this.findOne(StepId);
    }

    async delete(StepId) {
        return await Steps.destroy({
            where: { StepId: StepId }
        });
    }
}

module.exports = new StepService();
