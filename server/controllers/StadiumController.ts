import { Request, Response } from "express";
import { StadiumRepository } from '../repositories/StadiumRepository';
import { IStadiumDocument } from "interfaces/IStadiumDocument";
import { IStadium } from '../interfaces/IStadium';

export class StadiumController {

    static _stadiumRepository = new StadiumRepository();

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            let stadium: IStadium = req.body;
            let newStadium: IStadiumDocument = await StadiumController._stadiumRepository.create(<IStadiumDocument>stadium);
            return res.status(201).json(newStadium);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            let stadium: IStadium = req.body;
            let stadiumId: String = req.params.stadiumId;
            let currentStadium: IStadiumDocument = await StadiumController._stadiumRepository.findById(stadiumId);
            let updatedStadium: IStadiumDocument;
            Object.keys(stadium).map(prop => currentStadium[prop] = stadium[prop]);
            updatedStadium = await StadiumController._stadiumRepository.update(stadiumId, currentStadium);
            return res.status(200).json(updatedStadium);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            let stadiumId: String = req.params.stadiumId;
            let deletedStadium: IStadiumDocument = await StadiumController._stadiumRepository.delete(stadiumId);
            return res.status(200).json(deletedStadium);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            let stadiums: IStadiumDocument[] = await StadiumController._stadiumRepository.findAll();
            return res.status(200).json(stadiums);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            let stadiumId: String = req.params.stadiumId;
            let stadium: IStadiumDocument = await StadiumController._stadiumRepository.findById(stadiumId);
            return res.status(200).json(stadium);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findByCode(req: Request, res: Response): Promise<Response> {
        try {
            let stadiumCode: String = req.params.stadiumCode;
            let stadium: IStadiumDocument = await StadiumController._stadiumRepository.findByCode(stadiumCode);
            if (stadium) {
                return res.status(200).json({ isAvailable: false });
            }
            return res.status(200).json({ isAvailable: true });
        } catch (err) {
            return res.status(400).json(err);
        }
    }

};