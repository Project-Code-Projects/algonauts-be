import { Schema, model } from 'mongoose';
import { IInstructorLog, InstructorLogModel } from './instructorLog.interface';

const InstructorLogSchema = new Schema<IInstructorLog, InstructorLogModel>(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: 'Instructor',
      required: true,
    },
    log: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const InstructorLog = model<IInstructorLog, InstructorLogModel>('InstructorLog', InstructorLogSchema);
