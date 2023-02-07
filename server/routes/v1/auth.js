const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/user');

router.get('/user', (req, res) => {
    if (req.isAuthenticated())
        res.status(200).send({ userName: req.user.name });
    else
        res.status(200).send({ userName: '' });
});

router.post('/register', (req, res) => {
    const _email = req.body.email;
    const _password = req.body.password;
    const _name = req.body.name;

    User.register(new User({ email: _email, name: _name }), _password, (err, user) => {
        if (err) {
            if (err.name == "UserExistsError") {
                res.status(200).send({ msg: 'Email already used' })
            } else {
                console.error(err);
                res.status(500).send({ msg: 'Server Error' });
            }
        } else {
            res.status(200).send({ msg: 'Registered' });
        }
    });
});



router.post('/login', (req, res, next) => {
    // take email and password from req.body
    passport.authenticate('localUser', (err, user, info) => {
        if (err) {
            console.error(err);
            res.status(500).send({ msg: 'Server Error' });
        } else if (!user) {
            res.status(200).send({ msg: 'Invalid Email or Password' });
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({ msg: 'Server Error!' });
                } else {
                    res.status(200).send({ userName: req.user.name });
                }
            });
        }
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.error(err);
            res.status(500).send({ msg: 'Failed Logout' });
        } else {
            res.status(200).send({ msg: 'Loggedout' })
        }
    });
});

module.exports = router;