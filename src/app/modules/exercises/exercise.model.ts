import { Schema, model } from 'mongoose';
import { IExercise, ExerciseModel, ExerciseType } from './exercise.interface';

const ExerciseSchema = new Schema<IExercise, ExerciseModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ExerciseType),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Exercise = model<IExercise, ExerciseModel>(
  'Exercise',
  ExerciseSchema,
);
