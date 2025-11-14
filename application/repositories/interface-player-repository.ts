import { Player } from "../../domain/entites/Player";

export interface IPlayerRepository {
    getAllPlayers(): Promise<Player[]>;
    getPlayerById(id: string): Promise<Player | null>;
    createPlayer(player: Player): Promise<Player>;
}