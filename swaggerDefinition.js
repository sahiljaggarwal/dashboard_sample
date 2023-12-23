const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express.js application',
    },
    // Add any other Swagger definition details as needed
    components: {
      schemas: {
        UserProfile: {
          type: 'object',
          properties: {
            // Define the properties of the UserProfile schema here
          },
        },
      },
      responses: {
        Unauthorized: {
          description: 'Unauthorized',
        },
        NotFound: {
          description: 'Not Found',
        },
      },
    },
  };
  
  module.exports = swaggerDefinition;
  