const RESPONSE_MESSAGES = {
    'INCORRECT_CREDENTIALS': 'Incorrect email or password',
    'NOT_FOUND': 'Not Found',
    'EMAIL_TAKEN': 'Email is taken',
    'INVALID_EMAIL': 'Email is invalid',
    'INVALID_PASSWORD': 'Password is invalid',
    'INVALID_USERNAME': 'Username is invalid',
    'INVALID_TOKEN': 'Token is blacklisted',
    'ORDER_NOT_FOUND': 'Order not found',
    'INVALID_TITLE': 'Title is invalid',
    'INVALID_DESCRIPTION': 'Description is invalid',
    'INVALID_ADDRESS': 'Address is invalid',
    'INVALID_VISIBILITY': 'Visibility is invalid',
};

class ApiError extends Error {
    constructor(key, status) {
        super(RESPONSE_MESSAGES[key]);

        this.status = status;
    }

}

module.exports = ApiError;