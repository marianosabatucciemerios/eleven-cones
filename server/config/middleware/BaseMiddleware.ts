import * as express from "express"
import * as bodyParser from "body-parser";
import { BaseRoutes } from "../routes/BaseRoutes"

export class BaseMiddleware {

    private _app: express.Application;

    constructor (app: express.Application) {
        this._app = app;
        this.configuration();
    }

    public configuration() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));

        this._app.use(new BaseRoutes().routes);
    }

}
