import { Module } from '@nestjs/common';
import { AirQualityModule } from './air-quality/air-quality.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/air-quality'),
    ConfigModule.forRoot({ isGlobal: true }),
    AirQualityModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
