export class SexError extends Error {
    constructor(){
        super(`Sex must be M or F`)
    }
}