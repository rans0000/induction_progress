import ErrorMiddleWare from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from "express";
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

class App{
    public express: Application;
    public port:number;

    constructor(controllers:Controller[],port:number){
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware():void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:true}));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]):void {
        controllers.forEach((controller:Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling():void{
        this.express.use(ErrorMiddleWare);
    }

    private initializeDatabaseConnection():void {
        const {MONGO_USER, MONGO_PASSWORD,MONGO_PATH, MONGO_DB_NAME}= process.env;
        const uri = `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASSWORD!)}${MONGO_PATH}`;
        mongoose.connect(uri, {dbName: MONGO_DB_NAME});
    }

    public listen():void{
        this.express.listen(this.port, ()=>{
            console.log(`App listening from ${this.port}`);
            
        });
    }
}

export default App;