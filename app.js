const express = require('express');
const dotenv = require('dotenv')
const sequelize = require('./config/database');

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.get('/api/test', (req, res) => {
    res.json({ status: 200, message: "Ceci est un test !"})
})

app.listen(PORT, () => {
    console.clear()
    console.log(`Serveur démarré\nhttp://localhost:${PORT}\nCtrl + C pour sortir`)
})