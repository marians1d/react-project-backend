module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Origin', 'Content-Type');

    next();
}