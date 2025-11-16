export class ShortnameError extends Error {
    constructor(shortname : string){
        super(`The shortname ${shortname} is invalid. The shortname must follow the format:
             one uppercase initial, followed by a dot, and three uppercase letters (e.g., N.DJO) `)
    }
}