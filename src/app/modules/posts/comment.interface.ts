import { Document, Model, ObjectId } from 'mongoose';

export interface IComment extends Document {
  postId: ObjectId;
  userId: ObjectId;
  content: string;
}

export type CommentModel = Model<IComment, Record<string, unknown>>;
