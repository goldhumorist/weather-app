module.exports = db => {
    const users = db.collection('users');

    async function findOne(email) {
        return users.findOne(
            { email },
            {
                projection: {
                    _id: 0
                }
            }
        );
    }

    async function signup({ email, password, token }) {
        return users.insertOne({
            email,
            password,
            isVerified: false,
            token,
            userOptions: {
                city: null,
                isNewsletter: false
            },
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }
    const verify = async function(email, token) {
        return users.updateOne({ email, token }, { $set: { isVerified: true } });
    };

    return { findOne, signup, verify };
};
