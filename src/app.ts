import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.setupRoutes();
    this.connectToDatabase();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(mongoSanitize());
    this.app.use(helmet());
    this.app.use(hpp());
  }
  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'welcome to our glamoura server' });
    });
  }
  private connectToDatabase(): void {
    const uri = process.env.MONGO_URI as string;
    mongoose
      .connect(uri)
      .then(() => {
        const port = process.env.port || 4000;
        this.app.listen(port, () => {
          console.log(`Our server is running on port : ${port}`);
        });
      })
      .catch((error) => {
        console.log(`MongoDB connection error : ${error}`);
      });
  }
}

dotenv.config();
new App();
