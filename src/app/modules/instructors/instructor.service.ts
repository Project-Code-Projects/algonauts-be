/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Instructor } from './instructor.model';
import { IInstructor } from './instructor.interface';
import { ExerciseLog } from '../exercises/exerciseLog.model';

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
    const stats = await ExerciseLog.aggregate([
      {
        $group: {
          _id: '$exerciseId',
          averageCompletionTime: { $avg: '$completionTime' },
          totalAttempts: { $sum: 1 },
          successfulAttempts: {
            $sum: {
              $cond: [{ $eq: ['$status', true] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          averageCompletionTime: 1,
          totalAttempts: 1,
          successfulAttempts: 1,
          successRate: {
            $multiply: [
              { $divide: ['$successfulAttempts', '$totalAttempts'] },
              100,
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'exercises',
          localField: '_id',
          foreignField: '_id',
          as: 'exerciseDetails',
        },
      },
      {
        $unwind: '$exerciseDetails',
      },
      {
        $project: {
          _id: 1,
          averageCompletionTime: 1,
          totalAttempts: 1,
          successfulAttempts: 1,
          successRate: 1,
          exerciseName: '$exerciseDetails.name',
          exerciseType: '$exerciseDetails.type',
        },
      },
    ]);

    return stats;
  }
}

export const instructorService = new InstructorService();
