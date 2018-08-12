import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { jwtConfig } from "../config/jwtConfig";
import { jwtServices } from "../service/jwServices";
import * as jwt from 'jsonwebtoken';

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
            .get(jwtServices, (req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request user successfulll!!!!'
                })
            })

        app.route('/v1/users')
            .post(jwtServices, this.userController.create)
            .get(jwtServices, this.userController.getAllUsers);

        app.route('/v1/users/:userId')
            .put(jwtServices, this.userController.update)
            .get(jwtServices, this.userController.getUser)
            .delete(jwtServices, this.userController.deleteUser);
    }
}