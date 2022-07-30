const bcrypt = require('bcrypt');

const { jwt, ApiError, formatJSON } = require('../utils');

const User = require('../models/user');

const authCookieName = 'auth-cookie';

module.exports = {
    async register(req, res) {
        const { username, email, password } = req.body;

        const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (existing) {
            throw new ApiError('EMAIL_TAKEN', 404);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            hashedPassword,
        });

        await user.save();

        const accessToken = jwt.createToken({
            _id: user._id,
            username: user.username,
            email: user.email
        });

        return res.status(200)
            .json({
                accessToken,
                _id: user._id,
                username: user.username,
                email: user.email
            });
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (!user.email) {
            throw new ApiError('INCORRECT_CREDENTIALS');
        }

        const match = await bcrypt.compare(password, user.hashedPassword);

        if (!match) {
            throw new ApiError('INCORRECT_CREDENTIALS');
        }

        return res.json(formatJSON(user, '_id username email'));
    }
};
