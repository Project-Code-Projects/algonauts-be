import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { exerciseLogService } from './exerciseLog.service';

const createExerciseLog = catchAsync(async (req: Request, res: Response) => {
  const result = await exerciseLogService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exercise Log Created Successfully',
    data: result,
  });
});

const updateExerciseLog = catchAsync(async (req: Request, res: Response) => {
  const exerciseLogId = req.params.id;
  const result = await exerciseLogService.update(exerciseLogId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exercise Log Updated Successfully',
    data: result,
  });
});

const deleteExerciseLog = catchAsync(async (req: Request, res: Response) => {
  const exerciseLogId = req.params.id;
  await exerciseLogService.delete(exerciseLogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exercise Log Deleted Successfully',
  });
});

const getExerciseLogById = catchAsync(async (req: Request, res: Response) => {
  const exerciseLogId = req.params.id;
  const result = await exerciseLogService.getById(exerciseLogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllExerciseLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await exerciseLogService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const ExerciseLogController = {
  createExerciseLog,
  updateExerciseLog,
  deleteExerciseLog,
  getExerciseLogById,
  getAllExerciseLogs,
};
