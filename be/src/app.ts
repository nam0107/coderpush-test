import express, { Response, NextFunction } from 'express';
import { EventEmitter } from 'events';
import cors from 'cors';
import compression from 'compression';
import nocache from 'nocache';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import yaml from 'yamljs';
import { Sequelize } from 'sequelize';
import { IController, IRequest } from './common/rest/rest.interface';
import config from './config';
import { Logger } from './logger';
import { connectPostgresDB } from './common/connection/postgres';
import { initModels } from './models';
import { SERVICE_NAME } from './common/constants';

class App extends EventEmitter {
  public app: express.Application;

  private logger: Logger;

  private sequelize: Sequelize;

  constructor(Controllers: IController[]) {
    super();

    this.app = express();
    this.app.use(cors());
    this.logger = Logger.getInstance(module);
    this.sequelize = connectPostgresDB();

    this.initializeSecurity();
    this.initializeSequelize();
    this.initializeMiddlewares();
    this.initializeApiDocs();
    this.initializeControllers(Controllers);
  }

  /**
  * Adds security middleware to app
  */
  private initializeSecurity() {
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.xssFilter());
  }

  /**
   * Adds desired middleware to app
   */
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(nocache());

    // use for computing processing time on response
    this.app.use((request: IRequest, _response: Response, next: NextFunction) => {
      request.start = Date.now();
      next();
    });
  }

  /**
   * Initialise db connection Sequelize ORM
   */
  private initializeSequelize() {
    initModels(this.sequelize);
  }

  /**
   * Adds Swagger (OAPI) generated documentation route
   */
  private initializeApiDocs() {
    const swaggerDoc = yaml.load(`${__dirname}/apiDocs.yaml`);
    this.app.use(`/${SERVICE_NAME}/swagger`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }

  /**
   * Iterates through controllers in services/index and adds their routes/handlers to app
   * @param controllers
   */
  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(config.port, () => this.logger.info(`App listening on the port ${config.port}`));
  }
}

export default App;