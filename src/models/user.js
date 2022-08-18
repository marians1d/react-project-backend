const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    orders: [{
        type: ObjectId,
        ref: 'Order'
    }],
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;