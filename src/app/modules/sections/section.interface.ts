/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export enum ISectionName {
  Beginner = 'beginner',
  Advanced = 'advanced',
  Experienced = 'experienced',
}


export interface ISection extends Document {
  name: string;
  description: string;
}

export type SectionModel = Model<ISection, Record<string, unknown>>;
