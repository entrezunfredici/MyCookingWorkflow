const { DietUsers } = require("../models");

const DietUsersService = {
  // Créer une relation entre un utilisateur et un système
  async create(data) {
    return await DietUsers.create(data);
  },

  async findAll() {
    return await DietUsers.findAll();
  },

  async findOne(idUser, idSystem) {
    return await DietUsers.findOne({
      where: { idUser, idSystem },
    });
  },

  async update(idUser, idSystem, data) {
    return await DietUsers.update(data, {
      where: { idUser, idSystem },
    });
  },

  async delete(idUser, idSystem) {
    return await DietUsers.destroy({
      where: { idUser, idSystem },
    });
  },
};

module.exports = DietUsersService;
