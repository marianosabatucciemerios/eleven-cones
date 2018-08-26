import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { jwtConfig } from '../config/jwtConfig';

export class AuthorizationService {
    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        
        // if (token) {
        //     jwt.verify(token, jwtConfig.secretKey, (err, user) => {
        //         if (err) {
        //             return res.status(401).send({
        //                 success: false,
        //                 message: 'Failed to authenticate token.'
        //             });
        //         } else {
        //             next();
        //         }
        //     });
        // } else {
        //     return res.status(403).send({
        //         success: false,
        //         message: 'No token provided.'
        //     });
        // }

        next();
    }
};

// export const jwtServices = (req: Request, res: Response, next: NextFunction) => {
        
//         const token = req.headers['authorization'];
        
//         if (token) {
//             jwt.verify(token, jwtConfig.secretKey, (err, user) => {
//                 if (err) {
//                     return res.status(401).send({
//                         success: false,
//                         message: 'Failed to authenticate token.'
//                     });
//                 } else {
//                     next();
//                 }
//             });
//         } else {
//             return res.status(403).send({
//                 success: false,
//                 message: 'No token provided.'
//             });
//         }
// };