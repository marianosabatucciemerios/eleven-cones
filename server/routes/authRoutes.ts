import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export class AuthRoutes {

    private _authController: AuthController;

    constructor() {
        this._authController = new AuthController();
    }

    public get routes(): Router {
        let router = Router();

        router.post('/v1/auth/login', (req, res) => this._authController.login(req, res));
        router.post('/v1/auth/signup-local', (req, res) => this._authController.singupLocal(req, res));
        // router.post('/v1/auth/recover-password', this._authController.recoverPassword);

        return router;
    }

}
