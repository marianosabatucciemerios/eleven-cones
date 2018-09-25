import *  as express from "express";
import { UserRoutes } from "../../routes/USerRoutes"
import { AuthRoutes } from "../../routes/authRoutes";

export class BaseRoutes {

    private _app: express.Application;

    public get routes() {
        this._app = express();
        this._app.use("/", new AuthRoutes().routes);
        this._app.use("/", new UserRoutes().routes);
        // this._app.use("/", new _____().routes);
        return this._app;
    }

}
