import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GetAirQualityResponse } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AirQuality } from './schemas/air-quality.schema';

@Injectable()
export class AirQualityService {
  airVisualBaseUrl: string;
  airVisualAPIKey: string;
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(AirQuality.name) private AirQualityModel: Model<AirQuality>,
  ) {
    this.airVisualBaseUrl = configService.getOrThrow('AIR_VISUAL_BASE_URL');
    this.airVisualAPIKey = configService.getOrThrow('AIR_VISUAL_API_KEY');
  }

  mapGetAirQualityResponse(response: GetAirQualityResponse) {
    return {
      Result: {
        Polution: response.data.current.pollution,
      },
    };
  }

  async getAirQuality({
    lat,
    lon,
  }: {
    lat: string;
    lon: string;
  }): Promise<GetAirQualityResponse> {
    try {
      const { data } = await axios.get<GetAirQualityResponse>(
        '/v2/nearest_city',
        {
          baseURL: this.airVisualBaseUrl,
          params: {
            lat,
            lon,
            key: this.airVisualAPIKey,
          },
        },
      );
      return data;
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      throw new InternalServerErrorException(
        'Failed to fetch air quality data',
      );
    }
  }

  async createAirQualityRecord(airQuality: GetAirQualityResponse) {
    try {
      await new this.AirQualityModel(airQuality.data).save();
    } catch (error) {
      console.error('Error creating air quality record:', error);
      throw new InternalServerErrorException(
        'Failed to create air quality record',
      );
    }
  }

  async getMostPollutedParis() {
    try {
      const result = await this.AirQualityModel.findOne()
        .sort({ 'current.pollution.aqius': -1 })
        .exec();
      if (!result) {
        throw new NotFoundException('No air quality records found');
      }
      return result;
    } catch (error) {
      console.error('Error fetching most polluted time:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch most polluted time',
      );
    }
  }
}
