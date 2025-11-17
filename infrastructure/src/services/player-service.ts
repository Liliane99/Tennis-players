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

}
