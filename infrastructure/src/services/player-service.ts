import { Injectable, Inject } from '@nestjs/common';
import { GetAllPlayersUsecase } from "../../../application/use-cases/player/getAll";
import { GetPlayerByIdUsecase } from "../../../application/use-cases/player/getById";
import { CreatePlayerUsecase } from "../../../application/use-cases/player/create";
import type { IPlayerRepository } from '../../../application/repositories/interface-player-repository';



@Injectable()
export class PlayerService {
  constructor(
    private readonly getAllPlayersUseCase: GetAllPlayersUsecase,
    private readonly getPlayerByIdUsecase : GetPlayerByIdUsecase,
    private readonly createPlayerUseCase: CreatePlayerUsecase,

    @Inject('IPlayerRepository')
    private readonly PlayerRepository: IPlayerRepository,
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

}
