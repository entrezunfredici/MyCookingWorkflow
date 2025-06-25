const { Steps } = require("../models/index");

class StepService {

    async findAll() {
        const Steplist = await Steps.findAll();
        return Steplist;
    }

    async findOne(StepId) {
        const Step = await Steps.findByPk(StepId);
        return Step;
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
