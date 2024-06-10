import { Schema, model } from 'mongoose';
import { ISection, SectionModel } from './section.interface';

const SectionSchema = new Schema<ISection, SectionModel>(
  {
    name: {
      type: String,
      required: true,
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
