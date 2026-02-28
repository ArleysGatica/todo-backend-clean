import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

export const setupSwagger = (app: Express) => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Clean Architecture API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: [path.join(__dirname, './modules/**/*.ts')],
  };

  const specs = swaggerJsdoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
