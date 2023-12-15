/*
 Logique liée aux gares. Similaire au trainController, il met en œuvre les opérations CRUD pour les gares, en accordant une attention particulière aux fonctionnalités administratives.
*/

// controllers/stationController.js
const Station = require('../models/station');
const Train = require('../models/train');
const multer = require('multer');

//Image Upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fonction d'aide pour vérifier si l'utilisateur est un administrateur
const isAdmin = (req) => {
    return req.userData && req.userData.role === 'admin';
};

// Créer une nouvelle station
async function createStation(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }
    try {
        const { name, open_hour, close_hour } = req.body;

        // Récupérer l'image depuis le champ 'image' de la requête
        const image = req.file.buffer.toString('base64');

        // Création de la nouvelle station
        const newStation = new Station({ name, open_hour, close_hour, image });

        // Enregistrer la nouvelle station dans la base de données
        const station = await newStation.save();
        res.status(201).json(station);
    } catch (error) {
        // Erreur de validation
        res.status(500).json({ message: error.message });
    }
}

// Récupérer la liste de toutes les stations avec tri par nom
async function getAllStations(req, res) {
    try {
        const sortField = req.query.sort || 'name'; // Tri par nom par défaut
        const stations = await Station.find().sort(sortField);
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Récupérer une station spécifique par ID
async function getStationById(req, res) {
    try {
        // Récupérer l'ID de la station depuis les paramètres de la requête
        const { stationId } = req.params;
        // Récupérer la station depuis la base de données
        const station = await Station.findById(stationId);
        // Vérifier si la station existe
        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }
        // Renvoyer la station
        res.json(station);
        // Gérer les erreurs
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Mettre à jour une station spécifique
async function updateStation(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }
    try {
        const { stationId } = req.params;
        const { name, open_hour, close_hour } = req.body;

        // Récupérer la nouvelle image depuis le champ 'image' de la requête
        const image = req.file.buffer.toString('base64');

        // Vérifier si la station existe
        const updatedStation = await Station.findByIdAndUpdate(stationId, { name, open_hour, close_hour, image }, { new: true });
        if (!updatedStation) {
            return res.status(404).json({ message: "Station not found" });
        }
        // Renvoyer la station mise à jour
        res.json(updatedStation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Supprimer une station spécifique
async function deleteStation(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action." });
    }
    try {
        const { stationId } = req.params;
        // Vérifier si la station existe
        const relatedTrains = await Train.find({ $or: [{ start_station: stationId }, { end_station: stationId }] });
        // Vérifier si la station est associée à un ou plusieurs trains
        if (relatedTrains.length > 0) {
            return res.status(400).json({
                message: "Cannot delete station because it is associated with one or more trains."
            });
        }
        // Supprimer la station
        await Station.findByIdAndDelete(stationId);
        // Renvoyer un message de succès
        res.status(200).json({ message: "Station deleted successfully" });
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createStation,
    getAllStations,
    getStationById,
    updateStation,
    deleteStation
};
