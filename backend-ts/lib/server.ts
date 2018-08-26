import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as https from 'https';
import * as fs from 'fs';
// import { Routes } from "./routes/crmRoutes";
// import { UserRoutes } from "./routes/userRoutes";
// import { AuthRoutes } from "./routes/authRoutes";
import { SportRoutes } from "./routes/SportRoutes";

class Server {
    private PORT: number = 3000;

    private httpsOptions = {
        key: fs.readFileSync('./config/key.pem'),
        cert: fs.readFileSync('./config/cert.pem')
    }

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/eleven-cones';
    // public routePrv: Routes = new Routes();
    // public userRoute: UserRoutes = new UserRoutes();
    // public authRoutes: AuthRoutes = new AuthRoutes();
    private sportRoutes: SportRoutes = new SportRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.setupMongo();
        this.setupRoutes();

        // -- HTTP -- //
        // this.startNonSecureServer();

        // -- HTTPS -- //
        this.startSecureServer();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setupMongo(): void {
        // mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

    private setupRoutes() {
        // this.routePrv.routes(this.app);
        // this.userRoute.userRoutes(this.app);
        // this.authRoutes.authRoutes(this.app);
        this.sportRoutes.registerRoutes(this.app);
    }

    private startNonSecureServer(): void {
        this.app.listen(this.PORT, () => {
            console.log('Express server listening on port ' + this.PORT);
        })
    }

    private startSecureServer(): void {
        https.createServer(this.httpsOptions, this.app).listen(this.PORT, () => {
            console.log('Express secure server listening on port ' + this.PORT);
        });
    }

}

export default new Server();

