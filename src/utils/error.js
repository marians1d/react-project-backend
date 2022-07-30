const RESPONSE_MESSAGES = {
    'INCORRECT_CREDENTIALS': 'Incorrect email or password',
    'NOT_FOUND': 'Not Found',
    'EMAIL_TAKEN': 'Email is taken',
};

class ApiError extends Error {
    constructor(key, status) {
        super(RESPONSE_MESSAGES[key]);

        this.status = status;
    }

}

module.exports = ApiError;