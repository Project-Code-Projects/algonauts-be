import { Document, Model, ObjectId } from 'mongoose';

interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

interface IProblem {
  title: string;
  description: string;
  examples: IExample[];
  constraints: string[];
  followUp?: string;
}

interface ITestCase {
  nums: number[];
  target: number;
  expected: number[];
}

export interface IEditorLevel extends Document {
  exerciseId: ObjectId;
  problem: IProblem;
  functionPlaceholder: string;
  testCases: Map<string, ITestCase>;
}

export type EditorLevelModel = Model<IEditorLevel, Record<string, unknown>>;
