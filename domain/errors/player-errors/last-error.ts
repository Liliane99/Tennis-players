export class LastError extends Error {
    constructor(last: number[]) {
        super(`Invalid last match results: [${last}]. Each result must be 0 or 1.`);
    }
}