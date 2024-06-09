import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';

const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Parent',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
