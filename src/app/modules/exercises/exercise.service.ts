import BaseService from '../../../shared/BaseService';
import { Exercise } from './exercise.model';
import { IExercise } from './exercise.interface';

class ExerciseService extends BaseService<IExercise> {
  constructor() {
    super(Exercise);
  }
}

export const exerciseService = new ExerciseService();
