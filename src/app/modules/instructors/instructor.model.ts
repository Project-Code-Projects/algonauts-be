import { Schema, model } from 'mongoose';
import { IInstructor, InstructorModel } from './instructor.interface';

const InstructorSchema = new Schema<IInstructor, InstructorModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Instructor = model<IInstructor, InstructorModel>(
  'Instructor',
  InstructorSchema,
);
