# Projet RailRoad API

## Présentation du Projet

RailRoad Ltd a pour objectif de fournir la meilleure expérience pour les trajets locaux et nationaux. Ce projet consiste à créer une API complète en utilisant Node.js et Express.js. L'API permet aux utilisateurs d'accéder à des informations sur les gares et autres données pertinentes. Elle offre également la possibilité de "réserver" un billet d'un arrêt à un autre et propose une interface pour les utilisateurs spécifiques (appelés employés) afin de vérifier la validité du billet.

## Architecture du Projet

Le projet suit une structure modulaire pour faciliter la maintenance et l'extension. Voici un aperçu des principaux dossiers et fichiers :

- **config/** : Contient les fichiers de configuration, notamment `db.js` pour la configuration de la base de données et `passport.js` pour la configuration de Passport.
- **controllers/** : Logique métier de l'application, avec des fichiers pour les utilisateurs, les trains, les gares et les réservations.
- **models/** : Définition des schémas et modèles pour les utilisateurs, les trains, les gares et les réservations.
- **routes/** : Définition des routes API pour les utilisateurs, les trains, les gares et les réservations.
- **tests/** : Fichiers de tests unitaires pour chaque entité.
- **utils/** : Middleware pour la validation des données utilisateur.

- **app.js** : Fichier principal de l'application, configurant le serveur Express, les sessions Passport, et utilisant les routes définies.

## Installation

1. Clonez le dépôt : `git clone https://github.com/nicolasbrun3094/3api`
2. Installez les dépendances : `npm install`
3. Configurez la base de données dans `config/db.js`.
4. Lancez l'application : `npm start`


## Intégration des Modèles dans MongoDB

1- Démarrer le serveur MongoDB : Assurez-vous que le serveur MongoDB est en cours d'exécution sur votre machine.

2- Créer la base de données 'railroad'

3- Créer des collections : Créez des collections pour les utilisateurs, les trains, les gares et les réservations.

## Fonctionnalités Principales

- **Gestion des Utilisateurs :** Opérations CRUD avec des rôles (utilisateur normal, administrateur).
- **Gestion des Trains et des Gares :** Opérations CRUD avec des fonctionnalités spécifiques à l'administrateur.
- **Réservation et Validation des Billets :** Permet aux utilisateurs de réserver des billets et aux employés de valider leur validité.
- **Validation des Données Utilisateur :** Utilisation du middleware (`utils/validation.js`) avec des bibliothèques telles que Joi, Yup ou AJV.
- **Tests Unitaires :** Fournis pour garantir le bon fonctionnement des fonctionnalités.

## Documentation

La documentation de l'API est générée en utilisant Swagger/OpenAPI. Vous pouvez consulter la documentation en accédant à [127.0.0.1]/api-docs après le démarrage de l'application.

## Informations Supplémentaires

- **Base de Données MongoDB :** Mongoose est utilisé pour la gestion de la base de données MongoDB. Assurez-vous que votre base de données est correctement configurée dans `config/db.js`.
- **Authentification avec Passport :** Passport-Local-Mongoose est utilisé pour simplifier l'authentification avec Passport.
