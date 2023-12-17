/*
Logique liée aux réservations de billets. Ce fichier implémente les fonctionnalités de réservation et de validation des billets.
*/

// controllers/bookingController.js
const Booking = require('../models/booking');
const Train = require('../models/train');
const User = require('../models/user');

// Créer une nouvelle réservation
async function createBooking(req, res) {
    try {
        const { userId, trainId, date } = req.body;

        // Vérifiez si le train existe
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }

        // Créez la nouvelle réservation
        const newBooking = new Booking({
            user: userId,
            train: trainId,
            date: date
        });

        // Sauvegardez la réservation
        const booking = await newBooking.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une réservation spécifique
async function getBooking (req, res) {
    try {
        const { bookingId } = req.params;

        // Recherchez la réservation par ID
        const booking = await Booking.findById(bookingId).populate('user').populate('train');
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        // Renvoyer la station
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une réservation
async function updateBooking (req, res) {
    try {
        const { bookingId } = req.params;
        const updateData = req.body;

        // Recherchez la réservation existante
        const booking = await Booking.findById(bookingId);
         //Si la réservation n'existe pas, renvoyez une erreur 404
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Vérifiez si le train existe, si l'ID du train est fourni dans updateData
        if (updateData.trainId) {
            const train = await Train.findById(updateData.trainId);
            if (!train) {
                return res.status(404).json({ message: "Train not found" });
            }
            booking.train = updateData.trainId;
        }

        // Mettre à jour la date si elle est fournie
        if (updateData.date) {
            booking.date = updateData.date;
        }

        // Sauvegardez les modifications
        const updatedBooking = await booking.save();

        res.status(200).json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une réservation
async function deleteBooking(req, res) {
    try {
        const { bookingId } = req.params;

        // Recherchez la réservation par ID
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Supprimer la réservation
        await booking.remove();
        res.status(200).json({ message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Valider une réservation
async function validateBooking (req, res) {
    try {
        const { bookingId } = req.params;

        // Rechercher la réservation par ID
        const booking = await Booking.findById(bookingId).populate('train');
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Vérifier si la date et l'heure de la réservation sont valides
        const currentTime = new Date();
        if (currentTime > booking.train.time_of_departure) {
            return res.status(400).json({ message: "Cannot validate booking. Train has already departed." });
        }

        // Mettre à jour le statut de la réservation (si nécessaire)
        booking.isValidated = true;
        await booking.save();

        res.json({ message: "Booking successfully validated", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking,
    validateBooking
};
