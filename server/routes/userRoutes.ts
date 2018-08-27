import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { jwtConfig } from "../config/jwtConfig";
import { AuthorizationService } from "../service/authServices";
import * as jwt from 'jsonwebtoken';

const authServices: AuthorizationService = new AuthorizationService();

export class UserRoutes {

    public userController: UserController = new UserController();

    public user = {
        name: 'trolo'
    }

    public userRoutes(app): void {


        app.route('/usertest')
            .get(authServices.verifyToken, (req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request user successfulll!!!!'
                })
            })
        
        app.route('/v1/auth/email-available/:email')
            .get(authServices.verifyToken, this.userController.isEmailAvailable);

        app.route('/v1/users')
            .post(authServices.verifyToken, this.userController.create)
            .get(authServices.verifyToken, this.userController.getAllUsers);

        app.route('/v1/users/:userId')
            .put(authServices.verifyToken, this.userController.update)
            .get(authServices.verifyToken, this.userController.getUser)
            .delete(authServices.verifyToken, this.userController.deleteUser);
    }
}