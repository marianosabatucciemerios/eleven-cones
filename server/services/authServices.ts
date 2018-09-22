import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { jwtConfig } from '../config/jwtConfig';
import { IBasicError } from 'interfaces/IBasicError';

export class AuthorizationService {

    public verifyToken(req: Request, res: Response, next: NextFunction) {

        const VALIDATION_TOKEN: String = "VALIDATION_TOKEN";

        try {

            let token = req.headers['authorization'];

            if (!token) {
                throw <IBasicError>{
                    code: VALIDATION_TOKEN,
                    field: 'token',
                    message: 'Missing authentication token.'
                };
            }

            verify(token, jwtConfig.secretKey, (err) => {
                if (err) {
                    throw <IBasicError>{
                        code: VALIDATION_TOKEN,
                        field: 'token',
                        message: 'Invalid authentication token.'
                    };
                }

                next();
            });

        } catch (err) {
            return res.status(401).json(err);
        }

    }
}
