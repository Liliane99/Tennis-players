import {Controller,Get, Param} from '@nestjs/common';
import { PlayerService } from '../services/player-service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}


  @Get()
  async getAll() {
    return this.playerService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id:string) {
    return this.playerService.getById(id);
  }

}
