//@ts-nocheck
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
            save: jest.fn(),
            exec: jest.fn(),
            create: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
    configService = module.get<ConfigService>(ConfigService);
    AirQualityModel = module.get<Model<AirQuality>>(
      getModelToken(AirQuality.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAirQuality', () => {
    it('should fetch air quality data successfully', async () => {
      const mockResponse = { data: { current: { pollution: { aqius: 50 } } } };
      axios.get.mockResolvedValue(mockResponse);
      const result = await service.getAirQuality({
        lat: '48.856613',
        lon: '2.352222',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw InternalServerErrorException if API call fails', async () => {
      axios.get.mockRejectedValue(new Error('API Error'));
      await expect(
        service.getAirQuality({ lat: '48.856613', lon: '2.352222' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('createAirQualityRecord', () => {
    it('should create a new air quality record successfully', async () => {
      const mockData = { data: { current: { pollution: { aqius: 50 } } } };
      AirQualityModel.save.mockResolvedValue(mockData);
      await service.createAirQualityRecord(mockData);
      await expect(
        service.createAirQualityRecord(mockData),
      ).resolves.not.toThrow();
    });

    it('should throw InternalServerErrorException if saving fails', async () => {
      AirQualityModel.create.mockRejectedValue(new Error('DB Error'));
      await expect(
        service.createAirQualityRecord({
          data: { current: { pollution: { aqius: 50 } } },
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getMostPollutedParis', () => {
    it('should return the most polluted time', async () => {
      const mockRecord = { current: { pollution: { aqius: 80 } } };
      AirQualityModel.exec.mockResolvedValue(mockRecord);

      const result = await service.getMostPollutedParis();
      expect(result).toEqual(mockRecord);
    });

    it('should throw NotFoundException if no records found', async () => {
      AirQualityModel.exec.mockResolvedValue(null);

      await expect(service.getMostPollutedParis()).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if fetching fails', async () => {
      AirQualityModel.exec.mockRejectedValue(new Error('DB Error'));

      await expect(service.getMostPollutedParis()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
