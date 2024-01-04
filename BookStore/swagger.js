const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-books API",
      version: "1.0"
    },
    servers: [
      {
        url: "https://bookstore-ac0i.onrender.com/" // Cambia esta URL por la URL de producción cuando esté en producción
      }
    ]
  },
  apis: [`${path.join(__dirname, './src/routes/*.js')}`]
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
