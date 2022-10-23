const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const jwtService = require('../../../src/global-services/jwt-service');

// given
const user = {
    email: 'email@gmail.com',
    password: '12345678'
};

describe('User Service', () => {
    let db;
    let userService;

    before(async () => {
        const sandbox = sinon.createSandbox();

        const mongod = await MongoMemoryServer.create();
        const url = mongod.getUri();

        sandbox.stub(process.env, 'DB_CONNECT_URI').value(url);

        db = await require('../../../src/db/db-connection');

        const userRepository = require('../../../src/users/user-repository')(db);
        userService = require('../../../src/users/user-service')(userRepository);
    });
    //     beforeEach(() => {
    //         sendVerificationEmailStub = sinon.stub(sendgrid, 'sendVerificationEmail').returns(
    //             Promise.resolve({
    //                 result: `A verification email has been sent to ${user.email}.`
    //             })
    //         );
    //     });

    describe('Login function', () => {
        it('it should login user with correct data', async () => {
            // given
            const { email, password } = user;
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.collection('users').insertOne({
                email,
                password: hashedPassword,
                isVerified: true,
                userOptions: {
                    city: null,
                    isNewsletter: false
                }
            });

            // when
            const response = await userService.login(user.email, user.password);

            // then
            expect(response.email).to.equals(user.email);
            expect(response.city).to.be.a('null');
            expect(response.token).to.be.a('string');
        });

        it('it should not login user, user does not exists yet', async () => {
            // given
            const { email, password } = user;

            try {
                // when
                await userService.login(email, password);
            } catch (error) {
                // then
                expect(error.message).to.equal('User does not exists.');
                expect(error.status).to.equal(400);
            }
        });

        it('it should not login unverified user', async () => {
            // given
            const { email, password } = user;
            await db.collection('users').insertOne({
                email,
                password,

                isVerified: false,
                userOptions: {
                    city: null,
                    isNewsletter: false
                }
            });

            // when
            try {
                await userService.login(user.email, user.password);
            } catch (error) {
                // then
                expect(error.message).to.equals('Account is not verified');
                expect(error.status).to.equals(400);
            }
        });

        it('it should not login user with incorrect password', async () => {
            // given
            const { email, password } = user;
            await db.collection('users').insertOne({
                email,
                password,
                isVerified: true,
                userOptions: {
                    city: null,
                    isNewsletter: false
                }
            });

            // when
            try {
                await userService.login(user.email, 'incorrectPassword');
            } catch (error) {
                // then
                expect(error.message).to.equals('Incorrect password.');
                expect(error.status).to.equals(400);
            }
        });
    });

    describe('Signup function', () => {
        it('it should create a new user', async () => {
            // given
            const sendVerificationEmailStub = sinon.stub(sgMail, 'send').returns(Promise.resolve());
            // when
            const response = await userService.signup({
                email: user.email,
                password: user.password
            });

            // then
            expect(response).to.equal(`A verification email has been sent to ${user.email}.`);
            expect(sendVerificationEmailStub.callCount).to.equal(1);

            sendVerificationEmailStub.restore();
        });

        it('it should not create a new user(already exists)', async () => {
            // given
            const { email, password } = user;
            await db.collection('users').insertOne({
                email,
                password,
                isVerified: false,
                userOptions: {
                    city: null,
                    isNewsletter: false
                }
            });

            try {
                // when
                await userService.signup({
                    email: user.email,
                    password: user.password
                });
            } catch (error) {
                // then
                expect(error.message).to.equals('The email address is already in use.');
                expect(error.status).to.equal(400);
            }
        });
    });

    describe('Verify user function', () => {
        it('it should verify user', async () => {
            // given
            const { email, password } = user;
            const token = jwtService.sign(email, password);
            await db.collection('users').insertOne({
                email,
                password,
                token,
                isVerified: false,
                userOptions: {
                    city: null,
                    isNewsletter: false
                }
            });

            // when
            const response = await userService.verify(token);

            // then
            expect(response).to.equal('Your account was verified');
        });

        it('it should not verify account - already verified', async () => {
            // given
            const { email, password } = user;
            const token = jwtService.sign(email, password);
            await db.collection('users').insertOne({
                email,
                password,
                token,
                isVerified: true,
                userOptions: {
                    city: null,
                    isNewsletter: false
                }
            });

            // when
            try {
                await userService.verify(token);
            } catch (error) {
                // then
                expect(error.status).to.equals(400);
                expect(error.message).to.equals('Your account already verified');
            }
        });
    });

    afterEach(async () => {
        await db.collection('users').deleteMany();
    });
});
