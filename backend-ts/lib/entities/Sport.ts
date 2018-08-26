import { ISportDocument } from '../interfaces/ISportDocument';
import { SportRepository } from '../repositories/SportRepository'

export class Sport {

    private _sportDocument: ISportDocument;

    constructor(sportDocument?: ISportDocument) {
        
        this._sportDocument = sportDocument;

    }

    public getName(lang: String): String {
        
        return this._sportDocument.name;

    }

    public getDescription(lang: String): String {

        return this._sportDocument.description;

    }

    static async create(code: String, name: String, description?: String): Promise<ISportDocument> {

        let repo = new SportRepository();

        let sport = <ISportDocument>{
            code: code,
            name: name,
            description: description ? description : null
        };

        return await repo.create(sport);

    }

}
