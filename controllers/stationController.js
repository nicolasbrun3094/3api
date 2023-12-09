/*
 Logique liée aux gares. Similaire au trainController, il met en œuvre les opérations CRUD pour les gares, en accordant une attention particulière aux fonctionnalités administratives.
*/

// controllers/stationController.js
const Station = require('../models/station');
const Train = require('../models/train');

// Fonction d'aide pour vérifier si l'utilisateur est un administrateur
const isAdmin = (req) => {
    return req.userData && req.userData.role === 'admin';
};

// Créer une nouvelle station
exports.createStation = async (req, res) => {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }
    try {
        const { name, open_hour, close_hour } = req.body;
        const newStation = new Station({ name, open_hour, close_hour });
        const station = await newStation.save();
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer la liste de toutes les stations avec tri par nom
exports.getAllStations = async (req, res) => {
    try {
        const sortField = req.query.sort || 'name'; // Tri par nom par défaut
        const stations = await Station.find().sort(sortField);
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une station spécifique par ID
exports.getStationById = async (req, res) => {
    try {
        const { stationId } = req.params;
        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }
        res.json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une station spécifique
exports.updateStation = async (req, res) => {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }
    try {
        const { stationId } = req.params;
        const { name, open_hour, close_hour } = req.body;
        const updatedStation = await Station.findByIdAndUpdate(stationId, { name, open_hour, close_hour }, { new: true });
        if (!updatedStation) {
            return res.status(404).json({ message: "Station not found" });
        }
        res.json(updatedStation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une station spécifique
exports.deleteStation = async (req, res) => {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }
    try {
        const { stationId } = req.params;
        // Vérifiez d'abord si des trains sont associés à cette station
        const relatedTrains = await Train.find({ $or: [{ start_station: stationId }, { end_station: stationId }] });
        if (relatedTrains.length > 0) {
            // Empêchez la suppression si la station est utilisée par des trains
            return res.status(400).json({
                message: "Cannot delete station because it is associated with one or more trains."
            });
        }
        await Station.findByIdAndDelete(stationId);
        res.status(200).json({ message: "Station deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createStation,
    getAllStations,
    getStationById,
    updateStation,
    deleteStation
};
