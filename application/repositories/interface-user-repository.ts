import { Player } from "../../domain/entites/Player";

export interface IPlayerRepository {
    getPlayers(): Promise<Player[]>;
    getPlayerById(id: number): Promise<Player | null>;
    createPlayer(player: Player): Promise<Player>;
}