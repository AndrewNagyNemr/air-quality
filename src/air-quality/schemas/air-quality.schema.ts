import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, _id: false })
class Location {
  @Prop({ type: { type: String } })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: number[];
}

@Schema({ versionKey: false, _id: false })
class Pollution {
  @Prop({ type: Date })
  ts: Date;

  @Prop({ type: Number })
  aqius: number;

  @Prop({ type: String })
  mainus: string;

  @Prop({ type: Number })
  aqicn: number;

  @Prop({ type: String })
  maincn: string;
}

@Schema({ versionKey: false, _id: false })
class Weather {
  @Prop({ type: Date })
  ts: Date;

  @Prop({ type: Number })
  tp: number;

  @Prop({ type: Number })
  pr: number;

  @Prop({ type: Number })
  hu: number;

  @Prop({ type: Number })
  ws: number;

  @Prop({ type: Number })
  wd: number;

  @Prop({ type: String })
  ic: string;
}

@Schema({ versionKey: false, _id: false })
class Current extends Document {
  @Prop({ type: Pollution })
  pollution: Pollution;

  @Prop({ type: Weather })
  weather: Weather;
}

@Schema({ versionKey: false })
export class AirQuality extends Document {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop({ type: Current })
  current: Current;
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);
