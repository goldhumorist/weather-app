const mapValues = require('lodash.mapvalues');

const wrapWithTryCatch = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({ weatherService }) =>
    withErrorHandling({
        async changeLocationAndSettings(req, res, next) {
            const { email } = req.user;
            const { city, isNewsletter } = req.body;

            const result = await weatherService.changeLocationAndSettings({
                email,
                city,
                isNewsletter
            });

            res.json(result);
        }
    });
