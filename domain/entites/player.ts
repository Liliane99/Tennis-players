import { Countrycode } from "../object-values/player-object-value/country/code";
import { Age } from "../object-values/player-object-value/data/age";
import { Height } from "../object-values/player-object-value/data/height";
import { Last } from "../object-values/player-object-value/data/last";
import { Weight } from "../object-values/player-object-value/data/weight";
import { Name } from "../object-values/player-object-value/player/name";
import { Shortname } from "../object-values/player-object-value/player/shortname";
import { Sex } from "../object-values/player-object-value/player/sex";


export class Country {
    constructor(
        public picture: string,
        public code: Countrycode
    ) {}
}

export class Data {
    constructor(
        public rank: number,
        public points: number,
        public weight: Weight,
        public height: Height,
        public age: Age,
        public last: Last[]
    ){}

    /**
     * IMC = weight (kg) / (height (m))^2
     * Here Height is in cm and weight in g in the data source
     * @returns the IMC of the player
     */
    calculIMC(): number {
        const heightInMeters : number = this.height.value / 100;
        const weightInKg : number = this.weight.value / 1000;
        const imc : number = weightInKg / (heightInMeters * heightInMeters);
        return imc;
    }

    /**
     * CalculMedianHeights is a function that calculat the median of heights of all players
     * If heights pair : 
     * median = sum(two medium elements)/2
     * If heights unpair : 
     * median = the medium element
     * @param heights is an array of players height
     * @returns the median of players heights
     */
    CalculMedianHeight(heights:number[]): number{
        const heightsSorted = [...heights].sort((a,b)=>a-b);
        const middle = Math.floor(heightsSorted.length/2)
        const median = heightsSorted.length/2 %2 !== 0 ? heightsSorted[middle] : (heightsSorted[middle - 1] + heightsSorted[middle])/2
        return median;
    }

   
}
  

export class Player {
  constructor(
    public id: string,
    public firstname: Name,
    public lastname: Name,
    public shortname: Shortname,
    public sex: Sex,
    public picture : string,
    public country: Country,
    public data: Data
  ){}
}