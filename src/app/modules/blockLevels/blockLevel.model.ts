import { Schema, model } from 'mongoose';
import { IBlockLevel, BlockLevelModel } from './blockLevel.interface';

const BlockLevelSchema = new Schema<IBlockLevel, BlockLevelModel>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    startPosition: {
      type: String,
      required: true,
    },
    endPosition: {
      type: String,
      required: true,
    },
    requiredBlock: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BlockLevel = model<IBlockLevel, BlockLevelModel>('BlockLevel', BlockLevelSchema);
