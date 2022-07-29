const bcrypt = require('bcrypt');

const utils = require('../utils');

const User = require('../models/user');

const authCookieName = 'auth-cookie';

module.exports = {
    async register(req, res) {
        const { username, email, password } = req.body;

        const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (existing) {
            throw new Error('Email is taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            hashedPassword,
        });

        await user.save();

        const accessToken = utils.jwt.createToken({
            _id: user._id,
            username: user.username,
            email: user.email
        });

        return res.status(200)
            .send({
                accessToken,
                _id: user._id,
                username: user.username,
                email: user.email
            });
    }
};
