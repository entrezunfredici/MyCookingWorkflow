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

//Associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

async function syncDatabase() {
  try {
    // Synchroniser les tables sans dépendances externes en premier
    await models.Roles.sync({ force: true });
    await models.Diets.sync({ force: true });
    await models.BlacklistedFoods.sync({ force: true });
    await models.Users.sync({ force: true }); // Users dépend de Roles

    // Une fois que les tables de base sont créées, synchroniser les tables de jointure
    // Ces tables ont des clés étrangères vers Users, Diets, BlacklistedFoods
    await models.UserDiets.sync({ force: true });
    await models.UserBlacklistedFoods.sync({ force: true });

    console.log("reset database success");
  } catch (err) {
    console.error("Erreur lors de la synchronisation de la base :", err);
  }
}

// instance.sync({ force: true }).then(() => {
//   console.log("reset database success"); 
// }).catch((err) => {
//   console.error("Erreur lors de la synchronisation de la base :", err);
// });

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
