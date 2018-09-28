import { Router } from "express";
import { ScheduleController } from "../controllers/ScheduleController";
import { AuthorizationService } from "../services/AuthServices";

export class ScheduleRoutes {

    private _authServices: AuthorizationService;
    private _scheduleController: ScheduleController;

    constructor() {
        this._authServices = new AuthorizationService();
        this._scheduleController = new ScheduleController();
    }

    public get routes(): Router {
        let router = Router();

        router.post('/v1/schedules', this._authServices.verifyToken, this._scheduleController.create);
        router.get('/v1/schedules', this._authServices.verifyToken, this._scheduleController.findAll)
        router.patch('/v1/schedules/:scheduleId', this._authServices.verifyToken, this._scheduleController.update)
        router.get('/v1/schedules/:scheduleId', this._authServices.verifyToken, this._scheduleController.findById)
        router.delete('/v1/schedules/:scheduleId', this._authServices.verifyToken, this._scheduleController.delete)

        return router;
    }
}