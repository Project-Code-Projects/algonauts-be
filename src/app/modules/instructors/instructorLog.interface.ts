import { Document, Model, ObjectId } from 'mongoose';

export interface IInstructorLog extends Document {
  instructorId: ObjectId;
  log: string;
}

export type InstructorLogModel = Model<IInstructorLog, Record<string, unknown>>;
