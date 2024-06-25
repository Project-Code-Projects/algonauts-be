/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Instructor } from './instructor.model';
import { IInstructor } from './instructor.interface';
import mongoose from 'mongoose';
import { getExerciseStatisticsAggregate } from '../../../shared/exerciseStatisticsAggregate';
import { HelpRequest } from '../helpRequests/helpRequest.model';

class InstructorService extends BaseService<IInstructor> {
  constructor() {
    super(Instructor);
  }

  async getInstructorsByUser(userId: string): Promise<IInstructor[]> {
    // @ts-ignore
    const instructors = await this.model
      .find({ userId })
      .populate('userId')
      .exec();
    return instructors;
  }

  async getExerciseStatistics() {
    return getExerciseStatisticsAggregate({ $match: {} }, false);
  }

  async getExerciseStatisticsByStudentId(studentId: string) {
    const statistics = await getExerciseStatisticsAggregate(
      {
        $match: { studentId: new mongoose.Types.ObjectId(studentId) },
      },
      true,
    );

    const totalHelpRequests = await HelpRequest.countDocuments({ studentId });

    return { statistics, totalHelpRequests };
  }
}

export const instructorService = new InstructorService();
