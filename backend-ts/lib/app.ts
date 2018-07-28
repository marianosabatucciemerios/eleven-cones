import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/crmRoutes";

class App {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/eleven-cones';
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;