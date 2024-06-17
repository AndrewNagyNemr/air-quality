import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { CheckParisAirQuality } from './crons/checkParisAirQuality';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQuality, AirQualitySchema } from './schemas/air-quality.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AirQuality.name, schema: AirQualitySchema },
    ]),
  ],
  controllers: [AirQualityController],
  providers: [AirQualityService, CheckParisAirQuality],
})
export class AirQualityModule {}
