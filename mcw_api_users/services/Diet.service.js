const { Diet } = require("../models/index");

class DietService {

    async findAll() {
        const diets = await Diet.findAll();
        return diets;
    }

    async findOne(dietId) {
        const diet = await Diet.findByPk(dietId);
        return diet;
    }

    async create(data) {
        return await Diet.create(data);
    }

    async update(dietId, data) {
        await Diet.update(data, {
            where: { dietId: dietId }
        });
        return this.findOne(dietId);
    }

    async delete(dietId) {
        return await Diet.destroy({
            where: { dietId: dietId }
        });
    }
}

module.exports = new DietService();
