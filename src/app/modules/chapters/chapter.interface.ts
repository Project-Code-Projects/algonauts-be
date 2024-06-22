/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';

export enum IChapterName {
  Numbers = 'numbers',
  Strings = 'strings',
  Mixed = 'mixed',
}



export interface IChapter extends Document {
  name: string;
  description: string;
  sectionId: ObjectId;
}

export type ChapterModel = Model<IChapter, Record<string, unknown>>;
