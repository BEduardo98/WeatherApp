const express = require("express");
const router = express.Router();
const weatherController = require("../controller/apiController");

router.get("/weather/current/", weatherController.getCurrentWeather);

router.get("/weather/forecast/", weatherController.getWeatherForecastByLocation);

router.get("/mascot/advice", weatherController.getMascotAdvice);

router.post("/localisation", weatherController.addLocation);

router.get("/localisation/:localisationId", weatherController.getLocationDetails);

router.put("/localisation/:localisationId", weatherController.updateLocation);

router.delete("/localisation/:localisationId", weatherController.deleteLocation);

module.exports = router;
