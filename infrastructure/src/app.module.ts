import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './modules/player-module';
import { MongoModule } from './providers/mongo/mongo.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Module({
  imports: [
    MongoModule,
    PlayerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
