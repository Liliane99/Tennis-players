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