import BaseService from '../../../shared/BaseService';
import { ParentMeeting } from './parentMeeting.model';
import { IParentMeeting } from './parentMeeting.interface';

class ParentMeetingService extends BaseService<IParentMeeting> {
  constructor() {
    super(ParentMeeting);
  }

  async getMeetingsByParent(parentId: string): Promise<IParentMeeting[]> {
    const meetings = await this.model.find({ parentId }).populate('parentId').exec();
    return meetings;
  }

  async getMeetingsByInstructor(instructorId: string): Promise<IParentMeeting[]> {
    const meetings = await this.model.find({ instructorId }).populate('instructorId').exec();
    return meetings;
  }
}

export const parentMeetingService = new ParentMeetingService();
