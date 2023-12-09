/*
Définition des routes liées aux trains. 
Il spécifie les ENDPOINTS pour les opérations CRUD sur les trains.
*/

const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { authMiddleware } = require('../utils/auth');

// Répertorier tous les trains avec tri et limite
router.get('/', trainController.getAllTrains);

// Créer un nouveau train - accessible seulement par les administrateurs
router.post('/', authMiddleware, trainController.createTrain);

// Obtenir un train spécifique par son ID
router.get('/:trainId', trainController.getTrainById);

// Mettre à jour un train spécifique - accessible seulement par les administrateurs
router.put('/:trainId', authMiddleware, trainController.updateTrain);

// Supprimer un train spécifique - accessible seulement par les administrateurs
router.delete('/:trainId', authMiddleware, trainController.deleteTrain);

module.exports = router;
