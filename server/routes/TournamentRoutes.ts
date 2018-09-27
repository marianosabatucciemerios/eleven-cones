import { Router } from "express";
import { TournamentController } from "../controllers/TournamentController";
import { AuthorizationService } from "../services/AuthServices";

export class TournamentRoutes {

    private _authServices: AuthorizationService;
    private _tournamentController: TournamentController;

    constructor() {
        this._authServices = new AuthorizationService();
        this._tournamentController = new TournamentController();
    }

    public get routes(): Router {
        let router = Router();

        router.post('/v1/tournaments', this._authServices.verifyToken, this._tournamentController.create);
        router.get('/v1/tournaments', this._authServices.verifyToken, this._tournamentController.findAll)
        router.patch('/v1/tournaments/:tournamentId', this._authServices.verifyToken, this._tournamentController.update)
        router.get('/v1/tournaments/:tournamentId', this._authServices.verifyToken, this._tournamentController.findById)
        router.delete('/v1/tournaments/:tournamentId', this._authServices.verifyToken, this._tournamentController.delete)

        return router;
    }
}