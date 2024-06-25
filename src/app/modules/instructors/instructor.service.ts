/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Instructor } from './instructor.model';
import { IInstructor } from './instructor.interface';
import mongoose from 'mongoose';
import { getExerciseStatisticsAggregate } from '../../../shared/exerciseStatisticsAggregate';
import { HelpRequest } from '../helpRequests/helpRequest.model';
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

  async getStudentCodeSnippets(studentId: string) {
    const codeSnippets = await ExerciseLog.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(studentId),
          status: true,
        },
      },
      {
        $group: {
          _id: '$exerciseId',
          codeSnippets: { $push: '$codeSnippet' },
          completedOn: { $push: '$endTime' },
        },
      },
      {
        $lookup: {
          from: 'exercises',
          localField: '_id',
          foreignField: '_id',
          as: 'exercise',
        },
      },
      {
        $unwind: '$exercise',
      },
      {
        $project: {
          exerciseId: '$_id',
          exerciseName: '$exercise.name',
          snippets: {
            $map: {
              input: { $zip: { inputs: ['$codeSnippets', '$completedOn'] } },
              as: 'pair',
              in: {
                codeSnippet: { $arrayElemAt: ['$$pair', 0] },
                completedOn: { $arrayElemAt: ['$$pair', 1] },
              },
            },
          },
        },
      },
    ]);

    return codeSnippets;
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
