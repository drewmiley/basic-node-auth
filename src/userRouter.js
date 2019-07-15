const express = require('express');
const router = express.Router();

const User = require('../src/User');

router.route('/signup')
    .post((req, res) => {
        User.create({ 'username': req.body.username, 'password': req.body.password }, err => {
            if (err) {
                res.send(err);
            }
            res.json('Bearer token');
        });
    });
router.route('/login')
    .post((req, res) => {
        User.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, user) => {
            if (err) {
                res.send(err);
            }
            if (user) {
                res.json('Bearer token');
            } else {
                res.json('User not found');
            }
        });
    });

module.exports = router;
