const { BlacklistedFoods } = require("../models/index");

class BlacklistedFoodService {

    async findAll() {
        const BlacklistedFoods = await BlacklistedFoods.findAll();
        return BlacklistedFoods;
    }

    async findOne(BlacklistedFoodsId) {
        const BlacklistedFoods = await BlacklistedFoods.findByPk(BlacklistedFoodsId);
        return BlacklistedFoods;
    }

    async create(data) {
        return await BlacklistedFoods.create(data);
    }

    async update(BlacklistedFoodsId, data) {
        await BlacklistedFoods.update(data, {
            where: { BlacklistedFoodsId: BlacklistedFoodsId }
        });
        return this.findOne(BlacklistedFoodsId);
    }

    async delete(BlacklistedFoodsId) {
        return await BlacklistedFoods.destroy({
            where: { BlacklistedFoodsId: BlacklistedFoodsId }
        });
    }
}

module.exports = new BlacklistedFoodService();
