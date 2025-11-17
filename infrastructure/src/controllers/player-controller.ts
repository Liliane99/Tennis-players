import {Controller,Get, Post, Body, Param} from '@nestjs/common';
import { PlayerService } from '../services/player-service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}


  @Get()
  async getAll() {
    return this.playerService.getAll();
  }

  @Get('statistics')
  async getStatistics() {
    return this.playerService.getStatistics();
  }

  @Get(':id')
  async getById(@Param('id') id:string) {
    return this.playerService.getById(id);
  }

  @Post()
  async create(@Body() body: unknown) {
    return this.playerService.create(body);
  }

  @Post('init-data')
  async initializeData() {
    return this.playerService.initializeData();
  }

}
