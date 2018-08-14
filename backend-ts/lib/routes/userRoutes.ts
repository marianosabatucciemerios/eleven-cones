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

        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHJvbG8iLCJpYXQiOjE1MzM5MzUwNzAsImV4cCI6MTUzNDUzOTg3MH0.SbNrLE8wyEk39MybOWqN0gA3lIls_Yz_4kp3Wq9q1B8

        
        /*
        app.route('/v1/users/login-local')
        app.route('/login')
            .get((req: Request, res: Response) => {
                
                // passport
                
                const token = jwt.sign(user, jwtConfig.secretKey, {
                    expiresIn: 604800 // 1 week
                });

                res.status(200).send({
                    token: token
                })
            })
            .post(jwtServices, this.contactController.addNewContact);
         */

        app.route('/usertest')
            .get(authServices.verifyToken, (req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request user successfulll!!!!'
                })
            })

        app.route('/v1/users')
            .post(authServices.verifyToken, this.userController.create)
            .get(authServices.verifyToken, this.userController.getAllUsers);

        app.route('/v1/users/:userId')
            .put(authServices.verifyToken, this.userController.update)
            .get(authServices.verifyToken, this.userController.getUser)
            .delete(authServices.verifyToken, this.userController.deleteUser);
    }
}