import { Schema, model } from 'mongoose';
import { ISection, ISectionName, SectionModel } from './section.interface';

const SectionSchema = new Schema<ISection, SectionModel>(
  {
    name: {
      type: String,
      required: true,
      enum: Object.values(ISectionName),
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Section = model<ISection, SectionModel>('Section', SectionSchema);
