import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserServices } from '../service/userServices';
import { UserSchema } from '../models/userModel';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from "../config/jwtConfig";

const userServices: UserServices = new UserServices();
const User = mongoose.model('User', UserSchema);

export class AutController {
    public login(req, res) {

        if (!req.body.email) {
            return res.status(400).send({
                code: "LOGIN00010",
                message: "Email cannot be empty"
            });
        }
    
        if (!req.body.password) {
            return res.status(400).send({
                code: "LOGIN00020",
                message: "Password cannot be empty"
            });
        }

        User.findByEmail(req.body.email)
            .then((user) => {
                if (user) {
                    bcrypt.compare(req.body.password, user.local.password)
                        .then((resPwd) => {
                            if (resPwd) {
                                var token = jwt.sign({ id: user._id }, jwtConfig.secretKey, {
                                    expiresIn: 86400 // expires in 24 hours
                                });
            
                                return res.status(200).send({
                                    auth: true,
                                    token: token
                                });
                            }

                            return res.status(400).send({
                                code: "LOGIN00031",
                                message: "User or password is not correct."
                            });
                        })
                        .catch((err) => {
                            if (err) {
                                return res.status(500).send({code: "LOGIN00031", message: "Error authenticating user."});
                            }
                        })
                }
            })
            .catch((err) => {
                return res.status(500).send({
                    code: "LOGIN00030",
                    message: "User does not exit."
                });
            });

    }
}