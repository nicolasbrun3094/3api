/*
: Ce fichier contient la logique liée aux utilisateurs. Il implémente les opérations CRUD (Create, Read, Update, Delete) pour les utilisateurs, ainsi que toute autre logique liée à la gestion des utilisateurs.
*/

// controllers/userController.js
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// Inscrire un nouvel utilisateur
async function registerUser(req, res) {
    try {
        // Récupérer les données du corps de la requête
        const { email, pseudo, password, role } = req.body;
        // Créer un nouvel utilisateur
        const newUser = new User({ email, pseudo, role });

        // Enregistrer l'utilisateur dans la base de données
        User.register(newUser, password, (err, user) => {
            if (err) {
                // Erreur de validation
                return res.status(500).json({ message: err.message });
            }
            req.login(user, (err) => {
                if (err) {
                    // Erreur de validation
                    return res.status(500).json({ message: err.message });
                }
                return res.status(201).json(user);
            });
        });
    } catch (error) {
        // Erreur de validation
        res.status(500).json({ message: error.message });
    }
}

// Connect utilisateur
async function loginUser(req, res) {
    try {
        // Récupérer les données du corps de la requête
      const { pseudo, password } = req.body;
  
      // authenticate fournie par passport-local-mongoose
      User.authenticate()(pseudo, password, (err, user, info) => {
        if (err) {
            // Erreur de validation
          return res.status(500).json({ message: 'Erreur interne du serveur' });
        }
        if (!user) {
            // Erreur de validation
          return res.status(401).json({ message: 'Identifiants invalides' });
        }
        
        // Générer un token JWT
        const token = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Durée de validité du token
        );
  
        // Répondre avec le token
        res.json({ message: 'Logged in successfully', token });
      });
    } catch (error) {
        // Erreur de validation
      console.error('Erreur lors de l\'authentification :', error);
      res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
  }
  

// Obtenir les informations d'un utilisateur
async function getUser (req, res){
    try {
        // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
        const { userId } = req.params;
        // Récupérer l'utilisateur depuis la base de données
        const requestingUser = req.user;

        // Recherchez l'utilisateur par ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifiez si l'utilisateur est autorisé à accéder à l'utilisateur
        if (requestingUser && (requestingUser._id.equals(userId) || requestingUser.role === 'admin')) {
            res.json(user);
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un utilisateur
async function updateUser (req, res){
    try {
        // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
        const { userId } = req.params;
        // Récupérer les données de mise à jour depuis le corps de la requête
        const requestingUser = req.user;
        // Vérifiez si l'utilisateur existe
        const updateData = req.body;

        // Recherchez l'utilisateur par ID
        
        // Vérifiez si l'utilisateur existe
        if (requestingUser && (requestingUser._id.equals(userId) || requestingUser.role === 'admin')) {
            // Mettre à jour l'utilisateur
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
            // Mise à jour de l'utilisateur
            res.json(updatedUser);
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un utilisateur
async function deleteUser (req, res){
    try {
        // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
        const { userId } = req.params;
        // Récupérer les données de mise à jour depuis le corps de la requête
        const requestingUser = req.user;

        // Recherchez l'utilisateur par ID
        if (requestingUser && (requestingUser._id.equals(userId) || requestingUser.role === 'admin')) {
            // Supprimer l'utilisateur
            await User.findByIdAndDelete(userId);
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
};