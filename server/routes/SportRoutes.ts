import { Router } from "express";
import { SportController } from "../controllers/SportController";
import { AuthorizationService } from "../service/authServices";

export class SportRoutes {

    private _authServices: AuthorizationService;
    private _sportController: SportController;

    constructor() {
        this._authServices = new AuthorizationService();
        this._sportController = new SportController();
    }

    public get routes(): Router {
        let router = Router();

        router.post('/v1/sports', this._authServices.verifyToken, this._sportController.create);

        // app.route('/v1/sports').get(_authServices.verifyToken, this._sportController.getAll)
        // app.route('/v1/sports/:sportId').put(_authServices.verifyToken, this._sportController.update)
        // app.route('/v1/sports/:sportId').get(_authServices.verifyToken, this._sportController.getOne)
        // app.route('/v1/sports/:sportId').delete(_authServices.verifyToken, this._sportController.delete)

        return router
    }
}
