import { Schema, model } from 'mongoose';
import {
  IHelpRequest,
  HelpRequestModel,
  HelpRequestStatus,
} from './helpRequest.interface';

const HelpRequestSchema = new Schema<IHelpRequest, HelpRequestModel>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: 'Instructor',
      required: false,
    },
    question: {
      type: String,
      required: true,
    },
    acceptedAt: {
      type: Date,
      required: false,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(HelpRequestStatus),
      default: HelpRequestStatus.PENDING,
      required: true,
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
