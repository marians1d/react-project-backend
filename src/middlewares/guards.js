module.exports = {
    isAuth: () => (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ status: 'error', message: 'Please log in' });
        }
    },

    isOwner: () => (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ status: 'error', message: 'Please log in' });
        } else if (req.user._id == res.locals.order.ownerId) {
            next();
        } else {
            res.status(403).json({ status: 'error', message: 'You cannot modify this record' });
        }
    }
};