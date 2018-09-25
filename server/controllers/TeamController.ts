import { Request, Response } from "express";
import { TeamRepository } from '../repositories/TeamRepository';
import { ITeamDocument } from "interfaces/ITeamDocument";
import { ITeam } from '../interfaces/ITeam';
import { ObjectId } from "bson";

export class TeamController {

    static _teamRepository = new TeamRepository();

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            let team: ITeam = req.body;
            let newTeam: ITeamDocument = await TeamController._teamRepository.create(<ITeamDocument>team);
            return res.status(201).json(newTeam);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            let team: ITeam = req.body;
            let teamId: String = req.params.teamId;
            let currentTeam: ITeamDocument = await TeamController._teamRepository.findById(teamId);
            let updatedTeam: ITeamDocument;
            Object.keys(team).map(prop => currentTeam[prop] = team[prop]);
            updatedTeam = await TeamController._teamRepository.update(teamId, currentTeam);
            return res.status(200).json(updatedTeam);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            let teamId: String = req.params.teamId;
            let deletedTeam: ITeamDocument = await TeamController._teamRepository.delete(teamId);
            return res.status(200).json(deletedTeam);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            let teams: ITeamDocument[] = await TeamController._teamRepository.findAll();
            return res.status(200).json(teams);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            let teamId: String = req.params.teamId;
            let team: ITeamDocument = await TeamController._teamRepository.findById(teamId);
            return res.status(200).json(team);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findByCode(req: Request, res: Response): Promise<Response> {
        try {
            let teamCode: String = req.params.teamCode;
            let team: ITeamDocument = await TeamController._teamRepository.findByCode(teamCode);
            if (team) {
                return res.status(200).json({ isAvailable: false });
            }
            return res.status(200).json({ isAvailable: true });
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async join(req: Request, res: Response): Promise<Response> {
        try {
            let teamId: String = req.params.teamId;
            let userId: ObjectId = req.body.userId;

            let currentTeam: ITeamDocument = await TeamController._teamRepository.findById(teamId);
            currentTeam.squad.push(userId);
            let updateTeam: ITeamDocument = await TeamController._teamRepository.update(teamId, currentTeam);
            return res.status(200).json(updateTeam);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

};