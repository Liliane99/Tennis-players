import { Value } from "../../value";
import { HeightError } from "../../../errors/player-errors/height-error"

export class Height implements Value<number>{
    constructor(public readonly value: number){
        const heightRegex = /^(1[0-9]{2}|2[0-4][0-9]|250)$/;
        if(!heightRegex.test(value.toString())){
            throw new HeightError(value);
        }
    }
}