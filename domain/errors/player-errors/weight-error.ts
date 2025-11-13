export class WeightError extends Error {
    constructor(weight: number){
        super(`Weight value is not valid: ${weight}. It must be a positive number.`);
    }
}