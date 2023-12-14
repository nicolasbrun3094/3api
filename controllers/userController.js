/*
: Ce fichier contient la logique liée aux utilisateurs. Il implémente les opérations CRUD (Create, Read, Update, Delete) pour les utilisateurs, ainsi que toute autre logique liée à la gestion des utilisateurs.
*/

// controllers/userController.js
const User = require('../models/user');
const passport = require('passport');

// Inscrire un nouvel utilisateur
async function registerUser (req, res) {
    try {
        const { email, pseudo, password } = req.body;
        const newUser = new User({ email, pseudo });

        User.register(newUser, password, (err, user) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                return res.status(201).json(user);
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir les informations d'un utilisateur
async function getUser (req, res){
    try {
        const { userId } = req.params;
        const requestingUser = req.user;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

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
        const { userId } = req.params;
        const requestingUser = req.user;
        const updateData = req.body;

        if (requestingUser && (requestingUser._id.equals(userId) || requestingUser.role === 'admin')) {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
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
        const { userId } = req.params;
        const requestingUser = req.user;

        if (requestingUser && (requestingUser._id.equals(userId) || requestingUser.role === 'admin')) {
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
    getUser,
    updateUser,
    deleteUser
};