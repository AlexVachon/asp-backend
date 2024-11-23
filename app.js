const express = require("express");
const dotenv = require("dotenv");
const { initializeDatabase } = require("./config/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const corsMiddleware = require("./middlewares/cors");

const userRoutes = require("./routes/user");
const versionRoutes = require("./routes/version");

app.use(corsMiddleware);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/version", versionRoutes);

// Connexion à la base de données et démarrage du serveur
console.clear();
initializeDatabase();
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
