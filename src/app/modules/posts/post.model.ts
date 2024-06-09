import { Schema, model } from 'mongoose';
import { IPost, PostModel } from './post.interface';

const PostSchema = new Schema<IPost, PostModel>(
  {
    authorId: {
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

export const Post = model<IPost, PostModel>('Post', PostSchema);
