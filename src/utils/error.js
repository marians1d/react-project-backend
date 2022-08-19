const RESPONSE_MESSAGES = {
    'INCORRECT_CREDENTIALS': 'Неправилни имейл или парола',
    'NOT_FOUND': 'Не е намерено',
    'EMAIL_TAKEN': 'Имейла е зает',
    'INVALID_EMAIL': 'Имейла е невалиден',
    'INVALID_PASSWORD': 'Паролата е невалидна',
    'INVALID_USERNAME': 'Потребителското име е невалидно',
    'INVALID_TOKEN': 'Токена е изтекъл',
    'ORDER_NOT_FOUND': 'Поръчката не е намерена',
    'INVALID_TITLE': 'Заглавието е невалидно',
    'INVALID_DESCRIPTION': 'Описанието е невалидно',
    'INVALID_ADDRESS': 'Адреса е невалиден',
    'INVALID_VISIBILITY': 'Видимостта е невалидна',
};

class ApiError extends Error {
    constructor(key, status) {
        super(RESPONSE_MESSAGES[key]);

        this.status = status;
    }

}

module.exports = ApiError;