import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { parentService } from './parent.service';

const createParent = catchAsync(async (req: Request, res: Response) => {
  const result = await parentService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parent Created Successfully',
    data: result,
  });
});

const updateParent = catchAsync(async (req: Request, res: Response) => {
  const parentId = req.params.id;
  const result = await parentService.update(parentId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parent Updated Successfully',
    data: result,
  });
});

const deleteParent = catchAsync(async (req: Request, res: Response) => {
  const parentId = req.params.id;
  await parentService.delete(parentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parent Deleted Successfully',
  });
});

const getParentById = catchAsync(async (req: Request, res: Response) => {
  const parentId = req.params.id;
  const result = await parentService.getById(parentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getParentsByUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await parentService.getParentsByUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllParents = catchAsync(async (req: Request, res: Response) => {
  const result = await parentService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const ParentController = {
  createParent,
  updateParent,
  deleteParent,
  getParentById,
  getParentsByUser,
  getAllParents,
};
