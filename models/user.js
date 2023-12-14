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
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  employee: {
    type: Boolean,
    default: false,
  },
});

// Méthode pour vérifier si un utilisateur peut accéder aux informations d'un autre utilisateur
userSchema.methods.canAccessUser = function (targetUserId) {
  if (this.role === 'admin' || this._id.equals(targetUserId) || this.employee) {
    return true;
  }
  return false;
};

//"pseudo" == d'utilisateur pour Passport.js
userSchema.plugin(passportLocalMongoose, { usernameField: 'pseudo' })

const User = mongoose.model('User', userSchema);

module.exports = User;