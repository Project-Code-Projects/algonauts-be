import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { blockLevelService } from './blockLevel.service';

const createBlockLevel = catchAsync(async (req: Request, res: Response) => {
  const result = await blockLevelService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Block Level Created Successfully',
    data: result,
  });
});

const updateBlockLevel = catchAsync(async (req: Request, res: Response) => {
  const blockLevelId = req.params.id;
  const result = await blockLevelService.update(blockLevelId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Block Level Updated Successfully',
    data: result,
  });
});

const deleteBlockLevel = catchAsync(async (req: Request, res: Response) => {
  const blockLevelId = req.params.id;
  await blockLevelService.delete(blockLevelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Block Level Deleted Successfully',
  });
});

const getBlockLevelById = catchAsync(async (req: Request, res: Response) => {
  const blockLevelId = req.params.id;
  const result = await blockLevelService.getById(blockLevelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllBlockLevels = catchAsync(async (req: Request, res: Response) => {
  const result = await blockLevelService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const BlockLevelController = {
  createBlockLevel,
  updateBlockLevel,
  deleteBlockLevel,
  getBlockLevelById,
  getAllBlockLevels,
};
