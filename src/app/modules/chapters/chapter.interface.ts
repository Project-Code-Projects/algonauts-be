import { Document, Model, ObjectId } from 'mongoose';

export interface IChapter extends Document {
  name: string;
  description: string;
  sectionId: ObjectId;
}

export type ChapterModel = Model<IChapter, Record<string, unknown>>;
