import { BaseRepository } from "./BaseRepository";
import { ITournamentDocument } from "../interfaces/ITournamentDocument";
import { TournamentSchema } from "../schemas/TournamentSchema"

export class TournamentRepository extends BaseRepository<ITournamentDocument> {
    constructor() {
        super(TournamentSchema);
    };
}
