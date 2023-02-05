const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        msg: 'OK',
        timestamp: new Date()
    });
});
router.use('/', require('./auth'));

module.exports = router