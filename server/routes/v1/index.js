const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        msg: 'OK',
        timestamp: new Date(),
        user: req.user,
        session: req.session
    });
});
router.use('/', require('./auth'));
router.use('/', require('./quiz'));

module.exports = router