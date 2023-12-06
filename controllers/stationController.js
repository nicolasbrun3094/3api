/*
 Logique liée aux gares. Similaire au trainController, il met en œuvre les opérations CRUD pour les gares, en accordant une attention particulière aux fonctionnalités administratives.
*/

// controllers/stationController.js
const Station = require('../models/station');

// Créer une nouvelle station
exports.createStation = async (req, res) => {
    try {
        // Les données de la station doivent être dans req.body
        const { name, open_hour, close_hour } = req.body;

        // Création d'une nouvelle instance de Station avec les données reçues
        const newStation = new Station({ name, open_hour, close_hour });

        // Sauvegarde de la nouvelle station dans la base de données
        const station = await newStation.save();

        // Envoi de la réponse avec la station créée
        res.status(201).json(station);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Récupérer la liste de toutes les stations
exports.getAllStations = async (req, res) => {
    try {
        // Récupération de toutes les stations de la base de données
        const stations = await Station.find();

        // Envoi de la réponse avec la liste des stations
        res.json(stations);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une station spécifique par ID
exports.getStationById = async (req, res) => {
    try {
        const { stationId } = req.params;

        // Récupération d'une station spécifique par son ID
        const station = await Station.findById(stationId);

        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }

        // Envoi de la réponse avec la station trouvée
        res.json(station);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une station spécifique
exports.updateStation = async (req, res) => {
    try {
        const { stationId } = req.params;
        const { name, open_hour, close_hour } = req.body;

        // Mise à jour de la station spécifiée avec les nouvelles données
        const updatedStation = await Station.findByIdAndUpdate(
            stationId, 
            { name, open_hour, close_hour },
            { new: true } // L'option { new: true } assure que la station retournée est celle après mise à jour
        );

        if (!updatedStation) {
            return res.status(404).json({ message: "Station not found" });
        }

        // Envoi de la réponse avec la station mise à jour
        res.json(updatedStation);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une station spécifique
exports.deleteStation = async (req, res) => {
    try {
        const { stationId } = req.params;

        // Suppression de la station spécifiée
        const station = await Station.findByIdAndRemove(stationId);

        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }

        // Envoi de la réponse confirmant la suppression
        res.status(200).json({ message: "Station deleted successfully" });
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createStation,
    getAllStations,
    getStationById,
    updateStation,
    deleteStation
    // Exporter d'autres fonctions ici si vous en ajoutez
};
