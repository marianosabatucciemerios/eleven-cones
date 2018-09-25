import { Request, Response } from 'express';
import { hashSync, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import { jwtConfig } from "../config/jwtConfig";
import { UserRepository } from '../repositories/UserRepository';
import { IUserDocument } from 'interfaces/IUserDocument';
import { UserController } from './userController';
import { IUser } from 'interfaces/IUser';
import { IBasicError } from '../interfaces/IBasicError';
import { UtilServices } from '../services/UtilServices';

export class AuthController {

    static _userRepository = new UserRepository();
    static _utilServices = new UtilServices();

    private _getSignedPayload(payload): String {
        return sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
    }

    public async login(req: Request, res: Response): Promise<Response> {

        const VALIDATION_EMPTY: String = 'VALIDATIONS_EMTPY';
        const VALIDATION_LOGIN: String = 'VALIDATIONS_LOGIN';

        let found: IUserDocument;
        let token: String;
        let passwordValid: Boolean;

        try {

            if (!req.body.email) {
                throw <IBasicError>{
                    code: VALIDATION_EMPTY,
                    field: 'email',
                    message: 'Email cannot be empty.'
                };
            }

            if (!req.body.password) {
                throw <IBasicError>{
                    code: VALIDATION_EMPTY,
                    field: 'password',
                    message: 'Password cannot be empty.'
                };
            }

            found = await AuthController._userRepository.findOne({ email: req.body.email });

            if (!found) {
                throw <IBasicError>{
                    code: VALIDATION_LOGIN,
                    field: 'login',
                    message: 'Email or Password isn\'t correct.'
                };
            }

            passwordValid = await compare(req.body.password, <string>found.local.password);

            if (!passwordValid) {
                throw <IBasicError>{
                    code: VALIDATION_LOGIN,
                    field: 'login',
                    message: 'Email or Password isn\'t correct.'
                };
            }

            token = this._getSignedPayload({ id: found._id });

            return res.status(200).json({ 'token': token });

        } catch (err) {
            return res.status(400).json(err);
        }

    }

    public async singupLocal(req: Request, res: Response): Promise<Response> {

        try {

            let emailFound: IUserDocument;
            let token: String;
            let newUser: IUserDocument;
            let user: IUser
            let userEmail: String = req.body.email;

            emailFound = await AuthController._userRepository.findByEmail(userEmail);

            if (emailFound) {
                throw <IBasicError>{
                    code: 'DUPLICATED_EMAIL',
                    field: 'email',
                    message: 'Email already registered.'
                };
            }

            user = {
                email: req.body.email,
                local: {
                    password: hashSync(req.body.password, 12)
                },
                isActive: true
            };

            newUser = await UserController._userRepository.create(<IUserDocument>user);

            token = this._getSignedPayload({ id: newUser._id });

            return res.status(200).json({ 'token': token });
        } catch (err) {
            return res.status(400).json(err);
        }

    }

}
