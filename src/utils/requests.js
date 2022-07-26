const RESPONSE_MESSAGES = {

};

function requestHandler(fn) {
    return async (req, res, next) => {
        try {
            fn(req, res);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = requestHandler;
