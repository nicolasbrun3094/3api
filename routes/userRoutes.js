/*
Définition des routes liées aux utilisateurs. 
Il spécifie les ENDPOINTS pour les opérations CRUD sur les utilisateurs.
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../utils/auth');
const passport = require('passport');

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Opérations liées aux utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - pseudo
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse e-mail de l'utilisateur
 *         pseudo:
 *           type: string
 *           description: Pseudo de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Rôle de l'utilisateur (user ou admin)
 *         employee:
 *           type: boolean
 *           default: false
 *           description: Indique si l'utilisateur est un employé (true/false)
 *       example:
 *         email: user@example.com
 *         pseudo: user123
 *         password: secret123
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       description: Données du nouvel utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requête invalide ou données utilisateur manquantes
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       description: Identifiants de connexion de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur interne du serveur
 */

// Cette route peut nécessiter une configuration supplémentaire si vous utilisez Passport.js pour l'authentification
router.post('/login', passport.authenticate('local'), (req, res) => {
    // Vous pouvez personnaliser la réponse ici
    res.json({ message: "Logged in successfully", user: req.user });
});

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Obtenir les informations d'un utilisateur spécifique
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Informations utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:userId', authMiddleware, userController.getUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Mettre à jour un utilisateur spécifique
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       description: Nouvelles données de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requête invalide ou données utilisateur manquantes
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:userId', authMiddleware, userController.updateUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Supprimer un utilisateur spécifique
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       403:
 *         description: Accès refusé, autorisation insuffisante
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
