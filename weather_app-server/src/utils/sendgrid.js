const sgMail = require("@sendgrid/mail");

async function sendVerificationEmail(user, verifyURL) {
    try {
        const subject = "Account Verification Token";
        const to = user.email;
        const from = process.env.SENDGRID_SOURCE_EMAIL;
        const link = verifyURL + user.token;
        const html = `<p>Hi</p><p>Please click on the following <a href="${link}">link</a> to verify your account.</p><br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({ to, from, subject, html });

        return {
            result: `A verification email has been sent to ${user.email}.`
        };
    } catch (error) {
        throw new Error("Error during sending verification email");
    }
}
async function sendDailyEmail(email, data) {
    try {
        const subject = "Daily Weather";
        const to = email;
        const from = process.env.SENDGRID_SOURCE_EMAIL;
        const html = `<h3>Hi!</h3><h3>This is daily weather for ${data.name},${data.sys.country}</h3><h3>Description - ${data.weather[0].main},${data.weather[0].description}</h3> <h3>Temperature - ${data.main.temp}</h3>`;

        await sendEmail({ to, from, subject, html });
    } catch (error) {
        throw new Error("Error during sending email");
    }
}

async function sendEmail(mailOptions) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail.send(mailOptions, (error, result) => {
        if (error) throw error;
        return result;
    });
}

module.exports = { sendVerificationEmail, sendDailyEmail };
