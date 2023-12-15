/*
 Logique liée aux trains. Il met en œuvre les opérations CRUD pour les trains, en mettant l'accent sur les fonctionnalités spécifiques à l'administrateur.
*/

// controllers/trainController.js
const Train = require('../models/train');

// Fonction d'aide pour vérifier si l'utilisateur est un administrateur
const isAdmin = (req) => {
    return req.userData && req.userData.role === 'admin';
};

// Répertorier tous les trains avec tri et limite
async function getAllTrains(req, res) {
    try {
        const { sort, limit = 10 } = req.query;
        let query = Train.find();

        // Tri et limite
        if (sort) {
            query = query.sort(sort);
        }
        query = query.limit(Number(limit));

        const trains = await query;
        // Renvoyer la réponse
        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Créer un nouveau train
async function createTrain(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }

    try {
        // Récupérer les données du corps de la requête
        const { name, start_station, end_station, time_of_departure } = req.body;
        // Créer un nouveau train
        const newTrain = new Train({ name, start_station, end_station, time_of_departure });
        // Enregistrer le train dans la base de données
        const train = await newTrain.save();
        // Renvoyer la réponse
        res.status(201).json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtenir un train spécifique par son ID
async function getTrainById(req, res) {
    try {
        // Récupérer l'ID du train depuis les paramètres de la requête
        const { trainId } = req.params;
        // Récupérer le train depuis la base de données
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        // Renvoyer la réponse
        res.json(train);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: error.message });
    }
}


// Mettre à jour un train spécifique
async function updateTrain(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }

    try {
        // Récupérer l'ID du train depuis les paramètres de la requête
        const { trainId } = req.params;
        // Récupérer les données de mise à jour depuis le corps de la requête
        const updateData = req.body;
        // Vérifier si le train existe
        const updatedTrain = await Train.findByIdAndUpdate(trainId, updateData, { new: true });
        if (!updatedTrain) {
            return res.status(404).json({ message: "Train not found" });
        }
        // Renvoyer la réponse
        res.json(updatedTrain);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: "Server error" });
    }
}


// Supprimer un train spécifique
async function deleteTrain(req, res) {
    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }

    try {
        // Récupérer l'ID du train depuis les paramètres de la requête
        const { trainId } = req.params;
        // Vérifier si le train existe
        await Train.findByIdAndDelete(trainId);
        // Renvoyer la réponse
        res.status(200).json({ message: "Train deleted successfully" });
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getAllTrains,
    createTrain,
    getTrainById,
    updateTrain,
    deleteTrain
};

