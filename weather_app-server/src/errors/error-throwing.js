function getErrorWithStatus(message, statusCode) {
    const error = new Error(message);
    error.status = statusCode;
    return error;
}

module.exports = { getErrorWithStatus };
