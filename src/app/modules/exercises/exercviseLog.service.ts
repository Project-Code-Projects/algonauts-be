import { ExerciseLog } from './exerciseLog.model';
import { IExerciseLog } from './exerciseLog.interface';
import BaseService from '../../../shared/BaseService';

class ExerciseLogService extends BaseService<IExerciseLog> {
  constructor() {
    super(ExerciseLog);
  }
}

export const exerciseLogService = new ExerciseLogService();
