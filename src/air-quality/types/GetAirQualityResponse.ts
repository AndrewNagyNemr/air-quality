import { ApiProperty } from '@nestjs/swagger';

class Pollution {
  @ApiProperty()
  ts: string;

  @ApiProperty()
  aqius: number;

  @ApiProperty()
  mainus: string;

  @ApiProperty()
  aqicn: number;

  @ApiProperty()
  maincn: string;
}

class Result {
  @ApiProperty({ type: Pollution })
  Pollution: Pollution;
}

export class GetAirQualityResponse {
  @ApiProperty({ type: Result })
  Result: Result;
}
