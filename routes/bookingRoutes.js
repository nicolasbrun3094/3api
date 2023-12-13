/*
Définition des routes liées aux réservations de billets. 
Il spécifie les ENDPOINTS  pour les opérations de réservation et de validation des billets.
*/

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../utils/auth');

/**
 * @swagger
 * tags:
 *   name: Réservations
 *   description: Opérations liées aux réservations de billets
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - user
 *         - train
 *       properties:
 *         user:
 *           type: string
 *           description: ID de l'utilisateur effectuant la réservation
 *         train:
 *           type: string
 *           description: ID du train réservé
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date et heure de la réservation (générée automatiquement)
 *       example:
 *         user: 607c7f9b7fb8e714f8b86487
 *         train: 607c7f9b7fb8e714f8b86488
 *         date: "2023-12-10T08:00:00.000Z"
 */


/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données de réservation à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Requête invalide ou données de réservation manquantes
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', authMiddleware, bookingController.createBooking);

/**
 * @swagger
 * /bookings/{bookingId}:
 *   get:
 *     summary: Obtenir une réservation par son ID
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la réservation à obtenir
 *     responses:
 *       200:
 *         description: Réservation récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:bookingId', authMiddleware, bookingController.getBooking);

/**
 * @swagger
 * /bookings/{bookingId}:
 *   put:
 *     summary: Mettre à jour une réservation par son ID
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la réservation à mettre à jour
 *     requestBody:
 *       description: Nouvelles données de réservation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Réservation mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:bookingId', authMiddleware, bookingController.updateBooking);

/**
 * @swagger
 * /bookings/{bookingId}:
 *   delete:
 *     summary: Supprimer une réservation par son ID
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la réservation à supprimer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:bookingId', authMiddleware, bookingController.deleteBooking);

/**
 * @swagger
 * /bookings/{bookingId}/validate:
 *   patch:
 *     summary: Valider une réservation par son ID
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la réservation à valider
 *     responses:
 *       200:
 *         description: Réservation validée avec succès
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.patch('/:bookingId/validate', authMiddleware, bookingController.validateBooking);

module.exports = router;
