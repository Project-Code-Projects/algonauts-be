import { Document, Model, ObjectId } from 'mongoose';

export interface IParent extends Document {
  userId: ObjectId;
7}

export type ParentModel = Model<IParent, Record<string, unknown>>;
