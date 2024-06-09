import { Schema, model } from 'mongoose';
import {
  IParentMeeting,
  ParentMeetingModel,
  ParentMeetingStatus,
} from './parentMeeting.interface';

const ParentMeetingSchema = new Schema<IParentMeeting, ParentMeetingModel>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Parent',
      required: true,
    },
    instructorId: {
      type: String,
      required: true,
    },
    acceptedAt: {
      type: Date,
      required: true,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(ParentMeetingStatus),
      default: ParentMeetingStatus.active,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ParentMeeting = model<IParentMeeting, ParentMeetingModel>(
  'ParentMeeting',
  ParentMeetingSchema,
);
