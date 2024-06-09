import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { helpRequestService } from './helpRequest.service';

const createHelpRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await helpRequestService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Help Request Created Successfully',
    data: result,
  });
});

const updateHelpRequest = catchAsync(async (req: Request, res: Response) => {
  const helpRequestId = req.params.id;
  const result = await helpRequestService.update(helpRequestId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Help Request Updated Successfully',
    data: result,
  });
});

const deleteHelpRequest = catchAsync(async (req: Request, res: Response) => {
  const helpRequestId = req.params.id;
  await helpRequestService.delete(helpRequestId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Help Request Deleted Successfully',
  });
});

const getHelpRequestById = catchAsync(async (req: Request, res: Response) => {
  const helpRequestId = req.params.id;
  const result = await helpRequestService.getById(helpRequestId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getHelpRequestsByStudent = catchAsync(
  async (req: Request, res: Response) => {
    const studentId = req.params.studentId;
    const result = await helpRequestService.getHelpRequestsByStudent(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  },
);

const getHelpRequestsByInstructor = catchAsync(
  async (req: Request, res: Response) => {
    const instructorId = req.params.instructorId;
    const result =
      await helpRequestService.getHelpRequestsByInstructor(instructorId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  },
);

const getAllHelpRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await helpRequestService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const HelpRequestController = {
  createHelpRequest,
  updateHelpRequest,
  deleteHelpRequest,
  getHelpRequestById,
  getHelpRequestsByStudent,
  getHelpRequestsByInstructor,
  getAllHelpRequests,
};
