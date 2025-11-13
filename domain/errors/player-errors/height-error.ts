export class HeightError extends Error {
    constructor(height: number) {
        super(`Height value is not valid: ${height}. It must be > 70cm.`);
    }
}