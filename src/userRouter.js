const express = require('express');
const router = express.Router();

const User = require('../src/User');

const signup = (req, res) => {
    if (req.body.username && req.body.password) {
        User.create({ 'username': req.body.username, 'password': req.body.password }, err => {
            return err || 'User signed up';
        });
    } else {
        return 'Invalid sign up body';
    }
};

const login = (req, res) => {
    User.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, user) => {
        const findUserBearerToken = user => user ? Buffer.from(`${ user.username }:${ user.password }`).toString('base64') : 'User not found';
        return err || findUserBearerToken(user);
    });
};

router.route('/signup')
    .post((req, res) => {
        const signupResponse = signup(req, res);
        return signupResponse.error ? res.send(error) : res.json(signupResponse.json);
    });
router.route('/login')
    .post((req, res) => {
        const loginResponse = login(req, res);
        return loginResponse.error ? res.send(error) : res.json(loginResponse.json);
    });

module.exports.signup = signup;
module.exports.login = login;
module.exports = router;
