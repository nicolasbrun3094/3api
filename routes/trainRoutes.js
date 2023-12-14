/*
Définition des routes liées aux trains. 
Il spécifie les ENDPOINTS pour les opérations CRUD sur les trains.
*/

const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { authMiddleware } = require('../utils/auth');

/**
 * @swagger
 * tags:
 *   name: Trains
 *   description: Opérations liées aux trains
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Train:
 *       type: object
 *       required:
 *         - name
 *         - start_station
 *         - end_station
 *         - time_of_departure
 *       properties:
 *         name:
 *           type: string
 *           description: Nom du train
 *         start_station:
 *           type: string
 *           description: Gare de départ
 *         end_station:
 *           type: string
 *           description: Gare d'arrivée
 *         time_of_departure:
 *           type: string
 *           format: date-time
 *           description: Heure de départ du train
 *       example:
 *         name: Train Express
 *         start_station: Gare A
 *         end_station: Gare B
 *         time_of_departure: "2023-12-01T08:00:00Z"
 */


/**
 * @swagger
 * /api/trains:
 *   get:
 *     summary: Répertorier tous les trains avec tri et limite
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: Liste des trains récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', trainController.getAllTrains);

/**
 * @swagger
 * /api/trains:
 *   post:
 *     summary: Créer un nouveau train (Admin uniquement)
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données du nouveau train
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       201:
 *         description: Train créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       400:
 *         description: Requête invalide ou données du train manquantes
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', authMiddleware, trainController.createTrain);

/**
 * @swagger
 * /api/trains/{trainId}:
 *   get:
 *     summary: Obtenir un train spécifique par son ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: trainId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du train à récupérer
 *     responses:
 *       200:
 *         description: Train récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:trainId', trainController.getTrainById);

/**
 * @swagger
 * /api/trains/{trainId}:
 *   put:
 *     summary: Mettre à jour un train spécifique par son ID (Admin uniquement)
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trainId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du train à mettre à jour
 *     requestBody:
 *       description: Nouvelles données du train
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       200:
 *         description: Train mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       400:
 *         description: Requête invalide ou données du train manquantes
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       404:
 *         description: Train non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:trainId', authMiddleware, trainController.updateTrain);

/**
 * @swagger
 * /api/trains/{trainId}:
 *   delete:
 *     summary: Supprimer un train spécifique par son ID (Admin uniquement)
 *     tags: [Trains]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trainId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du train à supprimer
 *     responses:
 *       200:
 *         description: Train supprimé avec succès
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       404:
 *         description: Train non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:trainId', authMiddleware, trainController.deleteTrain);

module.exports = router;
