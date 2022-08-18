const { Comment, User } = require('../models');

function newComment(text, userId, orderId) {
    Comment.create({text, userId, orderId})
        .then(commentRes => {
            User.updateOne({ _id: userId}, { $push: { comments: commentRes._id}}).then().catch();
        });
}

async function createComment(req, res, next) {
    const { orderId } = req.params;
    const { _id: userId } = req.user;
    const { commentText } = req.body;

    const comment = await newComment(commentText, userId, orderId);

    return res.status(200).json(comment);
}

module.exports = {
    createComment,
}
