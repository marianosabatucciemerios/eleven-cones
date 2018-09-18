import { IBasicError } from '../interfaces/IBasicError';
import { UtilServices } from './UtilServices';

export class ValidationServices {

    static _utilServices: UtilServices = new UtilServices();


    // == Validations == //

    public async validateEmptiness(field: String, value: String): Promise<IBasicError> {

        let error: IBasicError = {
            code: "VALIDATIONS_EMTPY",
            field: field,
            message: field + " cannot be empty."
        };

        return new Promise<IBasicError>((resolve, reject) => {
            if (!ValidationServices._utilServices.isStringEmpty(value))
                resolve();
            reject(error);
        });

    }

    public async validatePattern(field: String, value: String): Promise<IBasicError> {

        let patternCode;

        let error: IBasicError = {
            code: "VALIDATIONS_PATTERN",
            field: field,
            message: field + " does not match the proper pattern criteria."
        };

        switch (field.toUpperCase()) {
            case 'CODE':
                patternCode = 'CODE';
                break;
            case 'EMAIL':
                patternCode = 'EMAIL';
                break;
            case 'PASSWORD':
                patternCode = 'PASSWORD';
                break;
            default:
                patternCode = 'ALPHA_NUMERIC_SPACES';
                break;
        }

        return new Promise<IBasicError>((resolve, reject) => {
            if (ValidationServices._utilServices.isPatternValid(value, patternCode))
                resolve();
            reject(error);
        });

    }

    public async validateUniqueness(field: String, item: String, _repoServices: any): Promise<IBasicError> {

        let error: IBasicError = {
            code: "VALIDATIONS_CODE_UNIQUENESS",
            field: field,
            message: field + " already exist."
        };

        return new Promise<IBasicError>(async (resolve, reject) => {

            let found;

            switch (field.toUpperCase()) {
                case 'CODE':
                    found = await _repoServices.findByCode(item);
                    break;
                case 'EMAIL':
                    found = await _repoServices.findOne({ email: item });
                    break;
                default:
                    break;
            }

            if (found)
                reject(error);
            resolve();
        });
    }


}
