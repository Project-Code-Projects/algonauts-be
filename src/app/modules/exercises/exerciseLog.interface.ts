/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';

export interface IExerciseLog extends Document {
  exerciseId: ObjectId;
  studentId: ObjectId;
  userId: ObjectId;
  startTime: Date;
  endTime: Date;
  completionTime: number;
  switchTabCount: number;
  status: boolean;
  codeSnippet: string;
}

export type ExerciseLogModel = Model<IExerciseLog, Record<string, unknown>>;
