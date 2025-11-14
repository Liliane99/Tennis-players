import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Player, Country, Data } from "../../../domain/entites/player";
import { IPlayerRepository } from "../../../application/repositories/interface-player-repository";
import { PlayerSchema, PlayerDocument } from "../providers/mongo/schemas/player.schema";
import { Name } from "../../../domain/object-values/player-object-value/player/name";
import { Shortname } from "../../../domain/object-values/player-object-value/player/shortname";
import { Sex } from "../../../domain/object-values/player-object-value/player/sex";
import { Countrycode } from "../../../domain/object-values/player-object-value/country/code";
import { Weight } from "../../../domain/object-values/player-object-value/data/weight";
import { Height } from "../../../domain/object-values/player-object-value/data/height";
import { Age } from "../../../domain/object-values/player-object-value/data/age";
import { Last } from "../../../domain/object-values/player-object-value/data/last";

@Injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(
    @InjectModel(PlayerSchema.name) private playerModel: Model<PlayerDocument>
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.playerModel
      .find()
      .sort({ 'data.rank': 1 }) 
      .exec();
    return players.map(this.mapToDomain);
  }

  async getPlayerById(id: string): Promise<Player | null> {
    const player = await this.playerModel.findOne({ id });
    return player ? this.mapToDomain(player) : null;
  }

  async createPlayer(player: Player): Promise<Player> {
    const created = await this.playerModel.create({
      id: player.id,
      firstname: player.firstname.value,
      lastname: player.lastname.value,
      shortname: player.shortname.value,
      sex: player.sex.value,
      picture: player.picture,
      country: {
        picture: player.country.picture,
        code: player.country.code.value
      },
      data: {
        rank: player.data.rank,
        points: player.data.points,
        weight: player.data.weight.value,
        height: player.data.height.value,
        age: player.data.age.value,
        last: player.data.last[0].value 
      }
    });
    return this.mapToDomain(created);
  }

  private mapToDomain = (player: any): Player => {
    const country = new Country(
      player.country.picture,
      new Countrycode(player.country.code)
    );

    const data = new Data(
      player.data.rank,
      player.data.points,
      new Weight(player.data.weight),
      new Height(player.data.height),
      new Age(player.data.age),
      [new Last(player.data.last)] 
    );

    return new Player(
      player.id,
      new Name(player.firstname),
      new Name(player.lastname),
      new Shortname(player.shortname),
      new Sex(player.sex),
      player.picture,
      country,
      data
    );
  };
}
