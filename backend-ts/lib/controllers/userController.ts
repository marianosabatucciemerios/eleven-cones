import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { UserServices } from '../service/userServices';
import { EmailAvailableDto } from '../dto/emailAvailableDto';
import { UserDto } from '../dto/userDto';

const User = mongoose.model('User', UserSchema);
const userServices: UserServices = new UserServices();

export class UserController {
    constructor(
    ) {}

    public createUserSignUp (req, res) {
        Promise.all([
            userServices.validateEmail(req.body.email),
            userServices.validatePassword(req.body.password)
        ])
            .then(() => {
                userServices.createUser(req.body.email, req.body.password)
                .then((user) => {
                    console.log(user);
                    return res.status(201).send(user)
                })
                .catch((err) => {
                    return res.status(400).send(err)
                });
            })
            .catch((err) => {
                return res.status(400).send(err);
            });
    }

    public isEmailAvailable(req, res) {
        userServices.validateEmail(req.params.email)
            .then((emailAvailable: EmailAvailableDto) => {
                return res.status(200).send(emailAvailable);
            })
            .catch((err) => {
                return res.status(500).send(err);
            })
    }

    public create(req, res): any {
        Promise.all([
            userServices.validateFirstName(req.body.firstName),
            userServices.validateLastName(req.body.lastName),
            userServices.validateEmail(req.body.email),
            userServices.validatePassword(req.body.password)
        ])
            .then(() => {
                userServices.oldCreateUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
                    .then((data) => {
                        return res.status(201).send(data)
                    })
                    .catch((err) => {
                        return res.status(400).send(err)
                    });
            })
            .catch((err) => {
                return res.status(400).send(err);
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
                                    return res.status(200).send(data);
                                })
                                .catch((err) => {
                                    return res.status(400).send(err);
                                });
                        })
                        .catch((err) => {
                            return res.status(500).send(err)
                        });
                }
            })
    }

    public getUser(req, res) {
        userServices.getUser(req.params.userId)
            .then((currentUser) => {
                return res.status(200).send(currentUser);
            })
            .catch((err) => {
                return res.status(500).send(err)
            })
    }

    public getAllUsers(req, res) {
        userServices.getAllUsers()
            .then((users) => {
                return res.status(200).send(users);
            })
            .catch((err) => {
                return res.status(500).send(err)
            })
    }

    public deleteUser(req, res) {
        userServices.getUser(req.params.userId)
            .then((currentUser: any) => {
                userServices.deleteUser(currentUser.id)
                    .then((user) => {
                        return res.status(200).send("User " + user + " has been removed");
                    })
                    .catch((err) => {
                        return res.status(500).send(err)
                    })
            })
            .catch((err) => {
                return res.status(500).send(err)
            })
    }
};