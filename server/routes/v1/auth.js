const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/user');

function looksLikeMail(str) {
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
}

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

    if (looksLikeMail(_email) && _password.length > 5) {
        User.register(new User({ email: _email, name: _name }), _password, (err, user) => {
            if (err) {
                if (err.name == "UserExistsError") {
                    res.status(200).send({ message: 'Email already registered' })
                } else {
                    console.error(err);
                    res.status(500).send({ message: 'Server Error' });
                }
            } else {
                res.status(200).send({ message: 'Registered Successfully', userName: _name });
            }
        });
    } else {
        res.status(200).send({ message: 'Invalid email or password' });
    }
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