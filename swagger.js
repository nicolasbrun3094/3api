//Documentation Swagger
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'RailRoad API',
      version: '1.0.0',
      description: 'Documentation for RailRoad API',
    },
  },
  apis: ['./routes/*.js'], // Spécifiez le chemin de vos fichiers de route
};

const specs = swaggerJsdoc(options);

module.exports = specs;