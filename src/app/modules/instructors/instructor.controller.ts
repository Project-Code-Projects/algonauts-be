import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { instructorService } from './instructor.service';

const createInstructor = catchAsync(async (req: Request, res: Response) => {
  const result = await instructorService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Instructor Created Successfully',
    data: result,
  });
});

const updateInstructor = catchAsync(async (req: Request, res: Response) => {
  const instructorId = req.params.id;
  const result = await instructorService.update(instructorId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Instructor Updated Successfully',
    data: result,
  });
});

const deleteInstructor = catchAsync(async (req: Request, res: Response) => {
  const instructorId = req.params.id;
  await instructorService.delete(instructorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Instructor Deleted Successfully',
  });
});

const getInstructorById = catchAsync(async (req: Request, res: Response) => {
  const instructorId = req.params.id;
  const result = await instructorService.getById(instructorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getInstructorsByUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await instructorService.getInstructorsByUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllInstructors = catchAsync(async (req: Request, res: Response) => {
  const result = await instructorService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getExerciseStatistics = catchAsync(
  async (req: Request, res: Response) => {
    const statistics = await instructorService.getExerciseStatistics();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: statistics,
      message: `All Students' statistics retrieved successfully`,
    });
  },
);

const getExerciseStatisticsByStudentId = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const statistics =
      await instructorService.getExerciseStatisticsByStudentId(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: statistics,
      message: `Student's statistics retrieved successfully`,
    });
  },
);

const getStudentCodeSnippets = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const statistics =
      await instructorService.getStudentCodeSnippets(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: statistics,
      message: `Student's code snippets retrieved successfully`,
    });
  },
);

export const InstructorController = {
  createInstructor,
  updateInstructor,
  deleteInstructor,
  getInstructorById,
  getInstructorsByUser,
  getAllInstructors,
  getExerciseStatistics,
  getExerciseStatisticsByStudentId,
  getStudentCodeSnippets,
};
