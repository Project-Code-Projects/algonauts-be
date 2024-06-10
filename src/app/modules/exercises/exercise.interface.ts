/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';

export enum ExerciseType {
  flow = 'flow',
  code = 'code',
}
export interface IExercise extends Document {
  name: string;
  description: string;
  chapterId: ObjectId;
  type: ExerciseType;
}

export type ExerciseModel = Model<IExercise, Record<string, unknown>>;
