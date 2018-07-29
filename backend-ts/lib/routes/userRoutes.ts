import { Request, Response } from "express";
import { UserController } from '../controllers/userController';

export class UserRoutes {
    public userController: UserController;

    public routes(app): void {

        app.route('/v1/users')
            .post(this.userController.create);

        app.route('/v1/users/:userId')
            .put(this.userController.update);
    }
}