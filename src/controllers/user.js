const bcrypt = require('bcrypt');

const { jwt, ApiError, formatJSON } = require('../utils');
const validator = require('validator');
const { uploadFile } = require('../utils/drive');

const { User } = require('../models');
const { logout } = require('../services/user');


module.exports = {
    async register(req, res) {
        const { username, email, password } = req.body;

        const validUsername = validator.default.isLength(username.trim(), { min: 3, max: 1000 });
        const validEmail = validator.isEmail(email.trim().toLowerCase());
        const validPassword = validator.default.isLength(password.trim(), { min: 5, max: 1000 });

        if (!validUsername) {
            throw new ApiError('INVALID_USERNAME', 401);
        }

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
            profileImageUrl: 'https://drive.google.com/uc?id=1YLeGcABg88YpREERPskYhKxqbu3IO5ij'
        });

        await user.save();

        const accessToken = jwt.createToken({
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl
        });

        return res.status(200)
            .json({
                accessToken,
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            });
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (!user || !user.email) {
            throw new ApiError('INCORRECT_CREDENTIALS', 404);
        }

        const match = await bcrypt.compare(password, user.hashedPassword);

        if (!match) {
            throw new ApiError('INCORRECT_CREDENTIALS', 404);
        }

        const accessToken = jwt.createToken({
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl
        });

        const formattedUser = formatJSON(user, '_id username email profileImageUrl');

        formattedUser.accessToken = accessToken;

        return res.json(formattedUser);
    },

    logout(req, res) {
        logout(req.user.token);

        res.status(204).end();
    },

    async profileImage(req, res) {
        const userId = req.user?._id;

        const newProfileImage = req.files.profileImage;

        const imageId = await uploadFile(newProfileImage);

        const profileImageUrl = `https://drive.google.com/uc?id=${imageId}`;

        const user = await User.findOneAndUpdate({ _id: userId }, { profileImageUrl }, { runValidators: true, new: true }).populate('orders');

        return res.json(user);
    }
};
