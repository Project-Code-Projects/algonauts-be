import { Schema, model } from 'mongoose';
import {
  IBeginnerLevel,
  BeginnerModel,
  ICoordinates,
} from './beginnerLevel.interface';

const CoordinatesSchema = new Schema<ICoordinates>(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  { _id: false },
);

const BeginnerLevelSchema = new Schema<IBeginnerLevel, BeginnerModel>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    player: { type: CoordinatesSchema, required: true },
    spacecraft: { type: CoordinatesSchema, required: true },
    blackholes: { type: [CoordinatesSchema], required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    mandatoryNodes: { type: [String], required: false },
    allowedButtons: { type: [String], required: false },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const BeginnerLevel = model<IBeginnerLevel, BeginnerModel>(
  'BeginnerLevel',
  BeginnerLevelSchema,
);
