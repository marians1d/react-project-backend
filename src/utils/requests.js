function requestHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (error) {
            res.status(error.status).json({
                message: error.message
            });
        }
    };
};


module.exports = requestHandler;
