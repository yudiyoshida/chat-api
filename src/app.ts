import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import multer from 'multer';
import http from 'http';
import https from 'https';

import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '@config/swagger';
import sslOptions from '@config/ssl';

import routes from './modules/index.routes';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import SocketIO from '@libs/socket/socketio';

class App {
  public app: express.Application;
  public server: http.Server | https.Server;

  constructor() {
    this.app = express();
    this.server = this.createServer(process.env.NODE_ENV as string);
    this.registerMiddlewares();
    this.registerSocketIO();
    this.registerRoutes();
    this.registerGlobalErrorHandlerRoute();
  }

  private createServer(nodeEnv: string) {
    return (nodeEnv === 'production') ? https.createServer(sslOptions, this.app) : http.createServer(this.app);
  }

  private registerMiddlewares() {
    this.app.use('/files', express.static(process.env.STORAGE_LOCAL as string));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(helmet());
  }

  private registerSocketIO() {
    return new SocketIO(this.server);
  }

  private registerRoutes() {
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerOptions), { explorer: true }));
    this.app.use(routes);
  }

  private registerGlobalErrorHandlerRoute() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err instanceof AppException) {
        res.status(err.status).json({ error: err.message });

      } else if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });

      } else {
        res.status(500).json({ error: ErrorMessages.INTERNAL_SERVER_ERROR });

      }
    });
  }
}

export default new App();
