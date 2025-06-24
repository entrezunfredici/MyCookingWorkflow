const { Roles } = require("../models/index");

class RoleService {

    async findAll() {
        const Roless = await Roles.findAll();
        return Roless;
    }

    async findOne(RolesId) {
        const Roles = await Roles.findByPk(RolesId);
        return Roles;
    }

    async create(data) {
        return await Roles.create(data);
    }

    async update(RolesId, data) {
        await Roles.update(data, {
            where: { RolesId: RolesId }
        });
        return this.findOne(RolesId);
    }

    async delete(RolesId) {
        return await Roles.destroy({
            where: { RolesId: RolesId }
        });
    }
}

module.exports = new RoleService();
