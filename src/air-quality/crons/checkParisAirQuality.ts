import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AirQualityService } from '../air-quality.service';

@Injectable()
export class CheckParisAirQuality {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkParisAirQualityParisZone() {
    try {
      const result = await this.airQualityService.getAirQuality({
        // Paris zone coordinates
        lon: '2.352222',
        lat: '48.856613',
      });
      await this.airQualityService.createAirQualityRecord(result);
    } catch (error) {
      console.error('Error in checkParisAirQualityParisZone cron job:', error);
      // Optionally, you can rethrow the error or handle it in a specific way
      throw new InternalServerErrorException(
        'Failed to check and record Paris air quality',
      );
    }
  }
}
