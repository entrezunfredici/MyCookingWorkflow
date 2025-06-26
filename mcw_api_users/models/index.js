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

const start = async () => {
  try {
    // Synchronisez d'abord les modèles sans dépendances ou ceux qui sont des cibles de clés étrangères
    await models.Roles.sync({ force: true });
    await models.Diets.sync({ force: true });
    await models.BlacklistedFoods.sync({ force: true });

    // Ensuite, synchronisez les modèles qui dépendent des précédents
    await models.Users.sync({ force: true }); // Users dépend de Roles
    await models.UserDiets.sync({ force: true }); // UserDiets dépend de Users et Diets
    await models.UserBlacklistedFoods.sync({ force: true }); // UserBlacklistedFoods dépend de Users et BlacklistedFoods

    console.log("reset database success");
  } catch (err) {
    console.error("Erreur lors de la synchronisation de la base :", err);
  }
};

// const start = async () => {
//   try {
//     await instance.sync({ alter: true });
//     console.log("reset database success");
//   } catch (err) {
//     console.error("Erreur lors de la synchronisation de la base :", err);
//   }
// };

start();

module.exports = {
  instance,
  ...models,
};
