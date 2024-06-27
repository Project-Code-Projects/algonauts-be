// post.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { postService } from './post.service';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Created Successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const result = await postService.update(postId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Updated Successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  await postService.delete(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Deleted Successfully',
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const result = await postService.getById(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAll(
    {},
    [
      { path: 'authorId' },
      {
        path: 'comments',
        populate: {
          path: 'userId',
        },
      },
      {
        path: 'likes',
      },
    ],
    { ['createdAt']: -1 },
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getPostsByAuthor = catchAsync(async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const result = await postService.getPostsByAuthor(authorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const PostController = {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getAllPosts,
  getPostsByAuthor,
};
