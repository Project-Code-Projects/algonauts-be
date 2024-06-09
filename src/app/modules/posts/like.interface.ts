import { Document, Model, ObjectId } from 'mongoose';

export interface ILike extends Document {
  postId: ObjectId;
  userId: ObjectId;
}

export type LikeModel = Model<ILike, Record<string, unknown>>;
