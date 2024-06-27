/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Student } from './student.model';
import { IStudent } from './student.interface';
import { Exercise } from '../exercises/exercise.model';
import { ExerciseLog } from '../exercises/exerciseLog.model';
import mongoose from 'mongoose';

class StudentService extends BaseService<IStudent> {
  constructor() {
    super(Student);
  }

  async getAll(): Promise<IStudent[]> {
    //@ts-ignore
    const students = await this.model.find().populate('userId', 'name').exec();
    return students;
  }

  async getStudentByUserID(userId: string): Promise<IStudent[]> {
    //@ts-ignore
    const student = await this.model.find({ userId }).populate('userId').exec();
    return student;
  }

  async getStudentsByParent(parentId: string): Promise<IStudent[]> {
    //@ts-ignore
    const students = await this.model
      .find({ parentId })
      .populate('userId')
      .populate('parentId')
      .exec();
    return students;
  }

  async getStudentProgress(
    studentId: string,
  ): Promise<{ totalExercises: number; numberOfExercisesDone: number }> {
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    // Count total number of exercises
    const totalExercises = await Exercise.countDocuments().exec();

    // Count unique number of exercises done by the student
    const exercisesDone = await ExerciseLog.aggregate([
      { $match: { studentId: studentObjectId, status: true } },
      { $group: { _id: '$exerciseId' } },
    ]).exec();

    const numberOfExercisesDone = exercisesDone.length;

    return {
      totalExercises,
      numberOfExercisesDone,
    };
  }
}

export const studentService = new StudentService();
