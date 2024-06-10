import { Document, Model, ObjectId } from 'mongoose';

export interface IEditorLevel extends Document {
  exerciseId: ObjectId;
  tests: string;
}

export type EditorLevelModel = Model<IEditorLevel, Record<string, unknown>>;
