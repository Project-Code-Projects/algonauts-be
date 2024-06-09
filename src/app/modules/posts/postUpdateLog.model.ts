import { Schema, model } from 'mongoose';
import { IPostUpdateLog, PostUpdateModel } from './postUpdateLog.interface';

const PostUpdateLogSchema = new Schema<IPostUpdateLog, PostUpdateModel>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
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

export const PostUpdateLog = model<IPostUpdateLog, PostUpdateModel>(
  'PostUpdateLog',
  PostUpdateLogSchema,
);
