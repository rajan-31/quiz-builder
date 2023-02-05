const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.status(200).send({ access_token: '' });
});

router.post('/login', (req, res) => {
    res.status(200).send({ access_token: '' });
});

module.exports = router;