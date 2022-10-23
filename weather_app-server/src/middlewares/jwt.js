const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport, db) => {
    const User = require('../users/user-repository')(db);
    passport.use(
        new JwtStrategy(jwtOptions, (jwtPayload, done) => {
            User.findOne(jwtPayload.email)
                .then(user => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, false, { message: 'Server Error' });
                });
        })
    );
};
