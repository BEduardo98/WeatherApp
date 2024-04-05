const axios = require("axios");
require("dotenv").config();

const ApiKey = process.env.API_KEY;

const Api = (param.exports.getWeatherData = async (req, res) => {
  const locationId = req.params.localisationId;
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${locationId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
