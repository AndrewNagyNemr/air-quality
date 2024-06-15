import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GetAirQualityResponse } from './types';

@Injectable()
export class AirQualityService {
  airVisualBaseUrl: string;
  airVisualAPIKey: string;
  constructor(private readonly configService: ConfigService) {
    this.airVisualBaseUrl = configService.getOrThrow('AIR_VISUAL_BASE_URL');
    this.airVisualAPIKey = configService.getOrThrow('AIR_VISUAL_API_KEY');
  }

  private mapGetAirQualityResponse(response: GetAirQualityResponse) {
    return {
      Result: {
        Polution: response.data.current.pollution
      },
    };
  }

  async getAirQuality({
    latitude,
    logngitude,
  }: {
    latitude: string;
    logngitude: string;
  }) {
    // console.log(AIR_VISUAL_API_KEY);
    console.log(this.airVisualAPIKey);

    const { data } = await axios.get<GetAirQualityResponse>(
      // `${this.airVisualBaseUrl}/v2/nearest_city?lat=${latitude}}&lon=${logngitude}?key=${this.airVisualAPIKey}`,
      'https://api.airvisual.com/v2/nearest_city?lat=48.856613&lon=2.352222&key=a8bb2e31-e86b-4999-b1aa-2aad531f69c9',
    );
    return this.mapGetAirQualityResponse(data);
  }
}
