import { CodeError } from "../../../errors/player-errors/code-error";
import { Value } from "../../value";

export class Countrycode implements Value<string>{
    constructor(public readonly value: string){
        const codeRegex = /^[A-Z]{3}$/;
        if(!codeRegex.test(value)){
            throw new CodeError(value);
        }
    }
}