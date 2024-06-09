import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { parentMeetingService } from './parentMeeting.service';

const createParentMeeting = catchAsync(async (req: Request, res: Response) => {
  const result = await parentMeetingService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parent Meeting Created Successfully',
    data: result,
  });
});

const updateParentMeeting = catchAsync(async (req: Request, res: Response) => {
  const meetingId = req.params.id;
  const result = await parentMeetingService.update(meetingId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parent Meeting Updated Successfully',
    data: result,
  });
});

const deleteParentMeeting = catchAsync(async (req: Request, res: Response) => {
  const meetingId = req.params.id;
  await parentMeetingService.delete(meetingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parent Meeting Deleted Successfully',
  });
});

const getParentMeetingById = catchAsync(async (req: Request, res: Response) => {
  const meetingId = req.params.id;
  const result = await parentMeetingService.getById(meetingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getMeetingsByParent = catchAsync(async (req: Request, res: Response) => {
  const parentId = req.params.parentId;
  const result = await parentMeetingService.getMeetingsByParent(parentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getMeetingsByInstructor = catchAsync(
  async (req: Request, res: Response) => {
    const instructorId = req.params.instructorId;
    const result =
      await parentMeetingService.getMeetingsByInstructor(instructorId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  },
);

const getAllParentMeetings = catchAsync(async (req: Request, res: Response) => {
  const result = await parentMeetingService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const ParentMeetingController = {
  createParentMeeting,
  updateParentMeeting,
  deleteParentMeeting,
  getParentMeetingById,
  getMeetingsByParent,
  getMeetingsByInstructor,
  getAllParentMeetings,
};
