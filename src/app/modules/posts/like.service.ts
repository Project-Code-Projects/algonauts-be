import BaseService from '../../../shared/BaseService';
import { Like } from './like.model';
import { ILike } from './like.interface';

class LikeService extends BaseService<ILike> {
  constructor() {
    super(Like);
  }

  async getLikesByPost(postId: string): Promise<ILike[]> {
    const likes = await this.model
      .find({ postId })
      .populate('postId')
      .populate('userId')
      .exec();
    return likes;
  }
}

export const likeService = new LikeService();
