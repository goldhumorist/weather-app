const mapValues = require("lodash.mapvalues");

const wrapWithTryCatch = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({ userService }) =>
    withErrorHandling({
        async signup(req, res, next) {
            const { email, password } = req.body;

            const verifyURL = `${req.get("origin")}/verify/`;

            const result = await userService.signup(
                {
                    email,
                    password
                },
                verifyURL
            );

            res.status(200).json({ message: result });
        },
        async login(req, res, next) {
            const { email, password } = req.body;

            const user = await userService.login(email, password);

            res.status(200).json(user);
        },

        async verify(req, res, next) {
            const { token } = req.params;
            await userService.verify(token);

            return res.status(200).json({ message: "ok", token });
        },
        async authUser(req, res, next) {
            const { email, userOptions } = req.user;

            return res.status(200).json({
                email,
                city: userOptions.city,
                isNewsletter: userOptions.isNewsletter
            });
        }
    });
