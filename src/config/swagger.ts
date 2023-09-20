export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat API REST API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://127.0.0.1:3000',
        description: 'Development environment',
      },
      {
        url: `${process.env.URL}:${process.env.PORT}`,
        description: 'Testing environment',
      },
    ],
  },
  apis: ['docs/**/*.yml'],
};
