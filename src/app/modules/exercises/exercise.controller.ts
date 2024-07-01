import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { exerciseService } from './exercise.service';

const createExercise = catchAsync(async (req: Request, res: Response) => {
  const result = await exerciseService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exercise Created Successfully',
    data: result,
  });
});

const updateExercise = catchAsync(async (req: Request, res: Response) => {
  const exerciseId = req.params.id;
  const result = await exerciseService.update(exerciseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exercise Updated Successfully',
    data: result,
  });
});

const deleteExercise = catchAsync(async (req: Request, res: Response) => {
  const exerciseId = req.params.id;
  await exerciseService.delete(exerciseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exercise Deleted Successfully',
  });
});

const getExerciseById = catchAsync(async (req: Request, res: Response) => {
  const exerciseId = req.params.id;
  const result = await exerciseService.getById(exerciseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Exercise Fetched Successfully',
  });
});

const getAllExercises = catchAsync(async (req: Request, res: Response) => {
  const result = await exerciseService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'All Exercises Fetched Successfully',
  });
});

const fetchNextExercise = catchAsync(async (req: Request, res: Response) => {
  const exerciseId = req.params.exerciseId;
  const result = await exerciseService.fetchNextExercise(exerciseId);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      data: null,
      message: 'No next exercise found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Next exercise fetched successfully',
  });
});

const getExercisesByChapterId = catchAsync(
  async (req: Request, res: Response) => {
    const chapterId = req.params.chapterId;
    const result = await exerciseService.getExercisesByChapterId(chapterId);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        data: null,
        message: 'No exercises found for this chapter',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'All exercises  fetched successfully for this chapter',
    });
  },
);

const getStudentExercisesByChapterAndStudentId = catchAsync(
  async (req: Request, res: Response) => {
    const chapterId = req.params.chapterId;
    const studentId = req.params.studentId;

    const result =
      await exerciseService.getStudentExercisesByChapterAndStudentId(
        studentId,
        chapterId,
      );

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        data: null,
        message: 'No exercises found for this chapter and student',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message:
        'All exercises  fetched successfully for this chapter and student',
    });
  },
);

export const ExerciseController = {
  createExercise,
  updateExercise,
  deleteExercise,
  getExerciseById,
  getAllExercises,
  fetchNextExercise,
  getExercisesByChapterId,
  getStudentExercisesByChapterAndStudentId,
};
