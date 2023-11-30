/*
 Définition du schéma et du modèle pour les trains. 
 Il spécifie les champs tels que id, nom, gare de départ, gare d'arrivée, heure de départ, etc.
*/

// models/train.js
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  start_station: {
    type: String,
    required: true,
  },
  end_station: {
    type: String,
    required: true,
  },
  time_of_departure: {
    type: Date,
    required: true,
  },
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
