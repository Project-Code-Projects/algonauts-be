/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { likeService } from './like.service';
import { Like } from './like.model';


const createLike = catchAsync(async (req: Request, res: Response) => {
  const result = await likeService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Like Created Successfully',
    data: result,
  });
});

const likePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.post_id;
  // const userId = req.user._id;
  const userId = req.body.userId;

  const existingLike = await Like.findOne({postId, userId});
  console.log(existingLike);
  let result = null;
  if (existingLike) {
    console.log("delete post");
    // @ts-expect-error 
    // console.log(existingLike._id);
     result = await likeService.delete(existingLike._id);
  } else {
    console.log('create likes')
    //@ts-expect-error 
    result = await likeService.create({ postId, userId });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Liked Successfully',
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
  likePost
};
