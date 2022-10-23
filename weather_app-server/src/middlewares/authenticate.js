const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);

        if (!user) {
            const error = new Error('Unauthorized Access - No Token Provided!');
            error.status = 401;
            return next(error);
        }

        req.user = user;

        return next();
    })(req, res, next);
};
