/*
Ce fichier contient la configuration pour la base de données (MongoDB). 
Il peut inclure l'URL de la base de données, les paramètres de connexion, etc.
*/

// config/db.js
const mongoose = require('mongoose');

// BD locale Mongo (raildraod)
const databaseUrl = 'mongodb://localhost/railroad';

mongoose
    .connect(databaseUrl)
    .then(() => {
      console.log('Connexion à MongoDB RaildRoad réussie !');
    })
    .catch((error) => {
      console.error('Connexion à MongoDB RailRoad échouée ! : ', error);
    });

module.exports = mongoose;
