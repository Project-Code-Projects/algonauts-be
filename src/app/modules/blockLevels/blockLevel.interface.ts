import { Document, Model, ObjectId } from 'mongoose';

export interface IBlockLevel extends Document {
  exerciseId: ObjectId;
  startPosition: string;
  endPosition: string;
  requiredBlock: string;
}

export type BlockLevelModel = Model<IBlockLevel>;
