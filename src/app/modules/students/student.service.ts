import BaseService from '../../../shared/BaseService';
import { Student } from './student.model';
import { IStudent } from './student.interface';

class StudentService extends BaseService<IStudent> {
  constructor() {
    super(Student);
  }

  async getAll(): Promise<IStudent[]> {
    const students = await this.model.find().populate('userId', 'name').exec();
    return students;
  }

  async getStudentByUserID(userId: string): Promise<IStudent[]> {
    const student = await this.model.find({ userId }).populate('userId').exec();
    return student;
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
