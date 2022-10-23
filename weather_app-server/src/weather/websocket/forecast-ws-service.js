const jwtServise = require("../../global-services/jwt-service");
const constants = require("../../constants");
const {
    fetchForecastdayFromAPI
} = require("../../utils/open-weather-map-service");

const verifyUserWithToken = (token, userRepository) => {
    const { email } = jwtServise.verify(token);

    return userRepository.findOne(email);
};

const sendToClientforecast = async (ws, user, type) => {
    const { city } = user.userOptions;
    let interval;

    if (type === constants.ONE_DAY || type === constants.FIVE_DAYS) {
        interval = await getForecast(ws, city, fetchForecastdayFromAPI, type);
    } else {
        ws.close(3000, "Invalid Data");
    }

    return interval;
};

module.exports = { verifyUserWithToken, sendToClientforecast };

const getForecast = async (ws, city, fetchForecastFunc, time) => {
    const forecastInfoNow = await fetchForecastFunc(city, time);

    ws.send(JSON.stringify(forecastInfoNow));
    console.log("start work");
    const interval = setInterval(async () => {
        console.log("interval");
        ws.send(JSON.stringify(await fetchForecastFunc(city, time)));
    }, constants.INTERVAL_TIME);

    return interval;
};
