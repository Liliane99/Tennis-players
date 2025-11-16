export class CodeError extends Error {
    constructor(code: string) {
        super(`Country code '${code}' is not a valid country code. Country codes must be three uppercase letters (e.g., 'USA', 'FRA').`);
    }
}