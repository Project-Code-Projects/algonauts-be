import { Document, Model, ObjectId } from 'mongoose';

export interface IHelpRequest extends Document {
  studentId: ObjectId;
  instructorId: ObjectId;
  acceptedAt: Date;
  completedAt: Date;
  notes: string;
}

export type HelpRequestModel = Model<IHelpRequest, Record<string, unknown>>;
