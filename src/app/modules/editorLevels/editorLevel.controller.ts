import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { editorLevelService } from './editorLevel.service';

const createEditorLevel = catchAsync(async (req: Request, res: Response) => {
  const result = await editorLevelService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Editor Level Created Successfully',
    data: result,
  });
});

const updateEditorLevel = catchAsync(async (req: Request, res: Response) => {
  const editorLevelId = req.params.id;
  const result = await editorLevelService.update(editorLevelId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Editor Level Updated Successfully',
    data: result,
  });
});

const deleteEditorLevel = catchAsync(async (req: Request, res: Response) => {
  const editorLevelId = req.params.id;
  await editorLevelService.delete(editorLevelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Editor Level Deleted Successfully',
  });
});

const getEditorLevelById = catchAsync(async (req: Request, res: Response) => {
  const editorLevelId = req.params.id;
  const result = await editorLevelService.getById(editorLevelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllEditorLevels = catchAsync(async (req: Request, res: Response) => {
  const result = await editorLevelService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const EditorLevelController = {
  createEditorLevel,
  updateEditorLevel,
  deleteEditorLevel,
  getEditorLevelById,
  getAllEditorLevels,
};
