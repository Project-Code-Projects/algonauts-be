import { Schema, model } from 'mongoose';
import { IHelpRequest, HelpRequestModel } from './helpRequest.interface';

const HelpRequestSchema = new Schema<IHelpRequest, HelpRequestModel>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    acceptedAt: {
      type: Date,
      required: true,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const HelpRequest = model<IHelpRequest, HelpRequestModel>(
  'HelpRequest',
  HelpRequestSchema,
);
