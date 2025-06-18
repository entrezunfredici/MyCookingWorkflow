const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

// Création de l'instance Sequelize
const instance = new Sequelize(dbConfig);

// Models
const models = {};
models.BlacklistedFood = require("./BlacklistedFood.model")(instance);
models.BlacklistedFoodUsers = require("./BlacklistedFoodUsers.model")(instance);
models.User = require("./User.model")(instance);
models.UserBlacklistedFood = require("./UserBlacklistedFood.model")(instance);
models.Role = require("./Role.model")(instance);
models.Diet = require("./Diet.model")(instance);
models.DietUsers = require("./DietUsers.model")(instance);


// // Associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  instance,
  ...models,
};
