import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { sectionService } from './section.service';

const createSection = catchAsync(async (req: Request, res: Response) => {
  const result = await sectionService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section Created Successfully',
    data: result,
  });
});

const updateSection = catchAsync(async (req: Request, res: Response) => {
  const sectionId = req.params.id;
  const result = await sectionService.update(sectionId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section Updated Successfully',
    data: result,
  });
});

const deleteSection = catchAsync(async (req: Request, res: Response) => {
  const sectionId = req.params.id;
  await sectionService.delete(sectionId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section Deleted Successfully',
  });
});

const getSectionById = catchAsync(async (req: Request, res: Response) => {
  const sectionId = req.params.id;
  const result = await sectionService.getById(sectionId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllSections = catchAsync(async (req: Request, res: Response) => {
  const result = await sectionService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const SectionController = {
  createSection,
  updateSection,
  deleteSection,
  getSectionById,
  getAllSections,
};
