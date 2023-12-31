// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const mongoose = require('./config/db'); // Utilisation de la configuration de la base de données
const passport = require('./config/passport'); // Configuration de Passport pour l'authentification
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();


//Autorisation CORS
app.use(cors());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Configuration de Passport
app.use(session({
  secret: 'projetapi', // une chaîne secrète pour la session
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware pour analyser les données JSON dans les requêtes
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Routes

const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const stationRoutes = require('./routes/stationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Utilisation des routes définies

app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes);

// Port d'écoute du serveur
const port = process.env.PORT || 3000;

// Exportez votre application
module.exports = app;

// le serveur ne démarre que si l'application est exécutée directement
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });
}
