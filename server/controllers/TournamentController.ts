import { Request, Response } from "express";
import { TournamentRepository } from '../repositories/TournamentRepository';
import { ITournamentDocument } from "interfaces/ITournamentDocument";
import { ITournament } from '../interfaces/ITournament';

export class TournamentController {

    static _tournamentRepository = new TournamentRepository();

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            let tournament: ITournament = req.body;
            let newTournament: ITournamentDocument = await TournamentController._tournamentRepository.create(<ITournamentDocument>tournament);
            return res.status(201).json(newTournament);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            let tournament: ITournament = req.body;
            let tournamentId: String = req.params.tournamentId;
            let currentTournament: ITournamentDocument = await TournamentController._tournamentRepository.findById(tournamentId);
            let updatedTournament: ITournamentDocument;
            Object.keys(tournament).map(prop => currentTournament[prop] = tournament[prop]);
            updatedTournament = await TournamentController._tournamentRepository.update(tournamentId, currentTournament);
            return res.status(200).json(updatedTournament);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            let tournamentId: String = req.params.tournamentId;
            let deletedTournament: ITournamentDocument = await TournamentController._tournamentRepository.delete(tournamentId);
            return res.status(200).json(deletedTournament);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            let tournaments: ITournamentDocument[] = await TournamentController._tournamentRepository.findAll();
            return res.status(200).json(tournaments);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            let tournamentId: String = req.params.tournamentId;
            let tournament: ITournamentDocument = await TournamentController._tournamentRepository.findById(tournamentId);
            return res.status(200).json(tournament);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findByCode(req: Request, res: Response): Promise<Response> {
        try {
            let tournamentCode: String = req.params.tournamentCode;
            let tournament: ITournamentDocument = await TournamentController._tournamentRepository.findByCode(tournamentCode);
            if (tournament) {
                return res.status(200).json({ isAvailable: false });
            }
            return res.status(200).json({ isAvailable: true });
        } catch (err) {
            return res.status(400).json(err);
        }
    }

};