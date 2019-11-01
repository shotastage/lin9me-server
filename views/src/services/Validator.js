export const ValidationType = {
    URL: 'URL',
    Empty: 'Empty'
};

export class Validator {
    
    
    static validate(type, text) {
        let isValid = true;

        switch (type) {
            case ValidationType.URL:
            isValid = /(wifi:\/\/.)|(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/.test(text);
            break;

            case ValidationType.Empty:
            isValid = !(text === "" || text === undefined)
            break;

            default:
            break;
        }

        return isValid;
    }
}
