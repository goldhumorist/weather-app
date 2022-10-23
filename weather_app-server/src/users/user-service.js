const bcrypt = require("bcrypt");
const jwtService = require("../global-services/jwt-service");
const { getErrorWithStatus } = require("../errors/error-throwing");
const { sendVerificationEmail } = require("../utils/sendgrid");

const userService = userRepository => {
    async function signup({ email, password }, verifyURL) {
        const userExists = await userRepository.findOne(email);
        if (userExists) {
            throw getErrorWithStatus(
                "The email address is already in use.",
                400
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const token = jwtService.sign(email, hashedPassword);

        const { result } = await sendVerificationEmail(
            { email, token },
            verifyURL
        );

        await userRepository.signup({
            email,
            password: hashedPassword,
            token
        });

        return result;
    }

    const login = async function(emailForLogin, password) {
        const user = await userRepository.findOne(emailForLogin);

        if (!user) throw getErrorWithStatus("User does not exists.", 400);
        else if (!user.isVerified)
            throw getErrorWithStatus("Account is not verified", 400);

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            throw getErrorWithStatus("Incorrect password.", 400);

        const { email, userOptions } = user;
        const token = jwtService.sign(email, password);

        return {
            token,
            email,
            city: userOptions.city,
            isNewsletter: userOptions.isNewsletter
        };
    };

    const verify = async function(token) {
        const parseTokenResult = jwtService.verify(token);

        const { modifiedCount } = await userRepository.verify(
            parseTokenResult.email,
            token
        );
        if (modifiedCount === 0) {
            throw getErrorWithStatus("Your account already verified", 400);
        }

        return "Your account was verified";
    };

    return { signup, login, verify };
};

module.exports = userService;
