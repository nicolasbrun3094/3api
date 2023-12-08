/*
Ce fichier contient la configuration pour la base de données (MongoDB). 
Il peut inclure l'URL de la base de données, les paramètres de connexion, etc.
*/


// config/db.js
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// BD locale Mongo (raildraod)
mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log('Connexion à MongoDB RaildRoad réussie !');
    })
    .catch((error) => {
      console.error('Connexion à MongoDB RailRoad échouée ! : ', error);
    });

module.exports = mongoose;
