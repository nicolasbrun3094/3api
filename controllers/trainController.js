/*
 Logique liée aux trains. Il met en œuvre les opérations CRUD pour les trains, en mettant l'accent sur les fonctionnalités spécifiques à l'administrateur.
*/

// controllers/trainController.js
const Train = require('../models/train');

// Créer un nouveau train
exports.createTrain = async (req, res) => {
    try {
        const { name, start_station, end_station, time_of_departure } = req.body;

        // Création d'une nouvelle instance de Train avec les données reçues
        const newTrain = new Train({ name, start_station, end_station, time_of_departure });

        // Sauvegarde du nouveau train dans la base de données
        const train = await newTrain.save();

        // Envoi de la réponse avec le train créé
        res.status(201).json(train);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Récupérer la liste de tous les trains
exports.getAllTrains = async (req, res) => {
    try {
        // Récupération de tous les trains de la base de données
        const trains = await Train.find();

        // Envoi de la réponse avec la liste des trains
        res.json(trains);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un train spécifique par ID
exports.getTrainById = async (req, res) => {
    try {
        const { trainId } = req.params;

        // Récupération d'un train spécifique par son ID
        const train = await Train.findById(trainId);

        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }

        // Envoi de la réponse avec le train trouvé
        res.json(train);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un train spécifique
exports.updateTrain = async (req, res) => {
    try {
        const { trainId } = req.params;
        const { name, start_station, end_station, time_of_departure } = req.body;

        // Mise à jour du train spécifié avec les nouvelles données
        const updatedTrain = await Train.findByIdAndUpdate(
            trainId, 
            { name, start_station, end_station, time_of_departure },
            { new: true } // L'option { new: true } assure que le train retourné est celui après mise à jour
        );

        if (!updatedTrain) {
            return res.status(404).json({ message: "Train not found" });
        }

        // Envoi de la réponse avec le train mis à jour
        res.json(updatedTrain);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un train spécifique
exports.deleteTrain = async (req, res) => {
    try {
        const { trainId } = req.params;

        // Suppression du train spécifié
        const train = await Train.findByIdAndRemove(trainId);

        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }

        // Envoi de la réponse confirmant la suppression
        res.status(200).json({ message: "Train deleted successfully" });
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTrain,
    getAllTrains,
    getTrainById,
    updateTrain,
    deleteTrain
};
