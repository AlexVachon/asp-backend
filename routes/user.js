const express = require("express");
const router = express.Router();
const UserService = require("../services/user");
const authenticateToken = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const existingUser = await UserService.userExists(email);

    if (existingUser)
      return res.status(400).json({ message: "Cet email est déjà utilisé." });

    await UserService.registerUser(first_name, last_name, email, password);

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token } = await UserService.loginUser(email, password);

    res.status(200).json({
      message: "Connexion réussie.",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Erreur lors de la connexion.",
    });
  }
});

router.get('/me', authenticateToken, async(req, res) => {
  
})