export class AgeError extends Error {
    constructor(age: number) {
        super(`Age '${age}' is not a valid age. Age must be a positive number.`);
    }
}