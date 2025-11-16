export class NameError extends Error {
    constructor(){
        super(`The name must contain at least 2 letters`)
    }
}