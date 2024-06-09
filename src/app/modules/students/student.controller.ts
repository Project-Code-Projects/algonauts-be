import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { studentService } from './student.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = await studentService.update(studentId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated Successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  await studentService.delete(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted Successfully',
  });
});

const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = await studentService.getById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getStudentsByParent = catchAsync(async (req: Request, res: Response) => {
  const parentId = req.params.parentId;
  const result = await studentService.getStudentsByParent(parentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const StudentController = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getStudentsByParent,
  getAllStudents,
};
