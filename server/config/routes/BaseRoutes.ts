import *  as express from "express";
import { AuthRoutes } from "../../routes/authRoutes";
import { UserRoutes } from "../../routes/UserRoutes";
import { TeamRoutes } from "../../routes/TeamRoutes";
import { TournamentRoutes } from "../../routes/TournamentRoutes";
import { StadiumRoutes } from "../../routes/StadiumRoutes";
import { ScheduleRoutes } from "../../routes/ScheduleRoutes";

export class BaseRoutes {

    private _app: express.Application;

    public get routes() {
        this._app = express();
        this._app.use("/", new AuthRoutes().routes);
        this._app.use("/", new UserRoutes().routes);
        this._app.use("/", new TeamRoutes().routes);
        this._app.use("/", new TournamentRoutes().routes);
        this._app.use("/", new StadiumRoutes().routes);
        this._app.use("/", new ScheduleRoutes().routes);
        // this._app.use("/", new _____().routes);
        return this._app;
    }

}
