const { Sequelize } = require("sequelize");
const dbmsConfig = require("../config/dbms.config");
const dbConfig = require("../config/db.config");

// Création de l'instance Sequelize
const instance = new Sequelize(process.env.ENVIRONMENT === "prod" ? dbmsConfig : dbConfig);

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

// instance.sync({ force: true }).then(() => {
//   console.log("reset database success"); 
// });

instance.sync({ alter: true }).then(() => {
  console.log("Base de données synchronisée (force true)");
  // Ici tu peux démarrer ton serveur ou ta seed
}).catch((err) => {
  console.error("Erreur lors de la synchronisation de la base :", err);
});

module.exports = {
  instance,
  ...models,
};
