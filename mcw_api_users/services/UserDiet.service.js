const { UserDiets } = require("../models");

const UserDietService = {
  // Créer une relation entre un utilisateur et un système
  async create(data) {
    return await UserDiets.create(data);
  },

  async findAll() {
    return await UserDiets.findAll();
  },

  async findOne(idUser, idSystem) {
    return await UserDiets.findOne({
      where: { idUser, idSystem },
    });
  },

  async update(idUser, idSystem, data) {
    return await UserDiets.update(data, {
      where: { idUser, idSystem },
    });
  },

  async delete(idUser, idSystem) {
    return await UserDiets.destroy({
      where: { idUser, idSystem },
    });
  },
};

module.exports = UserDietService;
