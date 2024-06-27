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

// Virtual field to populate comments
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
});
// Virtual field to populate likes
PostSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
});

PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

export const Post = model<IPost, PostModel>('Post', PostSchema);
