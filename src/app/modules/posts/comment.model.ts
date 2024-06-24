import { Schema, model } from 'mongoose';
import { IComment, CommentModel } from './comment.interface';

const CommentSchema = new Schema<IComment, CommentModel>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Comment = model<IComment, CommentModel>('Comment', CommentSchema);
