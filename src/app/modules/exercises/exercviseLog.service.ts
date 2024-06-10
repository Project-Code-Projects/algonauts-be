import BaseService from '../../../shared/baseService';
import { ExerciseLog } from './exerciseLog.model';
import { IExerciseLog } from './exerciseLog.interface';

class ExerciseLogService extends BaseService<IExerciseLog> {
  constructor() {
    super(ExerciseLog);
  }
}

export const exerciseLogService = new ExerciseLogService();
