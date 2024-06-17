import { Module } from '@nestjs/common';
import { AirQualityModule } from './air-quality/air-quality.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow('MONGODB_URI'),
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AirQualityModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
