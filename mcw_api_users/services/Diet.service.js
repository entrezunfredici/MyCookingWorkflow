const { Diets } = require("../models/index");

class DietService {

    async findAll() {
        const Dietss = await Diets.findAll();
        return Dietss;
    }

    async findOne(DietsId) {
        const Diets = await Diets.findByPk(DietsId);
        return Diets;
    }

    async create(data) {
        return await Diets.create(data);
    }

    async update(DietsId, data) {
        await Diets.update(data, {
            where: { DietsId: DietsId }
        });
        return this.findOne(DietsId);
    }

    async delete(DietsId) {
        return await Diets.destroy({
            where: { DietsId: DietsId }
        });
    }
}

module.exports = new DietService();
