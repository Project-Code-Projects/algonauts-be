import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { helpRequestService } from './helpRequest.service';
import { UserSocket, getIoInstance, getUserSocket } from '../../../socket';
import { User } from '../users/user.model';
import { Student } from '../students/student.model';

const createHelpRequest = catchAsync(async (req: Request, res: Response) => {
  const helpRequest = {
    ...req.body,
    // status:
  };

  const result = await helpRequestService.create(helpRequest);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Help Request Created Successfully',
    data: result,
  });
});

// this api is being used for accepting request will be updated in rafactor
const updateHelpRequest = catchAsync(async (req: Request, res: Response) => {
  const io = getIoInstance();
  console.log(req.body, 'req.body');

  const helpRequestId = req.params.id;
  const roomId = helpRequestId; // Generate room ID
  let updateData = { ...req.body };

  if (req.body.status === 'accepted') {
    // send notification to students
    updateData = { ...updateData, roomId };
  }
  const result = await helpRequestService.update(helpRequestId, updateData);

  // Send notification to the student
  if (result && result.status === 'accepted') {
    const student = await Student.findById(result.studentId);
    let socket = null;
    if (student) {
      socket = getUserSocket(student?.userId.toString());
    }
    if (socket) {
      io.to(socket).emit('request-accepted', { helpRequestId, roomId });
    }
  }

  // close connection for the student
  if (result && result.status === 'completed') {
    const student = await Student.findById(result.studentId);
    let socket = null;
    if (student) {
      socket = getUserSocket(student?.userId.toString());
    }
    if (socket) {
      io.to(socket).emit('instructor-disconnected');
    }
  }

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
  const result = await helpRequestService.getAll(req.query);

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
