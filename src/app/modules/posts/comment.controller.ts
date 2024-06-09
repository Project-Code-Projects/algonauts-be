import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { commentService } from './comment.service';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment Created Successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const result = await commentService.update(commentId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment Updated Successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.id;
  await commentService.delete(commentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment Deleted Successfully',
  });
});

const getCommentsByPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const result = await commentService.getCommentsByPost(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const CommentController = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
};
