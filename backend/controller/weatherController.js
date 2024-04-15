const axios = require("axios");

exports.getWeather = async (req, res, next) => {
  const city = req.query.city;
  const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getForecastShortTerm = async (req, res, next) => {
  const city = req.query.city;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getHourlyForecast = async (req, res, next) => {
  const city = req.query.city;
  const hours = req.query.hours;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&hours=${hours}&aqi=no&alerts=no`;

  try {
    const response = await axios.get(url);
    res.json(response.data.forecast.forecastday[0].hour);
  } catch (error) {
    next(error);
  }
};

exports.getWeatherAlerts = async (req, res, next) => {
  const city = req.query.city;
  const url = `http://api.weatherapi.com/v1/alerts.json?key=${process.env.WEATHER_API_KEY}&q=${city}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.alerts);
  } catch (error) {
    next(error);
  }
};
