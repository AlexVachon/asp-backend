const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        project: 'asp-backend',
        version: '1.0.0',
        createdBy: 'Alexandre Vachon'
    })
})

module.exports = router;