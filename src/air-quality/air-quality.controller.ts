import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAirQualityResponse } from './types/GetAirQualityResponse';

@ApiTags('air-quality')
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  @ApiOperation({ summary: 'Get air quality by latitude and longitude' })
  @ApiQuery({
    name: 'lat',
    required: true,
    type: String,
    description: 'Latitude',
  })
  @ApiQuery({
    name: 'lon',
    required: true,
    type: String,
    description: 'Longitude',
  })
  @ApiResponse({
    status: 200,
    description: 'Air quality data',
    type: GetAirQualityResponse,
  })
  async getAirQuality(@Query('lat') lat: string, @Query('lon') lon: string) {
    const aitQualityData = await this.airQualityService.getAirQuality({
      lat,
      lon,
    });
    return this.airQualityService.mapGetAirQualityResponse(aitQualityData);
  }

  @Get('/most-polluted-paris')
  @Get('/most-polluted-paris')
  @ApiOperation({ summary: 'Get the most polluted time in Paris' })
  @ApiResponse({ status: 200, description: 'Most polluted time in Paris' })
  async getMostPollutedTimeParis() {
    const aitQualityData = await this.airQualityService.getMostPollutedParis();
    return aitQualityData?.current.pollution.ts;
  }
}
