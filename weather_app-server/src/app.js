const express = require('express');
const cors = require('cors');
const http = require('http');
const passport = require('passport');
const { notFound, errorHandler } = require('./errors/errors');

module.exports = db => {
    const userRoutes = require('./users/user-routes')(db);
    const weatherRoutes = require('./weather/weather-routes')(db);

    const app = express();
    const server = http.createServer(app);

    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());

    require('./middlewares/jwt')(passport, db);
    require('./root-router/rootRouter')(app, { userRoutes, weatherRoutes });

    require('./weather/websocket/forecast-ws')(server, db);

    app.use(notFound);
    app.use(errorHandler);

    return server;
};
