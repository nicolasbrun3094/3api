/*
Définition des routes liées aux réservations de billets. 
Il spécifie les ENDPOINTS  pour les opérations de réservation et de validation des billets.
*/

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../utils/auth');

// Créer une nouvelle réservation
router.post('/', authMiddleware, bookingController.createBooking);

// Obtenir une réservation spécifique par son ID
router.get('/:bookingId', authMiddleware, bookingController.getBooking);

// Mettre à jour une réservation spécifique par son ID
router.put('/:bookingId', authMiddleware, bookingController.updateBooking);

// Supprimer une réservation spécifique par son ID
router.delete('/:bookingId', authMiddleware, bookingController.deleteBooking);

// Valider une réservation spécifique par son ID
router.patch('/:bookingId/validate', authMiddleware, bookingController.validateBooking);

module.exports = router;
