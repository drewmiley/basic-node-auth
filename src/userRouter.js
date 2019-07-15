const express = require('express');
const router = express.Router();

const User = require('../src/User');

router.route('/signup')
    .post((req, res) => {
        // let user = new User();
        // user.name = req.body.name;
        // user.save(err => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json({ message: 'User created!' });
        // });
    });
router.route('/login')
    .post((req, res) => {
        // let user = new User();
        // user.name = req.body.name;
        // user.save(err => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json({ message: 'User created!' });
        // });
    });

module.exports = router;
