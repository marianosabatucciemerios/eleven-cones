import { Request, Response } from "express";
import { UserRepository } from '../repositories/UserRepository';
import { IUserDocument } from "interfaces/IUserDocument";
import { IUser } from '../interfaces/IUser';

export class UserController {

    static _userRepository = new UserRepository();

    public async create(req: Request, res: Response) {
        try {
            let user: IUser = req.body;
            let newUser: IUserDocument = await UserController._userRepository.create(<IUserDocument>user);
            return res.status(201).json(newUser);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            let user: IUser = req.body;
            let userId: String = req.params.userId;
            let currentUser: IUserDocument = await UserController._userRepository.findById(userId);
            let updatedUser: IUserDocument;
            Object.keys(user).map(prop => currentUser[prop] = user[prop]);
            updatedUser = await UserController._userRepository.update(userId, currentUser);
            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            let userId: String = req.params.userId;
            let deletedUser: IUserDocument = await UserController._userRepository.delete(userId);
            return res.status(200).json(deletedUser);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findAll(req: Request, res: Response) {
        try {
            let users: IUserDocument[] = await UserController._userRepository.findAll();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            let userId: String = req.params.userId;
            let user: IUserDocument = await UserController._userRepository.findById(userId);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findByEmail(req: Request, res: Response) {
        try {
            let userEmail: String = req.params.userEmail;
            let user: IUserDocument = await UserController._userRepository.findByEmail(userEmail);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

};