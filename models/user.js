/*
Définition du schéma de la base de données et du modèle pour les utilisateurs. 
Il spécifie les champs nécessaires comme id, email, pseudo, mot de passe, etc.
*/


// models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt'); // Ajouter cette ligne pour utiliser bcrypt

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pseudo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  employee: {
    type: Boolean,
    default: true,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'pseudo' });

// Ajouter une méthode pour vérifier le mot de passe
userSchema.methods.verifyPassword = async function (password) {
  try {
    // Comparer le mot de passe fourni avec le mot de passe stocké
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;