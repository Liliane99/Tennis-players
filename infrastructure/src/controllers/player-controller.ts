import {Controller,Get} from '@nestjs/common';
import { PlayerService } from '../services/player-service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}


  @Get()
  async getAll() {
    return this.playerService.getAll();
  }

}
