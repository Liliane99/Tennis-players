import { Player } from "../../../domain/entites/player";
import { IPlayerRepository } from "../../repositories/interface-player-repository";

export class GetPlayerByIdUsecase {
    constructor(private readonly playerRepository : IPlayerRepository ){}

    async execute(id: string) : Promise<Player | null >{
    return this.playerRepository.getPlayerById(id);
    }
}