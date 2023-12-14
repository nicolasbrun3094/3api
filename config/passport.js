/* Fichier de configuration pour Passport.js, qui est utilisé pour gérer l'authentification (Passport-local-mongoose) */ 

// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = passport;