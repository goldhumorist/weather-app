module.exports = db => {
    const users = db.collection('users');

    const changeLocationAndSettings = async function({ email, city, isNewsletter = false }) {
        return users.updateOne(
            { email },
            {
                $set: {
                    userOptions: {
                        city,
                        isNewsletter
                    }
                }
            }
        );
    };

    return { changeLocationAndSettings };
};
