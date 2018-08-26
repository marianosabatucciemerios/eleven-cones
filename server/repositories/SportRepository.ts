import { BaseRepository } from "./BaseRepository";
import { ISportDocument } from "../interfaces/ISportDocument";
import { SportSchema} from "../schemas/SportSchema"

export class SportRepository extends BaseRepository<ISportDocument> {
    constructor() {
        super(SportSchema);
    };
}