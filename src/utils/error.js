const RESPONSE_MESSAGES = {
    'INCORRECT_CREDENTIALS': 'Incorrect email or password',
    'NOT_FOUND': 'Not Found',
    'EMAIL_TAKEN': 'Email is taken',
    'INVALID_EMAIL': 'Email is invalid',
    'INVALID_PASSWORD': 'Password is invalid',
    'INVALID_TOKEN': 'Token is blacklisted'
};

class ApiError extends Error {
    constructor(key, status) {
        super(RESPONSE_MESSAGES[key]);

        this.status = status;
    }

}

module.exports = ApiError;