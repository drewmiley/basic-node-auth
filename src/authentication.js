const User = require('../src/User');

module.exports = async (req, res, next) => {
    const userURLs = ['/user/login', '/user/signup'];
    if (userURLs.includes(req.path)) {
        return next();
    }

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await User.findOne({ 'username': username, 'password': password });
    return user ? next() : res.status(401).json({ message: 'Invalid Authentication Credentials' });
}
