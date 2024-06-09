// post.service.ts
import BaseService from '../../../shared/BaseService';
import { Post } from './post.model';
import { IPost } from './post.interface';

class PostService extends BaseService<IPost> {
  constructor() {
    super(Post);
  }

  async getPostsByAuthor(authorId: string): Promise<IPost[]> {
    const posts = await this.model.find({ authorId }).populate('authorId').exec();
    return posts;
  }
}

export const postService = new PostService();
