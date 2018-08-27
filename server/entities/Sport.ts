import { ISportDocument } from '../interfaces/ISportDocument';
import { SportRepository } from '../repositories/SportRepository'
import { ISport } from 'interfaces/ISport';

export class Sport implements ISport{
    code: String;
    name: String;
    description?: String;

    static async create(item: ISport): Promise<ISportDocument> {

        let repo = new SportRepository();

        let sport = <ISportDocument>{
            code: item.code,
            name: item.name,
            description: item.description ? item.description : null
        };

        return await repo.create(sport);

    }

}
