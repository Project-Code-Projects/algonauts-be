import { Schema, model } from 'mongoose';
import { IExerciseLog, ExerciseLogModel } from './exerciseLog.interface';

const ExerciseLogSchema = new Schema<IExerciseLog, ExerciseLogModel>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    completionTime: {
      type: Number,
      required: true,
    },
    switchTabCount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ExerciseLog = model<IExerciseLog, ExerciseLogModel>(
  'ExerciseLog',
  ExerciseLogSchema,
);
