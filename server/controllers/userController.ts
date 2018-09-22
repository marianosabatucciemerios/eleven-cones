import { Request, Response } from "express";
import { UtilServices } from '../services/UtilServices';
import { UserRepository } from '../repositories/UserRepository';
import { IBasicError } from "interfaces/IBasicError";
import { IUserDocument } from "interfaces/IUserDocument";
import { IUser } from '../interfaces/IUser';

export class UserController {

    static _userRepository = new UserRepository();
    static _utilServices = new UtilServices();

    public async create(req: Request, res: Response) {

    }

    public async update(req: Request, res: Response): Promise<Response> {

        const VALIDATION_EMPTY: String = 'VALIDATIONS_EMTPY';
        const VALIDATION_PATTERN: String = 'VALIDATIONS_PATTERN';
        const DUPLICATED_EMAIL: String = 'DUPLICATED_EMAIL';

        let _utils = UserController._utilServices;
        let _repo = UserController._userRepository;

        try {
            let updateUser: IUser;
            let found: IUserDocument;


            // ==== First Name (firstName) ==== //
            if (!req.body.firstName) {
                throw <IBasicError>{
                    code: VALIDATION_EMPTY,
                    field: 'firstName',
                    message: 'First Name cannot be empty.'
                };
            }

            if (!_utils.isPatternValid(req.body.firstName, 'ALPHA_NUMERIC_SPACES')) {
                throw <IBasicError>{
                    code: VALIDATION_PATTERN,
                    field: 'firstName',
                    message: 'First Name does not match pattern crtieria.'
                };
            }

            // ==== Last Name (firstName) ==== //
            if (!req.body.lastName) {
                throw <IBasicError>{
                    code: VALIDATION_EMPTY,
                    field: 'lastName',
                    message: 'Last Name cannot be empty.'
                };
            }

            if (!_utils.isPatternValid(req.body.lastName, 'ALPHA_NUMERIC_SPACES')) {
                throw <IBasicError>{
                    code: VALIDATION_PATTERN,
                    field: 'lastName',
                    message: 'Last Name does not match pattern crtieria.'
                };
            }

            // ==== Birthdate ==== //
            if (req.body.birthDate) {
                if (!_utils.isPatternValid(req.body.birthDate, 'DATE')) {
                    throw <IBasicError>{
                        code: VALIDATION_PATTERN,
                        field: 'birthDate',
                        message: 'Birth Date does not match pattern crtieria.'
                    };
                }
            }

            // ==== Height ==== //
            if (req.body.height) { }

            // ==== Weight ==== //
            if (req.body.weight) { }

            // ==== Strong Foot ==== //
            if (req.body.strongFoot) { }

            // ==== Back Number ==== //
            if (req.body.backNumber) { }

            // ==== Field Position ==== //
            if (req.body.fieldPosition) { }

            // ==== Picture ==== //
            if (req.body.picture) { }


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
            if (!_utils.isPatternValid(req.body.email, 'EMAIL')) {
                throw <IBasicError>{
                    code: VALIDATION_PATERN,
                    field: 'email',
                    message: 'Email does not match pattern crtieria.'
                };
            }




            // isAvailable?
            found = await _repo.findOne({ email: req.body.email });

            if (found) {
                throw <IBasicError>{
                    code: DUPLICATED_EMAIL,
                    field: 'email',
                    message: 'Email already registered.'
                };
            }
            return res.status(200).json();

        } catch (err) {
            return res.status(409).json(err);
        }

    }

    public async delete(req: Request, res: Response) {

    }

    public async findAll(req: Request, res: Response) {

    }

    public async findById(req: Request, res: Response) {

    }

    public async findByCode(req: Request, res: Response) {

    }


    // public isEmailAvailable(req, res) {
    //     userServices.validateEmail(req.params.email)
    //         .then((emailAvailable: EmailAvailableDto) => {
    //             return res.status(200).send(emailAvailable);
    //         })
    //         .catch((err) => {
    //             return res.status(500).send(err);
    //         })
    // }

    // public create(req, res): any {
    //     Promise.all([
    //         userServices.validateFirstName(req.body.firstName),
    //         userServices.validateLastName(req.body.lastName),
    //         userServices.validateEmail(req.body.email),
    //         userServices.validatePassword(req.body.password)
    //     ])
    //         .then(() => {
    //             userServices.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
    //                 .then((data) => {
    //                     return res.status(201).send(data)
    //                 })
    //                 .catch((err) => {
    //                     return res.status(400).send(err)
    //                 });
    //         })
    //         .catch((err) => {
    //             return res.status(400).send(err);
    //         });
    // }

    // public update(req, res) {
    //     userServices.getUser(req.params.userId)
    //         .then((currentUser: any) => {
    //             let validations: Array<any> = [];
    //             let updateValues: any = {};

    //             // Mandatory fields
    //             if (req.body.firstName && currentUser.firstName != req.body.firstName) {
    //                 validations.push(userServices.validateFirstName(req.body.firstName));
    //                 updateValues.firstName = req.body.firstName;
    //             }

    //             if (req.body.lastName && currentUser.lastName != req.body.lastName) {
    //                 validations.push(userServices.validateLastName(req.body.lastName));
    //                 updateValues.lastName = req.body.lastName;
    //             }

    //             if (req.body.email && currentUser.email != req.body.email) {
    //                 validations.push(userServices.validateEmail(req.body.email));
    //                 updateValues.email = req.body.email;
    //             }

    //             // Optional fields
    //             if (req.body.birthdate) {
    //                 if (currentUser.birthdate != req.body.birthdate) {
    //                     validations.push(userServices.validateBirthdate(req.body.birthdate));
    //                     updateValues.birthdate = req.body.birthdate;
    //                 }
    //             }

    //             if (req.body.heightUnit && req.body.heightValue) {
    //                 if (currentUser.height.value != req.body.heightValue) {
    //                     validations.push(userServices.validateHeight(req.body.heightUnit, req.body.heightValue));
    //                     updateValues.height = {
    //                         unit: { code: req.body.heightUnit },
    //                         value: req.body.heightValue
    //                     };
    //                 }
    //             }

    //             if (req.body.weightUnit && req.body.weightValue) {
    //                 if (currentUser.weight.value != req.body.weightValue) {
    //                     validations.push(userServices.validateWeight(req.body.weightUnit, req.body.weightValue));
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
    //                         userServices.updateUser(req.params.userId, updateValues)
    //                             .then((data) => {
    //                                 return res.status(200).send(data);
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

    // public getUser(req, res) {
    //     userServices.getUser(req.params.userId)
    //         .then((currentUser) => {
    //             return res.status(200).send(currentUser);
    //         })
    //         .catch((err) => {
    //             return res.status(500).send(err)
    //         })
    // }

    // public getAllUsers(req, res) {
    //     userServices.getAllUsers()
    //         .then((users) => {
    //             return res.status(200).send(users);
    //         })
    //         .catch((err) => {
    //             return res.status(500).send(err)
    //         })
    // }

    // public deleteUser(req, res) {
    //     userServices.getUser(req.params.userId)
    //         .then((currentUser: any) => {
    //             userServices.deleteUser(currentUser.id)
    //                 .then((user) => {
    //                     return res.status(200).send("User " + user + " has been removed");
    //                 })
    //                 .catch((err) => {
    //                     return res.status(500).send(err)
    //                 })
    //         })
    //         .catch((err) => {
    //             return res.status(500).send(err)
    //         })
    // }

};