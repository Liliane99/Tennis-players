import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './modules/player-module';
import { MongoModule } from './providers/mongo/mongo.module';

@Module({
  imports: [
    MongoModule,
    PlayerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
