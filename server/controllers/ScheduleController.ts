import { Request, Response } from "express";
import { ScheduleRepository } from '../repositories/ScheduleRepository';
import { IScheduleDocument } from "interfaces/IScheduleDocument";
import { ISchedule } from '../interfaces/ISchedule';

export class ScheduleController {

    static _scheduleRepository = new ScheduleRepository();

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            let schedule: ISchedule = req.body;
            let newSchedule: IScheduleDocument = await ScheduleController._scheduleRepository.create(<IScheduleDocument>schedule);
            return res.status(201).json(newSchedule);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            let schedule: ISchedule = req.body;
            let scheduleId: String = req.params.scheduleId;
            let currentSchedule: IScheduleDocument = await ScheduleController._scheduleRepository.findById(scheduleId);
            let updatedSchedule: IScheduleDocument;
            Object.keys(schedule).map(prop => currentSchedule[prop] = schedule[prop]);
            updatedSchedule = await ScheduleController._scheduleRepository.update(scheduleId, currentSchedule);
            return res.status(200).json(updatedSchedule);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            let scheduleId: String = req.params.scheduleId;
            let deletedSchedule: IScheduleDocument = await ScheduleController._scheduleRepository.delete(scheduleId);
            return res.status(200).json(deletedSchedule);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            let schedules: IScheduleDocument[] = await ScheduleController._scheduleRepository.findAll();
            return res.status(200).json(schedules);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            let scheduleId: String = req.params.scheduleId;
            let schedule: IScheduleDocument = await ScheduleController._scheduleRepository.findById(scheduleId);
            return res.status(200).json(schedule);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

};