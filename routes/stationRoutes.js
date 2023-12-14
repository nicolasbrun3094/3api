/*
Définition des routes liées aux stations.
Il spécifie les ENDPOINTS pour les opérations CRUD sur les stations.
*/

const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const { authMiddleware } = require('../utils/auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: Opérations liées aux Stations
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
 *         - image
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
 *         image:
 *           type: string
 *           format: binary
 *           description: Image de la station (base64)
 *       example:
 *         name: Gare Centrale
 *         open_hour: "08:00"
 *         close_hour: "22:00"
 *         image: "base64-encoded-image-data"
 */


/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Créer une nouvelle station (Admin uniquement)
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données de la nouvelle station
 *       required: true
 *       content:
 *         multipart/form-data:
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
router.post('/', authMiddleware, upload.single('image'), stationController.createStation);

/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: Récupérer la liste de toutes les stations
 *     tags: [Stations]
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
 * /api/stations/{stationId}:
 *   get:
 *     summary: Récupérer une station par son ID
 *     tags: [Stations]
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
 * /api/stations/{stationId}:
 *   put:
 *     summary: Mettre à jour une station par son ID (Admin uniquement)
 *     tags: [Stations]
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
 * /api/stations/{stationId}:
 *   delete:
 *     summary: Supprimer une station par son ID (Admin uniquement)
 *     tags: [Stations]
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
