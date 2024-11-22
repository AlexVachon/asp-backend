const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const userRoutes = require("./routes/user");
const versionRoutes = require('./routes/version')

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/version', versionRoutes);

// Connexion à la base de données et démarrage du serveur
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie!');
    app.listen(PORT, () => {
      console.clear();
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
    process.exit(1);
  });
