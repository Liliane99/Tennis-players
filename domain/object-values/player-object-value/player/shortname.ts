import { ShortnameError } from '../../../errors/player-errors/shortname-error';
import { Value } from '../../value'; 

export class Shortname implements Value<string>{
    constructor(public readonly value : string){
        const shortnameRegex = /^[A-Z]\.[A-Z]{3}$/;
            if (!shortnameRegex.test(value)){
                throw new ShortnameError(value);
            }
    }
}