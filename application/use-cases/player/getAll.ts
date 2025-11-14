import { Player } from "../../../domain/entites/Player";
import { IPlayerRepository } from "../../repositories/interface-player-repository";

export class GetAllPlayersUsecase {
    constructor(private readonly playerReposity : IPlayerRepository){}

    async excute(): Promise<Player[]>{
        return this.playerReposity.getAllPlayers();
    }
}