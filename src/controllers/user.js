const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const blacklist = new Set();

const JWT_SECRET = 'fa;sjdfioeuirjfioewureio;ruewirj';

module.exports = {
    async register(req, res) {
        res.json({ test: req.body });

        const { username, email, password} = req.body;

        try {
            const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    
            if (existing) {
                throw new Error('Email is taken');
            }

            const hashedPassword = bcrypt.hash(password, 10);

            const user = new User({
                username,
                email,
                hashedPassword,
            })

            await user.save();

            return createSession();
        } catch (error) {
            console.log(error);
        }


    },

    createSession(user) {
        const payload = {
            email: user.email,
            _id: user._id
        }

        const accessToken = jwt.sign(payload, JWT_SECRET);

        return {
            accessToken,
            email: user.email,
            _id: user.id,
        }
    }
};
