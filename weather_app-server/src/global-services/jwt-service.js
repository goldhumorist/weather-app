const jwt = require('jsonwebtoken');

const JWT_CONFIGURATION = {
    expiresIn: '4h'
};

module.exports = {
    sign(email, password) {
        return jwt.sign({ email, password }, process.env.JWT_SECRET, {
            expiresIn: JWT_CONFIGURATION.expiresIn
        });
    },

    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                const errorObj = new Error('Incorrect or expired link.');
                errorObj.status = 400;
                throw errorObj;
            }

            return decodedToken;
        });
    }
};
