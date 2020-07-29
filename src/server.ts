import express from 'express';
import { Server } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'


import router from './routes'



export default class App {

    private app: express.Application;

    private constructor() {
        this.app = express();
        this.middlewares(); 
        this.routes();
        this.config();

    }

    private middlewares() {
        console.log("Mid")
    }

    private routes() {
        console.log("routes")
    }

    public run(port: Number, callback?: () => void): Server {
        if (callback) return this.app.listen(port, callback);
        return this.app.listen(port);
    }

    public static newInstance(): App {
        return new App();
    };


    private config() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(cors())

        this.app.use('/', router)
    }

}