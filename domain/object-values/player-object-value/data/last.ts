import { Value } from "../../value";
import { LastError } from "../../../errors/player-errors/last-error"

export class Last implements Value<number[]> {
    constructor(public readonly value: number[]) {
        for(let i  = 0; i < value.length; i++){
            if (value[i] == 0 || value[i] == 1) {
                throw new LastError(value);
            }
        }
    }
}