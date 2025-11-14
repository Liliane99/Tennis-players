import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IPlayerRepository } from '../../../application/repositories/interface-player-repository';
import { PlayerController } from '../controllers/player-controller';
import { PlayerService } from '../services/player-service';
import { PlayerRepository } from '../repositories/player-repository';
import { GetAllPlayersUsecase } from '../../../application/use-cases/player/getAll';
import { PlayerSchema, PlayerMongoSchema } from '../providers/mongo/schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerSchema.name, schema: PlayerMongoSchema }
    ])
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    PlayerRepository,
    {
      provide: 'IPlayerRepository',
      useExisting: PlayerRepository,
    },
    {
      provide: GetAllPlayersUsecase,
      useFactory: (repo: IPlayerRepository) => new GetAllPlayersUsecase(repo),
      inject: ['IPlayerRepository'],
    }
  ],
  exports: ['IPlayerRepository'],
})
export class PlayerModule {}
