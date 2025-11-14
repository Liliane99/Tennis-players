import { Player } from "../../../domain/entites/player";
import { IPlayerRepository } from "../../repositories/interface-player-repository";

export class GetAllPlayersUsecase {
    constructor(private readonly playerReposity : IPlayerRepository){}

    async execute(): Promise<Player[]>{
        return this.playerReposity.getAllPlayers();
    }
}