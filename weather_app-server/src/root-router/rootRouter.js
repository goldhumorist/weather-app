const authenticate = require('../middlewares/authenticate');

module.exports = (app, { userRoutes, weatherRoutes }) => {
    app.get('/ping', (req, res) => {
        res.status(200).send({ message: 'Pong' });
    });
    app.use('/api/auth', userRoutes);
    app.use('/api/weather', authenticate, weatherRoutes);
};
