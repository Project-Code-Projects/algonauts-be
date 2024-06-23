import { Schema, model } from 'mongoose';
import { IEditorLevel, EditorLevelModel } from './editorLevel.interface';

const ExampleSchema = new Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String },
  },
  { _id: false },
);

const ProblemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    examples: { type: [ExampleSchema], required: true },
    constraints: { type: [String] },
    followUp: { type: String },
  },
  { _id: false },
);

const TestCaseSchema = new Schema(
  {
    input: { type: Schema.Types.Mixed, required: true },
    target: { type: Schema.Types.Mixed },
    expected: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const EditorLevelSchema = new Schema<IEditorLevel, EditorLevelModel>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    problem: {
      type: ProblemSchema,
      required: true,
    },
    functionPlaceholder: {
      type: String,
      required: true,
    },
    testCases: {
      type: Map,
      of: TestCaseSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const EditorLevel = model<IEditorLevel, EditorLevelModel>(
  'EditorLevel',
  EditorLevelSchema,
);
