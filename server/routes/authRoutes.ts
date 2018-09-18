import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthorizationService } from "../services/authServices";

export class AuthRoutes {

    private _authServices: AuthorizationService;
    private _authController: AuthController;

    constructor() {
        this._authServices = new AuthorizationService();
        this._authController = new AuthController();

    }

    public get routes(): Router {
        let router = Router();

        // router.get('/v1/auth/token', this._authController.token)
        // router.post('/v1/auth/login', this._authController.login);
        router.post('/v1/auth/signup-local', this._authController.singupLocal)

        return router;
    }

}


// import { jwtConfig } from "../config/jwtConfig";
// import * as jwt from 'jsonwebtoken';
// import { Request, Response } from "express";
// import { AutController } from "../controllers/authController";

// const authServices: AuthorizationService = new AuthorizationService();

// export class AuthRoutes {

//     public authController: AutController = new AutController();

//     public user = {
//         name: 'trolo'
//     }

//     public authRoutes(app): void {

//         app.route('/v1/auth/token')
//             .get((req: Request, res: Response) => {
//                 const token = jwt.sign(this.user, jwtConfig.secretKey, {
//                     expiresIn: 60480000 // 100 week's = almost 2 years
//                 });

//                 res.status(200).send({
//                     token: token
//                 })
//             })

//         //login
//         app.route('/v1/auth/login')
//             .post(authServices.verifyToken, this.authController.login)

//         //sign-up
//         app.route('/v1/auth/signup-local')
//             .post(authServices.verifyToken, this.authController.login)
//     }
// }