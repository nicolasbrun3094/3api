/*
Définition des routes liées aux utilisateurs. 
Il spécifie les ENDPOINTS pour les opérations CRUD sur les utilisateurs.
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../utils/auth');
const passport = require('passport');

// Inscription d'un nouvel utilisateur
router.post('/register', userController.registerUser);

// Connexion d'un utilisateur
// Cette route peut nécessiter une configuration supplémentaire si vous utilisez Passport.js pour l'authentification
router.post('/login', passport.authenticate('local'), (req, res) => {
    // Vous pouvez personnaliser la réponse ici
    res.json({ message: "Logged in successfully", user: req.user });
});

// Obtenir les informations d'un utilisateur spécifique
router.get('/:userId', authMiddleware, userController.getUser);

// Mettre à jour un utilisateur spécifique
router.put('/:userId', authMiddleware, userController.updateUser);

// Supprimer un utilisateur spécifique
router.delete('/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
