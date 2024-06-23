/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Exercise } from './exercise.model';
import { IExercise } from './exercise.interface';

class ExerciseService extends BaseService<IExercise> {
  constructor() {
    super(Exercise);
  }

  // Protected getter to access the private `model` property
  protected get exerciseModel() {
    // @ts-ignore
    return this.model;
  }

  async getByChapterId(chapterId: string): Promise<IExercise[]> {
    return this.exerciseModel.find({ chapterId });
  }
}

export const exerciseService = new ExerciseService();
