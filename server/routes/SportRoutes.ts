import { Router } from "express";
import { SportController } from "../controllers/SportController";
import { AuthorizationService } from "../services/authServices";

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
        router.get('/v1/sports', this._authServices.verifyToken, this._sportController.findAll)
        router.put('/v1/sports/:sportId', this._authServices.verifyToken, this._sportController.update)
        router.get('/v1/sports/:sportId', this._authServices.verifyToken, this._sportController.findById)
        router.delete('/v1/sports/:sportId', this._authServices.verifyToken, this._sportController.delete)

        return router;
    }
}
