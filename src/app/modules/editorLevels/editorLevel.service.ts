/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { EditorLevel } from './editorLevel.model';
import { IEditorLevel } from './editorLevel.interface';

class EditorLevelService extends BaseService<IEditorLevel> {
  constructor() {
    super(EditorLevel);
  }

  async getByExerciseId(exerciseId: string): Promise<IEditorLevel[]> {
    // @ts-ignore
    return this.model.find({ exerciseId });
  }
}

export const editorLevelService = new EditorLevelService();
