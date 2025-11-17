import { Injectable, Inject } from '@nestjs/common';
import { GetAllPlayersUsecase } from "../../../application/use-cases/player/getAll";
import { GetPlayerByIdUsecase } from "../../../application/use-cases/player/getById";
import { CreatePlayerUsecase } from "../../../application/use-cases/player/create";
import { GetStatisticsUsecase } from "../../../application/use-cases/player/get-statistics";
import type { IPlayerRepository } from '../../../application/repositories/interface-player-repository';
import type { IStatisticRepository } from '../../../application/repositories/interface-statistic-repository';



@Injectable()
export class PlayerService {
  constructor(
    private readonly getAllPlayersUseCase: GetAllPlayersUsecase,
    private readonly getPlayerByIdUsecase : GetPlayerByIdUsecase,
    private readonly createPlayerUseCase: CreatePlayerUsecase,
    private readonly getStatisticsUseCase: GetStatisticsUsecase,

    @Inject('IPlayerRepository')
    private readonly PlayerRepository: IPlayerRepository,
    
    @Inject('IStatisticRepository')
    private readonly StatisticRepository: IStatisticRepository,
  ) {}

  

  getAll() {
    return this.getAllPlayersUseCase.execute();
  }

  getById(id: string){
    return this.getPlayerByIdUsecase.execute(id);
  }

  create(rawData: unknown) {
    return this.createPlayerUseCase.execute(rawData);
  }

  getStatistics() {
    return this.getStatisticsUseCase.execute();
  }

  async initializeData() {
    try {
      
      const players = await this.getAllPlayersUseCase.execute();
      if (players.length > 0) {
        return { message: 'Data already exists', count: players.length };
      }

      
      const fetch = (await import('node-fetch')).default;
      const response = await fetch('https://tenisu.latelier.co/resources/headtohead.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as any;
      const players_data = data.players;

      let count = 0;
      for (const player of players_data) {
        try {
          await this.createPlayerUseCase.execute(player);
          count++;
        } catch (error) {
          console.warn(`Failed to create player ${player.firstname} ${player.lastname}:`, error);
        }
      }

      return { 
        message: 'Database initialized successfully', 
        playersCreated: count,
        totalPlayers: players_data.length 
      };
    } catch (error) {
      throw new Error(`Failed to initialize data: ${error.message}`);
    }
  }

}
