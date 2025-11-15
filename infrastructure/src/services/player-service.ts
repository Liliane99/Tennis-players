import { Injectable, Inject } from '@nestjs/common';
import { GetAllPlayersUsecase } from "../../../application/use-cases/player/getAll";
import { GetPlayerByIdUsecase } from "../../../application/use-cases/player/getById";
import type { IPlayerRepository } from '../../../application/repositories/interface-player-repository';



@Injectable()
export class PlayerService {
  constructor(
    private readonly getAllPlayersUseCase: GetAllPlayersUsecase,
    private readonly getPlayerByIdUsecase : GetPlayerByIdUsecase,

    @Inject('IPlayerRepository')
    private readonly PlayerRepository: IPlayerRepository,
  ) {}

  getAll() {
    return this.getAllPlayersUseCase.execute();
  }

  getById(id: string){
    return this.getPlayerByIdUsecase.execute(id);
  }

}
