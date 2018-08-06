import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { UserServices } from '../service/userServices';

const User = mongoose.model('User', UserSchema);
//const userService = mongoose.service('UserService', UserServices);

export class UserController {
    
    public userService: UserServices = new UserServices();

    constructor(
    ) {}
    
    public create(req, res): any {
        // Promise.all([
        //     this.userService.validateFirstName(req.body.firstName),
        //     this.userService.validateLastName(req.body.lastName),
        //     this.userService.validateEmail(req.body.email),
        //     this.userService.validatePassword(req.body.password)
        // ])
        //     .then(() => {
        //         this.userService.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
        //             .then((data) => {
        //                 return res.status(201).send(data)
        //             })
        //             .catch((err) => {
        //                 return res.status(400).send(err)
        //             });
        //     })
        //     .catch((err) => {
        //         return res.status(400).send(err)
        //     });
        this.userService.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
            .then((data) => {
                return res.status(201).send(data)
            })
            .catch((err) => {
                return res.status(400).send(err)
            });
    }

    // public update(req, res) {
    //     this.userService.getUser(req.params.userId)
    //         .then((currentUser: any) => {
    //             let validations: Array<any> = [];
    //             let updateValues: any = {};

    //             // Mandatory fields
    //             if (req.body.firstName && currentUser.firstName != req.body.firstName) {
    //                 validations.push(this.userService.validateFirstName(req.body.firstName));
    //                 updateValues.firstName = req.body.firstName;
    //             }

    //             if (req.body.lastName && currentUser.lastName != req.body.lastName) {
    //                 validations.push(this.userService.validateLastName(req.body.lastName));
    //                 updateValues.lastName = req.body.lastName;
    //             }

    //             if (req.body.email && currentUser.email != req.body.email) {
    //                 validations.push(this.userService.validateEmail(req.body.email));
    //                 updateValues.email = req.body.email;
    //             }

    //             // Optional fields
    //             if (req.body.birthdate) {
    //                 if (currentUser.birthdate != req.body.birthdate) {
    //                     validations.push(this.userService.validateBirthdate(req.body.birthdate));
    //                     updateValues.birthdate = req.body.birthdate;
    //                 }
    //             }

    //             if (req.body.heightUnit && req.body.heightValue) {
    //                 if (currentUser.height.value != req.body.heightValue) {
    //                     validations.push(this.userService.validateHeight(req.body.heightUnit, req.body.heightValue));
    //                     updateValues.height = {
    //                         unit: { code: req.body.heightUnit },
    //                         value: req.body.heightValue
    //                     };
    //                 }
    //             }

    //             if (req.body.weightUnit && req.body.weightValue) {
    //                 if (currentUser.weight.value != req.body.weightValue) {
    //                     validations.push(this.userService.validateWeight(req.body.weightUnit, req.body.weightValue));
    //                     updateValues.weight = {
    //                         unit: { code: req.body.weightUnit },
    //                         value: req.body.weightValue
    //                     };
    //                 }
    //             }

    //             if (updateValues) {
    //                 Promise.all([
    //                     validations
    //                 ])
    //                     .then(() => {
    //                         this.userService.updateUser(req.params.userId, updateValues)
    //                             .then(() => {
    //                                 return res.status(200).send();
    //                             })
    //                             .catch((err) => {
    //                                 return res.status(400).send(err);
    //                             });
    //                     })
    //                     .catch((err) => {
    //                         return res.status(500).send(err)
    //                     });
    //             }
    //         })
    // }
};