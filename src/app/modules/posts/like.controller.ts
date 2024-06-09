import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { likeService } from './like.service';

const createLike = catchAsync(async (req: Request, res: Response) => {
  const result = await likeService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Like Created Successfully',
    data: result,
  });
});

const deleteLike = catchAsync(async (req: Request, res: Response) => {
  const likeId = req.params.id;
  await likeService.delete(likeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Like Deleted Successfully',
  });
});

const getLikesByPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const result = await likeService.getLikesByPost(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const LikeController = {
  createLike,
  deleteLike,
  getLikesByPost,
};
