const schedule = require('node-schedule');
const constants = require('../constants');
const openWeatherMap = require('../utils/open-weather-map-service');
const sendgrid = require('../utils/sendgrid');
const { getErrorWithStatus } = require('../errors/error-throwing');

module.exports = weatherRepository => {
    const changeLocationAndSettings = async function({ email, city, isNewsletter }) {
        if (email && city) {
            await weatherRepository.changeLocationAndSettings({
                email,
                city,
                isNewsletter
            });

            if (isNewsletter) {
                await getAndSendDailyWeather(email, city);
                schedule.scheduleJob(`DailyNews_${email}_${city}`, process.env.NODE_SCHEDULE_DAILY_TIME, async () => {
                    await getAndSendDailyWeather(email, city);
                });
            } else {
                schedule.cancelJob(`DailyNews_${email}_${city}`);
            }
        } else {
            throw getErrorWithStatus('Invalid data', 400);
        }
        return { city, isNewsletter: !!isNewsletter };
    };

    return { changeLocationAndSettings };
};

const getAndSendDailyWeather = async (email, city) => {
    const data = await openWeatherMap.fetchForecastdayFromAPI(city, constants.ONE_DAY);
    return sendgrid.sendDailyEmail(email, data);
};
