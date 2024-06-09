import { Document, Model, ObjectId } from 'mongoose';

export interface IPostUpdateLog extends Document {
  postId: ObjectId;
  content: string;
}

export type PostUpdateModel = Model<IPostUpdateLog, Record<string, unknown>>;
