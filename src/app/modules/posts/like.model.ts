import { Schema, model } from 'mongoose';
import { ILike, LikeModel } from './like.interface';

const LikeSchema = new Schema<ILike, LikeModel>(
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
  },
  {
    timestamps: true,
  },
);

export const Like = model<ILike, LikeModel>('Like', LikeSchema);
