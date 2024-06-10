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
  });
});

const getAllExercises = catchAsync(async (req: Request, res: Response) => {
  const result = await exerciseService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const ExerciseController = {
  createExercise,
  updateExercise,
  deleteExercise,
  getExerciseById,
  getAllExercises,
};
