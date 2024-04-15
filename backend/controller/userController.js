const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database");
const { check, validationResult } = require("express-validator");
const Utilisateur = require("../models/Utilisateur");

exports.registerUser = [
  check("email").isEmail().withMessage("Enter a valid email address"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const [result] = await db.query("INSERT INTO utilisateur (email, mot_de_passe) VALUES (?, ?)", [email, hashedPassword]);
      res.status(201).json({ message: "User registered" });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email already exists" });
      }
      next(error);
    }
  },
];

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const result = await db.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
  if (result === undefined) {
    console.error("Database query returned undefined");
  } else if (Array.isArray(result)) {
    const [users] = result;
    try {
      if (users.length === 0) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const user = new Utilisateur(users[0].id, users[0].nom, users[0].email, users[0].mot_de_passe);

      const isValid = await bcrypt.compare(password, user.mot_de_passe);
      if (!isValid) {
        console.error("Failed login attempt for user:", email);
        return res.status(401).json({ message: "Authentication failed" });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token: token, userId: user.id });
    } catch (error) {
      console.error("Login error:", error);
      next(error);
    }
  } else {
    console.error("Database query did not return an array:", result);
  }
};

exports.updateUserPreferences = async (req, res, next) => {
  const { userId } = req.params;
  const { localisationPréférée, unitéDeMesure, notifications } = req.body;
  if (!localisationPréférée || !unitéDeMesure) {
    return res.status(400).json({ message: "Localisation and unité de mesure are required" });
  }

  try {
    const preferences = { localisationPréférée, unitéDeMesure, notifications };
    const result = await db.query("CALL UpdateUserPreferences(?, ?)", [userId, JSON.stringify(preferences)]);
    res.status(200).json({ message: "Preferences updated successfully." });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await db.query("DELETE FROM utilisateur WHERE id = ?", [userId]);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};
