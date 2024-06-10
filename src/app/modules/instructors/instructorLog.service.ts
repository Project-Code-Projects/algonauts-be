import BaseService from '../../../shared/BaseService';
import { InstructorLog } from './instructorLog.model';
import { IInstructorLog } from './instructorLog.interface';

class InstructorLogService extends BaseService<IInstructorLog> {
  constructor() {
    super(InstructorLog);
  }

  async getLogsByInstructor(instructorId: string): Promise<IInstructorLog[]> {
    const logs = await this.model.find({ instructorId }).populate('instructorId').exec();
    return logs;
  }
}

export const instructorLogService = new InstructorLogService();
