import { BaseRepository } from "./BaseRepository";
import { ITeamDocument } from "../interfaces/ITeamDocument";
import { TeamSchema } from "../schemas/TeamSchema"
import { ObjectId } from 'bson';

export class TeamRepository extends BaseRepository<ITeamDocument> {
    constructor() {
        super(TeamSchema);
    };

    public async join(teamId: String, squad: ObjectId[]): Promise<ITeamDocument> {
        return TeamSchema.findByIdAndUpdate(teamId, { squad: squad }, { new: true });
    }

}
