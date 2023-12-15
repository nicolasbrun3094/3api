/*
Définition du schéma de la base de données et du modèle pour les utilisateurs. 
Il spécifie les champs nécessaires comme id, email, pseudo, mot de passe, etc.
*/


// models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'pseudo' });

const User = mongoose.model('User', userSchema);

module.exports = User;