const { MongoMemoryServer } = require('mongodb-memory-server');
const schedule = require('node-schedule');
const sgMail = require('@sendgrid/mail');

// given
const settingsData = {
    email: 'email@gmail.com',
    city: 'Kyiv',
    isNewsletter: false
};
const settingsDataWithNewsletter = {
    email: 'buriakovskyi.01.sasha@gmail.com',
    city: 'Kyiv',
    isNewsletter: true
};

const user = {
    email: 'buriakovskyi.01.sasha@gmail.com',
    password: '12345678'
};

describe('Weather Service', () => {
    let db;
    let weatherService;

    before(async () => {
        const sandbox = sinon.createSandbox();

        const mongod = await MongoMemoryServer.create();
        const url = mongod.getUri();

        sandbox.stub(process.env, 'DB_CONNECT_URI').value(url);

        db = await require('../../../src/db/db-connection');
        const weatherRepository = require('../../../src/weather/weather-repository')(db);
        weatherService = require('../../../src/weather/weather-service')(weatherRepository);
    });

    describe('ChangeLocationAndSettings function', () => {
        it('it should change user data(city) without subscribing on newsletter', async () => {
            // given

            const scheduleCancelJobStub = sinon.stub(schedule, 'cancelJob').returns(Promise.resolve());
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

            const result = await weatherService.changeLocationAndSettings(settingsData);

            expect(result).to.deep.equal({
                city: 'Kyiv',
                isNewsletter: false
            });

            scheduleCancelJobStub.restore();
        });

        it('it should change user data(city) and subscribe on newsletter', async () => {
            // given
            const sendDailyEmailStub = sinon.stub(sgMail, 'send').returns(Promise.resolve());
            const scheduleJobStub = sinon.stub(schedule, 'scheduleJob').returns(Promise.resolve());

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

            const result = await weatherService.changeLocationAndSettings(settingsDataWithNewsletter);

            expect(result).to.deep.equal({
                city: 'Kyiv',
                isNewsletter: true
            });

            sendDailyEmailStub.restore();
            scheduleJobStub.restore();
        });

        it('it should thow error, because function called without city and email', async () => {
            try {
                // when
                await weatherService.changeLocationAndSettings({});
            } catch (error) {
                // then
                expect(error.message).to.equal('Invalid data');
                expect(error.status).to.equal(400);
            }
        });
    });

    afterEach(async () => {
        await db.collection('users').deleteMany();
    });
});
