import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { AirQuality } from './schemas/air-quality.schema';

describe('AirQualityController', () => {
  let controller: AirQualityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
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
        AirQualityService,
      ],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
