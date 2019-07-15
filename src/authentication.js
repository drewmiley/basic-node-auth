module.exports = async (req, res, next) => {
    if (req.path === '/user/login' || req.path === '/user/signup') {
        return next();
    }

    // TODO: Implement authentication
    return res.status(401).json({ message: 'Missing Authorization Header' });
}
