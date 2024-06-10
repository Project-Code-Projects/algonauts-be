/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';

export enum ExerciseLogStatus {
  completed = 'completed',
  inProgress = 'inProgress',
  notStarted = 'notStarted',
  failed = 'failed',
}

export interface IExerciseLog extends Document {
  exerciseId: ObjectId;
  studentId: ObjectId;
  userId: ObjectId;
  startTime: Date;
  endTime: Date;
  allotedTime: number;
  status: ExerciseLogStatus;
}

export type ExerciseLogModel = Model<IExerciseLog, Record<string, unknown>>;
