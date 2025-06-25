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
    await instance.sync({ force: true });
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
