const constants = require("../constants");

const SUCCESS_CODE = 200;

async function fetchForecastdayFromAPI(city, timeForecast) {
    const url = getURL(city, timeForecast);

    const response = await fetch(url, {
        method: "GET"
    });
    const result = await response.json();

    if (Number(result.cod) !== SUCCESS_CODE) {
        throw Error("Something went wrong");
    }

    return result;
}

module.exports = { fetchForecastdayFromAPI };

const getURL = (city, timeForecast) => {
    switch (timeForecast) {
        case constants.ONE_DAY:
            return `${constants.BASIC_URL_START}weather?q=${city}${constants.BASIC_URL_END}`;

        case constants.FIVE_DAYS:
            return `${constants.BASIC_URL_START}forecast?q=${city}${constants.BASIC_URL_END}`;

        default:
            return `${constants.BASIC_URL_START}weather?q=${city}${constants.BASIC_URL_END}`;
    }
};
