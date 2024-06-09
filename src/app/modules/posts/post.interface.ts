import { Document, Model, ObjectId } from 'mongoose';

export interface IPost extends Document {
  authorId: ObjectId;
  content: string;
}

export type PostModel = Model<IPost, Record<string, unknown>>;
