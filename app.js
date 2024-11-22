const express = require('express');
const dotenv = require('dotenv')
const sequelize = require('./config/database');

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

const userRoutes = require("./routes/user")

app.use(express.json())
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.clear()
    console.log(`Serveur démarré\nhttp://localhost:${PORT}\nCtrl + C pour sortir`)
})
