import BaseService from '../../../shared/BaseService';
import { Student } from './student.model';
import { IStudent } from './student.interface';

class StudentService extends BaseService<IStudent> {
  constructor() {
    super(Student);
  }

  async getStudentsByParent(parentId: string): Promise<IStudent[]> {
    const students = await this.model
      .find({ parentId })
      .populate('userId')
      .populate('parentId')
      .exec();
    return students;
  }
}

export const studentService = new StudentService();
