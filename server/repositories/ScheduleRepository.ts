import { BaseRepository } from "./BaseRepository";
import { IScheduleDocument } from "../interfaces/IScheduleDocument";
import { ScheduleSchema } from "../schemas/ScheduleSchema"

export class ScheduleRepository extends BaseRepository<IScheduleDocument> {
    constructor() {
        super(ScheduleSchema);
    };
}
