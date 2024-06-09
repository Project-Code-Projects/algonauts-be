// post.service.ts
import BaseService from '../../../shared/BaseService';
import { Post } from './post.model';
import { IPost } from './post.interface';
import { IPostUpdateLog } from './postUpdateLog.interface';
import { PostUpdateLog } from './postUpdateLog.model';

class PostService extends BaseService<IPost> {
  constructor() {
    super(Post);
  }

  async getPostsByAuthor(authorId: string): Promise<IPost[]> {
    const posts = await this.model
      .find({ authorId })
      .populate('authorId')
      .exec();
    return posts;
  }

  async update(id: string, item: Partial<IPost>): Promise<IPost | null> {
    const updatedItem = await this.model
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
    if (!updatedItem) {
      throw new Error(`${this.model.modelName} not found`);
    }

    // Create an update log
    const updateLog: IPostUpdateLog = {
      postId: updatedItem._id,
      content: item.content,
    } as IPostUpdateLog;
    await PostUpdateLog.create(updateLog);

    return updatedItem;
  }
}

export const postService = new PostService();
