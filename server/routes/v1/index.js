const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        message: 'OK',
        timestamp: new Date(),
        user: req.user,
        api_version: process.env.API_VERSION
    });
});
router.use('/', require('./auth'));
router.use('/', require('./quiz'));

module.exports = router