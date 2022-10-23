const { MongoMemoryServer } = require('mongodb-memory-server');
const schedule = require('node-schedule');
const sgMail = require('@sendgrid/mail');
const makeApp = require('../../../src/app');
const jwtService = require('../../../src/global-services/jwt-service');

// given
const settingsData = {
    city: 'Kyiv',
    isNewsletter: false
};
const settingsDataWithNewsletter = {
    city: 'Kyiv',
    isNewsletter: true
};

const user = {
    email: 'email@gmail.com',
    password: '12345678'
};

describe('Weather Controller', () => {
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

    describe('Weather settings', () => {
        it('it should change user data(city) with correct jwt token in request', async () => {
            // given
            const scheduleCancelJobStub = sinon.stub(schedule, 'cancelJob').returns(Promise.resolve());

            const { email, password } = user;
            const token = jwtService.sign(email, password);
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
            const response = await request(app)
                .post('/api/weather/settings')
                .set('Authorization', `Bearer ${token}`)
                .send(settingsData);

            //  then
            expect(response.body).to.deep.equal({
                city: 'Kyiv',
                isNewsletter: false
            });
            expect(response.statusCode).to.equal(200);

            scheduleCancelJobStub.restore();
        });

        it('it should change user data(city) and subscribe on daily newsletter with jwt', async () => {
            // given

            const sendDailyEmailStub = sinon.stub(sgMail, 'send').returns(Promise.resolve());

            const scheduleJobStub = sinon.stub(schedule, 'scheduleJob').returns(Promise.resolve());

            const { email, password } = user;
            const token = jwtService.sign(email, password);
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
            const response = await request(app)
                .post('/api/weather/settings')
                .set('Authorization', `Bearer ${token}`)
                .send(settingsDataWithNewsletter);

            //  then
            expect(response.body).to.deep.equal({
                city: 'Kyiv',
                isNewsletter: true
            });
            expect(response.statusCode).to.equal(200);

            sendDailyEmailStub.restore();
            scheduleJobStub.restore();
        });

        it('it should not change user data, without jwt token in request', async () => {
            // when
            const response = await request(app)
                .post('/api/weather/settings')
                .send(settingsData);

            const error = JSON.parse(response.text).message;

            //  then
            expect(error).to.equal(`Unauthorized Access - No Token Provided!`);
            expect(response.statusCode).to.equal(401);
        });
    });

    afterEach(async () => {
        await db.collection('users').deleteMany();
    });
});
