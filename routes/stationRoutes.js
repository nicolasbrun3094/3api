/*
Définition des routes liées aux gares.
Il spécifie les ENDPOINTS pour les opérations CRUD sur les gares.
*/

const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const { authMiddleware } = require('../utils/auth');

// Créer une nouvelle station - accessible seulement par les administrateurs
router.post('/', authMiddleware, stationController.createStation);

// Récupérer la liste de toutes les stations - accessible par tous les utilisateurs
router.get('/', stationController.getAllStations);

// Récupérer une station spécifique par son ID - accessible par tous les utilisateurs
router.get('/:stationId', stationController.getStationById);

// Mettre à jour une station spécifique - accessible seulement par les administrateurs
router.put('/:stationId', authMiddleware, stationController.updateStation);

// Supprimer une station spécifique - accessible seulement par les administrateurs
router.delete('/:stationId', authMiddleware, stationController.deleteStation);

module.exports = router;
