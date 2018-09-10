import { ITranslation } from './ITranslation';

export interface ISport {
    code: String,
    name: ITranslation,
    description?: ITranslation
}
