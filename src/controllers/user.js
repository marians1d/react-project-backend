const bcrypt = require('bcrypt');

const { jwt, ApiError, formatJSON } = require('../utils');
const validator = require('validator');

const User = require('../models/User');
const { logout } = require('../services/user');


module.exports = {
    async register(req, res) {
        const { username, email, password } = req.body;

        const validEmail = validator.isEmail(email.trim().toLowerCase());
        const validPassword = validator.default.isLength(password.trim(), { min: 5, max: 1000 });

        if (!validEmail) {
            throw new ApiError('INVALID_EMAIL', 401);
        }

        if (!validPassword) {
            throw new ApiError('INVALID_PASSWORD', 401);
        }

        const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (existing) {
            throw new ApiError('EMAIL_TAKEN', 404);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email: email.trim().toLowerCase(),
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

        const accessToken = jwt.createToken({
            _id: user._id,
            username: user.username,
            email: user.email
        }); 

        const formattedUser = formatJSON(user, '_id username email');

        formattedUser.accessToken = accessToken;

        return res.json(formattedUser);
    },

    logout(req, res) {
        logout(req.user.token);

        res.status(204).end();
    },
};
