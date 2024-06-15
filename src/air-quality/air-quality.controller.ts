import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  getAirQuality(
    @Query('latitude') latitude: string,
    @Query('logngitude') logngitude: string,
  ) {
    return this.airQualityService.getAirQuality({ latitude, logngitude });
  }
}
