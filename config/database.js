const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    port: process.env.DB_PORT,
    logging: false,
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");

    // Synchronisation des modèles
    await sequelize.sync({ force: false }); // Utilisez 'true' pour recréer les tables
    console.log("La base de données a été synchronisée.");
  } catch (error) {
    console.error("Impossible de connecter à la base de données:", error);
  }
}

module.exports = { sequelize, initializeDatabase };
