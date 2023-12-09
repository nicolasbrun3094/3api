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
exports.getAllTrains = async (req, res) => {
    try {
        const { sort, limit = 10 } = req.query;
        let query = Train.find();

        // Tri et limite
        if (sort) {
            query = query.sort(sort);
        }
        query = query.limit(Number(limit));

        const trains = await query;
        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouveau train
exports.createTrain = async (req, res) => {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }

    try {
        const { name, start_station, end_station, time_of_departure } = req.body;
        const newTrain = new Train({ name, start_station, end_station, time_of_departure });
        const train = await newTrain.save();
        res.status(201).json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir un train spécifique par son ID
exports.getTrainById = async (req, res) => {
    try {
        const { trainId } = req.params;
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        res.json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un train spécifique
exports.updateTrain = async (req, res) => {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }

    try {
        const { trainId } = req.params;
        const updateData = req.body;
        const updatedTrain = await Train.findByIdAndUpdate(trainId, updateData, { new: true });
        if (!updatedTrain) {
            return res.status(404).json({ message: "Train not found" });
        }
        res.json(updatedTrain);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Supprimer un train spécifique
exports.deleteTrain = async (req, res) => {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }

    try {
        const { trainId } = req.params;
        await Train.findByIdAndDelete(trainId);
        res.status(200).json({ message: "Train deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllTrains,
    createTrain,
    getTrainById,
    updateTrain,
    deleteTrain
};

