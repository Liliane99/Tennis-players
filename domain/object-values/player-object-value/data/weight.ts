import { WeightError } from '../../../errors/player-errors/weight-error';
import { Value } from '../../value'

export class Weight implements Value<number> {
    constructor(public readonly value: number){
        const weightRegex = /^(3[0-9]{4}|[4-9][0-9]{4}|1[0-9]{5}|2[0-4][0-9]{4}|250000)$/;
        if (!weightRegex.test(value.toString())){
            throw new WeightError(value);
        }
    }
}