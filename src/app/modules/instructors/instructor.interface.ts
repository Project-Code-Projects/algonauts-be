import { Document, Model, ObjectId } from 'mongoose';

export interface IInstructor extends Document {
  userId: ObjectId;
}

export type InstructorModel = Model<IInstructor, Record<string, unknown>>;
