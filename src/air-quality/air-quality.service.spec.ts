import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AirQuality } from './schemas/air-quality.schema';
import axios from 'axios';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetAirQualityResponse } from './types';

jest.mock('axios');

describe('AirQualityService', () => {
  let service: AirQualityService;
  let configService: ConfigService;
  let AirQualityModel: Model<AirQuality>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => key),
          },
        },
        {
          provide: getModelToken(AirQuality.name),
          useValue: {
            findOne: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AirQualityService);
    configService = module.get(ConfigService);
    AirQualityModel = module.get(getModelToken(AirQuality.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAirQuality', () => {
    it('should fetch air quality data successfully', async () => {
      const mockResponse = { data: { current: { pollution: { aqius: 50 } } } };
      axios.get = jest.fn().mockResolvedValue(mockResponse);
      const result = await service.getAirQuality({
        lat: '48.856613',
        lon: '2.352222',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw InternalServerErrorException if API call fails', async () => {
      axios.get = jest.fn().mockRejectedValue(new Error('API Error'));
      await expect(
        service.getAirQuality({ lat: '48.856613', lon: '2.352222' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('createAirQualityRecord', () => {
    it('should create a new air quality record successfully', async () => {
      const mockData = {
        data: { current: { pollution: { aqius: 50 } } },
      } as unknown as GetAirQualityResponse;
      AirQualityModel.create = jest.fn().mockResolvedValue(mockData);
      await service.createAirQualityRecord(mockData);
      await expect(
        service.createAirQualityRecord(mockData),
      ).resolves.not.toThrow();
    });

    it('should throw InternalServerErrorException if saving fails', async () => {
      AirQualityModel.create = jest
        .fn()
        .mockRejectedValue(new Error('DB Error'));
      const mockData = {
        data: { current: { pollution: { aqius: 50 } } },
      } as unknown as GetAirQualityResponse;
      await expect(service.createAirQualityRecord(mockData)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getMostPollutedParis', () => {
    it('should return the most polluted time', async () => {
      const mockRecord = { current: { pollution: { aqius: 80 } } };
      AirQualityModel.findOne().sort().exec = jest
        .fn()
        .mockResolvedValue(mockRecord);

      const result = await service.getMostPollutedParis();
      expect(result).toEqual(mockRecord);
    });

    it('should throw NotFoundException if no records found', async () => {
      AirQualityModel.findOne().sort().exec = jest.fn().mockResolvedValue(null);

      await expect(service.getMostPollutedParis()).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if fetching fails', async () => {
      AirQualityModel.findOne().sort().exec = jest
        .fn()
        .mockRejectedValue(new Error('DB Error'));

      await expect(service.getMostPollutedParis()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
