import BaseService from '../../../shared/BaseService';
import { Comment } from './comment.model';
import { IComment } from './comment.interface';

class CommentService extends BaseService<IComment> {
  constructor() {
    super(Comment);
  }

  async getCommentsByPost(postId: string): Promise<IComment[]> {
    const comments = await this.model.find({ postId }).populate('postId').populate('userId').exec();
    return comments;
  }
}

export const commentService = new CommentService();
