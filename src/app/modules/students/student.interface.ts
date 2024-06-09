import { Document, Model, ObjectId } from 'mongoose';

export interface IStudent extends Document {
  userId: ObjectId;
  parentId: ObjectId;
  status: 'active' | 'inactive'; // Add status field as an enum
}

export type StudentModel = Model<IStudent>;
