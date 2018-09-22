import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export class AuthRoutes {

    private _authController: AuthController;

    constructor() {
        this._authController = new AuthController();
    }

    public get routes(): Router {
        let router = Router();

        router.post('/v1/auth/login', this._authController.login);
        router.post('/v1/auth/signup-local', this._authController.singupLocal)

        return router;
    }

}
