const { Sequelize } = require("sequelize");
const dbmsConfig = require("../config/dbms.config");
const dbConfig = require("../config/db.config");
const initializeDatabase = require("./db-init");

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
// instance.sync({ force: true }).then(() => {
//   console.log("database synchronized successfully");
//   // Ici tu peux démarrer ton serveur ou ta seed
// }).catch((err) => {
//   console.error("Erreur lors de la synchronisation de la base :", err);
// });

// instance.sync({ alter: true }).then(() => {
//   console.log("database synchronized successfully");
//   // Ici tu peux démarrer ton serveur ou ta seed
// }).catch((err) => {
//   console.error("Erreur lors de la synchronisation de la base :", err);
// });

/**
 * Fonction asynchrone pour initialiser la base de données
 * et synchroniser les modèles Sequelize.
 */
async function setupDatabaseAndSequelize() {
  try {
    // 1. Appeler le script d'initialisation manuel de la base de données.
    // Ceci créera les tables si elles n'existent pas.
    console.log("Démarrage de l'initialisation manuelle de la base de données...");
    await initializeDatabase();
    console.log("Initialisation manuelle de la base de données terminée.");

    // 2. Ensuite, synchroniser les modèles Sequelize.
    // 'alter: true' est approprié ici car les tables auront déjà été créées
    // par db-init.js. Sequelize appliquera uniquement les modifications nécessaires
    // (par exemple, ajout de colonnes, modification de contraintes).
    console.log("Démarrage de la synchronisation Sequelize...");
    await instance.sync({ alter: true });
    console.log("Base de données synchronisée avec Sequelize avec succès !");

    // Ici, vous pouvez démarrer votre serveur ou votre processus de seed
    // Exemple : app.listen(port, () => console.log(`Server running on port ${port}`));
    // ou appeler une fonction pour insérer des données initiales.

  } catch (err) {
    console.error("Erreur critique lors de l'initialisation ou de la synchronisation de la base de données :", err);
    // En cas d'erreur critique, il est souvent préférable de quitter le processus
    // pour éviter que l'application ne fonctionne avec une base de données non prête.
    process.exit(1);
  }
}

// Appeler la fonction principale pour démarrer le processus.
setupDatabaseAndSequelize();

module.exports = {
  instance,
  ...models,
};
