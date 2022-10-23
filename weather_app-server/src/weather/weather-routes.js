/* eslint-disable global-require */
const router = require('express').Router();

module.exports = db => {
    const weatherRepository = require('./weather-repository')(db);
    const weatherService = require('./weather-service')(weatherRepository);

    const { changeLocationAndSettings } = require('./weather-controller')({
        weatherService
    });

    router.post('/settings', changeLocationAndSettings);

    return router;
};
