import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { jwtConfig } from "../config/jwtConfig";
import { AuthorizationService } from "../service/authServices";
import * as jwt from 'jsonwebtoken';
import { SportRepository } from "../repositories/sport.repository";

const authServices: AuthorizationService = new AuthorizationService();

export class SportRoutes {
    public sportRepository: SportRepository = new SportRepository();

    public sportRoutes(app): void {
        app.route('/sporttest')
            .get(authServices.verifyToken, (req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request sport successfulll!!!!'
                })
            })
        
        app.route('/v1/createSport')
            .post(authServices.verifyToken, this.sportRepository.createStport)

        app.route('/v1/getAllSports')
            .get(authServices.verifyToken, this.sportRepository.getAll)

        app.route('/v1/getSportById/:sportId')
            .get(authServices.verifyToken, this.sportRepository.getById)
        
        app.route('/v1/deleteSport/:sportId')
            .post(authServices.verifyToken, this.sportRepository.delete)

        app.route('/v1/updateSport/:sportId')
            .put(authServices.verifyToken, this.sportRepository.update)
    }
}