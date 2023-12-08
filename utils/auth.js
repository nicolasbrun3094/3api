const jwt = require("jsonwebtoken");

// Middleware d'authentification avec JWT
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw "Authentification échouée : Token manquant";
    }

    // Vérification et décodage du token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Assurez-vous de définir cette variable d'environnement

    req.userData = { userId: decodedToken.userId, role: decodedToken.role };

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentification échouée : Token invalide" });
  }
};