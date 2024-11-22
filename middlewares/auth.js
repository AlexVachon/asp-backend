const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ error: "Token requis" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token manquant" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide" });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;