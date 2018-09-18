import { Request, Response } from 'express';
import { UserServices } from '../services/userServices';
import { hashSync } from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
import { sign } from 'jsonwebtoken'
import { jwtConfig } from "../config/jwtConfig";
import { ValidationServices } from "../services/ValidationServices";
import { UserRepository } from '../repositories/UserRepository';
import { IUserDocument } from 'interfaces/IUserDocument';
import { UserController } from './userController';
import { IUser } from 'interfaces/IUser';

export class AuthController {

    static _validationServices = new ValidationServices();
    static _userRepository = new UserRepository();


    public async singupLocal(req: Request, res: Response): Promise<any> {

        let user: IUser = {
            email: req.body.email,
            local: {
                password: req.body.password
            },
            isActive: true
        };

        try {
            // email
            await AuthController._validationServices.validateEmptiness("EMAIL", user.email);

            if (user.email) {
                await AuthController._validationServices.validatePattern("EMAIL", user.email);
                await AuthController._validationServices.validateUniqueness("EMAIL", user.email, AuthController._userRepository);
            }

            // password
            await AuthController._validationServices.validateEmptiness("PASSWORD", user.local.password);

            if (user.local.password) {
                await AuthController._validationServices.validatePattern("PASSWORD", user.local.password);
            }

            user.local.password = hashSync(req.body.password, 12);

            let newUser: IUserDocument = await UserController._userRepository.create(<IUserDocument>user);

            let token = sign({ id: newUser._id }, jwtConfig.secretKey, {
                expiresIn: jwtConfig.expiresIn
            });

            return res.status(201).json({ 'token': token });

        } catch (err) {
            return res.status(409).json(err);
        }

    }


    // public login(req, res) {

    //     if (!req.body.email) {
    //         return res.status(400).send({
    //             code: "LOGIN00010",
    //             message: "Email cannot be empty"
    //         });
    //     }

    //     if (!req.body.password) {
    //         return res.status(400).send({
    //             code: "LOGIN00020",
    //             message: "Password cannot be empty"
    //         });
    //     }

    //     // User.findByEmail(req.body.email)
    //     //     .then((user) => {
    //     //         if (user) {
    //     //             bcrypt.compare(req.body.password, user.local.password)
    //     //                 .then((resPwd) => {
    //     //                     if (resPwd) {
    //     //                         var token = jwt.sign({ id: user._id }, jwtConfig.secretKey, {
    //     //                             expiresIn: 86400 // expires in 24 hours
    //     //                         });

    //     //                         return res.status(200).send({
    //     //                             auth: true,
    //     //                             token: token
    //     //                         });
    //     //                     }

    //     //                     return res.status(400).send({
    //     //                         code: "LOGIN00031",
    //     //                         message: "User or password is not correct."
    //     //                     });
    //     //                 })
    //     //                 .catch((err) => {
    //     //                     if (err) {
    //     //                         return res.status(500).send({code: "LOGIN00031", message: "Error authenticating user."});
    //     //                     }
    //     //                 })
    //     //         }
    //     //     })
    //     //     .catch((err) => {
    //     //         return res.status(500).send({
    //     //             code: "LOGIN00030",
    //     //             message: "User does not exit."
    //     //         });
    //     //     });

    // }


}