import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { beginnerLevelService } from './beginnerLevel.service';
import { BeginnerLevel as BeginnerLevelModel } from './beginnerLevel.model';

const createBeginnerLevel = catchAsync(async (req: Request, res: Response) => {
  const result = await beginnerLevelService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Beginner Level Created Successfully',
    data: result,
  });
});

const updateBeginnerLevel = catchAsync(async (req: Request, res: Response) => {
  const beginnerLevelId = req.params.id;
  const result = await beginnerLevelService.update(beginnerLevelId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Beginner Level Updated Successfully',
    data: result,
  });
});

const deleteBeginnerLevel = catchAsync(async (req: Request, res: Response) => {
  const beginnerLevelId = req.params.id;
  await beginnerLevelService.delete(beginnerLevelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Beginner Level Deleted Successfully',
  });
});

const getBeginnerLevelById = catchAsync(async (req: Request, res: Response) => {
  const beginnerLevelId = req.params.id;
  const result = await beginnerLevelService.getById(beginnerLevelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});
const getBeginnerLevelByLevelId = catchAsync(
  async (req: Request, res: Response) => {
    const beginnerLevelId = req.params.level_id;
    const result = await BeginnerLevelModel.findOne({ level: beginnerLevelId });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  },
);

const getAllBeginnerLevels = catchAsync(async (req: Request, res: Response) => {
  const result = await beginnerLevelService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const BeginnerLevelController = {
  createBeginnerLevel,
  updateBeginnerLevel,
  deleteBeginnerLevel,
  getBeginnerLevelById,
  getAllBeginnerLevels,
  getBeginnerLevelByLevelId,
};
