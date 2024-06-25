/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';

export enum HelpRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  COMPLETED = 'completed',
}
export interface IHelpRequest extends Document {
  studentId: ObjectId;
  instructorId: ObjectId;
  question: string;
  acceptedAt: Date;
  completedAt: Date;
  notes: string;
  status: HelpRequestStatus;
}

export type HelpRequestModel = Model<IHelpRequest, Record<string, unknown>>;
