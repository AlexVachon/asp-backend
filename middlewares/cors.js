const cors = require('cors');

const corsOpt = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

module.exports = cors(corsOpt);