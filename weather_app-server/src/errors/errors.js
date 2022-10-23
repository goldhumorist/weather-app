function notFound(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err.message, error: isProduction() ? {} : err.stack });
}

module.exports = { notFound, errorHandler };

function isProduction() {
    return process.env.NODE_ENV === 'production';
}
