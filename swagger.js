
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express.js application',
    },
  },
  // Paths to the API docs, including the routes that you want to document
//   apis: ['./routes/index.js'], // Replace with the actual path to your routes file
apis: ['./routes/authRoutes.js', './routes/adminRoutes.js', './routes/studentRoutes.js', './routes/hrRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;



