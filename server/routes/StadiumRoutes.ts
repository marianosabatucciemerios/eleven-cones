import { Router } from "express";
import { StadiumController } from "../controllers/StadiumController";
import { AuthorizationService } from "../services/AuthServices";

export class StadiumRoutes {

    private _authServices: AuthorizationService;
    private _stadiumController: StadiumController;

    constructor() {
        this._authServices = new AuthorizationService();
        this._stadiumController = new StadiumController();
    }

    public get routes(): Router {
        let router = Router();

        router.post('/v1/stadiums', this._authServices.verifyToken, this._stadiumController.create);
        router.get('/v1/stadiums', this._authServices.verifyToken, this._stadiumController.findAll)
        router.patch('/v1/stadiums/:stadiumId', this._authServices.verifyToken, this._stadiumController.update)
        router.get('/v1/stadiums/:stadiumId', this._authServices.verifyToken, this._stadiumController.findById)
        router.delete('/v1/stadiums/:stadiumId', this._authServices.verifyToken, this._stadiumController.delete)

        return router;
    }
}