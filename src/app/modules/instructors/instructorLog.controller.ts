import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { instructorLogService } from './instructorLog.service';

const createInstructorLog = catchAsync(async (req: Request, res: Response) => {
  const result = await instructorLogService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Instructor Log Created Successfully',
    data: result,
  });
});

const updateInstructorLog = catchAsync(async (req: Request, res: Response) => {
  const logId = req.params.id;
  const result = await instructorLogService.update(logId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Instructor Log Updated Successfully',
    data: result,
  });
});

const deleteInstructorLog = catchAsync(async (req: Request, res: Response) => {
  const logId = req.params.id;
  await instructorLogService.delete(logId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Instructor Log Deleted Successfully',
  });
});

const getInstructorLogById = catchAsync(async (req: Request, res: Response) => {
  const logId = req.params.id;
  const result = await instructorLogService.getById(logId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getLogsByInstructor = catchAsync(async (req: Request, res: Response) => {
  const instructorId = req.params.instructorId;
  const result = await instructorLogService.getLogsByInstructor(instructorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllInstructorLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await instructorLogService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const InstructorLogController = {
  createInstructorLog,
  updateInstructorLog,
  deleteInstructorLog,
  getInstructorLogById,
  getLogsByInstructor,
  getAllInstructorLogs,
};
