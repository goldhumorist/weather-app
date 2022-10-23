/* eslint-disable global-require */
const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');

module.exports = db => {
    const userRepository = require('./user-repository')(db);
    const userService = require('./user-service')(userRepository);
    const { signup, login, verify, authUser } = require('./user-controller')({
        userService
    });

    router.get('/', authenticate, authUser);
    router.post('/signup', signup);
    router.post('/login', login);
    router.get('/verify/:token', verify);

    return router;
};
