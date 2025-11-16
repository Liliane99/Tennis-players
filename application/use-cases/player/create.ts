import { Player, Country, Data} from "../../../domain/entites/player";
import { IPlayerRepository } from "../../repositories/interface-player-repository";
import { CreatePlayerSchema } from "../../dtos/player/create";
import { v4 as uuidv4 } from 'uuid';
import { Name } from "../../../domain/object-values/player-object-value/player/name";
import { Shortname } from "../../../domain/object-values/player-object-value/player/shortname";
import { Sex } from "../../../domain/object-values/player-object-value/player/sex";
import { Countrycode } from "../../../domain/object-values/player-object-value/country/code";
import { Weight } from "../../../domain/object-values/player-object-value/data/weight";
import { Height } from "../../../domain/object-values/player-object-value/data/height";
import { Age } from "../../../domain/object-values/player-object-value/data/age";
import { Last } from "../../../domain/object-values/player-object-value/data/last";

export class CreatePlayerUsecase {
    constructor(private readonly playerReposity : IPlayerRepository){}

    async execute(rawData: unknown): Promise<Player>{
        const dto = CreatePlayerSchema.parse(rawData);
        const player = new Player(
            uuidv4(),
            new Name(dto.firstname),
            new Name(dto.lastname),
            new Shortname(dto.shortname),
            new Sex(dto.sex),
            dto.picture,
            new Country(dto.country.picture, new Countrycode(dto.country.code)),
            new Data(dto.data.rank, dto.data.points, new Weight(dto.data.weight), new Height(dto.data.height), new Age(dto.data.age), [new Last(dto.data.last)])

        );
        return await this.playerReposity.createPlayer(player);
    }
}