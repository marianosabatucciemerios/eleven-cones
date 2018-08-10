import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { UserServices } from '../service/userServices';

const User = mongoose.model('User', UserSchema);
//const userService = mongoose.service('UserService', UserServices);
const userServices: UserServices = new UserServices();

export class UserController {

    constructor(
    ) {}
    
    public create(req, res): any {
        Promise.all([
            userServices.validateFirstName(req.body.firstName),
            userServices.validateLastName(req.body.lastName),
            userServices.validateEmail(req.body.email),
            userServices.validatePassword(req.body.password)
        ])
            .then(() => {
                userServices.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
                    .then((data) => {
                        return res.status(201).send(data)
                    })
                    .catch((err) => {
                        return res.status(400).send({code: err.code, message: err.message})
                    });
            })
            .catch((err) => {
                return res.status(400).send({code: err.code, message: err.message});
            });
    }

    public update(req, res) {
        userServices.getUser(req.params.userId)
            .then((currentUser: any) => {
                let validations: Array<any> = [];
                let updateValues: any = {};

                // Mandatory fields
                if (req.body.firstName && currentUser.firstName != req.body.firstName) {
                    validations.push(userServices.validateFirstName(req.body.firstName));
                    updateValues.firstName = req.body.firstName;
                }

                if (req.body.lastName && currentUser.lastName != req.body.lastName) {
                    validations.push(userServices.validateLastName(req.body.lastName));
                    updateValues.lastName = req.body.lastName;
                }

                if (req.body.email && currentUser.email != req.body.email) {
                    validations.push(userServices.validateEmail(req.body.email));
                    updateValues.email = req.body.email;
                }

                // Optional fields
                if (req.body.birthdate) {
                    if (currentUser.birthdate != req.body.birthdate) {
                        validations.push(userServices.validateBirthdate(req.body.birthdate));
                        updateValues.birthdate = req.body.birthdate;
                    }
                }

                if (req.body.heightUnit && req.body.heightValue) {
                    if (currentUser.height.value != req.body.heightValue) {
                        validations.push(userServices.validateHeight(req.body.heightUnit, req.body.heightValue));
                        updateValues.height = {
                            unit: { code: req.body.heightUnit },
                            value: req.body.heightValue
                        };
                    }
                }

                if (req.body.weightUnit && req.body.weightValue) {
                    if (currentUser.weight.value != req.body.weightValue) {
                        validations.push(userServices.validateWeight(req.body.weightUnit, req.body.weightValue));
                        updateValues.weight = {
                            unit: { code: req.body.weightUnit },
                            value: req.body.weightValue
                        };
                    }
                }

                if (updateValues) {
                    Promise.all([
                        validations
                    ])
                        .then(() => {
                            userServices.updateUser(req.params.userId, updateValues)
                                .then((data) => {
                                    let test = data;
                                    return res.status(200).send(test);
                                })
                                .catch((err) => {
                                    return res.status(400).send({code: err.code, message: err.message});
                                });
                        })
                        .catch((err) => {
                            return res.status(500).send({code: err.code, message: err.message})
                        });
                }
            })
    }
};