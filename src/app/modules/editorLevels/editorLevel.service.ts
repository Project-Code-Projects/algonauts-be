import BaseService from '../../../shared/BaseService';
import { EditorLevel } from './editorLevel.model';
import { IEditorLevel } from './editorLevel.interface';

class EditorLevelService extends BaseService<IEditorLevel> {
  constructor() {
    super(EditorLevel);
  }
}

export const editorLevelService = new EditorLevelService();
