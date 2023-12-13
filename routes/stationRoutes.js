/*
Définition des routes liées aux gares.
Il spécifie les ENDPOINTS pour les opérations CRUD sur les gares.
*/

const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const { authMiddleware } = require('../utils/auth');

/**
 * @swagger
 * tags:
 *   name: Station
 *   description: Opérations liées aux gares
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Station:
 *       type: object
 *       required:
 *         - name
 *         - open_hour
 *         - close_hour
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de la station
 *         open_hour:
 *           type: string
 *           description: Heure d'ouverture de la station
 *         close_hour:
 *           type: string
 *           description: Heure de fermeture de la station
 *       example:
 *         name: Gare Centrale
 *         open_hour: "08:00"
 *         close_hour: "22:00"
 */


/**
 * @swagger
 * /stations:
 *   post:
 *     summary: Créer une nouvelle station (Admin uniquement)
 *     tags: [Gares]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données de la nouvelle station
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       201:
 *         description: Station créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       400:
 *         description: Requête invalide ou données de la station manquantes
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', authMiddleware, stationController.createStation);

/**
 * @swagger
 * /stations:
 *   get:
 *     summary: Récupérer la liste de toutes les stations
 *     tags: [Gares]
 *     responses:
 *       200:
 *         description: Liste des stations récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/', stationController.getAllStations);

/**
 * @swagger
 * /stations/{stationId}:
 *   get:
 *     summary: Récupérer une station par son ID
 *     tags: [Gares]
 *     parameters:
 *       - in: path
 *         name: stationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la station à récupérer
 *     responses:
 *       200:
 *         description: Station récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:stationId', stationController.getStationById);

/**
 * @swagger
 * /stations/{stationId}:
 *   put:
 *     summary: Mettre à jour une station par son ID (Admin uniquement)
 *     tags: [Gares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la station à mettre à jour
 *     requestBody:
 *       description: Nouvelles données de la station
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       200:
 *         description: Station mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       400:
 *         description: Requête invalide ou données de la station manquantes
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       404:
 *         description: Station non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:stationId', authMiddleware, stationController.updateStation);


/**
 * @swagger
 * /stations/{stationId}:
 *   delete:
 *     summary: Supprimer une station par son ID (Admin uniquement)
 *     tags: [Gares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la station à supprimer
 *     responses:
 *       200:
 *         description: Station supprimée avec succès
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       404:
 *         description: Station non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:stationId', authMiddleware, stationController.deleteStation);

module.exports = router;
