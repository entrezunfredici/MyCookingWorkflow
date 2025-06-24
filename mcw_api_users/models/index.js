const { Sequelize } = require("sequelize");
const dbmsConfig = require("../config/dbms.config");
const dbConfig = require("../config/db.config");

// Création de l'instance Sequelize
const instance = new Sequelize(process.env.ENVIRONMENT === "prod" ? dbmsConfig : dbConfig);

// Models
const models = {};
models.Role = require("./Role.model")(instance);
models.Diet = require("./Diet.model")(instance);
models.BlacklistedFood = require("./BlacklistedFood.model")(instance);
models.User = require("./User.model")(instance);
models.UserDiet = require("./UserDiet.model")(instance);
models.UserBlacklistedFood = require("./UserBlacklistedFood.model")(instance);

//Associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

instance.sync({ force: true }).then(() => {
  console.log("reset database success"); 
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
