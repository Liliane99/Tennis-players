import { NameError } from '../../../errors/player-errors/name-error';
import { Value } from '../../value'; 

export class Name implements Value<string>{
    constructor(public readonly value : string){
        const nameRegex = /^[A-Z]{2}$/;
        if (!nameRegex.test(value)){
            throw new NameError;
        }
    }
}