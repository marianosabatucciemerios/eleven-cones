export class UtilServices {

    static patterns: Object = {
        ADDRESS: /^[A-Za-z0-9 \/,'-]*[A-Za-z0-9][A-Za-z0-9 \/,'-]*$/,
        CITY: /^[^,]*$/,
        ALPHA: /^[A-Za-z\s]+$/,
        ALPHA_SUPER: /^[a-zA-Z \/,'-]+$/,
        ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
        ALPHA_NUMERIC_SPACES: /^[a-zA-Z0-9_ ]+$/,
        EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        GUID: /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/,
        GUID2: /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i,
        NAME: /^[a-zA-Z.\s]+$/,
        NUMERIC: /^[0-9]+$/,
        PHONE: /\b[2-9][0-9]{9}\b/,
        SSN: /^\d{4}$/,
        ZIPCODE: /(\d{5}([\-]\d{4})?)/,
        COLOR: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
        IP: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
        CODE: /\b[A-za-z0-9]{3}\b/,
        PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    }

    public getAllPatterns(): Object {
        return UtilServices.patterns;
    }

    public getPatternByCode(code: String): any {
        return UtilServices.patterns[<string>code];
    }

    public capitalize(string: String): String {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public isPatternValid(value: String, patternCode: String): Boolean {
        let pattern = this.getPatternByCode(patternCode.toUpperCase());
        return (pattern.test(value));
    }

    public isStringEmpty(value: String): Boolean {
        return ((value == null) || (value == undefined) || (value == "") );
    }
}

