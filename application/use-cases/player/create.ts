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
import { ZodError } from 'zod';
import { ApplicationError, ErrorType } from '../../exceptions/application-error';

export class CreatePlayerUsecase {
    constructor(private readonly playerReposity : IPlayerRepository){}

    async execute(rawData: unknown): Promise<Player>{
        try {
            
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
            
        } catch (error) {
            
            if (error instanceof ZodError) {
                throw new ApplicationError(
                    `Validation failed: ${error.issues.map(e => e.message).join(', ')}`,
                    ErrorType.VALIDATION,
                    error
                );
            }
            
            
            if (error instanceof Error && (
                error.constructor.name.includes('Error') &&
                (error.message.includes('invalid') || error.message.includes('must') || error.message.includes('format'))
            )) {
                throw new ApplicationError(
                    error.message,
                    ErrorType.VALIDATION,
                    error
                );
            }
            
            
            if (error instanceof Error && error.message.includes('E11000')) {
                throw new ApplicationError(
                    'A player with this information already exists',
                    ErrorType.DUPLICATE,
                    error
                );
            }
            
            
            throw error;
        }
    }
}