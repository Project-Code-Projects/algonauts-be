import BaseService from '../../../shared/BaseService';
import { Instructor } from './instructor.model';
import { IInstructor } from './instructor.interface';

class InstructorService extends BaseService<IInstructor> {
  constructor() {
    super(Instructor);
  }

  async getInstructorsByUser(userId: string): Promise<IInstructor[]> {
    const instructors = await this.model
      .find({ userId })
      .populate('userId')
      .exec();
    return instructors;
  }
}

export const instructorService = new InstructorService();
