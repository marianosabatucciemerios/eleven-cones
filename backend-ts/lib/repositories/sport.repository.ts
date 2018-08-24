import { ISport } from "./interfaces/Isport.repository";
import { SportDto } from "dto/sportDto.interface";
import { SportSchema } from "./../models/sportModel";
import * as mongoose from 'mongoose';

const Sport = mongoose.model('Sport', SportSchema);

export class SportRepository implements ISport<SportDto>{

    public getAll(): Promise<Array<SportDto>>{
        return new Promise(function (resolve, reject) {
            return Sport.find({}, '-local')
                .then((data) => {
                    return resolve(data);
                })
                .catch((err) => {
                    return reject({
                        code: "Sport00010",
                        message: "Some error occurred while retrieving sports." + err
                    });
                });
        });
    }

    public getById(sportId: string): Promise<SportDto>{
        return new Promise(function (resolve, reject) {
            return Sport.findById(sportId, '-local')
            .then((data) => {
                return resolve(data);
            })
            .catch((err) => {
                return reject({
                    code: "Sport00040",
                    message: "Sport not found is not valid." + err
                });
            });
        });
    }

    public createStport(sportParams: SportDto): Promise<SportDto>{
        return new Promise(function (resolve, reject) {
            Sport.create({
                name: sportParams.name,
                code: sportParams.code,
                created_date: sportParams.created_date
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject({
                    code: "Sport00020",
                    message: "Some error occurred while creating the sport."
                });
            });
        });
    }

    public delete(sportId: string): Promise<SportDto> {
        return new Promise(function (resolve, reject) {
            return Sport.remove({_id: Object(sportId)}, (err, user) => {
                return resolve();
            })
            .catch((err) => {
                return reject(err);
            });
        });
    }

    public update(sportId: String, sportParams: SportDto): Promise<SportDto> {
        return new Promise(function (resolve, reject) {
            return Sport.findByIdAndUpdate(sportId, sportParams)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject({
                    code: "Sport00030",
                    message: "Some error occurred while updating sport." + err
                });
            })
        });
    }
}