const { BlacklistedFood } = require("../models/index");

class BlacklistedFoodService {

    async findAll() {
        const BlacklistedFood = await BlacklistedFood.findAll();
        return BlacklistedFood;
    }

    async findOne(BlacklistedFoodId) {
        const BlacklistedFood = await BlacklistedFood.findByPk(BlacklistedFoodId);
        return BlacklistedFood;
    }

    async create(data) {
        return await BlacklistedFood.create(data);
    }

    async update(BlacklistedFoodId, data) {
        await BlacklistedFood.update(data, {
            where: { BlacklistedFoodId: BlacklistedFoodId }
        });
        return this.findOne(BlacklistedFoodId);
    }

    async delete(BlacklistedFoodId) {
        return await BlacklistedFood.destroy({
            where: { BlacklistedFoodId: BlacklistedFoodId }
        });
    }
}

module.exports = new BlacklistedFoodService();
