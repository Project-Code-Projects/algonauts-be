import { Schema, model } from 'mongoose';
import { IParent, ParentModel } from './parent.interface';

const ParentSchema = new Schema<IParent, ParentModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Parent = model<IParent, ParentModel>('Parent', ParentSchema);
