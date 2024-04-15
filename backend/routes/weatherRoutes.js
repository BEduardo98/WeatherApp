const express = require("express");
const router = express.Router();
const weatherController = require("../controller/weatherController");

router.get("/", weatherController.getWeather);
router.get("/forecast/short-term", weatherController.getForecastShortTerm);
router.get("/forecast/hourly", weatherController.getHourlyForecast);
router.get("/alerts", weatherController.getWeatherAlerts);

module.exports = router;
