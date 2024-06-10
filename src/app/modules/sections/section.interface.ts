import { Document, Model } from 'mongoose';

export interface ISection extends Document {
  name: string;
  description: string;
}

export type SectionModel = Model<ISection, Record<string, unknown>>;
