const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const authentication = require('./src/authentication');
app.use(authentication);

const userRouter = require('./src/userRouter');
app.use('/user', userRouter);

const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Server running' });
});
app.use('/api', router);

const handleError = require('./src/handleError');
app.use(handleError);

app.listen(8000);
