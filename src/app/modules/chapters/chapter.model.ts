import { Schema, model } from 'mongoose';
import { IChapter, ChapterModel } from './chapter.interface';

const ChapterSchema = new Schema<IChapter, ChapterModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Chapter = model<IChapter, ChapterModel>('Chapter', ChapterSchema);
