const express = require('express');
const router = express.Router();

const User = require('../src/User');

const signup = (req, res) => {
    if (req.body.username && req.body.password) {
        User.create({ 'username': req.body.username, 'password': req.body.password }, err => {
            if (err) {
                res.send(err);
            }
            res.json('User signed up');
        });
    } else {
        res.json('Invalid sign up body');
    }
};

const login = (req, res) => {
    User.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, user) => {
        if (err) {
            res.send(err);
        }
        if (user) {
            const bearerToken = Buffer.from(`${ user.username }:${ user.password }`).toString('base64');
            res.json(bearerToken);
        } else {
            res.json('User not found');
        }
    });
};

router.route('/signup')
    .post((req, res) => {
        signup(req, res);
    });
router.route('/login')
    .post((req, res) => {
        login(req, res);
    });

module.exports.signup = signup;
module.exports.login = login;
module.exports = router;
