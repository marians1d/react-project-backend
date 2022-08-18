const { Comment, User, Order } = require('../models');

async function newComment(text, userId, orderId) {
    const commentRes = await Comment.create({ text, userId, orderId });

    await Promise.all([
        User.updateOne({ _id: userId }, {
            $push: {
                comments: {
                    $each: [commentRes._id],
                    $position: 0
                }
            }
        }),
        Order.findByIdAndUpdate({ _id: orderId }, {
            $push: {
                comments: {
                    $each: [commentRes._id],
                    $position: 0
                }
            }
        }, { new: true })
    ]);

    return commentRes.populate('userId', '_id username');
}

async function createComment(req, res) {
    const { orderId } = req.params;
    const { _id: userId } = req.user;
    const { text } = req.body;

    const comment = await newComment(text, userId, orderId);

    return res.status(200).json(comment);
}

module.exports = {
    createComment,
};
