import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AirQualityService } from '../air-quality.service';

@Injectable()
export class CheckParisAirQuality {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkParisAirQualityParisZone() {
    const result = await this.airQualityService.getAirQuality({
      // Paris zone cords
      lon: '2.352222',
      lat: '48.856613',
    });
    await this.airQualityService.createAirQualityRecord(result);
  }
}
