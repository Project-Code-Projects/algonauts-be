import { Document, Model } from 'mongoose';

export interface ICoordinates {
  x: number;

  y: number;
}

export interface IBeginnerLevel extends Document {
  player: ICoordinates;
  spacecraft: ICoordinates;
  blackholes: ICoordinates[];
  level: string;
  description: string;
  mandatoryNodes: string[];
  allowedButtons: string[];
}

export type BeginnerModel = Model<IBeginnerLevel, Record<string, unknown>>;
