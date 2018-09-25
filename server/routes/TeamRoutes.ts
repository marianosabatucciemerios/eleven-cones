import { Router } from "express";
import { TeamController } from "../controllers/TeamController";
import { AuthorizationService } from "../services/AuthServices";

export class TeamRoutes {

    private _authServices: AuthorizationService;
    private _teamController: TeamController;

    constructor() {
        this._authServices = new AuthorizationService();
        this._teamController = new TeamController();
    }

    public get routes(): Router {
        let router = Router();

        router.post('/v1/teams', this._authServices.verifyToken, this._teamController.create);
        router.get('/v1/teams', this._authServices.verifyToken, this._teamController.findAll)
        router.patch('/v1/teams/:teamId', this._authServices.verifyToken, this._teamController.update)
        router.get('/v1/teams/:teamId', this._authServices.verifyToken, this._teamController.findById)
        router.delete('/v1/teams/:teamId', this._authServices.verifyToken, this._teamController.delete)
        router.get('/v1/teams/availabilty/:teamCode', this._authServices.verifyToken, this._teamController.findByCode)
        router.patch('/v1/teams/join/:teamId', this._authServices.verifyToken, this._teamController.join)

        return router;
    }
}