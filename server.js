const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Server running' });
});

const usersRouter = require('./src/users');
app.use('/users', usersRouter);

app.use('/api', router);
app.listen(8000);
