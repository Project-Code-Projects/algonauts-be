/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';


export enum ParentMeetingStatus {
  active = 'active',
  inActive = 'inactive',
}
export interface IParentMeeting extends Document {
  parentId: ObjectId;
  instructorId: string;
  acceptedAt: Date;
  completedAt: Date;
  status: ParentMeetingStatus;
  notes: string;
}

export type ParentMeetingModel = Model<IParentMeeting, Record<string, unknown>>;
