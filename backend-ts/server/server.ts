import * as express from "express";
import * as https from 'https';
import * as fs from 'fs';
import { BaseMiddleware } from "./config/middleware/BaseMiddleware"
import { BaseDatabase } from "./config/database/BaseDatabase"

class Server {
    private PORT: number = 3000;

    private httpsOptions = {
        key: fs.readFileSync('./server/config/certs/key.pem'),
        cert: fs.readFileSync('./server/config/certs/cert.pem')
    }

    private _app: express.Application;

    constructor() {
        this._app = express();

        new BaseMiddleware(this._app);
        new BaseDatabase();

            // -- HTTP -- //
            // this.startNonSecureServer();

            // -- HTTPS -- //
            this.startSecureServer();
    }


    private startNonSecureServer(): void {
        this._app.listen(this.PORT, () => {
            console.log('Express server listening on port ' + this.PORT);
        })
    }

    private startSecureServer(): void {
        https.createServer(this.httpsOptions, this._app).listen(this.PORT, () => {
            console.log('Express secure server listening on port ' + this.PORT);
        });
    }

}

export default new Server();

