import { Request, Response } from 'express';
import { hashSync, compare, compareSync } from 'bcryptjs';
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

            token = sign({ id: found._id }, jwtConfig.secretKey, {
                expiresIn: jwtConfig.expiresIn
            });

            return res.status(200).json({ 'token': token });

        } catch (err) {
            return res.status(409).json(err);
        }

    }

    public async singupLocal(req: Request, res: Response): Promise<Response> {

        const VALIDATION_EMPTY: String = 'VALIDATIONS_EMTPY';
        const VALIDATION_PATERN: String = 'VALIDATIONS_PATTERN';
        const DUPLICATED_EMAIL: String = 'DUPLICATED_EMAIL';

        let found: IUserDocument;
        let token: String;
        let newUser: IUserDocument;

        try {

            // ==== Email (email) ==== //

            // isEmpty?
            if (!req.body.email) {
                throw <IBasicError>{
                    code: VALIDATION_EMPTY,
                    field: 'email',
                    message: 'Email cannot be empty.'
                };
            }

            // isPatternValid?
            if (!AuthController._utilServices.isPatternValid(req.body.email, 'EMAIL')) {
                throw <IBasicError>{
                    code: VALIDATION_PATERN,
                    field: 'email',
                    message: 'Email does not match pattern crtieria.'
                };
            }

            // isAvailable?
            found = await AuthController._userRepository.findOne({ email: req.body.email });

            if (found) {
                throw <IBasicError>{
                    code: DUPLICATED_EMAIL,
                    field: 'email',
                    message: 'Email already registered.'
                };
            }

            // ==== Password (password) ==== //

            // isEmpty?
            if (!req.body.password) {
                throw <IBasicError>{
                    code: VALIDATION_EMPTY,
                    field: 'password',
                    message: 'Password cannot be empty.'
                };
            }

            // isPatternValid?
            if (!AuthController._utilServices.isPatternValid(req.body.password, 'PASSWORD')) {
                throw <IBasicError>{
                    code: VALIDATION_PATERN,
                    field: 'password',
                    message: 'Password does not match pattern crtieria.'
                };
            }

            // ==== ==== //
            let user: IUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                local: {
                    password: hashSync(req.body.password, 12)
                },
                isActive: true
            };

            newUser = await UserController._userRepository.create(<IUserDocument>user);

            token = sign({ id: newUser._id }, jwtConfig.secretKey, {
                expiresIn: jwtConfig.expiresIn
            });

            return res.status(200).json({ 'token': token });

        } catch (err) {
            return res.status(409).json(err);
        }

        ////////////////

        // let user: IUser = {
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     local: {
        //         password: req.body.password
        //     },
        //     isActive: true
        // };

        // try {
        //     // email
        //     await AuthController._validationServices.validateEmptiness("EMAIL", user.email);

        //     if (user.email) {
        //         await AuthController._validationServices.validatePattern("EMAIL", user.email);
        //         await AuthController._validationServices.validateUniqueness("EMAIL", user.email, AuthController._userRepository);
        //     }

        //     // password
        //     await AuthController._validationServices.validateEmptiness("PASSWORD", user.local.password);

        //     if (user.local.password) {
        //         await AuthController._validationServices.validatePattern("PASSWORD", user.local.password);
        //     }

        //     user.local.password = hashSync(req.body.password, 12);

        //     let newUser: IUserDocument = await UserController._userRepository.create(<IUserDocument>user);

        //     let token = sign({ id: newUser._id }, jwtConfig.secretKey, {
        //         expiresIn: jwtConfig.expiresIn
        //     });

        //     return res.status(201).json({ 'token': token });

        // } catch (err) {
        //     return res.status(409).json(err);
        // }

    }

    // public async recoverPassword(req: Request, res: Response): Promise<Response> {
    // }

}
