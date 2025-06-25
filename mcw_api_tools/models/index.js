const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

// Création de l'instance Sequelize
const instance = new Sequelize(dbConfig);

// Models
const models = {};
models.Steps = require("./Step.model")(instance);

// Associations
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
