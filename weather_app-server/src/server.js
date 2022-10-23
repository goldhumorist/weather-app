/* eslint-disable global-require */
(async () => {
    try {
        const db = await require('./db/db-connection');
        const app = require('./app')(db);
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}!`);
        });
    } catch (err) {
        console.log(err);
    }
})();
