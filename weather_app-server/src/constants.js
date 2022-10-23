module.exports = {
    ONE_DAY: 'one',
    FIVE_DAYS: 'five',
    BASIC_URL_START: 'https://api.openweathermap.org/data/2.5/',
    BASIC_URL_END: `&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`,
    INTERVAL_TIME: 30000,
    ONE_DAY_TIME_DIFFERENCE: 86400
};
