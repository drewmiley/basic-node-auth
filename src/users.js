const express = require('express');
const router = express.Router();

const User = require('../src/User');

router.route('/')
    .post((req, res) => {
        let user = new User();
        user.name = req.body.name;
        user.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User created!' });
        });
    })
    .get((req, res) => {
        User.find((err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });
router.route('/:id')
    .get((req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    })
    .put((req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            }
            user.name = req.body.name;
            user.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'User updated!' });
            });

        });
    })
    .delete((req, res) => {
        User.remove({
            _id: req.params.id
        }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User deleted' });
        });
    });

module.exports = router;
