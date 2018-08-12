import { jwtConfig } from "../config/jwtConfig";
import { jwtServices } from "../service/jwServices";
import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { AutController } from "../controllers/authController";

export class AuthRoutes {

    public authController: AutController = new AutController();

    public user = {
        name: 'trolo'
    }

    public authRoutes(app): void {

        app.route('/v1/token')
            .get((req: Request, res: Response) => {
                const token = jwt.sign(this.user, jwtConfig.secretKey, {
                    expiresIn: 60480000 // 100 week's = almost 2 years
                });

                res.status(200).send({
                    token: token
                })
            })

        //login
        app.route('/v1/auth/login')
            .post(jwtServices, this.authController.login)

    }
}