const { UserDiet } = require("../models");

const UserDietService = {
  // Créer une relation entre un utilisateur et un système
  async create(data) {
    return await UserDiet.create(data);
  },

  async findAll() {
    return await UserDiet.findAll();
  },

  async findOne(idUser, idSystem) {
    return await UserDiet.findOne({
      where: { idUser, idSystem },
    });
  },

  async update(idUser, idSystem, data) {
    return await UserDiet.update(data, {
      where: { idUser, idSystem },
    });
  },

  async delete(idUser, idSystem) {
    return await UserDiet.destroy({
      where: { idUser, idSystem },
    });
  },
};

module.exports = UserDietService;
