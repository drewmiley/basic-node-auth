const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/authtest');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
