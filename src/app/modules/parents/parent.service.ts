/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Parent } from './parent.model';
import { IParent } from './parent.interface';
import { getExerciseStatisticsAggregate } from '../../../shared/exerciseStatisticsAggregate';
import mongoose from 'mongoose';
import { HelpRequest } from '../helpRequests/helpRequest.model';

class ParentService extends BaseService<IParent> {
  constructor() {
    super(Parent);
  }

  async getParentsByUser(userId: string): Promise<IParent[]> {
    //@ts-ignore
    const parents = await this.model.find({ userId }).populate('userId').exec();
    return parents;
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

export const parentService = new ParentService();
