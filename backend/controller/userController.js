const mysql = require("mysql");
const connection = require("../database");

exports.registerUser = (req, res) => {
  const { name, email } = req.body;
  connection.query("INSERT INTO utilisateur (nom,email) VALUES (?,?)", [name, email], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'enregistrement d'un nouvel utilisateur :", error);
      return res.status(500).json({ error: "Erreur lors de l'enregistrement d'un nouvel utilisateur." });
    }
    res.status(200).json({ message: "Nouvel utilisateur enregistré avec succès." });
  });
};

exports.loginUser = (req, res) => {
  const { email } = req.body;
  connection.query("SELECT * FROM utilisateur WHERE email = ?", [email], (error, results) => {
    if (error) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      return res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur." });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    res.status(200).json({ user: results[0] });
  });
};

exports.getUserNotifications = (req, res) => {
  const userId = req.params.userId;
  connection.query("SELECT * FROM notification WHERE utilisateurId = ?", [userId], (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des notifications utilisateur :", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des notifications utilisateur." });
    }
    res.status(200).json({ notifications: results });
  });
};

exports.getUserInfo = (req, res) => {
  const userId = req.params.userId;
  connection.query("SELECT * FROM utilisateur WHERE id = ?", [userId], (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des informations utilisateur :", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des informations utilisateur." });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    res.status(200).json({ user: results[0] });
  });
};

exports.getUserPreferences = (req, res) => {
  const userId = req.params.userId;
  connection.query("SELECT * FROM préférences WHERE utilisateurId = ?", [userId], (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des préférences utilisateur :", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des préférences utilisateur." });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Préférences utilisateur non trouvées." });
    }
    res.status(200).json({ preferences: results[0] });
  });
};

exports.toggleNotifications = (req, res) => {
  const { userId } = req.params;
  const { notificationsEnabled } = req.body;
  connection.query("UPDATE utilisateur SET notifications = ? WHERE id = ?", [notificationsEnabled, userId], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'activation/désactivation des notifications :", error);
      return res.status(500).json({ error: "Erreur lors de l'activation/désactivation des notifications." });
    }
    res.status(200).json({ message: "Notifications utilisateur mises à jour avec succès." });
  });
};

exports.updateUserPreferences = (req, res) => {
  const { userId, newLocationPreference, newUnitPreference, newNotificationPreference } = req.body;
  connection.query(
    "CALL UpdateUserPreferences(?, ?, ?, ?)",
    [userId, newLocationPreference, newUnitPreference, newNotificationPreference],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la mise à jour des préférences utilisateur :", error);
        return res.status(500).json({ error: "Erreur lors de la mise à jour des préférences utilisateur." });
      }
      res.status(200).json({ message: "Préférences utilisateur mises à jour avec succès." });
    }
  );
};

exports.getUserSearchHistory = (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT * FROM historiquerecherche WHERE utilisateurId = ? ORDER BY dateEtHeure DESC", [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
};
