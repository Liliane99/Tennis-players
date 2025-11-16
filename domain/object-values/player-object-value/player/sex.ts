import { SexError } from '../../../errors/player-errors/sex-error';
import { Value } from '../../value'; 

export class Sex implements Value<string>{
    constructor(public readonly value : string){
        if (!(value == "M" || value == "F")){
            throw new SexError;
        }
    }
}