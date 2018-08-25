export class UserDto {
    firstName: String;
    lastName: String;
    picture: { data: Buffer, contentType: String };
    birthdate: Date;
    strongFoot: {
        code: String,
        lang: {
            en: String,
            es: String
        }
    };
    height: {
        unit: {
            code: String,
            lang: {
                en: String,
                es: String
            },
        },
        value: Number
    };
    weight: {
        unit: {
            code: String,
            lang: {
                en: String,
                es: String
            },
        },
        value: Number
    };
    email: { type: String, unique: true, lowercase: true };
    local: {
        password: String,
        passwordReset: {
            token: String,
            expired: Date
        }
    };
    facebook: {
        id: String,
        token: String,
        name: String,
    };
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    };
    google: {
        id: String,
        token: String,
        name: String
    };
    roles: [{
        id: any,
        code: String,
        lang: {
            en: String,
            es: String
        },
        default: Boolean
    }];
    managesTo: [{
        teamId: any
    }];
    playsTo: [{
        team: {
            id: any,
        },
        shirtNumber: Number,
        position: {
            id: any,
            code: String,
            lang: {
                en: String,
                es: String
            }
        }
    }];
    isActive: Boolean
}; 