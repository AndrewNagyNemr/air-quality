import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  async getAirQuality(@Query('lat') lat: string, @Query('lon') lon: string) {
    const aitQualityData = await this.airQualityService.getAirQuality({
      lat,
      lon,
    });
    return this.airQualityService.mapGetAirQualityResponse(aitQualityData);
  }
}
