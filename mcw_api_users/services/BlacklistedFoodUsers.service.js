const { BlacklistedFoodUsers } = require("../models");

const BlacklistedFoodUsersService = {
  // Créer une relation entre un utilisateur et un système
  async create(data) {
    return await BlacklistedFoodUsers.create(data);
  },

  async findAll() {
    return await BlacklistedFoodUsers.findAll();
  },

  async findOne(idUser, idSystem) {
    return await BlacklistedFoodUsers.findOne({
      where: { idUser, idSystem },
    });
  },

  async update(idUser, idSystem, data) {
    return await BlacklistedFoodUsers.update(data, {
      where: { idUser, idSystem },
    });
  },

  async delete(idUser, idSystem) {
    return await BlacklistedFoodUsers.destroy({
      where: { idUser, idSystem },
    });
  },
};

module.exports = BlacklistedFoodUsersService;
