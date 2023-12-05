/*
Ce fichier contient la configuration pour la base de données (MongoDB). 
Il peut inclure l'URL de la base de données, les paramètres de connexion, etc.
*/

// config/db.js
const mongoose = require('mongoose');

// BD locale Mongo (raildraod)

mongoose
    .connect('mongodb://127.0.0.1:27017/railroad')
    .then(() => {
      console.log('Connexion à MongoDB RaildRoad réussie !');
    })
    .catch((error) => {
      console.error('Connexion à MongoDB RailRoad échouée ! : ', error);
    });

module.exports = mongoose;
