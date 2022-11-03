const { MongoClient } = require("mongodb");

const CONNECTIONS_PARAMS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const url = process.env.DB_CONNECT_URI;

const connectionPromise = MongoClient.connect(url, CONNECTIONS_PARAMS);
const dbPromise = connectionPromise
    .then(client => client.db())
    .catch(err => console.log(err));

module.exports = dbPromise;
