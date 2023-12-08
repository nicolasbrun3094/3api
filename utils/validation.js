/*
Middleware pour la validation des données utilisateur. 
Utilisation de library JOI pou garantir que les entrées utilisateur sont correctes.
*/

// utils/validation.js
const Joi = require('joi');
const User = require('../models/user');

// Middleware pour la validation des données utilisateur
const validateUser = (req, res, next) => {
    // Schéma de validation pour la création ou la mise à jour d'un utilisateur
    const userSchema = Joi.object({
      email: Joi.string().email().required(),
      pseudo: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().valid('user', 'admin').default('user'),
      employee: Joi.boolean().default(false),
    });

  // Valider les données de la requête par rapport au schéma
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;

  next();
};

module.exports = {
  validateUser,
};