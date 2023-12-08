const jwt = require("jsonwebtoken");

// Clé secrète JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware d'authentification avec JWT
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw "Authentification échouée : Token manquant";
    }

    // Vérification et décodage du token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.userData = { userId: decodedToken.userId, role: decodedToken.role };

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentification échouée : Token invalide" });
  }
};

module.exports = { authMiddleware, JWT_SECRET };
