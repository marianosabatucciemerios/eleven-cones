import { BaseRepository } from "./BaseRepository";
import { IStadiumDocument } from "../interfaces/IStadiumDocument";
import { StadiumSchema } from "../schemas/StadiumSchema"

export class StadiumRepository extends BaseRepository<IStadiumDocument> {
    constructor() {
        super(StadiumSchema);
    };
}
