// import { Sport } from "../entities/Sport";
import * as express from "express";
import { ISport } from "../interfaces/ISport";
import { ISportDocument } from '../interfaces/ISportDocument';
import { ValidationServices } from "../services/ValidationServices";
import { SportRepository } from '../repositories/SportRepository';
import { ITranslation } from '../interfaces/ITranslation';

export class SportController {

    static _validationServices = new ValidationServices();
    static _sportRepository = new SportRepository();
    static _parseSportParams(req: express.Request): ISport {

        let sport: ISport = {
            code: req.body.code,
            name: <ITranslation>{
                en: req.body.name.en ? req.body.name.en : '',
                es: req.body.name.es ? req.body.name.es : ''
            }
        }

        if (req.body.description) {
            sport.description = <ITranslation> {};
            req.body.description.en ? sport.description.en = req.body.description.en : sport.description.en = '';
            req.body.description.es ? sport.description.es = req.body.description.es : sport.description.es = '';
        }

        return sport;
    }

    public async create(req: express.Request, res: express.Response): Promise<any> {

        let sport: ISport = SportController._parseSportParams(req);

        try {
            // Code
            if (sport.code) {
                await SportController._validationServices.validateEmptiness("CODE", sport.code);
                await SportController._validationServices.validatePattern("CODE", sport.code);
                await SportController._validationServices.validateUniqueness("CODE", sport.code, SportController._sportRepository);
            }

            // Name
            if (sport.name.en) {
                await SportController._validationServices.validateEmptiness("NAME", sport.name.en);
                await SportController._validationServices.validatePattern("NAME", sport.name.en);
            }

            if (sport.name.es) {
                await SportController._validationServices.validateEmptiness("NAME", sport.name.es);
                await SportController._validationServices.validatePattern("NAME", sport.name.es);
            }

            // Description
            if (sport.description) {
                if (sport.description.en) {
                    // await SportController._validationServices.validateEmptiness("DESCRIPTION", sport.description.en);
                    // await SportController._validationServices.validatePattern("DESCRIPTION", sport.description.en);
                }

                if (sport.description.es) {
                    // await SportController._validationServices.validateEmptiness("DESCRIPTION", sport.description.es);
                    // await SportController._validationServices.validatePattern("DESCRIPTION", sport.description.es);
                }
            }

            let newSport: ISportDocument = await SportController._sportRepository.create(<ISportDocument>sport);
            return res.status(201).json(newSport);
        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async update(req: express.Request, res: express.Response) {

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
            if (currentSport.name.en != updateSport.name.en) {
                isUpdated = true;
                await SportController._validationServices.validateEmptiness("NAME", updateSport.name.en);
                await SportController._validationServices.validatePattern("NAME", updateSport.name.en);
            }

            if (currentSport.name.es != updateSport.name.es) {
                isUpdated = true;
                await SportController._validationServices.validateEmptiness("NAME", updateSport.name.es);
                await SportController._validationServices.validatePattern("NAME", updateSport.name.es);
            }

            // Description
            if (updateSport.description) {

                if (currentSport.description.en != updateSport.description.en) {
                    // isUpdated = true;
                    // await SportController._validationServices.validateEmptiness("DESCRIPTION", updateSport.description.en);
                    // await SportController._validationServices.validatePattern("DESCRIPTION", updateSport.description.en);
                }

                if (currentSport.description.es != updateSport.description.es) {
                    // isUpdated = true;
                    // await SportController._validationServices.validateEmptiness("DESCRIPTION", updateSport.description.es);
                    // await SportController._validationServices.validatePattern("DESCRIPTION", updateSport.description.es);
                }
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

    public async delete(req: express.Request, res: express.Response) {
        try {
            await SportController._sportRepository.delete(req.params.sportId);
            return res.status(204).json();
        }
        catch (err) {
            return res.status(409).json(err);
        }
    }

    public async findAll(req: express.Request, res: express.Response) {
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

    public async findById(req: express.Request, res: express.Response) {
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

    public async findByCode(req: express.Request, res: express.Response) {
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

    public async find(req: express.Request, res: express.Response) {
        //     try {
        //         let sports: ISportDocument[] = await SportController._sportRepository.find(req.cond, req.fields, req.options);
        //         return res.status(200).json(sports);
        //     }
        //     catch (err) {
        //         return res.status(409).json(err);
        //     }
    }

    public async findOne(req: express.Request, res: express.Response) {
        //     try {

        //     } catch (error) {

        //     }
    }

}



