const { Sequelize } = require("sequelize");
const dbmsConfig = require("../config/dbms.config");
const dbConfig = require("../config/db.config");

// Création de l'instance Sequelize
const instance = new Sequelize(process.env.ENVIRONMENT === "prod" ? dbmsConfig : dbConfig);

// Models
const models = {};
models.Roles = require("./Role.model")(instance);
models.Diets = require("./Diet.model")(instance);
models.BlacklistedFoods = require("./BlacklistedFood.model")(instance);
models.Users = require("./User.model")(instance);
models.UserDiets = require("./UserDiet.model")(instance);
models.UserBlacklistedFoods = require("./UserBlacklistedFood.model")(instance);

// Associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// syncDatabase();
instance.sync({ force: true }).then(() => {
  console.log("database synchronized successfully");
  // Ici tu peux démarrer ton serveur ou ta seed
}).catch((err) => {
  console.error("Erreur lors de la synchronisation de la base :", err);
});

// instance.sync({ alter: true }).then(() => {
//   console.log("database synchronized successfully");
//   // Ici tu peux démarrer ton serveur ou ta seed
// }).catch((err) => {
//   console.error("Erreur lors de la synchronisation de la base :", err);
// });

module.exports = {
  instance,
  ...models,
};
