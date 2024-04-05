const mysql = require("mysql");
const connection = require("../database");

exports.getCurrentWeather = (req, res) => {
  const { locationId } = req.params;
  connection.query("CALL GetCurrentWeather(?)", [locationId], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la procédure stockée GetCurrentWeather :", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des données météorologiques actuelles." });
    }
    res.status(200).json(results[0]);
  });
  exports.getWeatherForecastByLocation = (req, res) => {
    const { locationId } = req.params;
    connection.query("CALL GetWeatherForecastByLocation(?)", [locationId], (error, results) => {
      if (error) {
        console.error("Erreur lors de l'exécution de la procédure stockée GetWeatherForecastByLocation :", error);
        return res.status(500).json({ error: "Erreur lors de la récupération des prévisions météorologiques." });
      }
      res.status(200).json(results[0]);
    });
  };
};

exports.addLocation = (req, res) => {
  const { nom, pays, latitude, longitude } = req.body;
  connection.query("CALL InsertNewLocation(?, ?, ?, ?)", [nom, pays, latitude, longitude], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'insertion d'une nouvelle localisation :", error);
      return res.status(500).json({ error: "Erreur lors de l'insertion d'une nouvelle localisation." });
    }
    res.status(200).json({ message: "Nouvelle localisation insérée avec succès." });
  });
};

exports.getLocationDetails = (req, res) => {
  const localisationId = req.params.localisationId;
  connection.query("SELECT * FROM localisation WHERE id = ?", [localisationId], (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des détails de la localisation :", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des détails de la localisation." });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Localisation non trouvée." });
    }
    res.status(200).json({ location: results[0] });
  });
};

exports.updateLocation = (req, res) => {
  const locationId = req.params.localisationId;
  const { nom, pays, latitude, longitude } = req.body;
  db.query("CALL UpdateLocation(?, ?, ?, ?, ?)", [locationId, nom, pays, latitude, longitude], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ message: "Localisation mise à jour avec succès" });
  });
};

exports.deleteLocation = (req, res) => {
  const locationId = req.params.localisationId;
  db.query("CALL DeleteLocation(?)", [locationId], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ message: "Localisation supprimée avec succès" });
  });
};
