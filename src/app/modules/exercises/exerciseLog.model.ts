import { Schema, model } from 'mongoose';
import { IExerciseLog, ExerciseLogModel, ExerciseLogStatus } from './exerciseLog.interface';

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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    allotedTime: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ExerciseLogStatus),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ExerciseLog = model<IExerciseLog, ExerciseLogModel>('ExerciseLog', ExerciseLogSchema);
