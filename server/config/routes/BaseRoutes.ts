import *  as express from "express";
import { SportRoutes } from "../../routes/SportRoutes"

export class BaseRoutes {

    private _app: express.Application;

    public get routes() {
        this._app = express();
        this._app.use("/", new SportRoutes().routes);
        // this._app.use("/", new _____().routes);
        return this._app;
    }

}
