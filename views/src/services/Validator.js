/* eslint-disable no-alert, no-useless-escape, no-console */

export const ValidationType = {
    URL: 'URL',
    Email: 'Email',
    Password: 'Password',
    Empty: 'Empty'
};

export class Validator {
    
    
    static validate(type, text) {
        let isValid = true;

        switch (type) {
            case ValidationType.URL:
            isValid = /(bhaa:\/\/.)|(wifi:\/\/.)|(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/.test(text);
            break;

            case ValidationType.Empty:
            isValid = !(text === "" || text === undefined)
            break;

            case ValidationType.Email:
            isValid = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text);
            break;

            case ValidationType.Password:
            isValid = !(text.length  < 8 || text.length > 500)

            default:
            break;
        }

        return isValid;
    }
}
