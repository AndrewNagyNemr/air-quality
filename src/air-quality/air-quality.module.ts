import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';

@Module({
  controllers: [AirQualityController],
  providers: [AirQualityService],
})
export class AirQualityModule {}
