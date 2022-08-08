function requestHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (error) {
            res.status(error.status || 500).json({
                status: 'error',
                message: error.message
            });
        }
    };
};


module.exports = requestHandler;
