// db-init.js
const { Client } = require('pg');

// Utilisez les variables d'environnement fournies par Docker Compose
// Les noms des variables comme PG_USER, PG_HOST, etc., correspondent à ceux
// définis dans la section 'environment' de votre docker-compose.yml pour les API.
const dbConfig = {
    user: process.env.PG_USER || 'your_username', // Correspond à POSTGRES_USER dans postgres_* et PG_USER dans api_*
    host: process.env.PG_HOST || 'localhost',     // Correspond à PG_HOST dans api_* (par exemple, 'postgres_users')
    database: process.env.PG_DB || 'your_database_name', // Correspond à POSTGRES_DB dans postgres_* et PG_DB dans api_*
    password: process.env.PG_PASS || 'your_password', // Correspond à POSTGRES_PASSWORD dans postgres_* et PG_PASS dans api_*
    port: parseInt(process.env.PG_PORT, 10) || 5432, // Correspond à PG_PORT dans api_*
};

// SQL pour supprimer les tables (et leurs séquences) si elles existent,
// suivi de la création des tables. C'est plus agressif pour le dev.
const dropAndCreateTablesSQL = `
-- Explicitly drop sequences first to avoid potential lingering issues
DROP SEQUENCE IF EXISTS "Roles_roleId_seq" CASCADE;
DROP SEQUENCE IF EXISTS "Users_userId_seq" CASCADE;
DROP SEQUENCE IF EXISTS "Diets_dietId_seq" CASCADE;
DROP SEQUENCE IF EXISTS "BlacklistedFoods_blacklistedFoodId_seq" CASCADE;

-- Then drop existing tables
DROP TABLE IF EXISTS "UserBlacklistedFoods" CASCADE;
DROP TABLE IF EXISTS "UserDiets" CASCADE;
DROP TABLE IF EXISTS "BlacklistedFoods" CASCADE;
DROP TABLE IF EXISTS "Diets" CASCADE;
DROP TABLE IF EXISTS "Users" CASCADE;
DROP TABLE IF EXISTS "Roles" CASCADE;

-- Table: Roles
-- Pas de IF NOT EXISTS ici car les tables sont explicitement supprimées juste avant
CREATE TABLE "Roles" (
    "roleId" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL
);

-- Table: Users
CREATE TABLE "Users" (
    "userId" SERIAL PRIMARY KEY,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "validEmailCode" VARCHAR(50),
    "resetPasswordCode" VARCHAR(50),
    "hasValidatedEmail" BOOLEAN NOT NULL DEFAULT FALSE,
    "lastLogin" TIMESTAMPTZ,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    CONSTRAINT "FK_Users_roleId" FOREIGN KEY ("roleId") REFERENCES "Roles" ("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Table: Diets
CREATE TABLE "Diets" (
    "dietId" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL
);

-- Table: BlacklistedFoods
CREATE TABLE "BlacklistedFoods" (
    "blacklistedFoodId" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL
);

-- Table: UserBlacklistedFoods (Join Table)
CREATE TABLE "UserBlacklistedFoods" (
    "userId" INTEGER NOT NULL,
    "blacklistedFoodId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("userId", "blacklistedFoodId"),
    CONSTRAINT "FK_UserBlacklistedFoods_userId" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FK_UserBlacklistedFoods_blacklistedFoodId" FOREIGN KEY ("blacklistedFoodId") REFERENCES "BlacklistedFoods" ("blacklistedFoodId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: UserDiets (Join Table)
CREATE TABLE "UserDiets" (
    "userId" INTEGER NOT NULL,
    "dietId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("userId", "dietId"),
    CONSTRAINT "FK_UserDiets_userId" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FK_UserDiets_dietId" FOREIGN KEY ("dietId") REFERENCES "Diets" ("dietId") ON DELETE CASCADE ON UPDATE CASCADE
);
`;

// Function to check if a table exists (still useful for skipping if all tables are consistently present)
async function tableExists(client, tableName) {
    const query = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = $1
        );
    `;
    const res = await client.query(query, [tableName]);
    return res.rows[0].exists;
}

async function initializeDatabase() {
    console.log('Attempting to connect with DB config:', dbConfig);

    const client = new Client(dbConfig);

    try {
        await client.connect();
        console.log('Connected to PostgreSQL database for initialization.');

        // Check for the existence of one key table. If it exists, we assume the schema is mostly set up.
        // However, given the "duplicate key" error, we will use a more aggressive drop/create strategy
        // for development to ensure consistency.
        const rolesTableExists = await tableExists(client, 'Roles');

        if (!rolesTableExists) {
            console.log('Roles table not found. Proceeding with schema drop and creation...');
            // Exécuter l'ensemble des commandes de suppression et de création
            await client.query(dropAndCreateTablesSQL);
            console.log('Tables dropped and created successfully!');
        } else {
            console.log('Roles table already exists. Skipping schema creation in db-init.js (relying on Sequelize alter).');
            // Si la table Roles existe, nous ne faisons rien ici, laissant Sequelize gérer les altérations.
            // Cela suppose que si Roles existe, les autres tables sont probablement là aussi ou
            // que Sequelize est capable de les gérer via `alter: true`.
            // La logique 'duplicate key' suggère un état incohérent que ce bloc initial devrait éviter.
        }

    } catch (err) {
        console.error('Error during database initialization (db-init.js):', err);
        process.exit(1);
    } finally {
        await client.end();
        console.log('Disconnected from PostgreSQL initialization client.');
    }
}

module.exports = initializeDatabase;
