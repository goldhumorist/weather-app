const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const makeApp = require('../../../src/app');
const jwtService = require('../../../src/global-services/jwt-service');

// given
const user = {
    email: 'email@gmail.com',
    password: '12345678'
};

describe('User Controller', () => {
    let app;
    let db;

    before(async () => {
        const sandbox = sinon.createSandbox();

        const mongod = await MongoMemoryServer.create();
        const url = mongod.getUri();

        sandbox.stub(process.env, 'DB_CONNECT_URI').value(url);

        db = await require('../../../src/db/db-connection');
        app = makeApp(db);
    });

    describe('Login endpoint', () => {
        it('it should find user and login, return Email, Token and City(null)', async () => {
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
            const responseLogin = await request(app)
                .post(`/api/auth/login`)
                .send(user);

            // then
            expect(responseLogin.statusCode).to.equal(200);
            expect(responseLogin.body.token).to.be.a(`string`);
            expect(responseLogin.body.email).to.equal(user.email);
            expect(responseLogin.body.city).to.be.a('null');
        });

        it('it should not login user, who does not exists yet', async () => {
            // when
            const responseLogin = await request(app)
                .post('/api/auth/login')
                .send(user);

            const error = JSON.parse(responseLogin.text).message;

            // then
            expect(error).to.equal(`User does not exists.`);
            expect(responseLogin.statusCode).to.equal(400);
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
            const responseLogin = await request(app)
                .post('/api/auth/login')
                .send(user);

            const error = JSON.parse(responseLogin.text).message;

            // then
            expect(error).to.equal(`Account is not verified`);
            expect(responseLogin.statusCode).to.equal(400);
        });
    });

    describe('Signup endpoint', () => {
        it('it should create a new user', async () => {
            // given
            const sendVerificationEmailStub = sinon.stub(sgMail, 'send').returns(Promise.resolve());

            // when
            const responseSignup = await request(app)
                .post('/api/auth/signup')
                .send(user);

            // then
            expect(responseSignup.statusCode).to.equal(200);
            expect(responseSignup.body.message).to.equal(`A verification email has been sent to ${user.email}.`);
            expect(sendVerificationEmailStub.callCount).to.equal(1);

            sendVerificationEmailStub.restore();
        });

        it('it should not create a new user(already exists)', async () => {
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
            const responseSignup = await request(app)
                .post('/api/auth/signup')
                .send(user);

            // then
            expect(responseSignup.statusCode).to.equal(400);
            expect(responseSignup.body.message).to.equal('The email address is already in use.');
        });
    });

    describe('Verify user endpoint', () => {
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
            const responseVerify = await request(app)
                .get(`/api/auth/verify/${token}`)
                .send(user);

            // then
            expect(responseVerify.body.message).to.equal('ok');
            expect(responseVerify.statusCode).to.equal(200);
        });

        it('it should not verify user with invalid token', async () => {
            // given
            const { email, password } = user;
            const token = 'token';
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
            const responseVerify = await request(app)
                .get(`/api/auth/verify/${token}`)
                .send(user);

            // then
            expect(responseVerify.body.message).to.equal('Incorrect or expired link.');
            expect(responseVerify.statusCode).to.equal(400);
        });
    });

    afterEach(async () => {
        await db.collection('users').deleteMany();
    });
});
