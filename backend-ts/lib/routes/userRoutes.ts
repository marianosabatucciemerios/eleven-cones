import { Request, Response } from "express";
import { UserController } from "../controllers/userController";

export class UserRoutes {

    public userController: UserController = new UserController();

    public userRoutes(app): void {

        app.route('/usertest')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request user successfulll!!!!'
                })
            })

        app.route('/v1/users')
            .post(this.userController.create);
    }
}