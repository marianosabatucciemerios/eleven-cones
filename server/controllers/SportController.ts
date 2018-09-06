// import { Sport } from "../entities/Sport";
import * as express from "express";
import { ISport } from "../interfaces/ISport";
import { ISportDocument } from '../interfaces/ISportDocument';
import { ValidationServices } from "../services/ValidationServices";
import { SportRepository } from '../repositories/SportRepository';

export class SportController {

    static _validationServices = new ValidationServices();
    static _sportRepository = new SportRepository();
    static _parseSportParams(req: express.Request): ISport {
        let sport: ISport = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description ? req.body.description : null
        }
        return sport;
    }

    public async create(req: express.Request, res: express.Response): Promise<any> {

        let sport: ISport = SportController._parseSportParams(req);

        try {
            // Code
            await SportController._validationServices.validateEmptiness("CODE", sport.code);
            await SportController._validationServices.validatePattern("CODE", sport.code);
            await SportController._validationServices.validateUniqueness("CODE", sport.code, SportController._sportRepository);

            // Name
            await SportController._validationServices.validateEmptiness("NAME", sport.name);
            await SportController._validationServices.validatePattern("NAME", sport.name);

            // Description
            if (sport.description) {
                // await SportController._validationServices.validateEmptiness("DESCRIPTION", sport.description);
                // await SportController._validationServices.validatePattern("DESCRIPTION", sport.description);
            }

            let newSport: ISportDocument = await SportController._sportRepository.create(<ISportDocument>sport);
            return res.status(201).json(newSport);
        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async update(req, res) {

        let updateSport: ISport = SportController._parseSportParams(req);

        let updateSportId: String = req.params.sportId;

        try {

            let isUpdated = false;

            let currentSport = await SportController._sportRepository.findById(updateSportId);

            // Code
            if (currentSport.code != updateSport.code) {
                isUpdated = true;
                await SportController._validationServices.validateEmptiness("CODE", updateSport.code);
                await SportController._validationServices.validatePattern("CODE", updateSport.code);
                await SportController._validationServices.validateUniqueness("CODE", updateSport.code, SportController._sportRepository);
            }

            // Name
            if (currentSport.name != updateSport.name) {
                isUpdated = true;
                await SportController._validationServices.validateEmptiness("NAME", updateSport.name);
                await SportController._validationServices.validatePattern("NAME", updateSport.name);
            }

            // Description
            if (updateSport.description && (currentSport.description != updateSport.description)) {
                isUpdated = true;
                // await SportController._validationServices.validateEmptiness("DESCRIPTION", updateSport.description);
                // await SportController._validationServices.validatePattern("DESCRIPTION", updateSport.description);
            }

            if (isUpdated) {
                let newSport: ISportDocument = await SportController._sportRepository.update(updateSportId, <ISportDocument>updateSport);
                return res.status(200).json(newSport);
            }
            return res.status(204).json();

        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async delete(req, res) {
        try {
            await SportController._sportRepository.delete(req.params.sportId);
            return res.status(204).json();
        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async findAll(req, res) {
        try {
            let sports: ISportDocument[] = await SportController._sportRepository.findAll();

            if (sports) {
                return res.status(200).json(sports);
            }

            return res.status(404).json();
        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async findById(req, res) {
        try {
            let sportId: String = req.params.sportId;

            let sport: ISportDocument = await SportController._sportRepository.findById(sportId);

            if (sport) {
                return res.status(200).json(sport);
            }

            return res.status(404).json();
        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async findByCode(req, res) {
        try {
            let sportId: String = req.params.sportId;

            let sport: ISportDocument = await SportController._sportRepository.findByCode(sportId);

            if (sport) {
                return res.status(200).json(sport);
            }

            return res.status(404).json();
        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async find(req, res) {
        //     try {
        //         let sports: ISportDocument[] = await SportController._sportRepository.find(req.cond, req.fields, req.options);
        //         return res.status(200).json(sports);
        //     }
        //     catch (err) {
        //         return res.status(409).json(err);
        //     }
    }

    public async findOne(req, res) {
        //     try {

        //     } catch (error) {

        //     }
    }

}



