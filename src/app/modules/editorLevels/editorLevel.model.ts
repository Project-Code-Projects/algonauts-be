import { Schema, model } from 'mongoose';
import { IEditorLevel, EditorLevelModel } from './editorLevel.interface';

const EditorLevelSchema = new Schema<IEditorLevel, EditorLevelModel>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    tests: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const EditorLevel = model<IEditorLevel, EditorLevelModel>('EditorLevel', EditorLevelSchema);
