import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { chapterService } from './chapter.service';
import { exerciseService } from '../exercises/exercise.service';

const createChapter = catchAsync(async (req: Request, res: Response) => {
  const result = await chapterService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chapter Created Successfully',
    data: result,
  });
});

const updateChapter = catchAsync(async (req: Request, res: Response) => {
  const chapterId = req.params.id;
  const result = await chapterService.update(chapterId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chapter Updated Successfully',
    data: result,
  });
});

const deleteChapter = catchAsync(async (req: Request, res: Response) => {
  const chapterId = req.params.id;
  await chapterService.delete(chapterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chapter Deleted Successfully',
  });
});

const getChapterById = catchAsync(async (req: Request, res: Response) => {
  const chapterId = req.params.id;
  const chapterResult = await chapterService.getById(chapterId);
  const exercisesResult = await exerciseService.getByChapterId(chapterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: {
      chapter: chapterResult,
      exercises: exercisesResult,
    },
    message: 'Chapter and Exercises Fetched Successfully',
  });
});

const getAllChapters = catchAsync(async (req: Request, res: Response) => {
  const result = await chapterService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Chapters Fetched Successfully',
  });
});

export const ChapterController = {
  createChapter,
  updateChapter,
  deleteChapter,
  getChapterById,
  getAllChapters,
};
