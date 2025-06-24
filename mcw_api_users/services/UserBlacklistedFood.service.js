const { UserBlacklistedFoods } = require("../models");

const UserBlacklistedFoodService = {
  // Créer une relation entre un utilisateur et un système
  async create(data) {
    return await UserBlacklistedFoods.create(data);
  },

  async findAll() {
    return await UserBlacklistedFoods.findAll();
  },

  async findOne(idUser, idSystem) {
    return await UserBlacklistedFoods.findOne({
      where: { idUser, idSystem },
    });
  },

  async update(idUser, idSystem, data) {
    return await UserBlacklistedFoods.update(data, {
      where: { idUser, idSystem },
    });
  },

  async delete(idUser, idSystem) {
    return await UserBlacklistedFoods.destroy({
      where: { idUser, idSystem },
    });
  },
};

module.exports = UserBlacklistedFoodService;
