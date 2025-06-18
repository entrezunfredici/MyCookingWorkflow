const { UserBlacklistedFood } = require("../models");

const UserBlacklistedFoodervice = {
  // Créer une relation entre un utilisateur et un système
  async create(data) {
    return await UserBlacklistedFood.create(data);
  },

  async findAll() {
    return await UserBlacklistedFood.findAll();
  },

  async findOne(idUser, idSystem) {
    return await UserBlacklistedFood.findOne({
      where: { idUser, idSystem },
    });
  },

  async update(idUser, idSystem, data) {
    return await UserBlacklistedFood.update(data, {
      where: { idUser, idSystem },
    });
  },

  async delete(idUser, idSystem) {
    return await UserBlacklistedFood.destroy({
      where: { idUser, idSystem },
    });
  },
};

module.exports = UserBlacklistedFoodervice;
