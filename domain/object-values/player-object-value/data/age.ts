import { Value } from "../../value";
import { AgeError } from "../../../errors/player-errors/age-error"

export class Age implements Value<number>{
    constructor(public readonly value: number){
        const ageRegex = /^(1[89]|[2-9][0-9])$/;
        if(!ageRegex.test(value.toString())){
            throw new AgeError(value);
        }
    }
}