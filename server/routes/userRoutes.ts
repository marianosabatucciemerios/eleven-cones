import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthorizationService } from "../services/AuthServices";

export class UserRoutes {

    private _authServices: AuthorizationService;
    private _userController: UserController;

    constructor() {
        this._authServices = new AuthorizationService();
        this._userController = new UserController();
    }

    public get routes(): Router {
        let router = Router();

        // router.post('/v1/users', this._authServices.verifyToken, this._userController.create);
        // router.get('/v1/users', this._authServices.verifyToken, this._userController.findAll)
        router.put('/v1/users/:userId', this._authServices.verifyToken, this._userController.update)
        // router.get('/v1/users/:userId', this._authServices.verifyToken, this._userController.findById)
        // router.delete('/v1/users/:userId', this._authServices.verifyToken, this._userController.delete)

        // router.get('/v1/users/email/:userEmail', this._authServices.verifyToken, this._userController.findByEmail)

        return router;
    }
}