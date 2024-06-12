import BaseService from '../../../shared/BaseService';
import { HelpRequest } from './helpRequest.model';
import { IHelpRequest } from './helpRequest.interface';

class HelpRequestService extends BaseService<IHelpRequest> {
  constructor() {
    super(HelpRequest);
  }

  async getHelpRequestsByStudent(studentId: string): Promise<IHelpRequest[]> {
    const helpRequests = await this.model
      .find({ studentId })
      .populate('studentId')
      .populate('instructorId')
      .exec();
    return helpRequests;
  }

  async getHelpRequestsByInstructor(
    instructorId: string,
  ): Promise<IHelpRequest[]> {
    const helpRequests = await this.model
      .find({ instructorId })
      .populate('studentId')
      .populate('instructorId')
      .exec();
    return helpRequests;
  }
}

export const helpRequestService = new HelpRequestService();
